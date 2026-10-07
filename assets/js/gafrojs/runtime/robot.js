/**
 * The real robot.
 *
 * Every spatial scene that used to draw a planar 3R stick figure drives a real
 * arm through this: the description is a URDF, the kinematics and the Jacobian
 * come out of gafro, and the meshes are the manufacturer's. A scene can no
 * longer show one thing while the slide claims another, and the arm on the
 * slide is an arm the audience has seen in a lab.
 *
 * The default is the Franka Panda -- the arm in the papers' own renders, so the
 * live scenes and the figures beside them show the same robot. The xArm7 stays
 * available; `robots/make-multi-arm.py` writes the two- and three-arm groups
 * for either.
 *
 * The planar scenes keep runtime/arm.js. A 2D demo wants a 2D robot; the point
 * there is the picture, not the hardware.
 */
import * as THREE from 'three';

/**
 * The gripper is scenery here -- held open, never actuated. The value is
 * clamped to each gripper joint's own limit, so it opens a 0.04 m Panda finger
 * as far as it goes and an xArm knuckle to a third of a radian.
 */
const GRIPPER_OPEN = 0.3;

/**
 * The Panda's shell colours, by the material name its meshes carry. The
 * manufacturer's OBJ parts are white shells and black joint rings, and
 * make-panda.py keeps that split as `usemtl` names inside one OBJ per link.
 */
const PANDA_PAINT = {
    white: 0xdcdad6,
    off_white: 0xd2d4d6,
    black: 0x35373a,
    light_blue: 0x1c8fcf,
    green: 0x4dbb63,
};

/**
 * The robots the scenes can drive. `home` is where an arm is posed when a scene
 * has no opinion: straight-up zeros read as a pole rather than a robot, and a
 * description's "default configuration" is a folded shipping pose. Each home is
 * an elbow-out stance that keeps every joint well away from its limit and puts
 * the tool about half a metre out, pointing down, where a camera wants it.
 */
export const ROBOTS = {
    panda: {
        file: 'panda/panda.urdf',
        dual: 'panda/dual-panda.urdf',
        triple: 'panda/triple-panda.urdf',
        tool: 'panda_ee',
        home: [0, -0.35, 0, -1.9, 0, 1.6, 0.785],
        paint: PANDA_PAINT,
    },
    xarm7: {
        file: 'xarm7/xarm7.urdf',
        dual: 'xarm7/dual-xarm7.urdf',
        triple: 'xarm7/triple-xarm7.urdf',
        tool: 'xarm7_ee',
        home: [0, -0.55, 0, 0.9, 0, 1.45, 0],
        paint: null,
    },
    // The Unitree G1: one System, 29 joints. Each wrist chain runs waist (3) +
    // arm (7); the waist is shared, so the scenes drive the seven arm joints
    // and leave the waist and legs at zero. Slots are System indices, chain
    // positions are where those joints sit in the chain's own vector.
    g1: {
        file: 'g1/g1.urdf',
        tool: null,
        home: [0.25, 0.25, 0, 0.9, 0, 0, 0],
        paint: { '': 0xd9d9d6 },
        arms: {
            left: { space: 'left_wrist', slots: [15, 16, 17, 18, 19, 20, 21], chainIndex: [3, 4, 5, 6, 7, 8, 9], home: [0, 0.2, 0, 0.5, 0, 0, 0] },
            right: { space: 'right_wrist', slots: [22, 23, 24, 25, 26, 27, 28], chainIndex: [3, 4, 5, 6, 7, 8, 9], home: [0, -0.2, 0, 0.5, 0, 0, 0] },
        },
    },
    // The LEAP hand: four fingers of four joints, contiguous per finger.
    leap: {
        file: 'leap/leap_hand.urdf',
        tool: null,
        home: [0, 0, 0, 0],
        paint: { '': 0x3c3f44 },
        arms: {
            // the three fingers curl by different amounts so the four tips are
            // never coplanar: a sphere through them has to exist to be controlled
            index: { space: 'finger0', slots: [0, 1, 2, 3], chainIndex: [0, 1, 2, 3], home: [0.5, 0, 0.6, 0.4] },
            middle: { space: 'finger1', slots: [4, 5, 6, 7], chainIndex: [0, 1, 2, 3], home: [0.8, 0, 0.8, 0.6] },
            ring: { space: 'finger2', slots: [8, 9, 10, 11], chainIndex: [0, 1, 2, 3], home: [0.5, 0, 0.6, 0.4] },
            // the thumb swung across to oppose the fingers: its tip is then 12 cm
            // from the fingers' centroid, which sets the size of ball the hand holds
            thumb: { space: 'finger3', slots: [12, 13, 14, 15], chainIndex: [0, 1, 2, 3], home: [1.2, 0.4, 0.8, 0.6] },
        },
    },
};

/** The arm every scene gets unless it asks for another. */
export const ROBOT = ROBOTS.panda;

export const HOME = ROBOT.home;

/**
 * Paint a loaded visual by material name. OBJ parts loaded without an MTL get
 * a material named after their `usemtl` line, which is exactly the hook needed
 * to give the Panda its white shell and black rings. Meshes with no named
 * material (the xArm's STLs) are left as RobotVisual coloured them.
 */
function paint(visual, palette) {
    if (!visual) return;
    // Physically based materials by name, so the environment map and the
    // shadows read on them. Materials are shared between cloned parts, so a
    // converted material is memoised and reused.
    const converted = new Map();
    const standard = (m) => {
        if (converted.has(m)) return converted.get(m);
        const hex = palette ? palette[m.name || ''] : undefined;
        const out = new THREE.MeshStandardMaterial({
            color: hex !== undefined ? hex : (m.color ? m.color.getHex() : 0x999999),
            roughness: m.name === 'black' ? 0.62 : 0.55,
            metalness: 0.06,
            envMapIntensity: 1,
        });
        out.name = m.name || '';
        converted.set(m, out);
        return out;
    };
    for (const link of visual._links) {
        link.traverse((node) => {
            if (!node.isMesh) return;
            node.castShadow = true;
            node.receiveShadow = true;
            if (!node.material) return;
            node.material = Array.isArray(node.material)
                ? node.material.map(standard) : standard(node.material);
        });
    }
}

/** True for a part that takes an arm tint: the shell, not the black rings. */
function tintable(material) {
    return !material.name || material.name === 'white' || material.name === 'off_white';
}

/**
 * A System joint vector for the joints no scene drives: gripper joints opened
 * as far as they go, everything else (a humanoid's legs and waist) at zero.
 */
function openGripper(system) {
    const lo = toArray(system.getJointLimitsMin());
    const hi = toArray(system.getJointLimitsMax());
    const names = actuatedJointNames(system);
    return lo.map((l, i) => (/finger|knuckle|driver|gripper/i.test(names[i] || '')
        ? Math.min(hi[i], Math.max(l, GRIPPER_OPEN)) : Math.min(hi[i], Math.max(l, 0))));
}

let RobotVisualClass = null;

/**
 * Parsed meshes, by URL. Three arms in one description load link0.obj three
 * times; a 30 MB OBJ is parsed once here and cloned, geometry shared. (The
 * fetch itself is served by demos/sw.js from the Cache API after the first
 * visit, so on stage the arm is standing there when the slide arrives.)
 */
const parsedMeshes = new Map();

function memoiseMeshLoads(RobotVisual) {
    if (RobotVisual.prototype._tryLoadUncached) return;
    RobotVisual.prototype._tryLoadUncached = RobotVisual.prototype._tryLoad;
    RobotVisual.prototype._tryLoad = function (loader, candidates) {
        const key = candidates[0];
        if (!parsedMeshes.has(key)) {
            parsedMeshes.set(key, this._tryLoadUncached(loader, candidates));
        }
        return parsedMeshes.get(key).then((obj) => (obj ? obj.clone() : null));
    };
}

/** RobotVisual lives in the gafro package; find it wherever the build put it. */
async function robotVisual() {
    if (RobotVisualClass) return RobotVisualClass;
    const candidates = [
        new URL('../_lib/js/visualization/robot.js', import.meta.url),
        new URL('../../node_modules/gafro/js/visualization/robot.js', import.meta.url),
    ];
    let lastErr;
    for (const url of candidates) {
        try {
            const mod = await import(url.href);
            if (mod.RobotVisual) {
                RobotVisualClass = mod.RobotVisual;
                memoiseMeshLoads(RobotVisualClass);
                return RobotVisualClass;
            }
        } catch (err) {
            lastErr = err;
        }
    }
    throw new Error('gafro RobotVisual not found'
        + (lastErr ? ` (${lastErr.message})` : ''));
}

/**
 * How a gafro geometric Jacobian column becomes a velocity — measured, not
 * assumed.
 *
 * The 6 x n the library returns is a spatial twist per joint, and its top three
 * rows are bivector coefficients, not (wx, wy, wz): the basis is
 * (e12, e13, e23), which maps to (+z, -y, +x). Rows 3-5 are the moment of the
 * joint axis about the chain origin, so they are not d(tip)/dq on their own.
 *
 *     omega = (J2, -J1, J0)          v_tip = moment + omega x p_tip
 *
 * Both halves were found by brute-forcing every permutation and sign against a
 * finite difference of the end-effector position, over three configurations and
 * all seven columns — max residual 3.2e-7. scenes/_selftest.js re-checks it, so
 * a library change that reorders the basis fails loudly instead of quietly
 * tilting every velocity in the deck.
 */
export function twistOfColumn(J, i) {
    return {
        omega: new THREE.Vector3(J[2][i], -J[1][i], J[0][i]),
        moment: new THREE.Vector3(J[3][i], J[4][i], J[5][i]),
    };
}

/**
 * The velocity ellipsoid of a set of Jacobian columns.
 *
 * In the plane this is a 2x2 eigenproblem anyone will do by hand; in space it
 * is a 3x3 one, and the honest answer needs the eigenvectors as well as the
 * eigenvalues — the ellipsoid's orientation is most of what it has to say. A
 * few cyclic Jacobi sweeps settle a symmetric 3x3 to machine precision.
 *
 * Returns semi-axis lengths (the singular values of J, largest first) and the
 * rotation that carries x, y, z onto those axes.
 */
export function velocityEllipsoid(columns) {
    const A = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    for (const c of columns) {
        const v = [c.x, c.y, c.z];
        for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) A[i][j] += v[i] * v[j];
    }
    const V = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
    for (let sweep = 0; sweep < 16; sweep++) {
        let off = A[0][1] * A[0][1] + A[0][2] * A[0][2] + A[1][2] * A[1][2];
        if (off < 1e-22) break;
        for (let p = 0; p < 3; p++) {
            for (let r = p + 1; r < 3; r++) {
                if (Math.abs(A[p][r]) < 1e-20) continue;
                const theta = (A[r][r] - A[p][p]) / (2 * A[p][r]);
                const sign = theta >= 0 ? 1 : -1;
                const t = sign / (Math.abs(theta) + Math.sqrt(theta * theta + 1));
                const c = 1 / Math.sqrt(t * t + 1);
                const sn = t * c;
                for (let k = 0; k < 3; k++) {
                    const akp = A[k][p], akr = A[k][r];
                    A[k][p] = c * akp - sn * akr;
                    A[k][r] = sn * akp + c * akr;
                }
                for (let k = 0; k < 3; k++) {
                    const apk = A[p][k], ark = A[r][k];
                    A[p][k] = c * apk - sn * ark;
                    A[r][k] = sn * apk + c * ark;
                }
                for (let k = 0; k < 3; k++) {
                    const vkp = V[k][p], vkr = V[k][r];
                    V[k][p] = c * vkp - sn * vkr;
                    V[k][r] = sn * vkp + c * vkr;
                }
            }
        }
    }
    const eig = [0, 1, 2]
        .map((i) => ({
            value: Math.max(A[i][i], 0),
            axis: new THREE.Vector3(V[0][i], V[1][i], V[2][i]).normalize(),
        }))
        .sort((a, b) => b.value - a.value);
    // Jacobi gives no handedness; a left-handed basis would mirror the ellipsoid.
    const third = eig[2].axis.clone();
    if (new THREE.Vector3().crossVectors(eig[0].axis, eig[1].axis).dot(third) < 0) {
        third.negate();
    }
    const basis = new THREE.Matrix4().makeBasis(eig[0].axis, eig[1].axis, third);
    return {
        radii: eig.map((e) => Math.sqrt(e.value)),
        quaternion: new THREE.Quaternion().setFromRotationMatrix(basis),
    };
}

/** Solve A x = b for small dense A, by Gauss-Jordan with partial pivoting. */
export function solve(A, b) {
    const n = b.length;
    const M = A.map((row, i) => [...row, b[i]]);
    for (let c = 0; c < n; c++) {
        let piv = c;
        for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[piv][c])) piv = r;
        if (Math.abs(M[piv][c]) < 1e-12) continue;
        [M[c], M[piv]] = [M[piv], M[c]];
        for (let r = 0; r < n; r++) {
            if (r === c) continue;
            const f = M[r][c] / M[c][c];
            for (let k = c; k <= n; k++) M[r][k] -= f * M[c][k];
        }
    }
    return M.map((row, i) => (Math.abs(row[i]) < 1e-12 ? 0 : row[n] / row[i]));
}

function toArray(v) {
    if (!v) return [];
    if (typeof v.size === 'function') {
        const out = [];
        for (let i = 0; i < v.size(); i++) out.push(v.get(i));
        return out;
    }
    return Array.from(v);
}

/**
 * The name of each actuated joint, indexed by its slot in the configuration
 * vector.
 *
 * `System::getJointNames()` is the wrong tool for this and is easy to reach for
 * by mistake: it lists fixed joints too, so it is both longer than the
 * configuration vector and differently ordered. gafro already answers the real
 * question -- every actuated joint carries `getIndex()`, which *is* its slot.
 */
function actuatedJointNames(system) {
    const out = [];
    const joints = system.getJoints();
    const n = joints.size ? joints.size() : joints.length;
    for (let i = 0; i < n; ++i) {
        const j = joints.get ? joints.get(i) : joints[i];
        if (j.isActuated && j.isActuated()) out[j.getIndex()] = j.getName();
    }
    return out;
}

export class Manipulator {
    /**
     * `offset` is where this arm's joints start in the System's vector, and
     * `shared` is the vector itself when more than one arm lives in the same
     * System: the two-arm description is one System with twenty-six joints, and
     * forward kinematics has to see both arms at once or each would be posed
     * against the other's zeros.
     */
    constructor(system, taskSpace, visual, {
        toolLink = null, offset = 0, shared = null, slots = null, chainIndex = null, home = null,
    } = {}) {
        this.system = system;
        this.taskSpace = taskSpace;
        this.visual = visual;
        // gafro's task-space methods check the length of a joint vector, so
        // `chainDoF` -- what the chain asks for -- has to be honoured exactly.
        // It used to be read past the end instead, silently, which is how the
        // demos shipped a 7-for-8 bug until the preconditions caught it.
        // `n` is what a scene drives; the two agree on a correctly modelled arm
        // and `_chain` pads the difference if they ever do not.
        this.jointNames = actuatedJointNames(system);
        this.chainDoF = taskSpace.getDoF();
        this.dof = system.getDoF();
        this.offset = offset;
        this._shared = shared;
        this.tool = toolLink || taskSpace.getKinematicChainName();
        // Which System joints this arm drives, and where each sits in the
        // chain's own vector. The default is the contiguous block a single
        // arm or a generated multi-arm description gives; a humanoid's arm
        // chain starts with the shared waist, which stays parked at zero.
        this.slots = slots || Array.from({ length: this.chainDoF }, (_, i) => offset + i);
        this.chainIndex = chainIndex || Array.from({ length: this.chainDoF }, (_, i) => i);
        this.n = this.slots.length;
        this.home = (home || HOME).slice(0, this.n);

        // The chain reports poses in its own root frame; computeForwardKinematics
        // reports them in the world. Rather than name the root link and hope, the
        // transform between them is measured: at one configuration, the world
        // pose of the tool and the chain's own answer for it differ by exactly
        // the base motor.
        //
        // It has to be a motor and not an offset. On a single arm standing at the
        // origin the difference is a 12 cm lift and a translation would do; on the
        // two-arm description the arms are turned to face each other, and a
        // translation would leave every world quantity rotated by 90 degrees.
        const homeFull = this._full(this.home);
        const worldTool = system.computeForwardKinematics(homeFull).getLinkPose(this.tool);
        this.baseMotor = worldTool.multiply(taskSpace.computeEEMotor(this._chain(this.home)).inverse());
        const b = this.baseMotor.toThreeJSObject();
        this._baseP = b.position.clone();
        this._baseQ = b.quaternion.clone();

        const lo = toArray(system.getJointLimitsMin());
        const hi = toArray(system.getJointLimitsMax());
        this.limits = { min: this.slots.map((s) => lo[s]), max: this.slots.map((s) => hi[s]) };
        this._q = this.home.slice();
    }

    /**
     * A joint vector of exactly the length the task space demands. The actuated
     * values go in the leading slots and the fixed remainder is zero -- their
     * value is ignored, but their *presence* is not.
     */
    _chain(q) {
        const out = new Array(this.chainDoF).fill(0);
        for (let i = 0; i < this.n && i < q.length; ++i) out[this.chainIndex[i]] = q[i];
        return out;
    }

    /** the System's whole joint vector: this arm's joints written into their slots */
    _full(q) {
        const full = this._shared || (this._open || (this._open = openGripper(this.system)));
        for (let i = 0; i < this.n && i < q.length; i++) full[this.slots[i]] = q[i];
        return full;
    }

    get joints() {
        return this._q.slice();
    }

    /** Pose the arm; the meshes follow immediately. */
    setJoints(q) {
        this._q = q.slice(0, this.n);
        // Always write the joints into the System's vector. An arm in a pair has
        // no visual of its own -- the pair's RobotVisual reads the shared vector
        // -- so skipping this when `visual` is null left the meshes at home while
        // the kinematics moved on.
        const full = this._full(this._q);
        if (this.visual) {
            this.visual.setJointPosition(full);
            this.visual.update();
        }
        return this._q;
    }

    /** Show or hide the whole robot, for scenes that toggle it against a ghost. */
    setVisible(on) {
        if (!this.visual) return;
        for (const link of this.visual._links) link.visible = on;
    }

    /** Tint every link; null restores the mesh colours. */
    setColor(hex) {
        if (this.visual) this.visual.setColor(hex);
    }

    /** Clamp to the manufacturer's joint limits, a little inside them. */
    clamp(q, margin = 0.03) {
        return q.map((v, i) => Math.min(this.limits.max[i] - margin, Math.max(this.limits.min[i] + margin, v)));
    }

    /** The end-effector motor, in the chain frame the Jacobian also uses. */
    eeLocal(q = this._q) {
        return this.taskSpace.computeEEMotor(this._chain(q));
    }

    /** A point in the chain's frame, placed in the world. */
    toWorld(p) {
        return p.clone().applyQuaternion(this._baseQ).add(this._baseP);
    }

    /** A direction in the chain's frame, rotated into the world (no translation). */
    dirToWorld(v) {
        return v.clone().applyQuaternion(this._baseQ);
    }

    /** The end-effector motor in the world frame — what the cooperative scenes compose. */
    eeMotor(q = this._q) {
        return this.baseMotor.multiply(this.eeLocal(q));
    }

    /** The end-effector position, in world. */
    tip(q = this._q) {
        return this.toWorld(this.eeLocal(q).toThreeJSObject().position);
    }

    /** The end-effector frame in world, as {position, quaternion}. */
    pose(q = this._q) {
        const o = this.eeLocal(q).toThreeJSObject();
        return {
            position: this.toWorld(o.position),
            quaternion: this._baseQ.clone().multiply(o.quaternion),
        };
    }

    /** Any link's world pose — for drawing joint axes and link frames. */
    linkPose(name, q = this._q) {
        // FK is already in the world; nothing to apply.
        return this.system.computeForwardKinematics(this._full(q))
            .getLinkPose(name).toThreeJSObject();
    }

    /** Every joint's world origin, in chain order — where the Jacobian columns live. */
    jointOrigins(q = this._q) {
        const fk = this.system.computeForwardKinematics(this._full(q));
        return this.slots.map((s) => fk.getJointPose(this.jointNames[s]).toThreeJSObject().position);
    }

    /**
     * The geometric Jacobian, plus the per-joint tip velocity the scenes draw.
     * `columns[i]` is d(tip)/dq_i in world; `omega[i]` is that joint's angular
     * velocity contribution.
     */
    jacobian(q = this._q) {
        const J = this.taskSpace.computeGeometricJacobian(this._chain(q));
        const pLocal = this.eeLocal(q).toThreeJSObject().position;
        const columns = [];
        const omega = [];
        for (let i = 0; i < this.n; i++) {
            const { omega: w, moment } = twistOfColumn(J, this.chainIndex[i]);
            // Velocities and axes are directions: the mount rotates them, and
            // its translation must not be added to them.
            omega.push(this.dirToWorld(w));
            columns.push(this.dirToWorld(moment.clone().add(w.clone().cross(pLocal))));
        }
        return { J, columns, omega, p0: this.toWorld(pLocal) };
    }

    /** The n x n kinematic null-space projector, straight from the library. */
    nullspaceProjector(q = this._q) {
        return this.taskSpace.computeEEKinematicNullspaceProjector(this._chain(q));
    }

    /**
     * One damped-least-squares step towards a world-frame target position.
     *
     * Damping is what keeps the arm sane near a singularity: the undamped
     * pseudo-inverse asks for an unbounded joint rate exactly where the scenes
     * like to park the arm to make a point.
     */
    stepToPoint(target, { q = this._q, lambda = 0.08, gain = 1, posture = 0.05 } = {}) {
        const { columns, p0 } = this.jacobian(q);
        const e = new THREE.Vector3().subVectors(target, p0).multiplyScalar(gain);
        return this._dlsStep(q, columns, e, { lambda, posture });
    }

    /**
     * One damped step turning the tool axis onto a target point: the residual
     * is a x d for the unit tool axis a and the unit direction d from the tool
     * to the target, and a joint's effect on a is omega_i x a. "Point the tool
     * at it" is the third of the T-RO objectives, and a position step cannot
     * express it.
     */
    stepToPointing(target, { q = this._q, lambda = 0.08, gain = 1, posture = 0.05, axis = [0, 0, 1] } = {}) {
        const { omega, p0 } = this.jacobian(q);
        const pose = this.pose(q);
        const a = new THREE.Vector3(...axis).applyQuaternion(pose.quaternion).normalize();
        const d = new THREE.Vector3().subVectors(target, p0).normalize();
        // the step must reduce a x d, so the requested change of it is its negative
        const e = new THREE.Vector3().crossVectors(d, a).multiplyScalar(gain);
        const columns = omega.map((w) => new THREE.Vector3().crossVectors(new THREE.Vector3().crossVectors(w, a), d));
        return this._dlsStep(q, columns, e, { lambda, posture });
    }

    /** The tool axis in the world, for drawing what the arm is pointing with. */
    toolAxis(q = this._q, axis = [0, 0, 1]) {
        return new THREE.Vector3(...axis).applyQuaternion(this.pose(q).quaternion).normalize();
    }

    /**
     * Damped least squares over a 3 x n block, plus a posture term in its
     * nullspace pulling towards the home pose. The posture term is what keeps
     * the elbow from folding through the base when a target drifts: without
     * it every redundant joint wanders wherever the last few steps left it,
     * and a Panda parked at a joint stop is a Panda inside itself.
     */
    _dlsStep(q, columns, e, { lambda, posture }) {
        // (J J^T + lambda^2 I) y = e, then dq = J^T y
        const JJt = [0, 1, 2].map((r) => [0, 1, 2].map((c) => {
            let s = 0;
            for (let i = 0; i < this.n; i++) {
                s += columns[i].getComponent(r) * columns[i].getComponent(c);
            }
            return s;
        }));
        const damped = (d) => JJt.map((row, r) => row.map((v, c) => v + (r === c ? d * d : 0)));
        const A = damped(lambda);
        const y = solve(A, [e.x, e.y, e.z]);
        const dq = columns.map((c) => c.x * y[0] + c.y * y[1] + c.z * y[2]);
        if (posture > 0) {
            // N e0 = e0 - J^T (J J^T + mu^2)^-1 J e0. The projector uses a far
            // lighter damping than the task step: with the task's lambda the
            // "nullspace" leaks, and a parked arm walks centimetres off its
            // target towards home. The leak that remains near a singularity is
            // bounded by clamping the correction per joint.
            const An = damped(0.008);
            const e0 = q.map((v, i) => posture * (this.home[i] - v));
            const Je0 = new THREE.Vector3();
            for (let i = 0; i < this.n; i++) Je0.addScaledVector(columns[i], e0[i]);
            const z = solve(An, [Je0.x, Je0.y, Je0.z]);
            for (let i = 0; i < this.n; i++) {
                const n = e0[i] - (columns[i].x * z[0] + columns[i].y * z[1] + columns[i].z * z[2]);
                dq[i] += Math.max(-0.05, Math.min(0.05, n));
            }
        }
        return this.clamp(q.map((v, i) => v + dq[i]));
    }

    /** Iterate stepToPoint to convergence; returns the configuration reached. */
    solveToPoint(target, { q = this._q, iterations = 60, tolerance = 1e-4, lambda = 0.08 } = {}) {
        let cur = q.slice(0, this.n);
        for (let k = 0; k < iterations; k++) {
            cur = this.stepToPoint(target, { q: cur, lambda });
            if (this.tip(cur).distanceTo(target) < tolerance) break;
        }
        return cur;
    }

    dispose() {
        if (this.visual) this.visual.dispose();
        this.visual = null;
    }
}

/** The paint job for a description file, by the robot folder it lives in. */
function paletteFor(file) {
    const robot = Object.values(ROBOTS).find((r) => file.startsWith(r.file.split('/')[0] + '/'));
    return robot ? robot.paint : null;
}

/**
 * Load a manipulator and put its meshes in the scene.
 *
 * `meshes: false` loads the kinematics alone, which is what the self-test wants
 * and what a scene drawing its own abstraction of the arm can use.
 */
export async function loadManipulator(g, viewer, {
    file = ROBOT.file,
    taskSpace = 'ee',
    joints = HOME,
    color = null,
    meshes = true,
} = {}) {
    const S = g.serialization;
    if (!S) throw new Error('this gafro build exposes no serialization module');
    const url = new URL('../robots/' + file, import.meta.url);
    const response = await fetch(url.href);
    if (!response.ok) throw new Error(`no robot description at ${file}`);
    const system = S.SystemSerialization.loadFromString(await response.text(), S.Format.URDF);

    // Task spaces come from <gafro:task_space> in the description. A chain made
    // with createKinematicChain() afterwards cannot be given one in this build,
    // so the description is the place to add arms, not the scene.
    const ts = system.getTaskSpace(taskSpace);
    if (!ts) {
        throw new Error(`"${file}" declares no task space "${taskSpace}"`
            + ' — add a <gafro:task_space> to the description');
    }

    // The Manipulator comes first because it owns the translation between the
    // arm's seven joints and the thirteen the System wants: RobotVisual drives
    // computeForwardKinematics directly, and that call throws on a short vector.
    const arm = new Manipulator(system, ts, null);
    if (meshes) {
        const RobotVisual = await robotVisual();
        const dir = file.replace(/[^/]*$/, '');
        const visual = new RobotVisual(system, arm._full(joints), viewer.scene, {
            assetBaseDir: new URL(`../robots/${dir}assets/`, import.meta.url).href,
            color,
            // The System is ours and outlives the visual; letting RobotVisual
            // delete it would pull the kinematics out from under the scene.
            ownsRobot: false,
        });
        await visual.load();
        paint(visual, paletteFor(file));
        arm.visual = visual;
    }
    arm.setJoints(joints);
    return arm;
}


/**
 * Two arms in one System.
 *
 * The cooperative scenes want the *absolute* and *relative* motors, and those
 * are not extra machinery: the relative motor is what carries one tool frame to
 * the other, ~M_L M_R, and the absolute motor is the one half way along that
 * screw. Composing them from the two end-effector motors is the definition, not
 * a shortcut around it — every operation below is the library's own motor
 * algebra.
 *
 * (This build's URDF reader accepts a <gafro:task_space> naming two chains but
 * builds no DualArmTaskSpace from it — getTaskSpace comes back null — so the
 * pair is assembled here from the two single-arm task spaces the same
 * description does provide.)
 */
export class DualArm {
    constructor(g, system, arms, shared) {
        this.g = g;
        this.A = (g && g.algebra && g.algebra.cga) ? g.algebra.cga : g;
        this.system = system;
        this.arms = arms;
        // Two arms is the common case and reads better named; a third is just
        // arms[2], and the shape-control scene wants one.
        [this.left, this.right] = arms;
        this._shared = shared;
        this.visual = null;
    }

    /** Pose every arm at once: setJoints(q0, q1, ...) or setJoints([q0, q1, ...]). */
    setJoints(...qs) {
        const list = Array.isArray(qs[0]) && Array.isArray(qs[0][0]) ? qs[0] : qs;
        list.forEach((q, i) => { if (q && this.arms[i]) this.arms[i].setJoints(q); });
        this.refresh();
    }

    /** Push the shared joint vector into the meshes. */
    refresh() {
        if (!this.visual) return;
        this.visual.setJointPosition(this._shared);
        this.visual.update();
    }

    /**
     * Tint one arm. Links are prefixed per side in the generated description.
     * Only the shell takes the colour: a Panda's black rings stay black, so a
     * tinted arm still reads as the same robot.
     */
    tint(index, hex) {
        if (!this.visual) return;
        const prefix = this.arms[index].tool.split('_')[0] + '_';
        for (const link of this.visual._links) {
            if (!link.linkName || !link.linkName.startsWith(prefix)) continue;
            link.traverse((node) => {
                if (node.isMesh && node.material && node.material.color && tintable(node.material)) {
                    node.material = node.material.clone();
                    node.material.color.set(hex);
                }
            });
        }
    }

    setVisible(on) {
        if (!this.visual) return;
        for (const link of this.visual._links) link.visible = on;
    }

    /** ~M_L M_R — the grasp: where the right tool sits in the left tool's frame. */
    relativeMotor() {
        return this.left.eeMotor().reverse().multiply(this.right.eeMotor());
    }

    /** The motor half way along the relative screw — where the pair holds the object. */
    absoluteMotor() {
        return this.A.Motor.interpolateLeft(this.left.eeMotor(), this.right.eeMotor(), 0.5);
    }

    /** The absolute frame as three.js wants it. */
    absolutePose() {
        const o = this.absoluteMotor().toThreeJSObject();
        return { position: o.position.clone(), quaternion: o.quaternion.clone() };
    }

    /** How far apart the two tools are — the grasp width a scene watches. */
    separation() {
        return this.left.tip().distanceTo(this.right.tip());
    }

    dispose() {
        if (this.visual) this.visual.dispose();
        this.visual = null;
    }
}

/**
 * Load a two- or three-arm description. `demos/robots/make-multi-arm.py` writes
 * them from the single arm, so the group cannot drift away from the robot
 * beside it. Pass `file: ROBOT.triple` with three `spaces` for three arms.
 */
export async function loadDualArm(g, viewer, {
    file = ROBOT.dual,
    spaces = ['left', 'right'],
    joints = [HOME, HOME],
    colors = [null, null],
    meshes = true,
    // per space: { slots, chainIndex } for chains that are not a contiguous block
    arms = null,
    home = null,
} = {}) {
    const S = g.serialization;
    const url = new URL('../robots/' + file, import.meta.url);
    const response = await fetch(url.href);
    if (!response.ok) throw new Error(`no robot description at ${file}`);
    const system = S.SystemSerialization.loadFromString(await response.text(), S.Format.URDF);

    const shared = openGripper(system);
    const block = Math.round(system.getDoF() / spaces.length);
    const built = spaces.map((name, i) => {
        const spec = arms ? arms[name] : null;
        const space = spec && spec.space ? spec.space : name;
        const ts = system.getTaskSpace(space);
        if (!ts) throw new Error(`"${file}" declares no task space "${space}"`);
        const arm = new Manipulator(system, ts, null, {
            offset: i * block, shared, home: home || (spec ? spec.home : null),
            slots: spec ? spec.slots : null, chainIndex: spec ? spec.chainIndex : null,
        });
        arm.setJoints(joints[i] || arm.home);
        return arm;
    });

    // One System means one RobotVisual: it already carries every link of both
    // arms, and a second would draw each of them twice. It is driven from the
    // shared joint vector, which both arms write into.
    let visual = null;
    if (meshes) {
        const RobotVisual = await robotVisual();
        const dir = file.replace(/[^/]*$/, '');
        visual = new RobotVisual(system, shared, viewer.scene, {
            assetBaseDir: new URL(`../robots/${dir}assets/`, import.meta.url).href,
            ownsRobot: false,
        });
        await visual.load();
        paint(visual, paletteFor(file));
    }

    const pair = new DualArm(g, system, built, shared);
    pair.visual = visual;
    colors.forEach((c, i) => { if (c !== null && c !== undefined) pair.tint(i, c); });
    pair.refresh();
    return pair;
}
