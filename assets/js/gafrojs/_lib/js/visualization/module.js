// SPDX-FileCopyrightText: 2026 Tobias Loew <tobias.loew@gafro.ch>
//
// SPDX-FileContributor: Tobias Loew <tobias.loew@gafro.ch>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//
// SPDX-License-Identifier: MPL-2.0

/** Shared WASM module handle for visualization helpers (no three.js import). */

let _gafro = null;

export function setGafroModule(gafro) {
    _gafro = gafro;
}

export function getGafroModule() {
    return _gafro;
}
