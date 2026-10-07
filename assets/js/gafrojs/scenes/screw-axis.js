import * as THREE from 'three';
import { cga } from '../runtime/api.js?v=42';
import { drawPolyline, drawSegment, drawVectorField, motorAxes, motorLocal, placeMotor, sampleCurve } from '../runtime/draw.js?v=42';
import { enableDragging, handleMesh } from '../runtime/interact.js?v=42';
import { clear, toggles } from '../runtime/ui.js?v=42';
import { C, overlay, loop } from '../runtime/scene.js?v=42';

/**
 * 3.4 — recovering the screw from a motion. Drag either pose: the axis is
 * *computed* from log(~M₀ M₁), never averaged from the endpoints.
 */
export function build(g, viewer, { controls }) {
    let opt;
    viewer.look([1.9, 1.7, 1.35], [0, 0, 0.3]);
    const A = cga(g);
    const start = handleMesh([-0.45, -0.2, 0.15], { color: C.point, mode: 'camera', onMove: rebuild });
    const goal = handleMesh([0.5, 0.35, 0.7], { color: C.ga, mode: 'camera', onMove: rebuild });
    viewer.add(start); viewer.add(goal);
    const drag = enableDragging(viewer);

    const moving = motorAxes(A.Motor.Unit(), 0.17);
    viewer.add(moving);
    const axis = drawSegment([0, 0, 0], [0, 0, 1], { color: C.classical });
    viewer.add(axis);
    const ghosts = [0.14, 0, -0.14].map((z) => {
        const line = drawPolyline([], { color: z === 0 ? C.covector : C.ga, opacity: z === 0 ? 1 : 0.65 });
        viewer.add(line);
        return { z, line };
    });
    const field = drawVectorField((x, y, z) => {
        const w = twist().w;
        const vlin = twist().v;
        const vel = vlin.clone().add(w.clone().cross(new THREE.Vector3(x, y, z)));
        return [vel.x, vel.y, vel.z];
    }, { nx: 6, ny: 6, zs: [-0.2, 0.2, 0.6], scale: 0.12 });
    viewer.add(field);
    let axisEnd = new THREE.Vector3();

    const ov = overlay(viewer);
    ov.title('Recovering the screw', 'log of the relative motor')
      .legend([[C.classical, 'screw axis'], [C.covector, 'the body path'], [C.ga, 'neighbouring points'], [C.point, 'drag a pose']])
      .formula('$\\log(\\rev{\\Motor}_0\\Motor_1)$ = a line + a pitch');
    const readPitch = ov.readout('pitch ');
    const readAngle = ov.readout('angle ');
    ov.tag(() => start.position, '$\\Motor_0$', { color: C.point });
    ov.tag(() => goal.position, '$\\Motor_1$', { color: C.ga });
    ov.tag(() => axisEnd, 'ℓ', { color: C.classical, dy: -15 });

    function motors() {
        const q = Math.sin(Math.PI / 4);
        return {
            M0: A.Motor.fromPositionQuaternion(start.position.x, start.position.y, start.position.z, 1, 0, 0, 0),
            M1: A.Motor.fromPositionQuaternion(goal.position.x, goal.position.y, goal.position.z, Math.cos(Math.PI / 4), q, 0, 0),
        };
    }

    function twist() {
        const { M0, M1 } = motors();
        const arr = Array.from(M0.inverse().multiply(M1).getLog());
        return {
            w: new THREE.Vector3(arr[0] || 0, arr[1] || 0, arr[2] || 0),
            v: new THREE.Vector3(arr[3] || 0, arr[4] || 0, arr[5] || 0),
        };
    }

    function rebuild() {
        const { M0, M1 } = motors();
        const { w, v } = twist();
        const p0 = M0.toThreeJSObject().position;
        const wn = w.length();
        const dir = wn > 1e-6 ? w.clone().divideScalar(wn) : new THREE.Vector3(0, 0, 1);
        axis.update(p0.clone().addScaledVector(dir, -0.95), p0.clone().addScaledVector(dir, 0.95));
        axisEnd = p0.clone().addScaledVector(dir, 0.95);
        ghosts.forEach((gho) => {
            gho.line.update(sampleCurve((u) => motorLocal(A.Motor.interpolateLeft(M0, M1, u), [0.18, 0, gho.z]), 72));
        });
        field.rebuild();
        const h = wn > 1e-6 ? v.dot(dir) / wn : Infinity;
        readPitch.set((Number.isFinite(h) ? h.toFixed(3) : '∞').toString().padStart(7));
        readAngle.set((wn * 180 / Math.PI).toFixed(1).padStart(7) + '°');
        ov.caption(Math.abs(h) < 0.02
            ? 'pitch ≈ 0 — a pure rotation: nothing slides along the axis'
            : 'the neighbouring points trace helices about the same line; sampling this into poses is what loses the pitch');
        applyVis();
    }

    function applyVis() {
        if (!opt) return;
        axis.object3D.visible = opt.axis;
        ghosts.forEach((gho) => { gho.line.object3D.visible = opt.path; });
        moving.visible = opt.frame;
        field.object3D.visible = opt.field;
    }

    clear(controls);
    opt = toggles(controls, {
        play: ['play', true],
        path: ['paths', true],
        axis: ['axis', true],
        frame: ['frame', true],
        field: ['field', false],
    }, (s) => { anim.toggle(s.play); applyVis(); });

    // presenting wants motion; the slider is there when you want to stop and poke
    const anim = loop(viewer, 12, (p) => {
        const a = p * Math.PI * 2;
        goal.position.set(0.5 + 0.2 * Math.cos(a), 0.35 + 0.22 * Math.sin(a), 0.7 + 0.14 * Math.sin(a * 2));
        rebuild();
        const { M0, M1 } = motors();
        placeMotor(moving, A.Motor.interpolateLeft(M0, M1, (p * 3) % 1));
    });
    rebuild();
    anim.onPlayChange = (on) => opt.set('play', on);

    return { dispose() { anim.dispose(); ov.dispose(); drag.dispose(); } };
}
