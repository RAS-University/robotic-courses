import * as THREE from 'three';
import { cga } from '../runtime/api.js?v=42';
import { drawPoint, drawArrow, drawLine3D, drawPlane, drawSphere, drawCircle3D, drawPointPair } from '../runtime/draw.js?v=42';
import { enableDragging, handleMesh } from '../runtime/interact.js?v=42';
import { clear, toggles } from '../runtime/ui.js?v=42';
import { C, overlay, loop } from '../runtime/scene.js?v=42';
import { circumcircle } from '../runtime/geom.js?v=42';

/**
 * 5.1 -- the CGA primitive set, each one a blade of a definite grade, all carried
 * by the same versor sandwich. The whole gallery turns together to make that point.
 */
export function build(g, viewer, { controls }) {
    let opt;
    viewer.look([1.9, 1.7, 1.3], [0, 0, 0.25]);
    const A = cga(g);
    const stage = new THREE.Group();
    viewer.add(stage);

    const P = new A.Point(-0.55, -0.45, 0.35);
    const point = drawPoint(P, { color: C.point, radius: 0.045 });
    const vec = drawArrow(
        new THREE.Vector3(P.x(), P.y(), P.z()),
        new THREE.Vector3(P.x(), P.y(), P.z() + 0.38),
        { color: C.vector },
    );
    const line = drawLine3D([-0.2, -0.45, 0.05], [-0.2, 0.45, 0.05], { color: C.classical, extend: 0.25 });
    const plane = drawPlane([0.25, 0, 0.3], [1, 0, 0], 0.9, { color: C.point, opacity: 0.14 });
    const sph = drawSphere([0.72, -0.42, 0.35], 0.19, { color: C.ga, opacity: 0.2 });
    const cpts = [new THREE.Vector3(0.75, 0.35, 0.25), new THREE.Vector3(0.45, 0.55, 0.25), new THREE.Vector3(0.2, 0.3, 0.25)];
    const cc = circumcircle(cpts);
    const circle = drawCircle3D(cc.centre, cc.radius, cc.normal, { color: C.covector, tube: 0.008, disc: 0.1 });
    const circlePts = cpts.map((p) => drawPoint(p, { color: C.covector, radius: 0.028 }));
    const pair = drawPointPair([-0.55, 0.45, 0.65], [-0.2, 0.45, 0.85], { color: C.pairing, radius: 0.035 });
    [point, vec, line, plane, sph, circle, pair, ...circlePts].forEach((h) => stage.add(h.object3D));

    const focus = handleMesh([0.72, -0.42, 0.35], { color: C.ink, mode: 'camera', onMove: (p) => sph.update(p, 0.19) });
    focus.scale.setScalar(0.4);
    viewer.add(focus);
    const drag = enableDragging(viewer);

    const ov = overlay(viewer);
    ov.title('One algebra, every primitive', '$\\cga = \\Cl(4,1)$')
      .legend([[C.point, 'point · plane'], [C.classical, 'line'], [C.ga, 'sphere'], [C.covector, 'circle'], [C.pairing, 'point pair']])
      .formula('$X\\mapsto V X V^{-1}$   -- the same action for all of them')
      .caption('every object here is one blade, built by wedging points; the whole gallery turns under one motor');
    const local = (o) => () => stage.localToWorld(o.clone());
    ov.tag(local(new THREE.Vector3(-0.55, -0.45, 0.35)), 'point · grade 1', { color: C.point, italic: false, size: 12 });
    ov.tag(local(new THREE.Vector3(-0.2, 0.6, 0.05)), 'line · grade 3', { color: C.classical, italic: false, size: 12 });
    ov.tag(local(new THREE.Vector3(0.25, 0.4, 0.5)), 'plane · grade 4', { color: C.point, italic: false, size: 12 });
    ov.tag(local(new THREE.Vector3(0.72, -0.42, 0.56)), 'sphere · grade 4', { color: C.ga, italic: false, size: 12 });
    ov.tag(local(new THREE.Vector3(0.45, 0.55, 0.25)), 'circle · grade 3', { color: C.covector, italic: false, size: 12 });
    ov.tag(local(new THREE.Vector3(-0.2, 0.45, 0.85)), 'point pair · grade 2', { color: C.pairing, italic: false, size: 12 });

    function applyVis() {
        if (!opt) return;
        point.object3D.visible = opt.point;
        vec.object3D.visible = opt.point;
        line.object3D.visible = opt.line;
        plane.object3D.visible = opt.plane;
        sph.object3D.visible = opt.sphere;
        focus.visible = opt.sphere;
        circle.object3D.visible = opt.circle;
        circlePts.forEach((h) => { h.object3D.visible = opt.circle; });
        pair.object3D.visible = opt.pair;
    }

    clear(controls);
    opt = toggles(controls, {
        play: ['turn', true],
        point: ['point', true],
        line: ['line', true],
        plane: ['plane', true],
        sphere: ['sphere', true],
        circle: ['circle', true],
        pair: ['pair', true],
    }, (s) => { anim.toggle(s.play); applyVis(); });

    const anim = loop(viewer, 22, (p) => {
        stage.rotation.z = p * Math.PI * 2;
        stage.rotation.x = 0.14 * Math.sin(p * Math.PI * 4);
    });
    applyVis();
    anim.onPlayChange = (on) => opt.set('play', on);

    return { dispose() { anim.dispose(); ov.dispose(); drag.dispose(); viewer.remove(stage); } };
}
