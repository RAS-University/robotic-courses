import * as THREE from 'three';
import { drawArrow, drawPolyline } from '../runtime/draw.js?v=42';
import { clear, slider } from '../runtime/ui.js?v=42';
import { C, overlay } from '../runtime/scene.js?v=42';

/**
 * 4.5 — a rigid body's velocity is one line with a pitch. Every point moves with
 * v + omega x p: a rotation about the screw axis plus a slide along it. Points on the axis
 * only slide; speed grows with distance from the axis.
 */
export function build(g, viewer, { controls }) {
    viewer.look([2.0, -1.6, 1.5], [0, 0, 0]);
    const omega = new THREE.Vector3(0, 0, 1.2);
    let pitch = 0.1;
    const q = new THREE.Vector3(0.2, -0.1, 0);
    const axis = drawPolyline([q.clone().add(new THREE.Vector3(0, 0, -0.9)), q.clone().add(new THREE.Vector3(0, 0, 0.9))], { color: C.ga });
    viewer.add(axis);
    let arrows = [];
    const ov = overlay(viewer);
    ov.title('Velocity is a line', '$v(p) = v + \\omega\\times p$')
      .legend([[C.ga, 'screw axis'], [C.vector, 'point velocities']])
      .formula('$\\abs{v(p)} = \\abs{\\omega}\\sqrt{h^2 + r^2}$')
      .caption('change the pitch: on the axis the body only slides; away from it, it also turns');
    const rH = ov.readout('pitch h ');
    function draw() {
        arrows.forEach((a) => a.remove()); arrows = [];
        const v = omega.clone().multiplyScalar(pitch).sub(omega.clone().cross(q));   // v = h w - w x q
        for (const r of [0, 0.25, 0.5, 0.75]) for (let k = 0; k < (r ? 8 : 1); k++) for (const z of [-0.5, 0, 0.5]) {
            const a = 2 * Math.PI * k / 8;
            const p = q.clone().add(new THREE.Vector3(r * Math.cos(a), r * Math.sin(a), z));
            const vel = v.clone().add(omega.clone().cross(p));
            const arr = drawArrow(p, p.clone().addScaledVector(vel, 0.18), { color: C.vector, width: 2 });
            viewer.add(arr);
            arrows.push(arr);
        }
        rH.set(`${pitch.toFixed(2)} m/rad`);
    }
    clear(controls);
    slider(controls, { min: 0, max: 0.5, step: 0.01, value: pitch, title: 'pitch' }, (h) => { pitch = h; draw(); });
    draw();
    return { dispose() { ov.dispose(); } };
}
