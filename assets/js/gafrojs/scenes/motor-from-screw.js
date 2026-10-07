import * as THREE from 'three';
import { cga } from '../runtime/api.js?v=42';
import { drawPolyline, drawSegment, drawVectorField, motorAxes, motorLocal, placeMotor, sampleCurve } from '../runtime/draw.js?v=42';
import { clear, slider, toggles } from '../runtime/ui.js?v=42';
import { C, overlay, loop } from '../runtime/scene.js?v=42';

/**
 * 3.4 / 4.2 — Chasles. A rigid motion is a rotation about an axis plus a
 * translation along it, and the pitch is the ratio. Pitch 0 is a hinge, pitch ∞
 * a pure slide; the slider walks between them.
 */
export function build(g, viewer, { controls }) {
    let opt;
    viewer.look([1.8, 1.6, 1.3], [0, 0, 0.35]);
    const A = cga(g);
    let pitch = 0.12;
    let angle = 1.6;

    const moving = motorAxes(A.Motor.Unit(), 0.17);
    viewer.add(moving);
    const field = drawVectorField((x, y) => [-y, x, pitch], { nx: 5, ny: 5, zs: [0.0, 0.45], scale: 0.12 });
    viewer.add(field);
    const axis = drawSegment([0, 0, -0.7], [0, 0, 1.15], { color: C.classical });
    viewer.add(axis);
    const ghosts = [0.16, 0.0].map((r, i) => {
        const line = drawPolyline([], { color: i ? C.covector : C.ga });
        viewer.add(line);
        return { r, line };
    });
    let tip = new THREE.Vector3();

    const ov = overlay(viewer);
    ov.title('The screw', 'Chasles')
      .legend([[C.classical, 'screw axis ℓ'], [C.ga, 'a point on the body'], [C.covector, 'the axis point'], [C.vector, 'velocity field']])
      .formula('$\\Motor = \\exp\\big(-\\tfrac12(\\theta + h\\theta\\, e_\\infty)\\,\\ell\\big)$');
    const readPitch = ov.readout('pitch h ');
    const readAngle = ov.readout('angle θ ');
    const readKind = ov.readout('motion  ');
    ov.tag(() => tip, 'body point', { color: C.ga });
    ov.tag(() => new THREE.Vector3(0, 0, 1.15), 'ℓ', { color: C.classical, dy: -16 });

    function motor(s) {
        const th = angle * s;
        const R = A.Rotor.fromAngleAxis(th, 0, 0, 1);
        const h = pitch * th;
        if (A.Motor.fromTranslationRotor) return A.Motor.fromTranslationRotor(0, 0, h, R);
        return A.Motor.fromTranslation(0, 0, h).multiply(A.Motor.fromRotor(R));
    }

    function rebuild() {
        ghosts.forEach((gho) => {
            gho.line.update(sampleCurve((u) => motorLocal(motor(u), [gho.r, 0, 0]), 90));
        });
        field.setFn((x, y) => [-y, x, pitch]);
        readPitch.set(pitch.toFixed(3).padStart(7));
        readAngle.set((angle * 180 / Math.PI).toFixed(0).padStart(6) + '°');
        readKind.set(Math.abs(pitch) < 0.01 ? 'pure rotation — a hinge, pitch 0'
            : 'a screw — every point traces a helix of the same pitch');
        ov.caption(Math.abs(pitch) < 0.01
            ? 'pitch 0: the axis points do not move at all — this is a door hinge'
            : 'every point of the body traces a helix about the same line, with the same pitch');
        applyVis();
    }

    function applyVis() {
        if (!opt) return;
        axis.object3D.visible = opt.axis;
        ghosts.forEach((gho) => { gho.line.object3D.visible = opt.path; });
        moving.visible = opt.frame;
        field.object3D.visible = opt.field;
    }

    clear(controls);
    opt = toggles(controls, {
        play: ['play', true],
        path: ['helix', true],
        axis: ['axis', true],
        frame: ['frame', true],
        field: ['field', false],
    }, (s) => { anim.toggle(s.play); applyVis(); });
    const pSlider = slider(controls, { min: -0.3, max: 0.4, value: pitch, title: 'pitch' }, (x) => { pitch = x; sweep = false; rebuild(); });
    slider(controls, { min: 0.3, max: 3.0, value: angle, title: 'angle' }, (x) => { angle = x; rebuild(); });

    let sweep = true;
    // presenting wants motion; the slider is there when you want to stop and poke
    const anim = loop(viewer, 16, (p) => {
        if (sweep) {
            pitch = 0.2 * Math.sin(p * Math.PI * 2);
            if (pSlider && pSlider.sync) pSlider.sync(pitch);
            rebuild();
        }
        const u = (p * 3) % 1;
        const M = motor(u);
        placeMotor(moving, M);
        tip = motorLocal(M, [0.16, 0, 0]);
    });
    rebuild();
    anim.onPlayChange = (on) => opt.set('play', on);

    return { dispose() { anim.dispose(); ov.dispose(); } };
}
