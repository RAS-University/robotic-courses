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

import { Viewer } from './viewer.js';
import {
    drawCircle,
    drawLine,
    drawMotor,
    drawPlane,
    drawPoint,
    drawPointPair,
    drawSphere,
    drawVector,
} from './primitives.js';
import { RobotVisual } from './robot.js';
import { MotorTrajectory } from './trajectory.js';

/**
 * Scene helper matching Python ``gafro.visualization.Visualizer``: a Viewer
 * plus addPoint / addRobot / … methods that draw CGA objects.
 */
export class Visualizer extends Viewer {
    addPoint(point, opts = {}) {
        return this.add(drawPoint(point, opts));
    }

    addVector(vector, opts = {}) {
        return this.add(drawVector(vector, opts));
    }

    addLine(line, opts = {}) {
        return this.add(drawLine(line, opts));
    }

    addPlane(plane, opts = {}) {
        return this.add(drawPlane(plane, opts));
    }

    addSphere(sphere, opts = {}) {
        return this.add(drawSphere(sphere, opts));
    }

    addCircle(circle, opts = {}) {
        return this.add(drawCircle(circle, opts));
    }

    addPointPair(pointPair, opts = {}) {
        return this.add(drawPointPair(pointPair, opts));
    }

    addMotor(motor, opts = {}) {
        return this.add(drawMotor(motor, opts));
    }

    addAxes(opts = {}) {
        const { size = 0.2 } = opts;
        return this.add(new THREE.AxesHelper(size));
    }

    /**
     * @param {object} system gafro.robot.System
     * @param {Array<number>|object} jointPosition
     * @param {object} [opts]
     */
    async addRobot(system, jointPosition, opts = {}) {
        const visual = new RobotVisual(system, jointPosition, this.scene, opts);
        await visual.load();
        this.onUpdate(() => visual.update());
        return visual;
    }

    addTrajectory(motors, opts = {}) {
        const traj = new MotorTrajectory(motors, opts);
        this.add(traj);
        this.onUpdate(() => traj.tick());
        return traj;
    }
}
