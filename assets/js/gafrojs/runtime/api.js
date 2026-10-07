/** Nested WASM (gafro.algebra.cga) with a flat fallback. */

export function cga(g) {
    return (g && g.algebra && g.algebra.cga) ? g.algebra.cga : g;
}

export function pga(g) {
    return (g && g.algebra && g.algebra.pga) ? g.algebra.pga : {};
}

export function physics(g) {
    return (g && g.physics) ? g.physics : g;
}

export function xyz(p) {
    if (!p) return [0, 0, 0];
    if (typeof p.x === 'function') return [p.x(), p.y(), p.z()];
    if (p.toVector3) {
        const v = p.toVector3();
        return [v.x ?? v[0], v.y ?? v[1], v.z ?? v[2]];
    }
    const a = p.toArray ? p.toArray() : p;
    return [a[0] || 0, a[1] || 0, a[2] || 0];
}

export function applyPoint(M, P) {
    if (P.apply) return P.apply(M);
    if (M.applyToPoint) return M.applyToPoint(P);
    throw new Error('no Point.apply / Motor.applyToPoint on this gafro build');
}

export function applyVector(M, V) {
    if (M.applyToVector) return M.applyToVector(V);
    throw new Error('Motor.applyToVector missing');
}

export function jsArr(v) {
    if (!v) return [0, 0, 0];
    if (Array.isArray(v)) return v;
    if (typeof v.toArray === 'function') return Array.from(v.toArray());
    if (typeof v.length === 'number') return Array.from(v);
    if (typeof v.x === 'number') return [v.x, v.y, v.z];
    if (typeof v.x === 'function') return [v.x(), v.y(), v.z()];
    return [0, 0, 0];
}
