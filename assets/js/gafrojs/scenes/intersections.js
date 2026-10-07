import * as THREE from 'three';
import { cga } from '../runtime/api.js?v=42';
import { drawPlaneFromPoints, drawSegment, drawSphereAt, drawPoint, drawPolyline } from '../runtime/draw.js?v=42';
import { enableDragging, handleMesh } from '../runtime/interact.js?v=42';
import { clear, toggles } from '../runtime/ui.js?v=42';
import { C, overlay, loop } from '../runtime/scene.js?v=42';

/**
 * 5.2 — one meet replaces the switch statement, and non-intersection is a value
 * rather than an exception: the circle simply acquires an imaginary radius.
 */
export function build(g, viewer, { controls }) {
    let opt;
    viewer.look([1.9, 1.6, 1.15], [0, 0, 0.35]);
    const A = cga(g);
    const zPlane = 0.35;
    const planePts = [new A.Point(-1, -1, zPlane), new A.Point(1, -1, zPlane), new A.Point(0, 1, zPlane)];
    const plane = drawPlaneFromPoints(...planePts, { color: C.point, size: 1.8 });
    const lineA = new THREE.Vector3(-0.85, 0.2, -0.15);
    const lineB = new THREE.Vector3(0.85, -0.2, 0.95);
    const line = drawSegment(lineA, lineB, { color: C.classical });
    viewer.add(plane); viewer.add(line);

    const radius = 0.34;
    const sph = drawSphereAt(new THREE.Vector3(0, 0, 0.5), radius, { color: C.ga, opacity: 0.26 });
    viewer.add(sph);
    const rim = drawPolyline([], { color: C.covector, closed: true });
    viewer.add(rim);
    const proxy = handleMesh([0, 0, 0.5], { color: C.ink, mode: 'camera', onMove: refresh });
    viewer.add(proxy);
    const drag = enableDragging(viewer);
    let hits = [];
    let rimCentre = new THREE.Vector3();
    let rimR = 0;

    const ov = overlay(viewer);
    ov.title('The meet', 'one product for every pair')
      .legend([[C.point, 'plane'], [C.classical, 'line'], [C.ga, 'sphere'], [C.covector, 'sphere $\\vee$ plane'], [C.wrong, 'line $\\vee$ sphere']])
      .formula('$A\\vee B$   ·   $\\inner{P}{Q} = -\\tfrac12 d^2$')
      .caption('drag the sphere through the plane: the meet circle shrinks, goes imaginary, and comes back — no branch');
    const readR = ov.readout('meet radius ');
    const readD = ov.readout('centre–plane');
    const warn = ov.warn('no real intersection — the circle has imaginary radius');
    ov.tag(() => rimCentre, 'sphere $\\vee$ plane', { color: C.covector, dy: -14 });

    function refresh() {
        hits.forEach((h) => h.remove());
        hits = [];
        sph.update(proxy.position);
        const c = proxy.position;
        const d = c.z - zPlane;
        const r2 = radius * radius - d * d;
        rimR = r2 > 0 ? Math.sqrt(r2) : 0;
        rimCentre.set(c.x, c.y, zPlane);

        if (r2 > 1e-6) {
            const pts = [];
            for (let i = 0; i <= 64; i++) {
                const a = (i / 64) * Math.PI * 2;
                pts.push(new THREE.Vector3(c.x + rimR * Math.cos(a), c.y + rimR * Math.sin(a), zPlane));
            }
            rim.update(pts);
        } else {
            rim.update([]);
        }
        warn.show(r2 <= 1e-6);
        readR.set((r2 > 0 ? rimR.toFixed(3) : 'i·' + Math.sqrt(-r2).toFixed(3)).padStart(8));
        readD.set(Math.abs(d).toFixed(3).padStart(8));

        // the gafro meets, when the build exposes them
        try {
            const S = new A.Sphere(new A.Point(c.x, c.y, c.z), radius);
            const L = new A.Line(new A.Point(lineA.x, lineA.y, lineA.z), new A.Point(lineB.x, lineB.y, lineB.z));
            const pp = S.intersectLine ? S.intersectLine(L) : (L.intersectSphere ? L.intersectSphere(S) : null);
            if (pp && pp.getPoint1) {
                hits.push(drawPoint(pp.getPoint1(), { color: C.wrong, radius: 0.032 }));
                hits.push(drawPoint(pp.getPoint2(), { color: C.wrong, radius: 0.032 }));
            }
        } catch (_) { /* build without the meet bindings */ }
        hits.forEach((h) => viewer.add(h));
        applyVis();
    }

    function applyVis() {
        if (!opt) return;
        plane.object3D.visible = opt.plane;
        line.object3D.visible = opt.line;
        sph.object3D.visible = opt.sphere;
        rim.object3D.visible = opt.hits;
        hits.forEach((h) => { h.object3D.visible = opt.hits; });
    }

    clear(controls);
    opt = toggles(controls, {
        play: ['play', true],
        plane: ['plane', true],
        line: ['line', true],
        sphere: ['sphere', true],
        hits: ['meets', true],
    }, (s) => { anim.toggle(s.play); applyVis(); });

    // presenting wants motion; the slider is there when you want to stop and poke
    const anim = loop(viewer, 11, (p) => {
        proxy.position.set(0.12 * Math.sin(p * Math.PI * 4), 0, 0.5 + 0.52 * Math.sin(p * Math.PI * 2));
        refresh();
    });
    refresh();
    anim.onPlayChange = (on) => opt.set('play', on);

    return { dispose() { anim.dispose(); ov.dispose(); drag.dispose(); } };
}
