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
import { poseFromMotor, vec3From } from './math.js';
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';

// See note in primitives.js — WebGL ignores LineBasicMaterial.linewidth, so we
// use Line2 (screen-space triangle strips) here too. LineMaterial needs the
// viewport size; we keep it in sync on resize.
const _trajLineMaterials = new Set();
if (typeof window !== 'undefined') {
    window.addEventListener('resize', () => {
        for (const m of _trajLineMaterials) m.resolution.set(window.innerWidth, window.innerHeight);
    });
}

/**
 * MotorTrajectory visualizes a sequence of gafrojs Motors as a path
 * in three.js: a polyline through the motor translations, optional
 * coordinate-frame triads at each sample, and a marker that can be
 * animated along the path.
 *
 *   const traj = new MotorTrajectory(motors, { color: 0x00aa66, frames: true });
 *   viewer.add(traj);
 *   traj.play({ duration: 4.0, loop: true });
 *
 * For driving a robot along the path, pass `onSample` — it fires
 * every frame during play() with the interpolated index and motor,
 * so callers can plug in their own IK (e.g. robot.trackPoint).
 */
export class MotorTrajectory {
    constructor(motors, opts = {}) {
        const {
            color = 0x00aa66,
            lineWidth = 10,
            frames = false,
            frameSize = 0.35,
            frameStride = 1,
            marker = true,
            markerRadius = 0.025,
            markerColor = null,
        } = opts;

        this.motors = motors;
        this._color = color;
        this._frameSize = frameSize;
        this._frameStride = frameStride;

        this.object3D = new THREE.Group();

        // polyline of translations (Line2 — pixel-accurate line width)
        const flat = [];
        for (const m of motors) {
            const t = m.getTranslator();
            flat.push(t.x(), t.y(), t.z());
        }
        const geom = new LineGeometry();
        geom.setPositions(flat);
        this._lineMat = new LineMaterial({ color, linewidth: lineWidth });
        this._lineMat.resolution.set(window.innerWidth, window.innerHeight);
        _trajLineMaterials.add(this._lineMat);
        this._line = new Line2(geom, this._lineMat);
        this._line.computeLineDistances();
        this.object3D.add(this._line);

        // optional frame triads
        this._frames = new THREE.Group();
        this._frames.visible = frames;
        if (frames) this._buildFrames();
        this.object3D.add(this._frames);

        // moving marker (sphere)
        this._marker = null;
        if (marker) {
            const mgeom = new THREE.SphereGeometry(markerRadius, 16, 16);
            this._markerMat = new THREE.MeshStandardMaterial({ color: markerColor ?? color });
            this._marker = new THREE.Mesh(mgeom, this._markerMat);
            this._marker.visible = false;
            this.object3D.add(this._marker);
        }

        this._anim = null; // { startTime, duration, loop, onSample }
    }

    setColor(hex) {
        this._color = hex;
        this._lineMat.color.set(hex);
        if (this._markerMat) this._markerMat.color.set(hex);
        // frame triads keep their RGB axis colors.
    }

    showFrames(visible) {
        this._frames.visible = visible;
        if (visible && this._frames.children.length === 0) this._buildFrames();
    }

    setMotors(motors) {
        this.motors = motors;
        const flat = [];
        for (const m of motors) {
            const t = m.getTranslator();
            flat.push(t.x(), t.y(), t.z());
        }
        this._line.geometry.setPositions(flat);
        this._line.computeLineDistances();

        // rebuild frames if currently shown
        this._frames.clear();
        if (this._frames.visible) this._buildFrames();
    }

    /**
     * Animate the marker (and optionally a robot, via onSample) along
     * the trajectory. Call viewer.onUpdate(() => traj.tick()) — or use
     * the auto-tick attached when you do viewer.add(traj).
     */
    play({ duration = 2.0, loop = false, onSample = null } = {}) {
        this._anim = {
            startTime: performance.now() / 1000,
            duration,
            loop,
            onSample,
        };
        if (this._marker) this._marker.visible = true;
    }

    pause() {
        this._anim = null;
    }

    /** Advance the animation by one frame. Safe to call when not playing. */
    tick() {
        if (!this._anim) return;
        const now = performance.now() / 1000;
        let t = (now - this._anim.startTime) / this._anim.duration;
        if (t >= 1) {
            if (this._anim.loop) {
                t = t % 1;
            } else {
                t = 1;
                this._anim = null;
            }
        }
        const { index, motor } = this._sample(t);
        if (this._marker) {
            const tr = motor.getTranslator();
            this._marker.position.set(tr.x(), tr.y(), tr.z());
        }
        if (this._anim && this._anim.onSample) {
            this._anim.onSample(index, motor, t);
        } else if (!this._anim && this._marker) {
            // final sample on non-loop completion
            const tr = motor.getTranslator();
            this._marker.position.set(tr.x(), tr.y(), tr.z());
        }
    }

    remove() {
        if (this.object3D.parent) this.object3D.parent.remove(this.object3D);
        _trajLineMaterials.delete(this._lineMat);
        this._anim = null;
    }

    /* ---------------------- internal ---------------------- */

    _buildFrames() {
        for (let i = 0; i < this.motors.length; i += this._frameStride) {
            const pose = this.motors[i].toThreeJSObject();
            const axes = new THREE.AxesHelper(this._frameSize);
            axes.position.copy(pose.position);
            axes.quaternion.copy(pose.quaternion);
            this._frames.add(axes);
        }
    }

    _sample(t) {
        const n = this.motors.length;
        if (n === 0) return { index: 0, motor: null };
        if (n === 1) return { index: 0, motor: this.motors[0] };
        const f = Math.max(0, Math.min(1, t)) * (n - 1);
        const i = Math.floor(f);
        // For a "good-enough" continuous marker, return the nearest motor.
        // (Full motor interpolation would need gafrojs.Motor.exp on the screw axis;
        // the polyline visualization already conveys the path.)
        return { index: i, motor: this.motors[Math.min(i, n - 1)] };
    }
}
