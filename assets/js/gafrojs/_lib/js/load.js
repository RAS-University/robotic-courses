// SPDX-FileCopyrightText: 2026 Tobias Loew <tobias.loew@gafro.ch>
//
// SPDX-FileContributor: Tobias Loew <tobias.loew@gafro.ch>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//
// SPDX-License-Identifier: MPL-2.0

import wasmFactory from '../dist/gafrojs.js';
import { setGafroModule } from './visualization/module.js';

/**
 * Load the WASM module. Sidecars (gafrojs.wasm) resolve next to ``dist/`` unless
 * ``opts.locateBase`` is a directory URL (used by the geometry-for-robotics demos).
 */
export async function loadGafro(opts = {}) {
    const locateFile = opts.locateFile || ((path, prefix) => {
        if (path.endsWith('.wasm') || path.endsWith('.data')) {
            if (opts.locateBase) {
                const base = opts.locateBase.endsWith('/') ? opts.locateBase : opts.locateBase + '/';
                return new URL(path, base).href;
            }
            return new URL('../dist/' + path, import.meta.url).href;
        }
        return prefix + path;
    });

    const gafro = await wasmFactory({ locateFile, ...(opts.moduleArg || {}) });

    try {
        const THREE = await import('three');
        if (gafro.THREE && typeof gafro.THREE.set === 'function') {
            gafro.THREE.set(THREE);
        }
    } catch {
        // optional: three.js peer dependency / import map
    }

    setGafroModule(gafro);
    return gafro;
}

export default loadGafro;
