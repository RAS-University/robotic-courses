import * as THREE from 'three';
import { drawPolyline, drawSegment } from '../runtime/draw.js?v=42';
import { C } from '../runtime/scene.js?v=42';

/**
 * Small helpers shared by the book's plot-style scenes: a 2-D chart drawn inside the
 * planar viewer, mapping data coordinates to a rectangle of scene space.
 */
export function chart(viewer, {
    x0 = 0, x1 = 1, y0 = 0, y1 = 1,
    left = -1.3, right = 1.3, bottom = -0.8, top = 0.8,
    axes = true,
} = {}) {
    const sx = (x) => left + (right - left) * (x - x0) / (x1 - x0);
    const sy = (y) => bottom + (top - bottom) * (y - y0) / (y1 - y0);
    const map = (x, y) => new THREE.Vector3(sx(x), sy(Math.max(y0 - 0.2 * (y1 - y0), Math.min(y1 + 0.2 * (y1 - y0), y))), 0);
    const objects = [];
    if (axes) {
        const xa = drawSegment([left, sy(Math.max(y0, Math.min(y1, 0))), 0], [right, sy(Math.max(y0, Math.min(y1, 0))), 0], { color: C.muted, width: 1.6 });
        const ya = drawSegment([sx(Math.max(x0, Math.min(x1, 0))), bottom, 0], [sx(Math.max(x0, Math.min(x1, 0))), top, 0], { color: C.muted, width: 1.6 });
        viewer.add(xa); viewer.add(ya);
        objects.push(xa, ya);
    }
    return {
        map,
        sx, sy,
        curve(xs, ys, opts = {}) {
            const h = drawPolyline(xs.map((x, i) => map(x, ys[i])), opts);
            viewer.add(h);
            objects.push(h);
            return {
                handle: h,
                update(nx, ny) { h.update(nx.map((x, i) => map(x, ny[i]))); },
            };
        },
        line(xa, ya, xb, yb, opts = {}) {
            const h = drawSegment(map(xa, ya), map(xb, yb), opts);
            viewer.add(h);
            objects.push(h);
            return h;
        },
    };
}

export const linspace = (a, b, n) => Array.from({ length: n }, (_, i) => a + (b - a) * i / (n - 1));

/** Rotation about a unit axis by angle, as a THREE matrix. */
export function rotation(axis, angle) {
    return new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(...axis).normalize(), angle);
}
