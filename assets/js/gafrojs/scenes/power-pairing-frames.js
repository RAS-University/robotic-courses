import * as THREE from 'three';
import { drawArrow, drawPoint } from '../runtime/draw.js?v=42';
import { clear, slider } from '../runtime/ui.js?v=42';
import { C, overlay } from '../runtime/scene.js?v=42';
import { chart, linspace } from './_book.js?v=42';

/**
 * 3.5 — the pairing fixes the rules. A wrench measured at a sensor is moved to a tool frame a
 * distance d away. Moved as a wrench (inverse transpose of the adjoint), the power it reports
 * against the tool twist is the same; moved as a twist, the error grows linearly with d.
 */
export function build(g, viewer, { controls }) {
    viewer.setPlanar();
    viewer.showAxes(false);
    const ch = chart(viewer, { x0: 0, x1: 0.3, y0: 0, y1: 1.2, left: -1.35, right: 0.1, bottom: -0.75, top: 0.75 });
    const ds = linspace(0, 0.3, 60);
    // planar: twist (w, vx, vy), wrench (tau, fx, fy); moving the frame by (d, 0)
    const tw = [0.8, 0.3, -0.2], wr = [0.1, 2.0, 3.0];
    const errWrong = ds.map((d) => {
        // twist rule applied to the wrench: tau' = tau + d*fy?  (wrong: uses the twist's transport)
        const twist = [tw[0], tw[1], tw[2] + d * tw[0]];         // v' = v + w x r (planar, r = (d,0))
        const wrongW = [wr[0], wr[1], wr[2] + d * wr[0]];       // same rule on the wrench
        const p0 = tw[0] * wr[0] + tw[1] * wr[1] + tw[2] * wr[2];
        return Math.abs(twist[0] * wrongW[0] + twist[1] * wrongW[1] + twist[2] * wrongW[2] - p0);
    });
    ch.curve(ds, errWrong, { color: C.wrong });
    ch.curve(ds, ds.map(() => 0), { color: C.ga });
    const dot = drawPoint(ch.map(0.1, 0), { color: C.point });
    viewer.add(dot);
    const S = new THREE.Vector3(0.45, -0.3, 0);
    let arrows = [];
    const ov = overlay(viewer);
    ov.title('Twists and wrenches move differently', 'the power pairing')
      .legend([[C.ga, 'power error, wrench rule'], [C.wrong, 'power error, twist rule'], [C.covector, 'force at the sensor'], [C.vector, 'the tool frame']])
      .formula('$\\twist\' = \\Ad\\,\\twist$,\n$\\wrench\' = \\Ad^{-\\transp}\\wrench \\;\\Rightarrow\\; \\inner{\\wrench\'}{\\twist\'} = \\inner{\\wrench}{\\twist}$')
      .caption('slide the sensor-to-tool offset: the wrong rule is right only at zero offset, where tests usually look');
    const rD = ov.readout('offset ');
    function draw(d) {
        arrows.forEach((a) => a.remove());
        arrows = [drawArrow(S, S.clone().add(new THREE.Vector3(0.12, 0.18, 0)), { color: C.covector }),
                  drawArrow(S.clone().add(new THREE.Vector3(d * 3, 0, 0)), S.clone().add(new THREE.Vector3(d * 3 + 0.18, 0, 0)), { color: C.vector })];
        arrows.forEach((a) => viewer.add(a));
        const i = Math.round(d / 0.3 * 59);
        dot.update(ch.map(ds[i], errWrong[i]));
        rD.set(`${(100 * d).toFixed(0)} cm   twist-rule power error ${errWrong[i].toFixed(3)} W`);
    }
    clear(controls);
    slider(controls, { min: 0, max: 0.3, step: 0.005, value: 0.1, title: 'offset (m)' }, draw);
    draw(0.1);
    return { dispose() { ov.dispose(); } };
}
