import * as THREE from 'three';
import { drawPoint, drawPolyline, drawSegment, drawVectorField, sampleCurve } from '../runtime/draw.js?v=42';
import { enableDragging, handleMesh } from '../runtime/interact.js?v=42';
import { clear, toggles } from '../runtime/ui.js?v=42';
import { C, overlay, loop } from '../runtime/scene.js?v=42';

function reflect(p, origin, n) {
    const d = (p.x - origin.x) * n.x + (p.y - origin.y) * n.y;
    return new THREE.Vector3(p.x - 2 * d * n.x, p.y - 2 * d * n.y, 0);
}

/** 1.3 — compose two arbitrary mirrors; the product is a rotation, or a translation when they are parallel. */
export function build(g, viewer, { controls }) {
    let opt;
    viewer.setPlanar();
    viewer.showAxes(false);

    const p0 = drawPoint([0.7, 0.25, 0], { color: C.faint, radius: 0.045 });
    const p1 = drawPoint([0, 0, 0], { color: C.classical, radius: 0.042 });
    const p2 = drawPoint([0, 0, 0], { color: C.covector, radius: 0.048 });
    const m1 = drawSegment([-1.4, 0, 0], [1.4, 0, 0], { color: C.faint });
    const m2 = drawSegment([-1.4, 0, 0], [1.4, 0, 0], { color: C.ga });
    const hop1 = drawSegment([0, 0, 0], [0, 0, 0], { color: C.faint });
    const hop2 = drawSegment([0, 0, 0], [0, 0, 0], { color: C.faint });
    const orbit = drawPolyline([], { color: C.covector });
    const pivot = drawPoint([0, 0, 0], { color: C.classical, radius: 0.035 });
    [p0, p1, p2, m1, m2, hop1, hop2, orbit, pivot].forEach((h) => viewer.add(h));

    let P = new THREE.Vector3(), Q = new THREE.Vector3(), R = new THREE.Vector3();
    let centre = new THREE.Vector3();
    let parallel = false;

    const src = handleMesh([0.7, 0.25, 0], { color: C.point, onMove: redraw });
    const a = handleMesh([0, 0.9, 0], { color: C.faint, onMove: redraw });
    const b = handleMesh([0.55, 0.7, 0], { color: C.ga, onMove: redraw });
    [src, a, b].forEach((h) => viewer.add(h));
    const drag = enableDragging(viewer);

    const field = drawVectorField((x, y) => {
        const n1 = a.position.clone().setZ(0).normalize();
        const n2 = b.position.clone().setZ(0).normalize();
        const th = Math.atan2(n1.x * n2.y - n1.y * n2.x, n1.x * n2.x + n1.y * n2.y);
        return [-2 * th * y, 2 * th * x, 0];
    }, { nx: 8, ny: 8, scale: 0.12 });
    viewer.add(field);

    const ov = overlay(viewer);
    ov.title('Composing two mirrors', 'every rigid motion is at most n reflections')
      .legend([[C.faint, 'x and mirror 1'], [C.classical, 'halfway'], [C.covector, 'image'], [C.ga, 'mirror 2']])
      .formula('$V = n_2 n_1$   ·   an even versor')
      .caption('drag the grey and green handles: the mirrors move, the composite depends only on their relation');
    const readAngle = ov.readout('rotation ');
    const readKind = ov.readout('composite');
    const readParity = ov.readout('parity   ');
    readParity.set('even (2 reflections) — a rotor, with a logarithm');
    ov.tag(() => P, 'x', { color: C.muted });
    ov.tag(() => Q, 'halfway', { color: C.classical });
    ov.tag(() => R, '$V x V^{-1}$', { color: C.covector });
    const tagPivot = ov.tag(() => centre, 'fixed point', { color: C.classical, dy: 12 });

    function redraw() {
        const n1 = a.position.clone().setZ(0).normalize();
        const n2 = b.position.clone().setZ(0).normalize();
        const d1 = new THREE.Vector3(-n1.y, n1.x, 0);
        const d2 = new THREE.Vector3(-n2.y, n2.x, 0);
        m1.update(d1.clone().multiplyScalar(-1.5), d1.clone().multiplyScalar(1.5));
        m2.update(
            b.position.clone().addScaledVector(d2, -1.5),
            b.position.clone().addScaledVector(d2, 1.5),
        );
        P = src.position.clone(); P.z = 0;
        p0.update(P);
        Q = reflect(P, new THREE.Vector3(), n1);
        R = reflect(Q, b.position, n2);
        p1.update(Q); p2.update(R);
        hop1.update(P, Q); hop2.update(Q, R);

        const cross = n1.x * n2.y - n1.y * n2.x;
        const dot = n1.x * n2.x + n1.y * n2.y;
        const th = 2 * Math.atan2(cross, dot);
        parallel = Math.abs(cross) < 0.02;

        // the fixed point: where the two mirror lines cross
        if (!parallel) {
            const c1 = 0;                                   // mirror 1 passes through the origin
            const c2 = n2.x * b.position.x + n2.y * b.position.y;
            const det = n1.x * n2.y - n1.y * n2.x;
            centre.set((c1 * n2.y - c2 * n1.y) / det, (n1.x * c2 - n2.x * c1) / det, 0);
            pivot.update(centre);
            const rad = P.clone().sub(centre).length();
            const a0 = Math.atan2(P.y - centre.y, P.x - centre.x);
            orbit.update(sampleCurve((u) => new THREE.Vector3(
                centre.x + rad * Math.cos(a0 + u * th),
                centre.y + rad * Math.sin(a0 + u * th), 0), 48));
            readAngle.set((th * 180 / Math.PI).toFixed(1).padStart(7) + '°');
            readKind.set('a rotation about the mirrors’ intersection');
        } else {
            orbit.update([P.clone(), R.clone()]);
            readAngle.set('     0°');
            readKind.set('a translation — the mirrors never meet');
        }
        field.rebuild();
        applyVis();
    }

    function applyVis() {
        if (!opt) return;
        p1.object3D.visible = opt.mid;
        hop1.object3D.visible = opt.mid;
        hop2.object3D.visible = opt.mid;
        m1.object3D.visible = opt.mirrors;
        m2.object3D.visible = opt.mirrors;
        orbit.object3D.visible = opt.path;
        field.object3D.visible = opt.field;
        pivot.object3D.visible = opt.path && !parallel;
        tagPivot.visible(opt.path && !parallel);
    }

    clear(controls);
    opt = toggles(controls, {
        play: ['play', true],
        mirrors: ['mirrors', true],
        mid: ['halfway', true],
        path: ['path', true],
        field: ['field', false],
    }, (s) => { anim.toggle(s.play); applyVis(); });

    // presenting wants motion; the slider is there when you want to stop and poke
    const anim = loop(viewer, 12, (p) => {
        const th = 0.9 + 0.85 * Math.sin(p * Math.PI * 2);
        b.position.set(0.78 * Math.cos(th), 0.78 * Math.sin(th), 0);
        redraw();
    });
    redraw();
    anim.onPlayChange = (on) => opt.set('play', on);

    return { dispose() { anim.dispose(); ov.dispose(); drag.dispose(); } };
}
