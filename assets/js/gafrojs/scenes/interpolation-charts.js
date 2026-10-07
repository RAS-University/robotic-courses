import * as THREE from 'three';
import { cga } from '../runtime/api.js?v=42';
import { drawPoint, drawPolyline, motorAxes, motorLocal, placeMotor, sampleCurve } from '../runtime/draw.js?v=42';
import { clear, toggles } from '../runtime/ui.js?v=42';
import { C, overlay, loop } from '../runtime/scene.js?v=42';

/**
 * 4.3 — the same two poses, reached by three different charts.
 *
 * Everything here starts and ends at the same place. What differs is which
 * chart the motion is written in:
 *
 *   screw   one exponential of one bivector — a constant-pitch screw
 *   split   position lerped, orientation SLERPed — two channels, no pitch
 *   linear  the tool point on a straight line, orientation SLERPed — a LIN move
 *
 * and, orthogonally, which *sheet* of the double cover the logarithm was taken
 * on: M and -M are one rigid motion, so there is a second route that turns
 * 2*pi - theta instead of theta and arrives at exactly the same pose.
 *
 * The split and the linear move share one orientation schedule; they differ
 * only in which body point is held straight — the origin or the tool. Neither
 * holds the tool on the screw axis, which is the whole argument for the motor.
 */
export function build(g, viewer, { controls }) {
    let opt;
    viewer.look([0.95, -0.95, 0.70], [0.08, 0.05, 0.34]);
    const A = cga(g);
    const TOOL = [0.18, 0, 0];
    const TOOL_M = A.Motor.fromTranslation(TOOL[0], TOOL[1], TOOL[2]);

    // 0.35 rad about z, and 2.30 rad about a tilted axis: a big rotation with a
    // translation that is not along it, which is where the charts come apart.
    const M0 = A.Motor.fromPositionQuaternion(-0.45, -0.25, 0.10,
        0.984727, 0, 0, 0.174108);
    const M1 = A.Motor.fromPositionQuaternion(0.50, 0.35, 0.60,
        0.408487, 0.296299, 0.169314, 0.846568);
    const REL = M0.inverse().multiply(M1);              // the body relative motor

    /** Pose, as (position, quaternion) — the JS build returns the scalar FIRST. */
    function pq(M) {
        const a = M.toPositionQuaternion();
        return {
            p: new THREE.Vector3(a[0], a[1], a[2]),
            q: new THREE.Quaternion(a[4], a[5], a[6], a[3]),
        };
    }
    const fromPQ = (p, q) => A.Motor.fromPositionQuaternion(p.x, p.y, p.z, q.w, q.x, q.y, q.z);
    const toolFrame = (M) => M.multiply(TOOL_M);        // frames ride the traced point
    const tip = (M) => motorLocal(M, TOOL);

    // -- the screw axis of the relative motor, read off its quaternion --------
    const rel = pq(REL);
    const half = Math.acos(Math.min(1, Math.abs(rel.q.w)));
    const theta = 2 * half;
    const axis = new THREE.Vector3(rel.q.x, rel.q.y, rel.q.z).normalize();
    const perp = rel.p.clone().addScaledVector(axis, -rel.p.dot(axis));
    const point = perp.clone().multiplyScalar(0.5)
        .addScaledVector(new THREE.Vector3().crossVectors(axis, perp),
                         0.5 / Math.tan(theta / 2));

    /** A rotation by `a` about the relative motor's own axis line. */
    function axisTurn(a) {
        const q = new THREE.Quaternion().setFromAxisAngle(axis, a);
        const t = point.clone().sub(point.clone().applyQuaternion(q));
        return fromPQ(t, q);
    }

    // -- the three charts -----------------------------------------------------
    /** One exponential. `far` walks the other sheet: a full turn more. */
    const screw = (s, far) => {
        const M = A.Motor.interpolateLeft(M0, M1, s);
        return far ? M.multiply(axisTurn(-2 * Math.PI * s)) : M;
    };

    /** Blend the two channels apart. `flip` takes the far quaternion. */
    function blend(a, b, s, flip) {
        const qb = b.q.clone();
        if ((a.q.dot(qb) < 0) !== !!flip) qb.set(-qb.x, -qb.y, -qb.z, -qb.w);
        return { p: a.p.clone().lerp(b.p, s), q: a.q.clone().slerp(qb, s) };
    }
    const split = (s, far) => {
        const m = blend(pq(M0), pq(M1), s, far);
        return fromPQ(m.p, m.q);
    };

    /** The tool point on the straight chord, orientation turning along it. */
    const P0 = tip(M0), P1 = tip(M1);
    const linear = (s, far) => {
        const m = blend(pq(M0), pq(M1), s, far);
        const target = P0.clone().lerp(P1, s);
        const origin = target.clone().sub(new THREE.Vector3(...TOOL).applyQuaternion(m.q));
        return fromPQ(origin, m.q);
    };

    // The screw's two sides are ONE curve — conjugation commutes with a real
    // exponential — so `right` exists to be switched on and seen to coincide.
    const LANES = [
        { key: 'screw', name: 'screw — one exponential', colour: C.ga, fn: screw },
        { key: 'split', name: 'split — lerp + SLERP', colour: C.wrong, fn: split },
        { key: 'linear', name: 'linear — straight tool line', colour: C.vector, fn: linear },
    ];
    for (const lane of LANES) {
        lane.near = drawPolyline([], { color: lane.colour });
        lane.far = drawPolyline([], { color: lane.colour, opacity: 0.45 });
        lane.frame = motorAxes(A.Motor.Unit(), 0.13);
        viewer.add(lane.near); viewer.add(lane.far); viewer.add(lane.frame);
        lane.pos = new THREE.Vector3();
    }

    const axisLine = drawPolyline([], { color: C.faint, opacity: 0.9 });
    viewer.add(axisLine);
    viewer.add(drawPoint(P0, { color: C.ink, radius: 0.022 }));
    viewer.add(drawPoint(P1, { color: C.ink, radius: 0.022 }));

    const ov = overlay(viewer);
    ov.title('Three charts, two poses', 'and two sheets of the double cover')
      .legend(LANES.map((l) => [l.colour, l.name])
          .concat([[C.faint, 'the screw axis']]))
      .formula('$\\Motor(s) = \\Motor_0\\exp\\big(s\\log(\\rev{\\Motor}_0\\Motor_1)\\big)$')
      .caption('the split and the linear move turn identically — they differ only in which body point goes straight, and neither keeps the tool on the axis');
    const readTurn = ov.readout('turned ');
    const readGap = ov.readout('off axis');
    LANES.forEach((lane, i) => ov.tag(() => lane.pos, lane.key,
        { color: lane.colour, dy: 14 * i }));

    function rebuild() {
        const far = !!(opt && opt.far);
        for (const lane of LANES) {
            lane.near.update(sampleCurve((s) => tip(lane.fn(s, false)), 96));
            lane.far.update(far ? sampleCurve((s) => tip(lane.fn(s, true)), 96) : []);
        }
        // the axis lives in M0's body frame, because REL does -- carry it out
        const a = point.clone().addScaledVector(axis, -0.55);
        const b = point.clone().addScaledVector(axis, 0.55);
        axisLine.update([a, b].map((v) => motorLocal(M0, [v.x, v.y, v.z])));
        applyVis();
    }

    function applyVis() {
        if (!opt) return;
        for (const lane of LANES) {
            lane.near.object3D.visible = opt[lane.key] && opt.paths;
            lane.far.object3D.visible = opt[lane.key] && opt.paths && opt.far;
            lane.frame.visible = opt[lane.key];
        }
        axisLine.object3D.visible = opt.axis;
    }

    clear(controls);
    opt = toggles(controls, {
        play: ['play', true],
        screw: ['screw', true],
        split: ['split', true],
        linear: ['linear', true],
        far: ['other sheet', false],
        axis: ['screw axis', true],
        paths: ['paths', true],
    }, (s) => { anim.toggle(s.play); rebuild(); });

    const anim = loop(viewer, 10, (s) => {
        for (const lane of LANES) {
            const M = lane.fn(s, false);
            placeMotor(lane.frame, toolFrame(M));
            lane.pos = tip(M);
        }
        readTurn.set((s * theta * 180 / Math.PI).toFixed(1).padStart(6) + '°'
            + (opt && opt.far ? '   other sheet ' + (s * (360 - theta * 180 / Math.PI)).toFixed(1) + '°' : ''));
        const d = LANES[1].pos.distanceTo(LANES[0].pos);
        readGap.set(d.toFixed(4) + ' m   split vs screw');
    });
    rebuild();
    anim.onPlayChange = (on) => opt.set('play', on);

    return { dispose() { anim.dispose(); ov.dispose(); } };
}
