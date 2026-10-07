/**
 * The rounds several points span: the circle through three, the sphere
 * through four. These are what a cooperative task space controls, and the
 * scenes read them off the tips every frame.
 */
import * as THREE from 'three';
import { solve } from './robot.js?v=42';

/** The circle through three points: centre, radius, unit normal. */
export function circumcircle([a, b, c]) {
    const ab = new THREE.Vector3().subVectors(b, a);
    const ac = new THREE.Vector3().subVectors(c, a);
    const n = new THREE.Vector3().crossVectors(ab, ac);
    const n2 = n.lengthSq();
    if (n2 < 1e-12) {
        return { centre: a.clone(), radius: 0, normal: new THREE.Vector3(0, 0, 1), degenerate: true };
    }
    const term = new THREE.Vector3()
        .addScaledVector(new THREE.Vector3().crossVectors(n, ab), ac.lengthSq())
        .addScaledVector(new THREE.Vector3().crossVectors(ac, n), ab.lengthSq())
        .divideScalar(2 * n2);
    const centre = a.clone().add(term);
    return { centre, radius: centre.distanceTo(a), normal: n.normalize(), degenerate: false };
}

/** The sphere through four points: centre and radius. */
export function circumsphere([a, b, c, d]) {
    const rows = [b, c, d].map((p) => {
        const v = new THREE.Vector3().subVectors(p, a).multiplyScalar(2);
        return [v.x, v.y, v.z];
    });
    const rhs = [b, c, d].map((p) => p.lengthSq() - a.lengthSq());
    const det = rows[0][0] * (rows[1][1] * rows[2][2] - rows[1][2] * rows[2][1])
        - rows[0][1] * (rows[1][0] * rows[2][2] - rows[1][2] * rows[2][0])
        + rows[0][2] * (rows[1][0] * rows[2][1] - rows[1][1] * rows[2][0]);
    if (Math.abs(det) < 1e-9) {
        return { centre: a.clone(), radius: 0, degenerate: true };
    }
    const x = solve(rows, rhs);
    const centre = new THREE.Vector3(x[0], x[1], x[2]);
    return { centre, radius: centre.distanceTo(a), degenerate: false };
}

/** Points on the ring of radius r about c in the plane with the given normal. */
export function ring(c, r, normal, n = 72) {
    const nn = normal.clone().normalize();
    const u = Math.abs(nn.z) < 0.9 ? new THREE.Vector3(0, 0, 1) : new THREE.Vector3(1, 0, 0);
    const e1 = new THREE.Vector3().crossVectors(u, nn).normalize();
    const e2 = new THREE.Vector3().crossVectors(nn, e1);
    const pts = [];
    for (let i = 0; i <= n; i++) {
        const t = (i / n) * Math.PI * 2;
        pts.push(c.clone().addScaledVector(e1, r * Math.cos(t)).addScaledVector(e2, r * Math.sin(t)));
    }
    return pts;
}
