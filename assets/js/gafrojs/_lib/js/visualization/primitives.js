// SPDX-FileCopyrightText: 2026 Tobias Loew <tobias.loew@gafro.ch>
//
// SPDX-FileContributor: Tobias Loew <tobias.loew@gafro.ch>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//
// SPDX-License-Identifier: MPL-2.0

import * as THREE from 'three';
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { quaternionFromZTo, vec3From, cgaNamespace, poseFromMotor } from './math.js';
import { getGafroModule } from './module.js';

// LineBasicMaterial.linewidth is ignored by the WebGL renderer on most
// platforms. We use the Line2 addon (instanced screen-space triangles) so
// `lineWidth` is honored as pixels. LineMaterial needs the viewport size
// to compute pixel widths — we track it here and update on window resize.
const _lineMaterials = new Set();
function _registerLineMaterial(mat) {
    mat.resolution.set(window.innerWidth, window.innerHeight);
    _lineMaterials.add(mat);
}
if (typeof window !== 'undefined') {
    window.addEventListener('resize', () => {
        for (const m of _lineMaterials) m.resolution.set(window.innerWidth, window.innerHeight);
    });
}

// Quaternion that rotates +Z onto an arbitrary unit vector. Used to
// place geometries that are authored in three.js with their natural
// axis along +Z (PlaneGeometry, CircleGeometry rings, ...) onto a
// gafrojs normal/direction.
function normalizedVec3(gv) {
    const v = vec3From(gv);
    if (v.lengthSq() === 0) return new THREE.Vector3(0, 0, 1);
    return v.normalize();
}

// Some primitives (Line, Plane) need to construct a gafro.Point on the fly
// to project the world origin onto themselves. We don't import gafrojs here
// to avoid a cycle; the user wires it in once at startup via setGafroModule.
function pointAt(x, y, z) {
    const g = getGafroModule();
    if (!g) return null;
    const P = cgaNamespace(g).Point;
    if (!P) return null;
    return new P(x, y, z);
}

/**
 * Drawing helpers for gafrojs CGA primitives. Every helper takes a
 * gafrojs object (Point, Vector, Line, Plane, Sphere, Circle,
 * PointPair) plus optional style options, and returns a handle:
 *
 *   {
 *     object3D,             // the underlying THREE.Object3D (already added to your scene)
 *     setColor(hex),        // change the color
 *     update(newPrimitive), // re-fit geometry to a new gafrojs primitive of the same kind
 *     remove(),             // remove from its parent (so the viewer no longer renders it)
 *   }
 *
 * The handles are pure three.js underneath — you can also tweak
 * `handle.object3D` directly if you need something the helper does
 * not expose.
 */

export const DEFAULTS = {
    point:     { color: 0xff0000, radius: 0.02 },
    vector:    { color: 0x00aaff, length: 1.0, headLength: 0.08, headWidth: 0.04 },
    line:      { color: 0xffaa00, extent: 50, lineWidth: 3 },
    plane:     { color: 0x44aaff, size: 1.0, opacity: 0.35 },
    sphere:    { color: 0x66dd66, opacity: 0.35 },
    circle:    { color: 0xaa66ff, segments: 64, lineWidth: 3 },
    pointPair: { color: 0xff66aa, radius: 0.02 },
};

function setMaterialColor(material, hex) {
    if (Array.isArray(material)) {
        for (const m of material) m.color.set(hex);
    } else {
        material.color.set(hex);
    }
}

// We attach helper methods directly to the THREE.Object3D so the handle IS
// a three.js node — callers can do `scene.add(handle)`, `viewer.add(handle)`,
// `handle.setColor(...)`, `handle.update(prim)`, `handle.remove()` uniformly.
// `object3D` is still exposed as a self-reference for backwards compatibility.
//
// We override `remove()` to mean "detach me from my parent" (zero-arg form).
// Three.js's own `Object3D.remove(child)` is for removing children, which
// these primitive handles never need to do externally.
function makeHandle(object3D, setColor, updateFn, onRemove) {
    object3D.object3D = object3D;
    object3D.setColor = (hex) => setColor(hex);
    object3D.update = (prim) => updateFn(prim);
    object3D.remove = () => {
        if (object3D.parent) object3D.parent.remove(object3D);
        if (onRemove) onRemove();
    };
    return object3D;
}

/* -------------------------------- Point -------------------------------- */
export function drawPoint(point, opts = {}) {
    const { color, radius } = { ...DEFAULTS.point, ...opts };
    const geom = new THREE.SphereGeometry(radius, 16, 16);
    const mat = new THREE.MeshStandardMaterial({ color });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.copy(vec3From(point));
    return makeHandle(
        mesh,
        (hex) => setMaterialColor(mat, hex),
        (p) => mesh.position.copy(vec3From(p)),
    );
}

/* -------------------------------- Vector ------------------------------- */
export function drawVector(vector, opts = {}) {
    const { color, length, headLength, headWidth, origin } = { ...DEFAULTS.vector, ...opts };
    const dir = new THREE.Vector3(vector.x(), vector.y(), vector.z());
    const len = dir.length() || length;
    dir.normalize();
    const o = origin ? new THREE.Vector3(...origin) : new THREE.Vector3(0, 0, 0);
    const arrow = new THREE.ArrowHelper(dir, o, len, color, headLength, headWidth);
    return makeHandle(
        arrow,
        (hex) => arrow.setColor(new THREE.Color(hex)),
        (v) => {
            const d = new THREE.Vector3(v.x(), v.y(), v.z());
            const l = d.length() || length;
            d.normalize();
            arrow.setDirection(d);
            arrow.setLength(l, headLength, headWidth);
        },
    );
}

/* -------------------------------- Line --------------------------------- */
//
// gafrojs Line bindings only expose `getMotor(target)` (relative to another line),
// not a placement motor. We instead compute endpoints by sampling a point on the
// line via `line.project(origin)` and offsetting along `line.getDirection()`.
//
// `originHint` (optional) is the gafro.Point we project to find a point on the
// line; defaults to the world origin. The constructor is `new gafro.Point(x,y,z)`
// which gafrojs needs — we let the caller pass one in to avoid baking a gafro
// reference into the primitives module.
export function drawLine(line, opts = {}) {
    const { color, extent, originPoint, lineWidth } = { ...DEFAULTS.line, ...opts };

    function endpoints(l) {
        const dir = normalizedVec3(l.getDirection());
        const probe = originPoint || pointAt(0, 0, 0);
        let origin;
        if (probe) {
            const p = l.project(probe);
            origin = new THREE.Vector3(p.x(), p.y(), p.z());
        } else {
            origin = new THREE.Vector3(0, 0, 0);
        }
        return [
            origin.clone().addScaledVector(dir, -extent),
            origin.clone().addScaledVector(dir, +extent),
        ];
    }

    const [a, b] = endpoints(line);
    const geom = new LineGeometry();
    geom.setPositions([a.x, a.y, a.z, b.x, b.y, b.z]);
    const mat = new LineMaterial({ color, linewidth: lineWidth });
    _registerLineMaterial(mat);
    const mesh = new Line2(geom, mat);
    mesh.computeLineDistances();
    return makeHandle(
        mesh,
        (hex) => mat.color.set(hex),
        (l) => {
            const [na, nb] = endpoints(l);
            mesh.geometry.setPositions([na.x, na.y, na.z, nb.x, nb.y, nb.z]);
            mesh.computeLineDistances();
        },
        () => _lineMaterials.delete(mat),
    );
}

/* -------------------------------- Plane -------------------------------- */
//
// Like Line, Plane only exposes `getMotor(target)` (plane-to-plane). We place
// the quad ourselves using `plane.getNormal()` and `plane.project(originPoint)`
// (or a fallback to a normal-distance offset if no originPoint is provided).
export function drawPlane(plane, opts = {}) {
    const { color, size, opacity, originPoint } = { ...DEFAULTS.plane, ...opts };
    const geom = new THREE.PlaneGeometry(size, size);
    const mat = new THREE.MeshStandardMaterial({
        color, transparent: true, opacity, side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geom, mat);

    function place(p) {
        const normal = normalizedVec3(p.getNormal());
        const probe = originPoint || pointAt(0, 0, 0);
        let center;
        if (probe) {
            const c = p.project(probe);
            center = new THREE.Vector3(c.x(), c.y(), c.z());
        } else {
            center = new THREE.Vector3(0, 0, 0);
        }
        mesh.position.copy(center);
        mesh.quaternion.copy(quaternionFromZTo(normal));
    }
    place(plane);

    return makeHandle(
        mesh,
        (hex) => setMaterialColor(mat, hex),
        (p) => place(p),
    );
}

/* -------------------------------- Sphere ------------------------------- */
export function drawSphere(sphere, opts = {}) {
    const { color, opacity, wireframe = false } = { ...DEFAULTS.sphere, ...opts };
    const radius = Math.max(sphere.getRadius(), 1e-6);
    const geom = new THREE.SphereGeometry(radius, 32, 32);
    const mat = new THREE.MeshStandardMaterial({
        color, transparent: opacity < 1, opacity, wireframe,
    });
    const mesh = new THREE.Mesh(geom, mat);

    function place(s) {
        const r = Math.max(s.getRadius(), 1e-6);
        mesh.scale.setScalar(r / radius);
        mesh.position.copy(vec3From(s.getCenter()));
    }
    place(sphere);

    return makeHandle(
        mesh,
        (hex) => setMaterialColor(mat, hex),
        (s) => place(s),
    );
}

/* -------------------------------- Circle ------------------------------- */
export function drawCircle(circle, opts = {}) {
    const { color, segments, lineWidth } = { ...DEFAULTS.circle, ...opts };

    // Unit ring in XY; oriented by circle.getNormal() (binds +Z to it) and
    // scaled by circle.getRadius(), centered at circle.getCenter().
    const positions = [];
    for (let i = 0; i <= segments; ++i) {
        const t = (i / segments) * Math.PI * 2;
        positions.push(Math.cos(t), Math.sin(t), 0);
    }
    const geom = new LineGeometry();
    geom.setPositions(positions);
    const mat = new LineMaterial({ color, linewidth: lineWidth });
    _registerLineMaterial(mat);
    const mesh = new Line2(geom, mat);
    mesh.computeLineDistances();

    function place(c) {
        const r = Math.max(Math.abs(c.getRadius()), 1e-6);
        const center = vec3From(c.getCenter());
        const normal = normalizedVec3(c.getNormal());
        mesh.position.copy(center);
        mesh.quaternion.copy(quaternionFromZTo(normal));
        mesh.scale.setScalar(r);
    }
    place(circle);

    return makeHandle(
        mesh,
        (hex) => mat.color.set(hex),
        (c) => place(c),
        () => _lineMaterials.delete(mat),
    );
}

/* -------------------------------- Motor -------------------------------- */
//
// Draws a Motor as a coordinate frame (RGB axes) at its translation, oriented
// by its rotor. Mirrors gafropy Visualizer.add_motor. Uses toThreeJSObject()
// for { position, quaternion }.
export function drawMotor(motor, opts = {}) {
    const { size = 0.15 } = opts;
    const group = new THREE.Group();
    const axes = new THREE.AxesHelper(size);
    group.add(axes);

    function place(m) {
        const t = poseFromMotor(m);
        group.position.copy(t.position);
        group.quaternion.copy(t.quaternion);
    }
    place(motor);

    return makeHandle(
        group,
        () => {},
        (m) => place(m),
    );
}

/* ------------------------------- PointPair ----------------------------- */
export function drawPointPair(pp, opts = {}) {
    const { color, radius } = { ...DEFAULTS.pointPair, ...opts };
    const group = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({ color });
    const geom = new THREE.SphereGeometry(radius, 16, 16);
    const a = new THREE.Mesh(geom, mat);
    const b = new THREE.Mesh(geom, mat);
    group.add(a);
    group.add(b);

    function place(p) {
        a.position.copy(vec3From(p.getPoint1()));
        b.position.copy(vec3From(p.getPoint2()));
    }
    place(pp);

    return makeHandle(
        group,
        (hex) => setMaterialColor(mat, hex),
        (p) => place(p),
    );
}
