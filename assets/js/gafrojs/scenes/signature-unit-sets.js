import * as THREE from 'three';
import { drawPolyline } from '../runtime/draw.js?v=42';
import { clear, select } from '../runtime/ui.js?v=42';
import { C, overlay } from '../runtime/scene.js?v=42';
import { linspace } from './_book.js?v=42';

/**
 * 2.1 — the bilinear form fixes the geometry. The "unit circle" {x : Q(x) = 1} of a plane with
 * signature (2,0), (1,1) and (1,0,1): a circle, a hyperbola, a pair of parallel lines. Same
 * vectors, three algebras, because x^2 = Q(x) is the one rule the geometric product obeys.
 */
export function build(g, viewer, { controls }) {
    viewer.setPlanar();
    viewer.showAxes(true);
    const curves = [drawPolyline([], { color: C.ga }), drawPolyline([], { color: C.ga }), drawPolyline([], { color: C.faint, dashed: true }), drawPolyline([], { color: C.faint, dashed: true })];
    curves.forEach((c) => viewer.add(c));
    const ov = overlay(viewer);
    ov.title('Signature decides the unit set', '$x^2 = Q(x)$')
      .legend([[C.ga, 'Q(x) = 1'], [C.faint, 'null directions Q(x) = 0']])
      .caption('(2,0): a circle.  (1,1): a hyperbola with null asymptotes.  (1,0,1): $e_2^2 = 0$, the lines $x = \\pm1$');
    const rQ = ov.readout('Q(x)   ');
    function draw(sig) {
        const ts = linspace(-1.4, 1.4, 120);
        if (sig === '(2,0,0)') {
            curves[0].update(linspace(0, 2 * Math.PI, 160).map((a) => [Math.cos(a), Math.sin(a), 0]));
            curves[1].update([]); curves[2].update([]); curves[3].update([]);
            rQ.set('$x_1^2 + x_2^2$');
        } else if (sig === '(1,1,0)') {
            curves[0].update(ts.map((t) => [Math.cosh(t), Math.sinh(t), 0]));
            curves[1].update(ts.map((t) => [-Math.cosh(t), Math.sinh(t), 0]));
            curves[2].update([[-2, -2, 0], [2, 2, 0]]); curves[3].update([[-2, 2, 0], [2, -2, 0]]);
            rQ.set('$x_1^2 - x_2^2$');
        } else {
            curves[0].update([[1, -1.6, 0], [1, 1.6, 0]]); curves[1].update([[-1, -1.6, 0], [-1, 1.6, 0]]);
            curves[2].update([[0, -1.6, 0], [0, 1.6, 0]]); curves[3].update([]);
            rQ.set('$x_1^2$  ($e_2^2 = 0$)');
        }
    }
    clear(controls);
    select(controls, ['(2,0,0)', '(1,1,0)', '(1,0,1)'], draw);
    draw('(2,0,0)');
    return { dispose() { ov.dispose(); } };
}
