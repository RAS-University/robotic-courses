import * as THREE from 'three';
import { cga } from '../runtime/api.js?v=42';
import { drawPolyline, motorAxes, motorFromHandle, motorLocal, placeMotor, sampleCurve } from '../runtime/draw.js?v=42';
import { enableDragging, handleMesh } from '../runtime/interact.js?v=42';
import { clear, toggles } from '../runtime/ui.js?v=42';
import { C, overlay, loop } from '../runtime/scene.js?v=42';

/**
 * 4.3 — screw interpolation against the decoupled blend.
 * The motor path is one exponential; interpolating position and orientation on
 * separate channels throws the pitch away and the tip spirals off the axis.
 */
export function build(g, viewer, { controls }) {
    let opt;
    viewer.look([0.9, 0.85, 0.8], [0, 0, 0.3]);
    const A = cga(g);
    const start = handleMesh([-0.45, -0.25, 0.1], { color: C.point, mode: 'camera', onMove: rebuild });
    const goal = handleMesh([0.5, 0.35, 0.6], { color: C.ga, mode: 'camera', onMove: rebuild });
    viewer.add(start); viewer.add(goal);
    const drag = enableDragging(viewer);

    const screw = motorAxes(A.Motor.Unit(), 0.18);
    const naive = motorAxes(A.Motor.Unit(), 0.15);
    viewer.add(screw); viewer.add(naive);
    const tS = drawPolyline([], { color: C.ga });
    const tN = drawPolyline([], { color: C.wrong });
    const gap = drawPolyline([], { color: C.wrong, opacity: 0.55 });
    viewer.add(tS); viewer.add(tN); viewer.add(gap);
    let pScrew = new THREE.Vector3(), pNaive = new THREE.Vector3();

    const ov = overlay(viewer);
    ov.title('Screw interpolation', 'one exponential, not two channels')
      .legend([[C.ga, '$\\Motor_0\\exp(s\\log(\\rev{\\Motor}_0\\Motor_1))$'], [C.wrong, 'lerp position + slerp orientation'], [C.point, 'drag the endpoints']])
      .formula('$\\Motor(s) = \\Motor_0\\exp\\big(s\\log(\\rev{\\Motor}_0\\Motor_1)\\big)$')
      .caption('the decoupled blend reaches the same endpoints by a different path — on a bolt, that is the tip leaving the axis');
    const readGap = ov.readout('separation ');
    ov.tag(() => pScrew, 'screw', { color: C.ga });
    ov.tag(() => pNaive, 'decoupled', { color: C.wrong, dy: 14 });

    function motors() {
        return { M0: motorFromHandle(A, start, 0, 0.15), M1: motorFromHandle(A, goal, 1.6, 0.6) };
    }

    /** position lerp + quaternion slerp — the channel-wise blend. */
    function decoupled(M0, M1, u) {
        const a = M0.toPositionQuaternion();
        const b = M1.toPositionQuaternion();
        const pa = new THREE.Vector3(a[0], a[1], a[2]);
        const pb = new THREE.Vector3(b[0], b[1], b[2]);
        const qa = new THREE.Quaternion(a[4], a[5], a[6], a[3]);
        const qb = new THREE.Quaternion(b[4], b[5], b[6], b[3]);
        const p = pa.clone().lerp(pb, u);
        const q = qa.clone().slerp(qb, u);
        return A.Motor.fromPositionQuaternion(p.x, p.y, p.z, q.w, q.x, q.y, q.z);
    }

    function rebuild() {
        const { M0, M1 } = motors();
        tS.update(sampleCurve((u) => motorLocal(A.Motor.interpolateLeft(M0, M1, u), [0.2, 0, 0]), 80));
        tN.update(sampleCurve((u) => motorLocal(decoupled(M0, M1, u), [0.2, 0, 0]), 80));
        const rungs = [];
        for (let i = 0; i <= 12; i++) {
            const u = i / 12;
            rungs.push(motorLocal(A.Motor.interpolateLeft(M0, M1, u), [0.2, 0, 0]));
            rungs.push(motorLocal(decoupled(M0, M1, u), [0.2, 0, 0]));
        }
        gap.update(rungs);
        applyVis();
    }

    function applyVis() {
        if (!opt) return;
        screw.visible = opt.screw; tS.object3D.visible = opt.screw;
        naive.visible = opt.naive; tN.object3D.visible = opt.naive;
        gap.object3D.visible = opt.screw && opt.naive && opt.gap;
    }

    clear(controls);
    opt = toggles(controls, {
        play: ['play', true],
        screw: ['screw', true],
        naive: ['decoupled', true],
        gap: ['gap', true],
    }, (s) => { anim.toggle(s.play); applyVis(); });

    // presenting wants motion; the slider is there when you want to stop and poke
    const anim = loop(viewer, 9, (p) => {
        const { M0, M1 } = motors();
        const Ms = A.Motor.interpolateLeft(M0, M1, p);
        const Mn = decoupled(M0, M1, p);
        placeMotor(screw, Ms);
        placeMotor(naive, Mn);
        pScrew = motorLocal(Ms, [0.2, 0, 0]);
        pNaive = motorLocal(Mn, [0.2, 0, 0]);
        readGap.set(pScrew.distanceTo(pNaive).toFixed(4).padStart(8));
    });
    rebuild();
    anim.onPlayChange = (on) => opt.set('play', on);

    return { dispose() { anim.dispose(); ov.dispose(); drag.dispose(); } };
}
