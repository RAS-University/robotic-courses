// SPDX-FileCopyrightText: 2026 Tobias Loew <tobias.loew@gafro.ch>
//
// SPDX-FileContributor: Tobias Loew <tobias.loew@gafro.ch>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//
// SPDX-License-Identifier: MPL-2.0

import * as THREE from 'three';
import { poseFromMotor } from './math.js';
import { ColladaLoader } from 'three/addons/loaders/ColladaLoader.js';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

/**
 * RobotVisual wraps a gafrojs robot/System (anything exposing getVisualMeshes
 * and computeForwardKinematics), loads its visual meshes into a three.js scene,
 * and drives them from a joint-position vector. It also exposes setColor to tint
 * the whole robot.
 *
 * Usage:
 *   const visual = new RobotVisual(system, q, viewer.scene);
 *   await visual.load();           // resolves once meshes are in the scene
 *   viewer.onUpdate(() => visual.update());
 *   visual.setJointPosition([...]);
 *   visual.setColor(0x3366ff);
 *
 * opts.ownsRobot (default true): set false when the wrapped object is owned
 * elsewhere (e.g. a System moved into a RobotInterface) so dispose() does not
 * delete it.
 */
export class RobotVisual {
    constructor(gafroRobot, joint_position, scene, opts = {}) {
        this.robot = gafroRobot;
        this.scene = scene;
        this.assetBaseDir = opts.assetBaseDir || '';
        this.meshSearchPaths = opts.meshSearchPaths || ['/assets/', 'assets/', '/', ''];
        this.color = opts.color ?? null;
        // When the wrapped robot/System is owned elsewhere (e.g. a System that was
        // moved into a RobotInterface), the visual must not delete it on dispose() —
        // doing so would double-free the WASM-owned object. Defaults to true.
        this.ownsRobot = opts.ownsRobot ?? true;
        this._links = [];           // Object3D per loaded link
        this._materials = new Set();
        this._originalColors = new Map();
        this._joint_position = joint_position;
    }

    /** Load meshes and return a promise that resolves once everything is in the scene. */
    async load() {
        if (typeof this.robot.getVisualMeshes === 'function') {
            await this._loadGeneric();
        } else {
            throw new Error('RobotVisual: unknown robot type (no getVisualMeshes or initializeVisualization)');
        }
        if (this.color !== null) {
            this.setColor(this.color);
        }
        this.update();
        return this;
    }

    /** Drive the robot's joint positions (array of length DoF). */
    setJointPosition(q) {
        this._joint_position = q;
    }

    /** Push the latest forward-kinematics result into the three.js meshes. */
    update() {
        const fk = this.robot.computeForwardKinematics(this._joint_position);

        for (const link of this._links) {
            const pose = poseFromMotor(fk.getLinkPose(link.linkName));
            link.position.copy(pose.position);
            link.quaternion.copy(pose.quaternion);
        }
    }

    /** Tint every link mesh. Pass null to restore original colors. */
    setColor(hex) {
        this.color = hex;
        for (const mat of this._materials) {
            if (hex === null) {
                const orig = this._originalColors.get(mat);
                if (orig !== undefined) mat.color.set(orig);
            } else {
                mat.color.set(hex);
            }
        }
    }

    /** Remove all loaded link meshes from the scene and delete the WASM-owned robot. */
    dispose() {
        for (const obj of this._links) {
            this.scene.remove(obj);
        }
        this._links.length = 0;
        this._materials.clear();
        this._originalColors.clear();
        if (this.ownsRobot && this.robot && typeof this.robot.delete === 'function') {
            this.robot.delete();
        }
        this.robot = null;
    }

    /* ---------------------- internal ---------------------- */

    async _loadGeneric() {
        const meshes = this.robot.getVisualMeshes();
        // emscripten binds std::vector as an object with .size() and .get(i);
        // pure JS arrays expose .length / [].
        const isVec = typeof meshes.size === 'function';
        const n = isVec ? meshes.size() : meshes.length;
        const promises = [];
        for (let i = 0; i < n; ++i) {
            const entry = isVec ? meshes.get(i) : meshes[i];
            promises.push(this._loadOne(entry));
        }
        await Promise.all(promises);
    }

    async _loadOne(mesh) {
        const candidates = this._candidatePaths(mesh.filename);
        console.info(`RobotVisual: mesh.filename ${mesh.filename} mesh.scale ${mesh.scale.x}`);
        const loader = this._loaderFor(mesh.filename);
        if (!loader) {
            console.warn(`RobotVisual: no loader for ${mesh.filename}`);
            return;
        }
        const obj = await this._tryLoad(loader, candidates);
        if (!obj) {
            console.warn(`RobotVisual: could not load mesh for "${mesh.name}" (${mesh.filename})`);
            return;
        }
        obj.position.set(0, 0, 0);
        obj.quaternion.set(0, 0, 0, 1);
        const sc = mesh.scale;
        const sx = typeof sc.x === 'function' ? sc.x() : sc.x;
        const sy = typeof sc.y === 'function' ? sc.y() : sc.y;
        const sz = typeof sc.z === 'function' ? sc.z() : sc.z;
        obj.scale.set(sx, sy, sz);
        obj.linkName = mesh.name;
        this.scene.add(obj);
        this._collectMaterials(obj);
        this._links.push(obj);
    }

    _candidatePaths(filename) {
        let cleaned = filename.replace(/^package:\/\/[^/]+\//, '').replace(/^\.\//, '');
        // Some robot sources already prefix "assets/" (e.g. FrankaEmikaRobot); others
        // emit assets-root-relative names (e.g. "robots/panda/..."). Strip a leading
        // "assets/" so prefixing is consistent and never doubles it.
        const bare = cleaned.replace(/^assets\//, '');
        const out = [];
        if (this.assetBaseDir) out.push(this.assetBaseDir + bare);
        for (const prefix of this.meshSearchPaths) {
            out.push(prefix + bare);
        }
        // Root-absolute forms so they resolve against the origin, not the page dir
        // (a page at /examples/ must still reach /assets/...).
        out.push('/' + cleaned, '/' + bare, cleaned, bare, filename);
        // de-dup while preserving order
        return [...new Set(out)];
    }

    _loaderFor(filename) {
        const ext = filename.split('.').pop().toLowerCase();
        if (ext === 'dae') return new ColladaLoader();
        if (ext === 'stl') return new STLLoader();
        if (ext === 'obj') return new OBJLoader();
        return null;
    }

    _tryLoad(loader, candidates) {
        return new Promise((resolve) => {
            const attempt = (i) => {
                if (i >= candidates.length) return resolve(null);
                loader.load(
                    candidates[i],
                    (loaded) => resolve(this._normalize(loaded)),
                    undefined,
                    () => attempt(i + 1),
                );
            };
            attempt(0);
        });
    }

    _normalize(loaded) {
        if (loaded.scene) return loaded.scene;
        if (loaded.isBufferGeometry) {
            const mat = new THREE.MeshStandardMaterial({ color: 0x999999 });
            return new THREE.Mesh(loaded, mat);
        }
        return loaded;
    }

    _collectMaterials(root) {
        root.traverse((node) => {
            if (!node.isMesh || !node.material) return;
            const mats = Array.isArray(node.material) ? node.material : [node.material];
            for (const mat of mats) {
                if (mat.color && !this._materials.has(mat)) {
                    this._materials.add(mat);
                    this._originalColors.set(mat, mat.color.getHex());
                }
            }
        });
    }
}
