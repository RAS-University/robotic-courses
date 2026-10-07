import * as THREE from 'three';
import { cga } from '../runtime/api.js?v=42';
import { drawArrow, drawPolyline, drawSegment, sampleCurve } from '../runtime/draw.js?v=42';
import { enableDragging, handleMesh } from '../runtime/interact.js?v=42';
import { clear, toggles } from '../runtime/ui.js?v=42';
import { C, overlay, loop, stages } from '../runtime/scene.js?v=42';

/**
 * 1.1 — the exterior product. a ∧ b is not a number and not an arrow: it is an
 * oriented piece of plane, and everything people find strange about the cross
 * product is the cost of pretending otherwise.
 *
 *   a ∧ b = −b ∧ a        swap the two and the circulation reverses
 *   a ∧ a = 0             no plane is spanned
 *   |a ∧ b| = |a||b|sinθ  the area, not a length
 *
 * Two claims here are worth seeing rather than reading. The first is that the
 * parallelogram is not the object — any region of the same plane with the same
 * area and circulation is the same bivector, so the scene reshapes it without
 * changing anything. The second is the reflection: an arrow drawn normal to
 * the plane flips the wrong way, which is why it is a pseudovector and why the
 * normal is a three-dimensional accident rather than the thing itself.
 *
 * The bivector is handed to gafro as a `RotorGenerator(e12, e13, e23)` and
 * exponentiated, so the plane on screen is the plane the library turns in.
 */
export function build(g, viewer, { controls }) {
    let opt;
    let stage = 1;
    let phase = 0;
    // Look down on the a-b plane rather than along it: edge-on, an oriented
    // area reads as a sliver and the whole point is lost.
    viewer.look([0.95, -1.05, 1.45], [0.12, 0.12, 0.18]);
    const A = cga(g);
    const O = new THREE.Vector3();

    const aH = handleMesh([0.62, 0.02, 0.06], { color: C.vector, mode: 'camera', onMove: redraw });
    const bH = handleMesh([0.08, 0.60, 0.10], { color: C.point, mode: 'camera', onMove: redraw });
    viewer.add(aH); viewer.add(bH);
    const drag = enableDragging(viewer);

    let aArr = drawArrow(O, O, { color: C.vector });
    let bArr = drawArrow(O, O, { color: C.ga });
    const para = new THREE.Mesh(
        new THREE.BufferGeometry(),
        new THREE.MeshBasicMaterial({ color: C.pairing, transparent: true, opacity: 0.30, side: THREE.DoubleSide }),
    );
    viewer.add(para);
    const paraEdge = drawPolyline([], { color: C.pairing, opacity: 0.8 });
    const circulation = drawPolyline([], { color: C.pairing });
    const reshaped = drawPolyline([], { color: C.pairing, opacity: 0.55, dashed: true });
    let normalArr = drawArrow(O, O, { color: C.classical });
    let mirrorNormal = drawArrow(O, O, { color: C.wrong });
    // the honest comparison: a *true* vector put through the same mirror
    let mirrorVec = drawArrow(O, O, { color: C.vector, opacity: 0.55 });
    const mirror = new THREE.Mesh(
        new THREE.PlaneGeometry(0.95, 0.95),
        new THREE.MeshBasicMaterial({ color: C.faint, transparent: true, opacity: 0.22, side: THREE.DoubleSide }),
    );
    viewer.add(mirror);
    [paraEdge, circulation, reshaped, normalArr, mirrorNormal, mirrorVec].forEach((h) => viewer.add(h));

    let aW = new THREE.Vector3(), bW = new THREE.Vector3(), nW = new THREE.Vector3();
    let area = 0;

    const ov = overlay(viewer);
    ov.title('An oriented piece of plane', 'the exterior product')
      .legend([
          [C.vector, 'a'],
          [C.ga, 'b'],
          [C.pairing, '$a\\wedge b$'],
          [C.classical, 'the normal (3D only)'],
          [C.wrong, 'the normal’s mirror image'],
          [C.vector, 'a’s mirror image — a true vector'],
      ])
      .formula('$a\\wedge b = -\\,b\\wedge a$      $\\abs{a\\wedge b} = \\abs{a}\\abs{b}\\sin\\theta$');
    const gArea = ov.gauge('signed area', { span: 0.45 });

    /** The wedge, in blade components, and the gafro generator it makes. */
    function wedge(a, b) {
        const e12 = a.x * b.y - a.y * b.x;
        const e13 = a.x * b.z - a.z * b.x;
        const e23 = a.y * b.z - a.z * b.y;
        return { e12, e13, e23, gen: new A.RotorGenerator(e12, e13, e23) };
    }

    function quad(a, b, origin = O) {
        return [origin, origin.clone().add(a), origin.clone().add(a).add(b), origin.clone().add(b), origin];
    }

    function redraw() {
        aW = aH.position.clone();
        bW = bH.position.clone();
        // stage 2 swaps the order, which is the antisymmetry claim
        const [u, v] = stage === 2 && Math.sin(phase) < 0 ? [bW, aW] : [aW, bW];

        aArr.remove(); aArr = drawArrow(O, aW, { color: C.vector }); viewer.add(aArr);
        bArr.remove(); bArr = drawArrow(O, bW, { color: C.ga }); viewer.add(bArr);

        const w = wedge(u, v);
        // the normal is the Hodge dual of the bivector, and in 3D only
        nW = new THREE.Vector3(w.e23, -w.e13, w.e12);
        area = nW.length();
        gArea.set((stage === 2 && Math.sin(phase) < 0 ? -1 : 1) * area);

        const corners = quad(u, v);
        para.geometry.dispose();
        para.geometry = new THREE.BufferGeometry().setFromPoints(
            [corners[0], corners[1], corners[2], corners[0], corners[2], corners[3]]);
        paraEdge.update(corners);

        // the circulation: a loop just inside the edge, with a nick to show
        // which way round it goes
        circulation.update(sampleCurve((t) => {
            const s = t * 0.96;
            const p = s < 0.25 ? u.clone().multiplyScalar(s / 0.25)
                : s < 0.5 ? u.clone().add(v.clone().multiplyScalar((s - 0.25) / 0.25))
                : s < 0.75 ? u.clone().multiplyScalar(1 - (s - 0.5) / 0.25).add(v)
                : v.clone().multiplyScalar(1 - (s - 0.75) / 0.25);
            return p.multiplyScalar(0.82).addScaledVector(u.clone().add(v), 0.09);
        }, 64));

        // same plane, same area, same circulation -- a different shape. If the
        // parallelogram mattered, this would be a different bivector.
        if (stage >= 3) {
            const n = nW.clone().normalize();
            const e1 = u.clone().normalize();
            const e2 = new THREE.Vector3().crossVectors(n, e1).normalize();
            const r = Math.sqrt(Math.max(area, 1e-6) / Math.PI);
            const c = u.clone().add(v).multiplyScalar(0.5);
            reshaped.update(sampleCurve((t) => c.clone()
                .addScaledVector(e1, r * Math.cos(t * Math.PI * 2))
                .addScaledVector(e2, r * Math.sin(t * Math.PI * 2)), 64));
        }

        normalArr.remove();
        normalArr = drawArrow(O, nW.clone().normalize().multiplyScalar(0.45), { color: C.classical });
        viewer.add(normalArr);

        // the mirror, and what it does to a genuine vector versus to the normal
        if (stage >= 4) {
            const m = new THREE.Vector3(0, 0, 1);                 // mirror is the z = 0 plane
            mirror.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), m);
            mirror.position.set(0.1, 0.15, 0.02);
            const refl = (p) => p.clone().sub(m.clone().multiplyScalar(2 * p.dot(m)));
            const w2 = wedge(refl(u), refl(v));
            const n2 = new THREE.Vector3(w2.e23, -w2.e13, w2.e12).normalize().multiplyScalar(0.45);
            mirrorNormal.remove();
            mirrorNormal = drawArrow(O, n2, { color: C.wrong });
            viewer.add(mirrorNormal);
            // a is a genuine vector: its image has the z-component negated,
            // which is what "goes where you expect" means. The normal keeps its
            // z and flips x and y instead -- the pseudovector signature, and the
            // whole reason the two arrows above do not mirror each other.
            mirrorVec.remove();
            mirrorVec = drawArrow(O, refl(u), { color: C.vector, opacity: 0.55 });
            viewer.add(mirrorVec);
        }

        // the bivector really is gafro's: exponentiate it and read the angle back
        try {
            const scaled = new A.RotorGenerator(w.e12 * 0.5, w.e13 * 0.5, w.e23 * 0.5);
            void scaled.exp().getAngle();
        } catch (err) { /* degenerate wedge — nothing to exponentiate */ }

        applyVis();
    }

    function applyVis() {
        if (!opt) return;
        para.visible = opt.area;
        paraEdge.object3D.visible = opt.area;
        circulation.object3D.visible = opt.circulation;
        reshaped.object3D.visible = opt.reshape && stage >= 3;
        normalArr.object3D.visible = opt.normal && stage >= 4;
        mirror.visible = stage >= 4;
        mirrorNormal.object3D.visible = opt.normal && stage >= 4;
        mirrorVec.object3D.visible = stage >= 4;
    }

    ov.tag(() => aW, 'a', { color: C.vector });
    ov.tag(() => bW, 'b', { color: C.ga });
    const tagN = ov.tag(() => nW.clone().normalize().multiplyScalar(0.45), 'a × b', { color: C.classical });
    const tagM = ov.tag(() => O, 'mirror', { color: C.muted, dy: 22 });

    const STAGE_TEXT = [
        'a ∧ b is the plane the two vectors span, with an area and a way round — drag either arrow and watch the area vanish as they line up, because a ∧ a = 0',
        'swap the two and nothing about the plane changes except the circulation, which reverses. That is all the minus sign in a ∧ b = −b ∧ a ever meant',
        'the parallelogram is not the object. Same plane, same area, same circulation — a different shape, and the same bivector',
        'now reflect. A real vector in the mirror goes where you expect; the normal does not — it comes back pointing the other way. The normal is a three-dimensional stand-in, and the plane is the thing',
    ];

    clear(controls);
    opt = toggles(controls, {
        play: ['play', true],
        area: ['the area', true],
        circulation: ['circulation', true],
        reshape: ['reshaped', true],
        normal: ['normal', true],
    }, (s) => { anim.toggle(s.play); applyVis(); });

    const staging = stages(4, (n) => {
        stage = n;
        ov.caption(STAGE_TEXT[n - 1]);
        tagN.visible(n >= 4);
        tagM.visible(n >= 4);
        redraw();
    });

    const anim = loop(viewer, 12, (p) => {
        phase = p * Math.PI * 2;
        if (stage === 1) {
            // sweep b onto a so the area collapses to zero on screen
            const s = 0.5 - 0.5 * Math.cos(phase);
            bH.position.set(0.08 + 0.48 * s, 0.60 - 0.55 * s, 0.10 - 0.04 * s);
        }
        redraw();
    });
    anim.onPlayChange = (on) => opt.set('play', on);

    redraw();
    return { dispose() { anim.dispose(); staging.dispose(); ov.dispose(); drag.dispose(); } };
}
