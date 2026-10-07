import * as THREE from 'three';
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { xyz } from './api.js?v=42';

const Z = new THREE.Vector3(0, 0, 1);

/**
 * Lines with a width.
 *
 * THREE.LineBasicMaterial ignores `linewidth` on every platform that matters, so
 * every line in every scene was a one-pixel hairline — which is why the demos
 * read as thinner and cheaper than the hand-written SVG figures beside them.
 * Line2 draws a line as screen-space quads instead, so a width in pixels means
 * what it says.
 *
 * The price is that LineMaterial has to be told the canvas size. There is one
 * viewer per page here, so the materials are kept in a module-level set and the
 * viewer pushes its size in on every resize.
 */
const lineMaterials = new Set();

/** Called by Viewer._onResize; see runtime/viewer.js. */
export function setLineResolution(width, height) {
    for (const m of lineMaterials) m.resolution.set(width, height);
}

/** Default stroke weights, in CSS pixels at the deck's 1600x900 stage. */
export const STROKE = { hair: 1.6, thin: 2.2, normal: 3.0, bold: 4.2 };

function lineMaterial({ color, opacity = 1, width = STROKE.normal, dashed = false }) {
    const m = new LineMaterial({
        color,
        linewidth: width,
        transparent: opacity < 1,
        opacity,
        dashed,
        dashSize: 0.045,
        gapSize: 0.03,
        worldUnits: false,
    });
    // A placeholder until the viewer's first resize; widths are CSS pixels, so
    // the device ratio deliberately does not come into it.
    m.resolution.set(Math.max(window.innerWidth, 2), Math.max(window.innerHeight, 2));
    lineMaterials.add(m);
    return m;
}

/** LineGeometry needs at least two points; a degenerate run is drawn as nothing. */
function fillGeometry(geometry, v) {
    if (v.length < 2) {
        geometry.setPositions([0, 0, 0, 0, 0, 0]);
        geometry.instanceCount = 0;
        return;
    }
    const flat = new Float32Array(v.length * 3);
    for (let i = 0; i < v.length; i++) {
        flat[i * 3] = v[i].x;
        flat[i * 3 + 1] = v[i].y;
        flat[i * 3 + 2] = v[i].z;
    }
    geometry.setPositions(flat);
    geometry.instanceCount = v.length - 1;
}

function handle(object3D, extra = {}) {
    return {
        object3D,
        ...extra,
        setColor(hex) {
            object3D.traverse((o) => {
                if (o.material && o.material.color) o.material.color.set(hex);
            });
        },
        remove() {
            object3D.parent && object3D.parent.remove(object3D);
        },
    };
}

export function vec3(p) {
    const [x, y, z] = xyz(p);
    return new THREE.Vector3(x, y, z);
}

export function drawPoint(p, { color = 0xd1495b, radius = 0.035 } = {}) {
    const m = new THREE.Mesh(
        new THREE.SphereGeometry(radius, 24, 18),
        new THREE.MeshStandardMaterial({ color, roughness: 0.38, metalness: 0.05 }),
    );
    m.castShadow = true;
    m.position.copy(vec3(p));
    return handle(m, {
        update(q) { m.position.copy(vec3(q)); },
    });
}

export function drawArrow(from, to, {
    color = 0x2c6fbb, head = 0.06, width = STROKE.bold, opacity = 1,
} = {}) {
    const group = new THREE.Group();
    const a = from.clone ? from.clone() : new THREE.Vector3(...from);
    const b = to.clone ? to.clone() : new THREE.Vector3(...to);
    const dir = b.clone().sub(a);
    const len = dir.length();
    const unit = len > 1e-9 ? dir.clone().normalize() : new THREE.Vector3(1, 0, 0);
    const headLen = Math.min(head, len * 0.45);

    const shaftEnd = b.clone().addScaledVector(unit, -headLen * 0.85);
    const shaft = drawSegment(a, shaftEnd, { color, width, opacity });
    group.add(shaft.object3D);

    const cone = new THREE.Mesh(
        new THREE.ConeGeometry(headLen * 0.42, headLen, 18),
        new THREE.MeshStandardMaterial({
            color, roughness: 0.55, metalness: 0.0,
            transparent: opacity < 1, opacity,
        }),
    );
    cone.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), unit);
    cone.position.copy(b).addScaledVector(unit, -headLen * 0.5);
    group.add(cone);

    return handle(group, {
        update(p, q) {
            const pa = p.clone ? p.clone() : new THREE.Vector3(...p);
            const pb = q.clone ? q.clone() : new THREE.Vector3(...q);
            const d = pb.clone().sub(pa);
            const l = d.length();
            const u = l > 1e-9 ? d.clone().normalize() : new THREE.Vector3(1, 0, 0);
            const hl = Math.min(head, l * 0.45);
            shaft.update(pa, pb.clone().addScaledVector(u, -hl * 0.85));
            cone.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), u);
            cone.position.copy(pb).addScaledVector(u, -hl * 0.5);
        },
    });
}

export function drawSegment(a, b, { color = 0x33373d, width = STROKE.normal, opacity = 1, dashed = false } = {}) {
    const geometry = new LineGeometry();
    const toV = (p) => (p && p.clone ? p.clone() : new THREE.Vector3(...(p || [0, 0, 0])));
    fillGeometry(geometry, [toV(a), toV(b)]);
    const line = new Line2(geometry, lineMaterial({ color, opacity, width, dashed }));
    line.computeLineDistances();
    line.renderOrder = 6;
    return handle(line, {
        update(p, q) {
            fillGeometry(geometry, [toV(p), toV(q)]);
            line.computeLineDistances();
        },
    });
}

export function drawPolyline(pts, {
    color = 0x3f8f6b, closed = false, opacity = 1, width = STROKE.normal, dashed = false,
} = {}) {
    const geometry = new LineGeometry();
    const material = lineMaterial({ color, opacity, width, dashed });
    // traces are read against the geometry they annotate, so they stay visible
    // through it rather than fighting it for depth
    material.depthTest = false;
    material.depthWrite = false;
    const line = new Line2(geometry, material);
    line.renderOrder = 8;

    function toV(list) {
        const v = (list || []).map((p) => {
            if (!p) return new THREE.Vector3();
            if (p.isVector3) return p.clone();
            if (typeof p.x === 'number') return new THREE.Vector3(p.x, p.y, p.z || 0);
            if (typeof p.x === 'function') return new THREE.Vector3(p.x(), p.y(), p.z());
            if (typeof p[0] === 'number') return new THREE.Vector3(p[0], p[1] || 0, p[2] || 0);
            return new THREE.Vector3();
        });
        if (closed && v.length) v.push(v[0].clone());
        return v;
    }

    fillGeometry(geometry, toV(pts));
    line.computeLineDistances();
    return handle(line, {
        update(next) {
            fillGeometry(geometry, toV(next));
            line.computeLineDistances();
        },
    });
}

export function drawArc(center, radius, a0, a1, { color = 0xd1495b, n = 48 } = {}) {
    const c = center.isVector3 ? center : new THREE.Vector3(...center);
    const pts = [];
    for (let i = 0; i <= n; i++) {
        const a = a0 + (a1 - a0) * (i / n);
        pts.push(new THREE.Vector3(c.x + radius * Math.cos(a), c.y + radius * Math.sin(a), c.z));
    }
    return drawPolyline(pts, { color });
}

export function sampleCurve(fn, n = 64) {
    const pts = [];
    for (let i = 0; i <= n; i++) pts.push(fn(i / n));
    return pts;
}

export function motorFromHandle(A, h, heading = 0, tilt = 0) {
    const p = h.position || h;
    const cz = Math.cos(heading / 2), sz = Math.sin(heading / 2);
    const cx = Math.cos(tilt / 2), sx = Math.sin(tilt / 2);
    return A.Motor.fromPositionQuaternion(
        p.x, p.y, p.z,
        cx * cz, sx * cz, sx * sz, cx * sz,
    );
}

export function motorLocal(motor, local) {
    const pose = motor.toThreeJSObject();
    const v = local.isVector3 ? local.clone() : new THREE.Vector3(...local);
    return v.applyQuaternion(pose.quaternion).add(pose.position);
}

/**
 * A coordinate frame with real stroke weight.
 *
 * THREE.AxesHelper is three LineBasicMaterial segments, so it suffers the same
 * hairline problem as everything else — and frames are the most-drawn object in
 * these scenes. Colours follow the corpus palette rather than three's red/green/blue.
 */
export function frameAxes(size = 0.18, { width = STROKE.thin, head = null } = {}) {
    const group = new THREE.Group();
    const h = head === null ? size * 0.3 : head;
    const axes = [
        [new THREE.Vector3(size, 0, 0), 0xb5452f],
        [new THREE.Vector3(0, size, 0), 0x1b9e4b],
        [new THREE.Vector3(0, 0, size), 0x2c6fbb],
    ];
    for (const [v, color] of axes) {
        group.add(drawArrow(new THREE.Vector3(), v, { color, head: h, width }).object3D);
    }
    return group;
}

export function drawFrame2D(size = 0.22) {
    const g = new THREE.Group();
    // The head was a fixed 0.06 regardless of size, so at the 0.1 the arm uses
    // it was more than half the arrow — a row of fat chevrons that outweighed
    // the links they were attached to. Scale it with the arrow instead.
    const head = size * 0.3;
    const ox = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(), size, 0xd1495b, head, head * 0.6);
    const oy = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(), size, 0x3f8f6b, head, head * 0.6);
    g.add(ox, oy);
    return g;
}

export function drawVectorField(fn, {
    x0 = -1.2, x1 = 1.2, y0 = -1.2, y1 = 1.2, z = 0.03,
    zs = null, nx = 9, ny = 9, scale = 0.22, color = 0x1f4e79, head = 0.055,
    // A field is usually context for something else in the frame, and at full
    // strength a grid of arrows simply wins: it is the most ink on screen and
    // the eye goes there. Callers that mean it to be the subject pass 1.
    opacity = 0.65, width = STROKE.thin,
} = {}) {
    let currentFn = fn;
    const group = new THREE.Group();
    const arrows = [];
    function rebuild() {
        while (arrows.length) {
            const a = arrows.pop();
            group.remove(a);
        }
        const zList = zs && zs.length ? zs : [z];
        for (const zz of zList) {
            for (let i = 0; i < nx; i++) {
                for (let j = 0; j < ny; j++) {
                    const x = x0 + (x1 - x0) * ((i + 0.5) / nx);
                    const y = y0 + (y1 - y0) * ((j + 0.5) / ny);
                    const v = currentFn(x, y, zz) || [0, 0, 0];
                    const vx = v[0] || 0, vy = v[1] || 0, vz = v[2] || 0;
                    const len = Math.hypot(vx, vy, vz);
                    if (len < 1e-8) continue;
                    const mag = scale * (0.35 + 0.65 * Math.min(1, len));
                    const arrow = drawArrow(
                        new THREE.Vector3(x, y, zz),
                        new THREE.Vector3(x, y, zz).addScaledVector(
                            new THREE.Vector3(vx, vy, vz).normalize(), mag),
                        { color, head: Math.min(head, mag * 0.45), width, opacity });
                    group.add(arrow.object3D);
                    arrows.push(arrow.object3D);
                }
            }
        }
    }
    rebuild();
    return handle(group, {
        rebuild,
        setFn(next) { currentFn = next; rebuild(); },
    });
}

export function drawSphereField(fn, {
    radius = 0.75, nTheta = 5, nPhi = 10, scale = 0.12, color = 0x1f4e79, head = 0.04,
} = {}) {
    let currentFn = fn;
    const group = new THREE.Group();
    const arrows = [];
    function rebuild() {
        while (arrows.length) {
            const a = arrows.pop();
            group.remove(a);
        }
        for (let i = 1; i < nTheta; i++) {
            const th = Math.PI * i / nTheta;
            for (let j = 0; j < nPhi; j++) {
                const ph = 2 * Math.PI * j / nPhi;
                const p = new THREE.Vector3(
                    radius * Math.sin(th) * Math.cos(ph),
                    radius * Math.sin(th) * Math.sin(ph),
                    radius * Math.cos(th),
                );
                const v = currentFn(p.x, p.y, p.z) || [0, 0, 0];
                const dir = new THREE.Vector3(v[0], v[1], v[2]);
                dir.addScaledVector(p, -dir.dot(p) / Math.max(p.lengthSq(), 1e-12));
                if (dir.length() < 1e-8) continue;
                const arrow = drawArrow(p, p.clone().addScaledVector(dir.normalize(), scale),
                    { color, head, width: STROKE.thin });
                group.add(arrow.object3D);
                arrows.push(arrow.object3D);
            }
        }
    }
    rebuild();
    return handle(group, {
        rebuild,
        setFn(next) { currentFn = next; rebuild(); },
    });
}

export function integratePath(start, vel, { steps = 100, dt = 0.05, stop } = {}) {
    const pts = [];
    const p = start.clone ? start.clone() : new THREE.Vector3(...start);
    p.z = p.z || 0;
    for (let i = 0; i <= steps; i++) {
        pts.push(p.clone());
        if (stop && stop(p, i)) break;
        const v = vel(p.x, p.y, p.z) || [0, 0, 0];
        p.x += dt * (v[0] || 0);
        p.y += dt * (v[1] || 0);
        p.z += dt * (v[2] || 0);
    }
    return pts;
}

export function drawPlaneFromPoints(p, q, r, { color = 0x4499ff, size = 1.2, opacity = 0.28 } = {}) {
    const a = vec3(p), b = vec3(q), c = vec3(r);
    const n = b.clone().sub(a).cross(c.clone().sub(a)).normalize();
    const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(size, size),
        new THREE.MeshStandardMaterial({
            color, transparent: true, opacity, side: THREE.DoubleSide,
        }),
    );
    const mid = a.clone().add(b).add(c).multiplyScalar(1 / 3);
    mesh.position.copy(mid);
    mesh.quaternion.setFromUnitVectors(Z, n);
    return handle(mesh);
}

export function drawSphereAt(center, radius, { color = 0x66cc66, opacity = 0.28 } = {}) {
    const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(radius, 24, 16),
        new THREE.MeshStandardMaterial({
            color, transparent: true, opacity, side: THREE.DoubleSide,
        }),
    );
    mesh.position.copy(center.isVector3 ? center : vec3(center));
    return handle(mesh, {
        update(c) {
            mesh.position.copy(c.isVector3 ? c : vec3(c));
        },
    });
}

export function placeMotor(obj, motor) {
    try {
        const pose = motor.toThreeJSObject();
        const p = pose.position;
        const q = pose.quaternion;
        if (p && typeof p.x === 'number') obj.position.set(p.x, p.y, p.z);
        if (q && typeof q.x === 'number') obj.quaternion.set(q.x, q.y, q.z, q.w);
        return obj;
    } catch (_) {
        const a = motor.toPositionQuaternion();
        obj.position.set(a[0], a[1], a[2]);
        obj.quaternion.set(a[4], a[5], a[6], a[3]);
        return obj;
    }
}

export function motorAxes(motor, size = 0.18) {
    const axes = frameAxes(size);
    placeMotor(axes, motor);
    return axes;
}

export function trail(color = 0x3f8f6b, max = 180) {
    const pts = [];
    const line = drawPolyline([], { color, width: STROKE.thin });
    return {
        object3D: line.object3D,
        push(p) {
            pts.push(p.clone());
            if (pts.length > max) pts.shift();
            line.update(pts);
        },
        clear() {
            pts.length = 0;
            line.update(pts);
        },
    };
}

/* ------------------------------------------------------------------ *
 * Primitives drawn as solids. A polyline circle is a wire; a shaded ring
 * with a faint disc reads as a circle in space, and a sphere with its
 * great circles reads as a sphere rather than a blob.
 * ------------------------------------------------------------------ */

function solidMaterial(color, opacity) {
    return new THREE.MeshStandardMaterial({
        color, roughness: 0.42, metalness: 0.04,
        transparent: opacity < 1, opacity, depthWrite: opacity >= 1,
    });
}

/**
 * A circle as a shaded ring: centre, radius, unit normal. `tube` is the ring's
 * thickness in metres, `disc` the opacity of a faint fill inside it (0: none).
 */
export function drawCircle3D(centre, radius, normal, { color = 0xe8641e, tube = 0.006, opacity = 1, disc = 0 } = {}) {
    const group = new THREE.Group();
    const ring = new THREE.Mesh(new THREE.TorusGeometry(Math.max(radius, 1e-4), tube, 12, 96), solidMaterial(color, opacity));
    ring.castShadow = true;
    group.add(ring);
    let fill = null;
    if (disc > 0) {
        fill = new THREE.Mesh(new THREE.CircleGeometry(1, 72), new THREE.MeshBasicMaterial({
            color, transparent: true, opacity: disc, side: THREE.DoubleSide, depthWrite: false,
        }));
        group.add(fill);
    }
    const place = (c, r, n) => {
        const cc = vec3(c);
        const nn = vec3(n).normalize();
        if (Math.abs(ring.geometry.parameters.radius - r) > 1e-6) {
            ring.geometry.dispose();
            ring.geometry = new THREE.TorusGeometry(Math.max(r, 1e-4), tube, 12, 96);
        }
        ring.position.copy(cc);
        ring.quaternion.setFromUnitVectors(Z, nn);
        if (fill) {
            fill.position.copy(cc);
            fill.scale.setScalar(Math.max(r, 1e-4));
            fill.quaternion.copy(ring.quaternion);
        }
    };
    place(centre, radius, normal);
    return handle(group, { update: place });
}

/** A sphere as a translucent solid with its three great circles. */
export function drawSphere(centre, radius, { color = 0xe8641e, opacity = 0.2, rings = true } = {}) {
    const group = new THREE.Group();
    const body = new THREE.Mesh(new THREE.SphereGeometry(1, 48, 32), solidMaterial(color, opacity));
    group.add(body);
    const circles = [];
    if (rings) {
        for (const n of [[1, 0, 0], [0, 1, 0], [0, 0, 1]]) {
            const c = new THREE.Mesh(new THREE.TorusGeometry(1, 0.012, 8, 96), solidMaterial(color, 0.75));
            c.quaternion.setFromUnitVectors(Z, new THREE.Vector3(...n));
            group.add(c);
            circles.push(c);
        }
    }
    const place = (c, r) => {
        group.position.copy(vec3(c));
        group.scale.setScalar(Math.max(r, 1e-4));
    };
    place(centre, radius);
    return handle(group, { update: place });
}

/**
 * A line through two points, drawn well past both: a line is not a segment,
 * and the overshoot is what says so. `extend` is the fraction of |ab| added
 * at each end.
 */
export function drawLine3D(a, b, { color = 0x1f6fe0, width = STROKE.bold, extend = 0.35, opacity = 1 } = {}) {
    const ends = (p, q) => {
        const pa = vec3(p), pb = vec3(q);
        const d = pb.clone().sub(pa);
        return [pa.clone().addScaledVector(d, -extend), pb.clone().addScaledVector(d, extend)];
    };
    const seg = drawSegment(...ends(a, b), { color, width, opacity });
    return handle(seg.object3D, { update(p, q) { seg.update(...ends(p, q)); } });
}

/** A plane as a translucent square with a drawn edge, centred at `centre` with unit `normal`. */
export function drawPlane(centre, normal, size, { color = 0x1f6fe0, opacity = 0.16, width = STROKE.thin } = {}) {
    const group = new THREE.Group();
    const face = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshStandardMaterial({
        color, transparent: true, opacity, side: THREE.DoubleSide, depthWrite: false, roughness: 0.6,
    }));
    group.add(face);
    const h = 0.5;
    const edge = drawPolyline([[-h, -h, 0], [h, -h, 0], [h, h, 0], [-h, h, 0]], { color, width, closed: true, opacity: 0.85 });
    group.add(edge.object3D);
    const place = (c, n, s) => {
        group.position.copy(vec3(c));
        group.quaternion.setFromUnitVectors(Z, vec3(n).normalize());
        group.scale.set(s, s, 1);
    };
    place(centre, normal, size);
    return handle(group, { update: place });
}

/** A point pair: two points and the bar between them. */
export function drawPointPair(a, b, { color = 0x6a4fc8, radius = 0.03 } = {}) {
    const group = new THREE.Group();
    const p = drawPoint(a, { color, radius }), q = drawPoint(b, { color, radius });
    const bar = drawSegment(a, b, { color, width: STROKE.thin, opacity: 0.8 });
    group.add(p.object3D, q.object3D, bar.object3D);
    return handle(group, { update(x, y) { p.update(x); q.update(y); bar.update(vec3(x), vec3(y)); } });
}
