import * as THREE from 'three';

/**
 * Load the gafro WASM module. Callers: gallery.js, boot.js.
 * Tries demos/_lib (make_demos.py) then node_modules/gafro. No data files.
 */
export async function loadGafroModule() {
    const candidates = [
        new URL('../_lib/js/index.js', import.meta.url),
        new URL('../_lib/gafro.js', import.meta.url),
        new URL('../../node_modules/gafro/js/index.js', import.meta.url),
    ];
    let lastErr;
    let mod;
    for (const url of candidates) {
        try {
            mod = await import(url.href);
            break;
        } catch (err) {
            lastErr = err;
        }
    }
    if (!mod) {
        throw new Error(
            'gafro JS/WASM not found. npm install && python3 make_demos.py'
            + (lastErr ? ` (${lastErr.message})` : ''),
        );
    }
    const load = typeof mod.loadGafro === 'function' ? mod.loadGafro : mod.default;
    if (typeof load !== 'function') {
        throw new Error('gafro package has no loadGafro()');
    }
    const gafro = await load();
    try {
        if (gafro.THREE && typeof gafro.THREE.set === 'function') {
            gafro.THREE.set({ Vector3: THREE.Vector3, Quaternion: THREE.Quaternion });
        }
    } catch (err) {
        console.warn('gafro.THREE.set failed', err);
    }
    return gafro;
}
