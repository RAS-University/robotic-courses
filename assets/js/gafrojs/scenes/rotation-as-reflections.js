import * as THREE from 'three';
import { drawPoint, drawPolyline, drawSegment, drawVectorField } from '../runtime/draw.js?v=42';
import { enableDragging, handleMesh } from '../runtime/interact.js?v=42';
import { clear, toggles } from '../runtime/ui.js?v=42';
import { C, overlay, loop } from '../runtime/scene.js?v=42';

const unit = (a) => new THREE.Vector3(Math.cos(a), Math.sin(a), 0);

function reflect(p, n) {
    const d = p.x * n.x + p.y * n.y;
    return new THREE.Vector3(p.x - 2 * d * n.x, p.y - 2 * d * n.y, 0);
}

function arc(radius, a0, a1, n = 48) {
    const pts = [];
    for (let i = 0; i <= n; i++) {
        const a = a0 + (a1 - a0) * (i / n);
        pts.push(new THREE.Vector3(radius * Math.cos(a), radius * Math.sin(a), 0));
    }
    return pts;
}

/** 1.3 — two intersecting mirrors compose to a rotation by twice the dihedral angle. */
export function build(g, viewer, { controls }) {
    let opt;
    viewer.setPlanar();
    viewer.showAxes(false);
    const O = new THREE.Vector3();

    const p0 = drawPoint(new THREE.Vector3(0.85, 0.22, 0), { color: C.faint, radius: 0.045 });
    const p1 = drawPoint(O, { color: C.classical, radius: 0.042 });
    const p2 = drawPoint(O, { color: C.covector, radius: 0.048 });
    const m1 = drawSegment([-1.4, 0, 0], [1.4, 0, 0], { color: C.faint });
    const m2 = drawSegment([-1.4, 0, 0], [1.4, 0, 0], { color: C.ga });
    const dihedral = drawPolyline([], { color: C.ga, opacity: 0.8 });
    const chord = drawSegment([0, 0, 0], [0, 0, 0], { color: C.covector });
    const orbit = drawPolyline([], { color: C.covector });
    [p0, p1, p2, m1, m2, dihedral, chord, orbit].forEach((h) => viewer.add(h));

    let theta = 0.45;
    let P = new THREE.Vector3(), Q = new THREE.Vector3(), R = new THREE.Vector3();

    const src = handleMesh([0.85, 0.22, 0], { color: C.point, onMove: redraw });
    const ang = handleMesh(unit(theta).multiplyScalar(1.15), {
        color: C.ga,
        onMove: (pos) => {
            theta = Math.atan2(pos.y, pos.x);
            ang.position.copy(unit(theta).multiplyScalar(1.15));
            redraw();
        },
    });
    viewer.add(src); viewer.add(ang);
    const drag = enableDragging(viewer);

    const field = drawVectorField((x, y) => [-2 * theta * y, 2 * theta * x, 0], { nx: 7, ny: 7, scale: 0.15 });
    viewer.add(field);

    const ov = overlay(viewer);
    ov.title('Two mirrors make a rotation', 'Cartan–Dieudonné')
      .legend([[C.faint, 'x'], [C.classical, 'after mirror 1'], [C.covector, 'after mirror 2'], [C.ga, 'mirror angle']])
      .formula('$x\\mapsto (n_2 n_1)\\,x\\,(n_1 n_2)$')
      .caption('the mirrors slide; the rotation does not — only their relative angle matters');
    const readDihedral = ov.readout('mirror angle ');
    const readRotation = ov.readout('rotation     ');
    ov.tag(() => P, 'x', { color: C.muted });
    ov.tag(() => Q, '$-n_1 x n_1$', { color: C.classical });
    ov.tag(() => R, '$R x\\rev{R}$', { color: C.covector });

    function redraw() {
        const n1 = new THREE.Vector3(0, 1, 0);
        const n2 = unit(theta + Math.PI / 2);
        const d1 = new THREE.Vector3(1, 0, 0);
        const d2 = unit(theta);
        m1.update(d1.clone().multiplyScalar(-1.45), d1.clone().multiplyScalar(1.45));
        m2.update(d2.clone().multiplyScalar(-1.45), d2.clone().multiplyScalar(1.45));
        dihedral.update(arc(0.36, 0, theta, 32));

        P = src.position.clone(); P.z = 0;
        Q = reflect(P, n1);
        R = reflect(Q, n2);
        p0.update(P); p1.update(Q); p2.update(R);
        chord.update(P, R);
        const a0 = Math.atan2(P.y, P.x);
        orbit.update(arc(P.length(), a0, a0 + 2 * theta));
        field.rebuild();

        readDihedral.set((theta * 180 / Math.PI).toFixed(1).padStart(6) + '°');
        readRotation.set((2 * theta * 180 / Math.PI).toFixed(1).padStart(6) + '°   = twice the mirror angle');
        applyVis();
    }

    function applyVis() {
        if (!opt) return;
        p1.object3D.visible = opt.mid;
        m1.object3D.visible = opt.mirrors;
        m2.object3D.visible = opt.mirrors;
        dihedral.object3D.visible = opt.mirrors;
        ang.visible = opt.mirrors;
        orbit.object3D.visible = opt.path;
        chord.object3D.visible = opt.path;
        field.object3D.visible = opt.field;
    }

    clear(controls);
    opt = toggles(controls, {
        play: ['play', true],
        mirrors: ['mirrors', true],
        mid: ['halfway', true],
        path: ['arc', true],
        field: ['field', true],
    }, (s) => { anim.toggle(s.play); applyVis(); });

    // presenting wants motion; the slider is there when you want to stop and poke
    const anim = loop(viewer, 10, (p) => {
        theta = 0.45 + 0.28 * Math.sin(p * Math.PI * 2);
        ang.position.copy(unit(theta).multiplyScalar(1.15));
        redraw();
    });
    redraw();
    anim.onPlayChange = (on) => opt.set('play', on);

    return { dispose() { anim.dispose(); ov.dispose(); drag.dispose(); } };
}
