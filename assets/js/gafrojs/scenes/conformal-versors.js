import * as THREE from 'three';
import { cga } from '../runtime/api.js?v=42';
import { drawPolyline, drawSegment, sampleCurve } from '../runtime/draw.js?v=42';
import { clear, toggles } from '../runtime/ui.js?v=42';
import { C, overlay, loop, stages } from '../runtime/scene.js?v=42';

/**
 * 3.14 — the conformal group as versors. The claim this scene exists to make is
 * that nothing changes when you leave the rigid motions behind: the *operation*
 * is still one sandwich,
 *
 *     X ↦ V X ~V
 *
 * and only the versor V is different. A motor turns and slides; a dilator
 * scales; a transversion is the one that bends. All of them carry a CGA object
 * to a CGA object of the same kind, and all of them preserve angles — which is
 * what "conformal" means and is the only property shared by the whole group.
 *
 * Every versor here is gafro's, applied through gafro (`Dilator::applyToSphere`
 * and friends); nothing is re-derived in JS. Two honest limits are drawn rather
 * than hidden:
 *
 *   - a dilation is a similarity, so it takes lines to lines and planes to
 *     planes;
 *   - a transversion is not, so it takes a line to a *circle*. The scene shows
 *     that bend by sampling points along the line and transforming each one,
 *     because there is no `Transversion::applyToLine` — there cannot be an
 *     honest one, a Line has no blades to hold a circle.
 */
export function build(g, viewer, { controls }) {
    let opt;
    let stage = 1;
    let t = 0;
    viewer.look([2.0, 1.7, 1.3], [0, 0, 0.1]);
    const A = cga(g);

    const sphere = drawPolyline([], { color: C.ga });
    const sphere2 = drawPolyline([], { color: C.ga, opacity: 0.55 });
    const circle = drawPolyline([], { color: C.classical });
    const lineSeg = drawSegment([0, 0, 0], [0, 0, 0], { color: C.covector });
    const bent = drawPolyline([], { color: C.covector });
    const ghostSphere = drawPolyline([], { color: C.faint, opacity: 0.7 });
    const ghostCircle = drawPolyline([], { color: C.faint, opacity: 0.7 });
    const ghostLine = drawSegment([0, 0, 0], [0, 0, 0], { color: C.faint, opacity: 0.7 });
    const rays = drawPolyline([], { color: C.pairing, opacity: 0.6 });
    [ghostSphere, ghostCircle, ghostLine, sphere, sphere2, circle, lineSeg, bent, rays]
        .forEach((h) => viewer.add(h));

    let tagAt = new THREE.Vector3();
    let angleNow = 90;

    const ov = overlay(viewer);
    ov.title('One sandwich, four versors', 'the conformal group')
      .legend([
          [C.faint, 'before'],
          [C.ga, 'a sphere'],
          [C.classical, 'a circle'],
          [C.covector, 'a line — and what becomes of it'],
          [C.pairing, 'the angle being preserved'],
      ])
      .formula('$X \\mapsto V X \\rev{V}$');
    const gAngle = ov.gauge('angle between two curves, minus 90°', { span: 30 });

    const V = (p) => new THREE.Vector3(p.x(), p.y(), p.z());

    /** The versor for this stage. */
    function versor() {
        const s = 0.5 - 0.5 * Math.cos(t * Math.PI * 2);
        if (stage === 1) {
            const R = A.Rotor.fromAngleAxis(1.2 * s, 0.1, 0.2, 0.97);
            return { kind: 'motor', v: A.Motor.fromTranslationRotor(0.35 * s, 0.1 * s, 0, R) };
        }
        if (stage === 2) return { kind: 'dilator', v: new A.Dilator(1 + 1.1 * s) };
        if (stage === 3) return { kind: 'transversion', v: A.Transversion.exp(0.55 * s, 0.12 * s, 0) };
        return { kind: 'homothety', v: new A.Homothety(new A.Translator(0.3 * s, 0.1 * s, 0),
                                                       new A.Dilator(1 + 0.8 * s)) };
    }

    /** Sample a sphere as three orthogonal great circles, so it reads in 3D. */
    function sphereCurves(centre, r) {
        const out = [];
        for (const [a, b] of [[0, 1], [0, 2], [1, 2]]) {
            out.push(sampleCurve((u) => {
                const th = u * Math.PI * 2;
                const p = [centre.x, centre.y, centre.z];
                p[a] += r * Math.cos(th); p[b] += r * Math.sin(th);
                return new THREE.Vector3(...p);
            }, 48));
            out.push([new THREE.Vector3(NaN, NaN, NaN)]);
        }
        return out.flat().filter((p) => Number.isFinite(p.x));
    }

    const S0 = { c: new THREE.Vector3(0.25, 0.1, 0.30), r: 0.26 };
    const C0 = [[-0.30, 0.34, 0.05], [0.10, 0.52, 0.05], [-0.30, 0.34, 0.45]];
    const L0 = [[-0.55, -0.35, 0.12], [0.55, -0.35, 0.12]];

    function redraw() {
        const { kind, v } = versor();

        ghostSphere.update(sphereCurves(S0.c, S0.r));
        const gc = new A.Circle(new A.Point(...C0[0]), new A.Point(...C0[1]), new A.Point(...C0[2]));
        ghostCircle.update(circleCurve(gc));
        ghostLine.update(new THREE.Vector3(...L0[0]), new THREE.Vector3(...L0[1]));

        // --- the sphere, through gafro -----------------------------------
        const S = new A.Sphere(new A.Point(S0.c.x, S0.c.y, S0.c.z), S0.r);
        const S1 = v.applyToSphere(S);
        sphere.update(sphereCurves(V(S1.getCenter()), S1.getRadius()));
        sphere2.update([]);

        // --- the circle ----------------------------------------------------
        const Cc = new A.Circle(new A.Point(...C0[0]), new A.Point(...C0[1]), new A.Point(...C0[2]));
        circle.update(circleCurve(v.applyToCircle(Cc)));

        // --- the line, and the honest limit --------------------------------
        if (kind === 'transversion') {
            // no applyToLine exists, and should not: sample the line and carry
            // each point across, so the bend is drawn from the same sandwich
            lineSeg.update(new THREE.Vector3(), new THREE.Vector3());
            bent.update(sampleCurve((u) => {
                const x = L0[0][0] + u * (L0[1][0] - L0[0][0]);
                return V(v.applyToPoint(new A.Point(x, L0[0][1], L0[0][2])));
            }, 80));
        } else {
            const L = new A.Line(new A.Point(...L0[0]), new A.Point(...L0[1]));
            const L1 = v.applyToLine(L);
            const d = V(L1.getDirection());
            const mid = V(L1.project(new A.Point(0, 0, 0)));
            lineSeg.update(mid.clone().addScaledVector(d, -0.75), mid.clone().addScaledVector(d, 0.75));
            bent.update([]);
        }

        // --- the angle the whole group preserves ----------------------------
        // two curves crossing at a point: carry the point and two neighbours,
        // and measure the angle after the fact rather than asserting it
        const o = new A.Point(0.05, 0.0, 0.18);
        const e = 0.012;
        const pa = new A.Point(0.05 + e, 0.0, 0.18);
        const pb = new A.Point(0.05, 0.0 + e, 0.18);
        const O = V(v.applyToPoint(o));
        const Aa = V(v.applyToPoint(pa)).sub(O);
        const Bb = V(v.applyToPoint(pb)).sub(O);
        angleNow = Math.acos(Math.max(-1, Math.min(1, Aa.normalize().dot(Bb.normalize())))) * 180 / Math.PI;
        gAngle.set(angleNow - 90);
        tagAt = O;
        rays.update([O.clone().addScaledVector(Aa, 0.22), O, O.clone().addScaledVector(Bb, 0.22)]);

        applyVis();
    }

    function circleCurve(c) {
        const centre = V(c.getCenter());
        const n = V(c.getNormal()).normalize();
        const r = c.getRadius();
        const up = Math.abs(n.z) < 0.9 ? new THREE.Vector3(0, 0, 1) : new THREE.Vector3(1, 0, 0);
        const e1 = new THREE.Vector3().crossVectors(up, n).normalize();
        const e2 = new THREE.Vector3().crossVectors(n, e1);
        return sampleCurve((u) => centre.clone()
            .addScaledVector(e1, r * Math.cos(u * Math.PI * 2))
            .addScaledVector(e2, r * Math.sin(u * Math.PI * 2)), 64);
    }

    function applyVis() {
        if (!opt) return;
        const ghosts = opt.before;
        ghostSphere.object3D.visible = ghosts;
        ghostCircle.object3D.visible = ghosts;
        ghostLine.object3D.visible = ghosts;
        sphere.object3D.visible = opt.sphere;
        circle.object3D.visible = opt.circle;
        lineSeg.object3D.visible = opt.line;
        bent.object3D.visible = opt.line;
        rays.object3D.visible = opt.angle;
    }

    ov.tag(() => tagAt, '90°', { color: C.pairing });

    const STAGE_TEXT = [
        'a motor: the sandwich you already know. Sizes are untouched, because a rigid versor is an isometry',
        'a dilator — the same sandwich, a different versor. Now the sphere and the circle change size, the line stays a line, and the angle does not move at all',
        'a transversion: still one sandwich, but no longer a similarity. It bends the line into a circle, which is why there is no applyToLine to call — a Line has no blades to hold a circle, so the curve here is the line’s points carried across one at a time',
        'and they compose: a homothety is a translator times a dilator. Every versor on this slide is an element of the same group, and the angle gauge has not moved once',
    ];

    clear(controls);
    opt = toggles(controls, {
        play: ['play', true],
        before: ['before', true],
        sphere: ['sphere', true],
        circle: ['circle', true],
        line: ['line', true],
        angle: ['the angle', true],
    }, (s) => { anim.toggle(s.play); applyVis(); });

    const staging = stages(4, (n) => {
        stage = n;
        ov.caption(STAGE_TEXT[n - 1]);
        redraw();
    });

    const anim = loop(viewer, 11, (p) => { t = p; redraw(); });
    anim.onPlayChange = (on) => opt.set('play', on);

    redraw();
    return { dispose() { anim.dispose(); staging.dispose(); ov.dispose(); } };
}
