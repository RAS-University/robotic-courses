import * as THREE from 'three';
import { drawArrow, drawPolyline } from '../runtime/draw.js?v=42';
import { clear, toggles } from '../runtime/ui.js?v=42';
import { C, overlay, loop } from '../runtime/scene.js?v=42';

/**
 * 1.2 — one product, two parts. ab = a.b + a^b: the scalar part measures alignment
 * (|a||b| cos t), the bivector part oriented area (|a||b| sin t). Their squares add to
 * |a|^2 |b|^2 at every angle.
 */
export function build(g, viewer, { controls }) {
    let opt;
    viewer.setPlanar();
    viewer.showAxes(false);
    const O = new THREE.Vector3();
    let a = drawArrow(O, new THREE.Vector3(0.9, 0, 0), { color: C.vector });
    let b = drawArrow(O, new THREE.Vector3(0.5, 0.5, 0), { color: C.covector });
    const area = drawPolyline([], { color: C.ga, closed: true });
    const proj = drawPolyline([], { color: C.classical, dashed: true });
    const circle = drawPolyline([], { color: C.faint });
    [a, b, area, proj, circle].forEach((h) => viewer.add(h));
    const ov = overlay(viewer);
    ov.title('The geometric product', '$ab = a\\cdot b + a\\wedge b$')
      .legend([[C.vector, 'a'], [C.covector, 'b'], [C.classical, 'a·b: projection, alignment'], [C.ga, '$a\\wedge b$: oriented area']])
      .formula('$(a\\cdot b)^2 + \\abs{a\\wedge b}^2 = \\abs{a}^2\\abs{b}^2$')
      .caption('as b turns, alignment trades for area; the product keeps both and loses nothing');
    const readDot = ov.readout('a·b    ');
    const readWedge = ov.readout('a∧b    ');
    let tipB = new THREE.Vector3();
    ov.tag(() => new THREE.Vector3(0.9, -0.08, 0), 'a', { color: C.vector });
    ov.tag(() => tipB, 'b', { color: C.covector });

    const la = 0.9, lb = 0.7;
    const ring = [];
    for (let i = 0; i <= 96; i++) ring.push(new THREE.Vector3(lb * Math.cos(2 * Math.PI * i / 96), lb * Math.sin(2 * Math.PI * i / 96), 0));
    circle.update(ring);

    function draw(t) {
        tipB = new THREE.Vector3(lb * Math.cos(t), lb * Math.sin(t), 0);
        b.remove(); b = drawArrow(O, tipB, { color: C.covector }); viewer.add(b);
        area.update([O, new THREE.Vector3(la, 0, 0), new THREE.Vector3(la, 0, 0).add(tipB), tipB]);
        proj.update([tipB, new THREE.Vector3(tipB.x, 0, 0)]);
        readDot.set((la * lb * Math.cos(t)).toFixed(3));
        readWedge.set((la * lb * Math.sin(t)).toFixed(3) + ' e₁₂');
        applyVis();
    }
    function applyVis() {
        if (!opt) return;
        area.object3D.visible = opt.wedge;
        proj.object3D.visible = opt.dot;
        circle.object3D.visible = opt.orbit;
    }
    clear(controls);
    opt = toggles(controls, { play: ['play', true], dot: ['a·b', true], wedge: ['a∧b', true], orbit: ['orbit of b', false] },
        (s) => { anim.toggle(s.play); applyVis(); });
    const anim = loop(viewer, 12, (p) => draw(2 * Math.PI * p));
    anim.onPlayChange = (on) => opt.set('play', on);
    draw(0.8);
    return { dispose() { anim.dispose(); ov.dispose(); } };
}
