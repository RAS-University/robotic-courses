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

const Z_AXIS = new THREE.Vector3(0, 0, 1);

export function quaternionFromZTo(unit) {
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(Z_AXIS, unit);
    return q;
}

export function vec3From(p) {
    if (!p) return new THREE.Vector3();
    if (p.isVector3) return p.clone();
    if (typeof p.x === 'function') return new THREE.Vector3(p.x(), p.y(), p.z());
    if (typeof p.x === 'number') return new THREE.Vector3(p.x, p.y, p.z);
    // toArray() is every coefficient, so a Translator is read through its own conversion
    if (typeof p.toTranslationVector === 'function') {
        const a = Array.from(p.toTranslationVector());
        return new THREE.Vector3(a[0] || 0, a[1] || 0, a[2] || 0);
    }
    if (Array.isArray(p) || (typeof p.length === 'number' && typeof p[0] === 'number')) {
        return new THREE.Vector3(p[0] || 0, p[1] || 0, p[2] || 0);
    }
    return new THREE.Vector3();
}

export function poseFromMotor(motor) {
    if (typeof motor.toThreeJSObject === 'function') {
        const t = motor.toThreeJSObject();
        if (t && t.position) return t;
    }
    const tr = motor.getTranslator();
    return { position: vec3From(tr), quaternion: new THREE.Quaternion() };
}

export function cgaNamespace(gafro) {
    if (gafro && gafro.algebra && gafro.algebra.cga) return gafro.algebra.cga;
    return gafro;
}
