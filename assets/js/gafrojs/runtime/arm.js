import * as THREE from 'three';
import { cga } from './api.js?v=42';
import { drawFrame2D, motorAxes, placeMotor } from './draw.js?v=42';

/** Product-of-exponentials 3R planar arm in the xy-plane, z up. */

export function serial3R(g, lengths = [0.38, 0.32, 0.22]) {
    const A = cga(g);
    const n = lengths.length;

    function fk(q) {
        let M = A.Motor.Unit();
        const frames = [M];
        for (let i = 0; i < n; i++) {
            const R = A.Rotor.fromAngleAxis(q[i], 0, 0, 1);
            M = M.multiply(new A.Motor(R, A.Translator.Unit()));
            M = M.multiply(A.Motor.fromTranslation(lengths[i], 0, 0));
            frames.push(M);
        }
        return frames;
    }

    function ee(q) {
        const f = fk(q);
        return f[f.length - 1];
    }

    return { n, lengths, fk, ee };
}

export function drawArm(viewer, frames, { size = 0.1, color = 0x2a2e33, opacity = 1, planar = false } = {}) {
    const group = new THREE.Group();
    const mat = new THREE.LineBasicMaterial({ color, transparent: opacity < 1, opacity });
    const jointMat = new THREE.MeshStandardMaterial({
        color: 0xd1495b, transparent: opacity < 1, opacity,
    });
    const axes = frames.map((M) => {
        const a = planar ? drawFrame2D(size) : motorAxes(M, size);
        group.add(a);
        return a;
    });
    const geom = new THREE.BufferGeometry();
    const line = new THREE.Line(geom, mat);
    group.add(line);
    const joints = frames.map(() => {
        const m = new THREE.Mesh(new THREE.SphereGeometry(0.028, 12, 10), jointMat);
        group.add(m);
        return m;
    });
    viewer.add(group);

    function update(next) {
        const pts = [];
        for (let i = 0; i < next.length; i++) {
            if (axes[i]) placeMotor(axes[i], next[i]);
            const p = next[i].toThreeJSObject().position;
            pts.push(p);
            if (joints[i]) joints[i].position.copy(p);
        }
        line.geometry.setFromPoints(pts);
    }
    update(frames);

    return {
        object3D: group,
        update,
        dispose() { viewer.remove(group); },
    };
}

export function finiteJacobian(arm, q, eps = 1e-4) {
    const M0 = arm.ee(q);
    const p0 = M0.toThreeJSObject().position;
    const J = [];
    for (let i = 0; i < arm.n; i++) {
        const qp = q.slice();
        qp[i] += eps;
        const p1 = arm.ee(qp).toThreeJSObject().position;
        J.push([(p1.x - p0.x) / eps, (p1.y - p0.y) / eps, (p1.z - p0.z) / eps]);
    }
    return { p0, J };
}

export function reach(arm) {
    return arm.lengths.reduce((s, L) => s + L, 0);
}

export function jacobianVelocity(J, qdot) {
    const v = [0, 0, 0];
    for (let i = 0; i < J.length; i++) {
        v[0] += J[i][0] * qdot[i];
        v[1] += J[i][1] * qdot[i];
        v[2] += J[i][2] * qdot[i];
    }
    return v;
}

/** Planar rigid-body velocity field of the last link. */
export function workspaceTwistField(p0, vee, omega) {
    const vx = vee.x !== undefined ? vee.x : vee[0];
    const vy = vee.y !== undefined ? vee.y : vee[1];
    return (x, y) => {
        const rx = x - p0.x;
        const ry = y - p0.y;
        return [vx - omega * ry, vy + omega * rx, 0];
    };
}

/**
 * A planar 2R arm with its own base, and closed-form IK.
 * The cooperative scenes need two arms with genuinely separate shoulders, which
 * the shared-root serial3R above cannot express.
 */
export function planar2R(base = [0, 0, 0], l1 = 0.46, l2 = 0.40) {
    const b = new THREE.Vector3(base[0], base[1], base[2] || 0);
    return {
        base: b,
        l1,
        l2,
        reach: l1 + l2,
        inner: Math.abs(l1 - l2),
        /** joint angles -> [shoulder, elbow, tip] */
        points(q) {
            const p1 = b.clone().add(new THREE.Vector3(l1 * Math.cos(q[0]), l1 * Math.sin(q[0]), 0));
            const p2 = p1.clone().add(new THREE.Vector3(
                l2 * Math.cos(q[0] + q[1]), l2 * Math.sin(q[0] + q[1]), 0));
            return [b.clone(), p1, p2];
        },
        tip(q) { return this.points(q)[2]; },
        /** analytic IK; `elbow` = +1 or -1 picks the branch. Clamps to the annulus. */
        ik(target, elbow = 1) {
            const d = new THREE.Vector3(target.x - b.x, target.y - b.y, 0);
            let r = d.length();
            const rMax = l1 + l2 - 1e-4;
            const rMin = Math.abs(l1 - l2) + 1e-4;
            r = Math.max(rMin, Math.min(rMax, r));
            const c2 = (r * r - l1 * l1 - l2 * l2) / (2 * l1 * l2);
            const q2 = elbow * Math.acos(Math.max(-1, Math.min(1, c2)));
            const q1 = Math.atan2(d.y, d.x)
                - Math.atan2(l2 * Math.sin(q2), l1 + l2 * Math.cos(q2));
            return [q1, q2];
        },
        /** true when the point is inside the annulus this arm can actually reach */
        reaches(p) {
            const r = Math.hypot(p.x - b.x, p.y - b.y);
            return r <= l1 + l2 && r >= Math.abs(l1 - l2);
        },
    };
}
