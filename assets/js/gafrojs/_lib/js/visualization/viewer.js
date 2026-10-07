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
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

/**
 * Viewer wraps a three.js scene, camera, renderer and orbit controls
 * inside a container element. It also drives the animation loop and
 * lets callers register per-frame update callbacks (for robots,
 * trajectories, animated primitives).
 */
export class Viewer {
    constructor(container, options = {}) {
        if (typeof container === 'string') {
            container = document.getElementById(container);
        }
        if (!container) {
            throw new Error('Viewer: container element not found');
        }

        const {
            background = 0xffffff,
            cameraPosition = [1.5, 1.5, 1.5],
            cameraTarget = [0, 0, 0],
            up = [0, 0, 1],
            grid = true,
            axes = false,
        } = options;

        THREE.Object3D.DEFAULT_UP = new THREE.Vector3(...up);

        const width = container.clientWidth || window.innerWidth;
        const height = container.clientHeight || window.innerHeight;

        this.container = container;
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(background);

        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.01, 1000);
        this.camera.position.set(...cameraPosition);
        this.camera.lookAt(new THREE.Vector3(...cameraTarget));

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(this.renderer.domElement);

        this.scene.add(new THREE.AmbientLight(0xf0f0f0, 1));
        const d1 = new THREE.DirectionalLight(0xffffff, 1);
        d1.position.set(10, 10, 5);
        this.scene.add(d1);
        const d2 = new THREE.DirectionalLight(0xffffff, 0.5);
        d2.position.set(-10, -10, -5);
        this.scene.add(d2);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.target.set(...cameraTarget);
        this.controls.enableDamping = false;

        if (grid) {
            const gridHelper = new THREE.GridHelper(10, 10);
            gridHelper.rotation.x = Math.PI / 2;
            this.scene.add(gridHelper);
        }
        if (axes) {
            this.scene.add(new THREE.AxesHelper(1));
        }

        this._updaters = new Set();
        this._running = false;

        window.addEventListener('resize', () => this._onResize());
    }

    /** Register a callback invoked every frame before rendering. */
    onUpdate(fn) {
        this._updaters.add(fn);
        return () => this._updaters.delete(fn);
    }

    /** Add anything with a `.object3D` field (e.g. a primitive handle) or a raw Object3D. */
    add(obj) {
        if (obj && obj.object3D) {
            this.scene.add(obj.object3D);
        } else {
            this.scene.add(obj);
        }
        return obj;
    }

    remove(obj) {
        if (obj && obj.object3D) {
            this.scene.remove(obj.object3D);
        } else {
            this.scene.remove(obj);
        }
    }

    start() {
        if (this._running) return;
        this._running = true;
        const loop = () => {
            if (!this._running) return;
            requestAnimationFrame(loop);
            this.controls.update();
            for (const fn of this._updaters) {
                fn();
            }
            this.renderer.render(this.scene, this.camera);
        };
        loop();
    }

    stop() {
        this._running = false;
    }

    _onResize() {
        const w = this.container.clientWidth || window.innerWidth;
        const h = this.container.clientHeight || window.innerHeight;
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(w, h);
    }
}
