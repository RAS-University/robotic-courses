/**
 * Shared scene furniture: the corpus palette, an HTML annotation overlay
 * pinned over the canvas, an autoplay clock, and the slide-stage protocol.
 *
 * Every scene is embedded in a slide with `ui=0`, so the demo has to explain
 * itself: a title, a legend, a caption saying what to watch, and labels that
 * follow the geometry.
 */
import * as THREE from 'three';
import katex from 'https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.mjs';
import { slider } from './ui.js?v=42';
import { MACROS } from './macros.js?v=42';

/**
 * Put `text` into `el`, typesetting every $...$ segment with KaTeX and the book's own
 * macros (runtime/macros.js is generated from notation.py), so a scene writes \rev{M}
 * and \Exp exactly as the page around it does. Text without a $ is set as plain text.
 */
let katexCss = false;
export function typeset(el, text) {
    text = text == null ? '' : String(text);
    if (el.__tex === text) return;          // tags re-set every frame: only typeset changes
    el.__tex = text;
    if (!text.includes('$')) { el.textContent = text; return; }
    if (!katexCss) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.css';
        document.head.appendChild(link);
        katexCss = true;
    }
    el.replaceChildren();
    for (const part of text.split(/(\$[^$]+\$)/)) {
        if (part.length > 2 && part.startsWith('$') && part.endsWith('$')) {
            const span = document.createElement('span');
            katex.render(part.slice(1, -1), span, { throwOnError: false, macros: { ...MACROS } });
            el.appendChild(span);
        } else if (part) {
            el.appendChild(document.createTextNode(part));
        }
    }
}

/** Matches decks/slides/_anim.html so a demo and its slide read as one figure. */
export const C = {
    ink:       0x1c1a17,
    muted:     0x5c574e,
    faint:     0xc9c2b4,
    paper:     0xfffdf8,
    point:     0x1f6fe0,
    vector:    0x14a84a,
    covector:  0xc62a55,
    ga:        0x0f8f82,
    classical: 0xe8641e,
    wrong:     0xd62828,
    pairing:   0x6a4fc8,
    gold:      0x8a7f63,
};

export const CSS = (hex) => '#' + hex.toString(16).padStart(6, '0');

const FONT = 'system-ui, -apple-system, "Segoe UI", sans-serif';
const SERIF = '"Times New Roman", Times, serif';

/**
 * overlay(viewer) -> annotation layer.
 *
 *   ov.title('Rotor sandwich', 'Cl+(3,0)')
 *   ov.legend([[C.vector, 'v'], [C.covector, 'R v ~R']])
 *   ov.caption('the plane of B is fixed; everything in it turns')
 *   ov.formula('x  ↦  R x ~R')
 *   const t = ov.tag(() => mesh.position, 'v', { color: C.vector })
 *
 * There is deliberately no live numeric readout. A column of digits ticking
 * every frame in the corner of a slide is clutter nobody can read while the
 * geometry moves; `ov.readout()` still exists so scenes keep their calls, but
 * it renders nothing. Use a tag on the geometry or a gauge bar instead.
 */
export function overlay(viewer) {
    const root = document.createElement('div');
    root.style.cssText = [
        'position:absolute', 'inset:0', 'pointer-events:none', 'z-index:3',
        'color:' + CSS(C.ink), 'font-family:' + FONT, 'overflow:hidden',
    ].join(';');
    viewer.container.style.position = viewer.container.style.position || 'relative';
    viewer.container.appendChild(root);
    // `?zoom=1.4` scales the whole annotation layer: a deck projected in a hall
    // needs the legend and readouts larger than the gallery does.
    const zoom = Number(new URLSearchParams(location.search).get('zoom')) || 1;
    if (zoom !== 1) root.style.zoom = String(zoom);
    // `?text=0` keeps only the title and legend: a talk slide says its own line.
    const quiet = new URLSearchParams(location.search).get('text') === '0';

    const mk = (css, parent) => {
        const d = document.createElement('div');
        d.style.cssText = css;
        (parent || root).appendChild(d);
        return d;
    };

    // --- top left: title + subtitle -------------------------------------
    const head = mk('position:absolute;top:12px;left:14px;max-width:62%;');
    // `?head=0` drops the scene's own title: a deck slide already has one.
    if (new URLSearchParams(location.search).get('head') === '0') head.style.display = 'none';
    const titleEl = mk('font-size:22px;font-weight:650;letter-spacing:-0.01em;line-height:1.25;', head);
    const subEl = mk('font-size:15px;color:' + CSS(C.muted) + ';margin-top:2px;font-family:' + SERIF + ';font-style:italic;', head);
    subEl.style.display = 'none';

    // --- top right: legend ----------------------------------------------
    const legendEl = mk('position:absolute;top:12px;right:14px;text-align:right;font-size:15px;line-height:1.6;');
    // `?legend=0` drops the legend too: a slide whose tags already name everything.
    if (new URLSearchParams(location.search).get('legend') === '0') legendEl.style.display = 'none';

    // --- bottom left: formula -------------------------------------------
    const footL = mk('position:absolute;bottom:52px;left:14px;max-width:66%;font-size:16px;line-height:1.5;');
    const formulaEl = mk('font-family:' + SERIF + ';font-style:italic;font-size:20px;white-space:pre-wrap;', footL);   // formulas space their parts with runs of blanks
    formulaEl.style.display = 'none';

    // --- bottom centre: caption -----------------------------------------
    if (quiet) footL.style.display = 'none';
    const capEl = mk([
        'position:absolute', 'bottom:8px', 'left:12px', 'right:12px',
        'text-align:center', 'font-size:16px', 'line-height:1.4',
        'color:' + CSS(C.muted), 'background:rgba(255,253,248,.86)',
        'padding:4px 10px', 'border-radius:6px', 'box-sizing:border-box',
    ].join(';'));
    capEl.style.display = 'none';

    // Gauges stack upward from the bottom-left. Before this they all shared
    // one hardcoded offset, so a scene with two of them drew both on top of
    // each other and a scene with four was illegible.
    let gaugeCount = 0;

    // --- world-anchored tags --------------------------------------------
    const tags = [];
    const v = new THREE.Vector3();

    // Stack the bottom-left block (formula, then gauges) above the caption, whatever
    // their heights. They used to sit at fixed offsets, so a caption that wrapped to a
    // second line, or a formula that wrapped, ran into the other.
    function stack() {
        const capH = capEl.style.display === 'none' ? 0 : capEl.offsetHeight + 8;
        footL.style.bottom = (8 + capH + 6) + 'px';
        const footH = footL.style.display === 'none' || formulaEl.style.display === 'none' ? 0 : footL.offsetHeight + 8;
        gauges.forEach((g, i) => { g.style.bottom = (8 + capH + 6 + footH + i * 46) + 'px'; });
    }
    const gauges = [];
    const warns = [];
    if (typeof ResizeObserver !== 'undefined') new ResizeObserver(stack).observe(root);

    const overlaps = (a, b) => a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;
    function project() {
        const w = viewer.container.clientWidth / zoom;
        const h = viewer.container.clientHeight / zoom;
        const fixed = [head, legendEl, footL, capEl, ...warns.filter((e) => e.style.opacity === '1')]
            .filter((e) => e.style.display !== 'none' && e.textContent.trim())
            .map((e) => {   // client rects include transforms (the warning badge is centred by one)
                const r = e.getBoundingClientRect(), o = root.getBoundingClientRect();
                return { left: (r.left - o.left) / zoom, top: (r.top - o.top) / zoom, right: (r.right - o.left) / zoom, bottom: (r.bottom - o.top) / zoom };
            });
        const placed = [];
        for (const t of tags) {
            const p = t.get();
            if (!p) { t.el.style.display = 'none'; continue; }
            v.set(p.x ?? p[0], p.y ?? p[1], p.z ?? p[2]);
            v.project(viewer.camera);
            if (v.z > 1) { t.el.style.display = 'none'; continue; }
            t.el.style.display = t.hidden ? 'none' : 'block';
            if (t.hidden) continue;
            const tw = t.el.offsetWidth, th = t.el.offsetHeight;
            // Keep the label on the page, then step it up past any label or text
            // block it would sit on: two tags on nearby points used to print over
            // each other, and a tag near the bottom over the caption.
            let x = Math.min(Math.max(0, (v.x * 0.5 + 0.5) * w + (t.dx || 8)), Math.max(0, w - tw - 2));
            let y = Math.min(Math.max(0, (-v.y * 0.5 + 0.5) * h + (t.dy || -10)), Math.max(0, h - th - 2));
            for (let k = 0; k < 8; k++) {
                const box = { left: x, top: y, right: x + tw, bottom: y + th };
                const hit = placed.concat(fixed).find((b) => overlaps(box, b));
                if (!hit) break;
                y = hit.top - th - 1 >= 0 ? hit.top - th - 1 : hit.bottom + 1;
            }
            t.el.style.left = x + 'px';
            t.el.style.top = y + 'px';
            placed.push({ left: x, top: y, right: x + tw, bottom: y + th });
        }
    }
    const off = viewer.onUpdate(project);

    return {
        root,
        title(text, sub) {
            titleEl.textContent = text || '';
            typeset(subEl, sub);
            subEl.style.display = sub ? 'block' : 'none';
            return this;
        },
        legend(items) {
            legendEl.replaceChildren();
            for (const [color, text, style] of items) {
                const row = document.createElement('div');
                const sw = document.createElement('span');
                const dashed = style === 'dashed';
                sw.style.cssText = [
                    'display:inline-block', 'width:26px', 'height:0',
                    'vertical-align:middle', 'margin-right:7px',
                    'border-top:4px ' + (dashed ? 'dashed ' : 'solid ') + CSS(color),
                ].join(';');
                const tx = document.createElement('span');
                typeset(tx, text);
                tx.style.color = CSS(C.ink);
                row.append(sw, tx);
                legendEl.appendChild(row);
            }
            return this;
        },
        caption(text) {
            typeset(capEl, text);
            capEl.style.display = text && !quiet ? 'block' : 'none';
            stack();
            return this;
        },
        formula(text) {
            typeset(formulaEl, text);
            formulaEl.style.display = text ? 'block' : 'none';
            stack();
            return this;
        },
        /**
         * Kept for API compatibility; renders nothing. Scenes used to print a
         * live number here every frame, which reads as noise on a slide.
         */
        readout() {
            return { set() {}, hide() {}, show() {} };
        },
        /** A label that follows a 3D position. `get` returns a Vector3-ish or null. */
        tag(get, text, { color = C.ink, dx = 9, dy = -11, size = 16, italic = true } = {}) {
            const el = document.createElement('div');
            typeset(el, text);
            el.style.cssText = [
                'position:absolute', 'white-space:nowrap', 'font-size:' + size + 'px',
                'font-family:' + SERIF, italic ? 'font-style:italic' : '',
                'font-weight:600', 'color:' + CSS(color),
                'text-shadow:0 0 3px #fff,0 0 3px #fff,0 0 3px #fff',
            ].join(';');
            root.appendChild(el);
            const t = { el, get, dx, dy, hidden: false };
            tags.push(t);
            return {
                set(s) { typeset(el, s); },
                color(c) { el.style.color = CSS(c); },
                visible(on) { t.hidden = !on; },
                remove() {
                    const i = tags.indexOf(t);
                    if (i >= 0) tags.splice(i, 1);
                    el.remove();
                },
            };
        },
        /**
         * A scalar, shown as a bar rather than as digits.
         *
         * A number is not something an audience sees change -- it is
         * something they would have to read. A bar with a zero in the middle
         * shows sign, size and the approach to zero at a glance, which is
         * what a scene built around "this quantity vanishes" actually needs.
         * The bar carries no digits; the second argument of `set` is ignored.
         */
        gauge(label, { span = 1, width = 260 } = {}) {
            const box = mk([
                'position:absolute', 'bottom:' + (96 + gaugeCount * 46) + 'px', 'left:14px',
                'width:' + width + 'px', 'font-size:14px',
            ].join(';'));
            gaugeCount += 1;
            gauges.push(box);
            stack();
            const cap = mk('color:' + CSS(C.muted) + ';margin-bottom:3px;', box);
            cap.textContent = label;
            const track = mk([
                'position:relative', 'height:14px', 'border-radius:7px',
                'background:#efeae0', 'overflow:hidden',
            ].join(';'), box);
            const fill = mk('position:absolute;top:0;bottom:0;left:50%;width:0;transition:none;', track);
            mk([
                'position:absolute', 'top:-3px', 'bottom:-3px', 'left:50%',
                'width:2px', 'background:' + CSS(C.ink), 'opacity:.55',
            ].join(';'), track);
            return {
                set(v) {
                    const f = Math.max(-1, Math.min(1, (Number(v) || 0) / span));
                    fill.style.width = Math.abs(f) * 50 + '%';
                    fill.style.left = f < 0 ? (50 - Math.abs(f) * 50) + '%' : '50%';
                    fill.style.background = CSS(f < 0 ? C.covector : C.ga);
                },
                hide() { box.style.display = 'none'; },
                show() { box.style.display = ''; },
            };
        },

        /** A warning badge that fades in and out. */
        warn(text) {
            const el = mk([
                'position:absolute', 'top:50%', 'left:50%', 'transform:translate(-50%,-50%)',
                'font-size:18px', 'font-weight:700', 'color:' + CSS(C.wrong),
                'background:rgba(255,255,255,.9)', 'border:2px solid ' + CSS(C.wrong),
                'padding:5px 12px', 'border-radius:8px', 'opacity:0',
                'transition:opacity .25s ease',
            ].join(';'));
            el.textContent = text;
            warns.push(el);
            return { show(on) { el.style.opacity = on ? '1' : '0'; }, set(s) { el.textContent = s; } };
        },
        dispose() { off(); root.remove(); },
    };
}

/**
 * Options a slide can set on the embed URL:
 *   ui=0      hide the control panel (the deck always does this)
 *   play=0    start paused — a still figure
 *   speed=n   run the sweep n times faster or slower
 */
export function options() {
    const p = new URLSearchParams(location.search);
    const speed = Number(p.get('speed'));
    return {
        embedded: p.get('ui') === '0',
        play: p.get('play') !== '0',
        speed: Number.isFinite(speed) && speed > 0 ? speed : 1,
    };
}

/**
 * loop(viewer, period, fn) — calls fn(phase, seconds) every frame with
 * `phase` cycling 0→1 over `period` seconds.
 *
 * Presenting wants motion, not a slider nobody will touch, so this runs by
 * default; `?play=0` starts it paused and the panel's first toggle stops it.
 * Returns { playing, pause, resume, toggle, dispose }.
 */
export function loop(viewer, period, fn) {
    const opts = options();
    period = period / opts.speed;
    let playing = opts.play;
    let base = performance.now();
    let held = 0;
    const off = viewer.onUpdate(() => {
        const t = playing ? (performance.now() - base) / 1000 : held;
        fn((t / period) % 1, t);
    });
    const api = {
        get playing() { return playing; },
        /** set by the scene so the panel's `play` box follows the animation */
        onPlayChange: null,
        pause() {
            if (!playing) return;
            held = (performance.now() - base) / 1000;
            playing = false;
            if (api.onPlayChange) api.onPlayChange(false);
        },
        resume() {
            if (playing) return;
            base = performance.now() - held * 1000;
            playing = true;
            if (api.onPlayChange) api.onPlayChange(true);
        },
        toggle(on) { on ? api.resume() : api.pause(); },
        dispose: off,
    };
    return api;
}

/**
 * knob — a parameter the animation sweeps *and* the viewer can take over.
 *
 *   const k = knob(controls, anim, { min: 0, max: 2, value: 1, title: 'θ' },
 *                  (v) => { theta = v; redraw(); });
 *   // inside the loop:
 *   k.sweep(0.9 + 0.5 * Math.sin(p * Math.PI * 2));
 *
 * Presenting gets motion for free; dragging the slider pauses the sweep and
 * hands control over; the panel's `play` toggle hands it back. Embedded with
 * `ui=0` there is no slider at all and only the sweep runs.
 */
export function knob(controls, anim, spec, onUser) {
    let held = false;
    const input = controls
        ? slider(controls, spec, (v) => { held = true; anim.pause(); onUser(v); })
        : null;
    return {
        input,
        get held() { return held; },
        /** Offer the animation's value; ignored while the viewer holds the knob. */
        sweep(v) {
            if (held && !anim.playing) return null;
            held = false;
            if (input && input.sync) input.sync(v);
            onUser(v);
            return v;
        },
        release() { held = false; },
    };
}

/** Smooth 0→1→0 ping-pong of a 0→1 phase. */
export const pingpong = (p) => (p < 0.5 ? p * 2 : 2 - p * 2);
/** Cosine ease of a 0→1 phase. */
export const ease = (p) => 0.5 - 0.5 * Math.cos(Math.PI * 2 * p);

/**
 * onStage(fn) — the slide deck posts { type:'gfr-stage', stage } as the
 * presenter advances. Returns a disposer.
 */
export function onStage(fn) {
    const handler = (ev) => {
        const d = ev.data;
        if (!d || d.type !== 'gfr-stage') return;
        fn(Math.max(1, Number(d.stage) || 1));
    };
    window.addEventListener('message', handler);
    try { window.parent.postMessage({ type: 'gfr-stage-ready' }, '*'); } catch (err) { /* not embedded */ }
    return () => window.removeEventListener('message', handler);
}

/**
 * stages(count, fn) — reveal a scene a step at a time.
 *
 * Staging existed already, but only as a message a slide could post: a scene
 * had to be driven from outside, so nothing staged worked in the gallery and
 * most scenes showed everything at once. This wraps the same protocol so a
 * scene declares how many steps it has and what each one shows, and gets the
 * deck's arrow keys, the gallery's arrow keys, and a starting state for free.
 *
 *   const st = stages(3, (n) => {
 *       thing.object3D.visible = n >= 2;
 *       ov.caption(n === 1 ? 'the tool is here' : 'and this is why');
 *   });
 *
 * `fn` is called immediately with 1, and again on every change. Returns the
 * controller: { current, set, next, prev, dispose }.
 */
export function stages(count, fn) {
    let current = 0;
    const total = Math.max(1, count);

    function set(n) {
        const next = Math.max(1, Math.min(total, Math.round(n) || 1));
        if (next === current) return current;
        current = next;
        fn(current, total);
        return current;
    }

    const off = onStage(set);
    // In the deck the presenter's arrow keys belong to reveal, which forwards a
    // stage; standalone there is nobody to forward one, so take the keys here.
    const key = (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') { set(current + 1); e.preventDefault(); }
        else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { set(current - 1); e.preventDefault(); }
    };
    if (!embedded()) window.addEventListener('keydown', key);

    // A slide may name the stage to open on, which is how a deck shows the same
    // scene at two different points in its build-up.
    const wanted = Number(new URLSearchParams(location.search).get('stage'));
    set(Number.isFinite(wanted) && wanted > 0 ? wanted : 1);

    return {
        get current() { return current; },
        get total() { return total; },
        set,
        next() { return set(current + 1); },
        prev() { return set(current - 1); },
        dispose() { off(); window.removeEventListener('keydown', key); },
    };
}

/** True when the scene is embedded in a slide (panel hidden). */
export function embedded() {
    return new URLSearchParams(location.search).get('ui') === '0';
}

/**
 * ramp(t) — a paper→teal→plum sequential colormap that reads on a white ground.
 * Returns [r, g, b] in 0..1 for THREE vertex colours.
 */
export function ramp(t) {
    const u = Math.max(0, Math.min(1, t));
    const stops = [
        [0.996, 0.992, 0.973],   // paper
        [0.843, 0.925, 0.910],   // pale teal
        [0.165, 0.435, 0.416],   // teal
        [0.545, 0.227, 0.290],   // plum
    ];
    const s = u * (stops.length - 1);
    const i = Math.min(stops.length - 2, Math.floor(s));
    const f = s - i;
    return [0, 1, 2].map((k) => stops[i][k] + f * (stops[i + 1][k] - stops[i][k]));
}
