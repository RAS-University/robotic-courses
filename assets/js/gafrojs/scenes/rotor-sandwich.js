import * as THREE from 'three';
import { cga, applyVector } from '../runtime/api.js?v=42';
import { drawArrow, drawPolyline, drawSegment, drawVectorField, sampleCurve } from '../runtime/draw.js?v=42';
import { enableDragging, handleMesh } from '../runtime/interact.js?v=42';
import { clear, toggles } from '../runtime/ui.js?v=42';
import { C, overlay, loop, onStage } from '../runtime/scene.js?v=42';

/**
 * 1.4 — the rotor as an even versor.
 * Shows the sandwich together with the two mirrors whose product it is, so the
 * half-angle is visible rather than asserted.
 */
export function build(g, viewer, { controls }) {
    let opt;
    let stage = 1;
    viewer.setPlanar();
    viewer.showAxes(false);
    const A = cga(g);
    const O = new THREE.Vector3();

    const mirror1 = drawSegment([0, 0, 0], [0, 0, 0], { color: C.faint });
    const mirror2 = drawSegment([0, 0, 0], [0, 0, 0], { color: C.classical });
    const halfway = drawPolyline([], { color: C.classical, opacity: 0.55 });
    const orbit = drawPolyline([], { color: C.covector, opacity: 0.5 });
    viewer.add(mirror1); viewer.add(mirror2); viewer.add(halfway); viewer.add(orbit);

    let rest = drawArrow(O, new THREE.Vector3(0.9, 0.2, 0), { color: C.faint });
    let mid = drawArrow(O, new THREE.Vector3(0.9, 0.2, 0), { color: C.classical });
    let current = drawArrow(O, new THREE.Vector3(0.9, 0.2, 0), { color: C.covector });
    viewer.add(rest); viewer.add(mid); viewer.add(current);

    const tip = handleMesh([0.9, 0.2, 0], { color: C.point, onMove: () => sandwich(angle) });
    viewer.add(tip);
    const drag = enableDragging(viewer);
    let angle = 0.9;
    let tipRest = new THREE.Vector3(0.9, 0.2, 0);
    let tipMid = new THREE.Vector3();
    let tipOut = new THREE.Vector3();

    const field = drawVectorField((x, y) => [-y, x, 0], { nx: 7, ny: 7, scale: 0.13 });
    viewer.add(field);

    const ov = overlay(viewer);
    ov.title('The rotor sandwich', '$\\Cl^+(3,0)$')
      .legend([[C.faint, 'x'], [C.classical, '$-n_1 x n_1$'], [C.covector, '$R x\\rev{R}$'], [C.point, 'drag me']])
      .formula('$\\Rotor = n_2 n_1$   ·   $x\\mapsto \\Rotor x\\rev{\\Rotor}$')
      .caption('two mirrors at θ⁄2 compose to a rotation by θ — slide either and watch the image');
    const readAngle = ov.readout('θ      ');
    const readHalf = ov.readout('θ⁄2    ');
    ov.tag(() => tipRest, 'x', { color: C.muted });
    const tagMid = ov.tag(() => tipMid, '$-n_1 x n_1$', { color: C.classical });
    ov.tag(() => tipOut, '$R x\\rev{R}$', { color: C.covector });

    function reflect(p, n) {
        const d = p.x * n.x + p.y * n.y;
        return new THREE.Vector3(p.x - 2 * d * n.x, p.y - 2 * d * n.y, 0);
    }

    function sandwich(th) {
        const v0 = new A.Vector(tip.position.x, tip.position.y, 0);
        tipRest = new THREE.Vector3(v0.x(), v0.y(), 0);
        rest.remove();
        rest = drawArrow(O, tipRest, { color: C.faint });
        viewer.add(rest);

        // the two mirrors: n1 fixed, n2 at half the rotation angle
        const n1 = new THREE.Vector3(0, 1, 0);
        const n2 = new THREE.Vector3(-Math.sin(th / 2), Math.cos(th / 2), 0);
        const d1 = new THREE.Vector3(1, 0, 0);
        const d2 = new THREE.Vector3(Math.cos(th / 2), Math.sin(th / 2), 0);
        mirror1.update(d1.clone().multiplyScalar(-1.5), d1.clone().multiplyScalar(1.5));
        mirror2.update(d2.clone().multiplyScalar(-1.5), d2.clone().multiplyScalar(1.5));
        halfway.update(sampleCurve((u) => {
            const a = u * (th / 2);
            return new THREE.Vector3(0.42 * Math.cos(a), 0.42 * Math.sin(a), 0);
        }, 32));

        tipMid = reflect(tipRest, n1);
        mid.remove();
        mid = drawArrow(O, tipMid, { color: C.classical });
        viewer.add(mid);

        // the rotor itself, from gafro
        const R = A.Rotor.fromAngleAxis(th, 0, 0, 1);
        const v = applyVector(A.Motor.fromRotor(R), v0);
        tipOut = new THREE.Vector3(v.x(), v.y(), 0);
        current.remove();
        current = drawArrow(O, tipOut, { color: C.covector });
        viewer.add(current);

        const r = Math.hypot(tip.position.x, tip.position.y);
        const a0 = Math.atan2(tip.position.y, tip.position.x);
        orbit.update(sampleCurve((u) => {
            const a = a0 + u * th;
            return new THREE.Vector3(r * Math.cos(a), r * Math.sin(a), 0);
        }, 48));

        readAngle.set((th * 180 / Math.PI).toFixed(1).padStart(6) + '°');
        readHalf.set((th * 90 / Math.PI).toFixed(1).padStart(6) + '°   (the rotor turns half as far)');
        applyVis();
    }

    function applyVis() {
        if (!opt) return;
        const showMirrors = opt.mirrors && stage >= 2;
        orbit.object3D.visible = opt.path;
        field.object3D.visible = opt.field;
        rest.object3D.visible = opt.rest;
        mirror1.object3D.visible = showMirrors;
        mirror2.object3D.visible = showMirrors;
        halfway.object3D.visible = showMirrors;
        mid.object3D.visible = showMirrors;
        tagMid.visible(showMirrors);
    }

    clear(controls);
    opt = toggles(controls, {
        play: ['play', true],
        path: ['path', true],
        rest: ['x', true],
        mirrors: ['mirrors', true],
        field: ['field', false],
    }, (s) => { anim.toggle(s.play); applyVis(); });

    // presenting wants motion; the slider is there when you want to stop and poke
    const anim = loop(viewer, 9, (p) => {
        angle = 0.9 + 0.75 * Math.sin(p * Math.PI * 2);
        sandwich(angle);
    });
    const offStage = onStage((n) => { stage = n; applyVis(); });
    sandwich(angle);

    anim.onPlayChange = (on) => opt.set('play', on);

    return { dispose() { anim.dispose(); offStage(); ov.dispose(); drag.dispose(); } };
}
