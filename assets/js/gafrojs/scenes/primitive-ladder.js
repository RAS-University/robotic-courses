import * as THREE from 'three';
import { drawPoint, drawLine3D, drawPlane, drawSphere, drawCircle3D, drawPointPair } from '../runtime/draw.js?v=42';
import { enableDragging, handleMesh } from '../runtime/interact.js?v=42';
import { clear, slider, toggles } from '../runtime/ui.js?v=42';
import { C, overlay, loop, embedded } from '../runtime/scene.js?v=42';
import { circumcircle, circumsphere } from '../runtime/geom.js?v=42';

/**
 * Cooperative task spaces for multi-arm manipulation control based on
 * similarity transformations -- Löw, Bilaloglu & Calinon, IJRR 2026, the key
 * construction: one point per chain, wedged.
 *
 * One point is a point; two wedge to a point pair, three to a circle, four to
 * a sphere. Wedging in e_inf flattens each round to its flat: a pair gives
 * the line through it, a circle the plane. Nobody chose the primitive -- the
 * count of chains did. Drag the points; the round through them follows.
 */
export function build(g, viewer, { controls }) {
    let opt;
    const quiet = embedded();
    viewer.look([1.7, -1.5, 1.2], [0, 0, 0.3]);
    viewer.fitMargin = 1.1;

    const P = [
        handleMesh([-0.3, -0.25, 0.25], { color: C.point, onMove: () => { dragged = true; } }),
        handleMesh([0.35, -0.2, 0.3], { color: C.point, onMove: () => { dragged = true; } }),
        handleMesh([0.2, 0.35, 0.55], { color: C.point, onMove: () => { dragged = true; } }),
        handleMesh([-0.2, 0.25, 0.15], { color: C.point, onMove: () => { dragged = true; } }),
    ];
    P.forEach((h) => { h.scale.setScalar(0.7); viewer.add(h); });
    const drag = enableDragging(viewer);
    let dragged = false;
    let count = 1;

    const pair = drawPointPair(P[0].position, P[1].position, { color: C.classical, radius: 0.001 });
    const line = drawLine3D(P[0].position, P[1].position, { color: C.ga, extend: 0.5, opacity: 0.85 });
    const circle = drawCircle3D([0, 0, 0.3], 0.3, [0, 0, 1], { color: C.classical, tube: 0.008, disc: 0.12 });
    const plane = drawPlane([0, 0, 0.3], [0, 0, 1], 1.4, { color: C.ga, opacity: 0.1 });
    const sphere = drawSphere([0, 0, 0.3], 0.3, { color: C.classical, opacity: 0.16 });
    [pair, line, circle, plane, sphere].forEach((h) => viewer.add(h));

    const ov = overlay(viewer);
    ov.title('Points wedge into primitives', 'one point per chain')
      .legend([[C.point, 'chain tips'], [C.classical, 'the round'], [C.ga, '∧ e∞: its flat']])
      .formula('$X_c = P_1 \\wedge \\cdots \\wedge P_n$       $X_c \\wedge e_\\infty$');
    const names = ['a point', 'a point pair · its flat: a line', 'a circle · its flat: a plane', 'a sphere'];
    const tags = P.map((h, i) => ov.tag(() => h.position, `$P_${i + 1}$`, { color: C.point }));

    function show() {
        P.forEach((h, i) => { h.visible = i < count; tags[i].visible(i < count); });
        pair.object3D.visible = count === 2;
        line.object3D.visible = count === 2 && opt.flat;
        circle.object3D.visible = count === 3;
        plane.object3D.visible = count === 3 && opt.flat;
        sphere.object3D.visible = count === 4;
        ov.caption(`${count} ${count === 1 ? 'chain' : 'chains'}: ${names[count - 1]}`);
    }

    clear(controls);
    opt = toggles(controls, { play: ['step', true], flat: ['flat (∧ e∞)', true] }, (s) => { anim.toggle(s.play); show(); });
    const kN = slider(controls, { min: 1, max: 4, step: 1, value: count, title: 'chains' }, (v) => { count = v; show(); });

    const anim = loop(viewer, 12, (p, secs) => {
        // step through 1..4 every three seconds until someone drags a point
        if (!dragged) {
            const next = 1 + Math.floor((secs / 3) % 4);
            if (next !== count) { count = next; if (kN) kN.value = String(count); }
            P.forEach((h, i) => {
                const t = secs * 0.35 + i * 1.7;
                h.position.z = [0.25, 0.3, 0.55, 0.15][i] + 0.05 * Math.sin(t);
            });
        }
        const pts = P.map((h) => h.position.clone());
        pair.update(pts[0], pts[1]);
        line.update(pts[0], pts[1]);
        const c = circumcircle(pts.slice(0, 3));
        if (!c.degenerate) { circle.update(c.centre, c.radius, c.normal); plane.update(c.centre, c.normal, Math.max(1.0, 3 * c.radius)); }
        const s = circumsphere(pts);
        if (!s.degenerate && s.radius < 1.5) sphere.update(s.centre, s.radius);
        show();
    });
    anim.onPlayChange = (on) => opt.set('play', on);
    show();
    return { dispose() { anim.dispose(); ov.dispose(); drag.dispose(); [pair, line, circle, plane, sphere].forEach((h) => viewer.remove(h)); P.forEach((h) => viewer.remove(h)); } };
}
