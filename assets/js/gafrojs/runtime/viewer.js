import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { setLineResolution } from './draw.js?v=42';

/**
 * The scale a deck paints this page at.
 *
 * Reveal lays a deck out at a fixed 1600x900 and then CSS-transforms the whole
 * stage to fit the window -- `translate(-50%, -50%) scale(k)` on `.slides`, so
 * k is above 1 on anything wider than the stage, which is most laptops and
 * every projector. An iframe 700 px wide in slide coordinates is then painted
 * 840 px wide on the glass. The compositor re-rasters text and SVG at that
 * scale, but a WebGL canvas is only a texture of whatever size we asked for, so
 * it gets stretched instead -- and a stretched canvas is exactly the blur.
 *
 * The frame's painted width comes from getBoundingClientRect, which is measured
 * after every ancestor transform; the width it was laid out at is our own
 * viewport. Their ratio is k without us assuming anything about how the deck
 * applies it -- it stays right if Reveal ever goes back to CSS `zoom`, which
 * re-lays the frame out instead of stretching it and needs no correction.
 */
function frameScale() {
    try {
        // Null when the page is not framed; throws on a cross-origin parent.
        const frame = window.frameElement;
        if (!frame) return 1;
        const painted = frame.getBoundingClientRect().width;
        const laidOut = document.documentElement.clientWidth;
        if (painted > 0 && laidOut > 0) return painted / laidOut;
    } catch (err) {
        /* not same-origin: assume the frame is drawn at its layout size */
    }
    return 1;
}

/**
 * The frame's scale times any transform applied to the container inside this
 * page -- rects here are measured against our own viewport, so the two factors
 * are independent and multiply.
 */
function embedScale(container) {
    let scale = frameScale();
    if (container && container.offsetWidth > 0) {
        const painted = container.getBoundingClientRect().width;
        if (painted > 0) scale *= painted / container.offsetWidth;
    }
    return Number.isFinite(scale) && scale > 0 ? scale : 1;
}

export class Viewer {
    constructor(container, options = {}) {
        if (typeof container === 'string') {
            container = document.getElementById(container);
        }
        const {
            background = 0xffffff,
            cameraPosition = [1.6, 1.6, 1.3],
            cameraTarget = [0, 0, 0.2],
            grid = true,
            // The world axes at the origin are furniture in almost every scene:
            // they are as strong as the subject and mean nothing in most of
            // them. Scenes that genuinely need an origin call showAxes(true).
            axes = false,
            // Null means "work it out from the display and the page scale".
            // The cap is what keeps a 4K screen from asking for 4x oversampling.
            pixelRatio = null,
            maxPixelRatio = 3,
        } = options;

        this.container = container;
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(background);

        const width = Math.max(container.clientWidth, 2);
        const height = Math.max(container.clientHeight, 2);
        const aspect = width / height;

        this._persp = new THREE.PerspectiveCamera(60, aspect, 0.01, 1000);
        this._persp.up.set(0, 0, 1);
        this._persp.position.set(...cameraPosition);
        this._persp.lookAt(new THREE.Vector3(...cameraTarget));

        this._orthoExtent = 2.2;
        this._ortho = new THREE.OrthographicCamera(
            -this._orthoExtent * aspect, this._orthoExtent * aspect,
            this._orthoExtent, -this._orthoExtent, 0.01, 100,
        );
        this._ortho.up.set(0, 1, 0);
        this._ortho.position.set(0, 0, 8);
        this._ortho.lookAt(0, 0, 0);

        this.camera = this._persp;

        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
        });
        // Image-based lighting and soft shadows are what separate a robot that
        // looks like a CAD preview from one that looks photographed: the
        // environment gives the white shells graded reflections, the shadow
        // puts the arm on the floor. Colours stay untone-mapped so the line
        // and point palette matches the SVG figures beside the scene.
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
        this.renderer.toneMapping = THREE.NoToneMapping;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        const pmrem = new THREE.PMREMGenerator(this.renderer);
        this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
        this.scene.environmentIntensity = 0.32;
        pmrem.dispose();
        this._pixelRatioOverride = pixelRatio;
        this._maxPixelRatio = maxPixelRatio;
        this._embedScale = 1;
        this._pixelRatio = 1;
        this._scaleChecked = 0;
        this._syncPixelRatio();
        this.renderer.setSize(width, height, false);
        const el = this.renderer.domElement;
        el.style.display = 'block';
        el.style.width = '100%';
        el.style.height = '100%';
        container.appendChild(el);

        // Ambient alone flattens everything to a silhouette, which is fine for a
        // sphere with a label on it and useless for a robot made of real meshes.
        // A key, a fill and a sky/ground term keep the paper-white ground while
        // giving surfaces enough shading to read as solid.
        // (With the environment map carrying the diffuse fill, the ambient
        // terms are turned well down or the whites clip.)
        this.scene.add(new THREE.AmbientLight(0xffffff, 0.12));
        this.scene.add(new THREE.HemisphereLight(0xffffff, 0xd8d2c8, 0.22));
        const key = new THREE.DirectionalLight(0xffffff, 1.05);
        key.position.set(2.5, -3.5, 6);
        key.castShadow = true;
        key.shadow.mapSize.set(2048, 2048);
        key.shadow.camera.near = 1;
        key.shadow.camera.far = 20;
        key.shadow.camera.left = -2; key.shadow.camera.right = 2;
        key.shadow.camera.top = 2; key.shadow.camera.bottom = -2;
        key.shadow.bias = -0.0004;
        key.shadow.normalBias = 0.01;
        key.shadow.radius = 3;
        this.scene.add(key);
        const fill = new THREE.DirectionalLight(0xffffff, 0.3);
        fill.position.set(-6, 4, 3);
        this.scene.add(fill);

        this.controls = new OrbitControls(this.camera, el);
        this.controls.target.set(...cameraTarget);
        this.controls.screenSpacePanning = true;
        this.controls.enableDamping = false;

        if (grid) {
            // Was 8 m across: four times the reach of anything in these scenes,
            // so the frame filled with lines that had nothing to do with the
            // subject. A 2.4 m ground plane in 20 cm cells reads as scale
            // without competing for attention.
            const gridHelper = new THREE.GridHelper(2.4, 12, 0xe0dacd, 0xefeae0);
            gridHelper.rotation.x = Math.PI / 2;
            this.scene.add(gridHelper);
            // the floor exists only to catch the shadow; it draws nothing itself
            const floor = new THREE.Mesh(
                new THREE.PlaneGeometry(6, 6),
                new THREE.ShadowMaterial({ color: 0x2a2620, opacity: 0.16, depthWrite: false }),
            );
            floor.receiveShadow = true;
            floor.position.z = 0.0005;
            this.scene.add(floor);
        }
        this._axes = new THREE.AxesHelper(0.35);
        this._axes.visible = axes;
        this.scene.add(this._axes);

        this._updaters = new Set();
        this._running = false;
        this._planar = false;
        // Scenes are built after start(), some of them asynchronously, so the
        // framing pass waits for content rather than running on a fixed delay.
        // It also has to wait for the content to stop *arriving*: a robot's
        // meshes land one at a time as each file loads, and fitting on the
        // first frame that has anything in it frames the base and nothing else.
        this.autoFit = true;
        this._fitted = false;
        this._fitSig = '';
        this._fitStable = 0;
        this._fitWaited = 0;
        // The bounding sphere of a wide, flat subject -- three arms round a
        // table -- overestimates its extent on a 16:9 canvas. A scene that knows
        // its subject is wide can ask for a tighter fit than the default.
        this.fitMargin = 1.35;
        // `?fit=0.8` tightens (or loosens) whatever fit the scene asked for: a
        // deck projected in a hall wants the subject larger than the gallery does.
        // Planar scenes hand-frame with _orthoExtent, so it scales that too.
        this.fitScale = Number(new URLSearchParams(location.search).get('fit')) || 1;
        this._onResize = this._onResize.bind(this);
        window.addEventListener('resize', this._onResize);
        // Resizing the deck window rescales the stage without changing anything
        // inside this frame, so our own resize event never fires. Listen to the
        // parent's when we are allowed to; _checkEmbedScale covers the rest.
        this._parentWindow = null;
        try {
            if (window.parent && window.parent !== window) {
                window.parent.addEventListener('resize', this._onResize);
                this._parentWindow = window.parent;
            }
        } catch (err) {
            /* cross-origin parent */
        }
        this._ro = new ResizeObserver(() => this._onResize());
        this._ro.observe(this.container);
        requestAnimationFrame(() => this._onResize());
    }

    setPlanar(on = true) {
        this._planar = on;
        if (on) {
            this.camera = this._ortho;
            this.controls.object = this._ortho;
            this.controls.enabled = true;
            this.controls.enableRotate = false;
            this.controls.enablePan = true;
            this.controls.enableZoom = true;
            this.controls.target.set(0, 0, 0);
            this._pinPlanar();
        } else {
            this.camera = this._persp;
            this.controls.object = this._persp;
            this.controls.enabled = true;
            this.controls.enableRotate = true;
            this.controls.enablePan = true;
            this.controls.enableZoom = true;
            this._persp.up.set(0, 0, 1);
            this._persp.position.set(1.7, 1.7, 1.35);
            this.controls.target.set(0, 0, 0.2);
            this.controls.update();
        }
        this._onResize();
    }

    look(position = [1.7, 1.7, 1.35], target = [0, 0, 0.2]) {
        this.setPlanar(false);
        this._persp.position.set(...position);
        this.controls.target.set(...target);
        this.controls.update();
    }

    /**
     * Frame a planar scene by hand: `extent` is the half-height in metres, and
     * `centre` what sits in the middle. The planar scenes cannot be auto-fitted
     * (thick lines report the wrong box), so this is how one fills its frame.
     */
    setPlanarView(extent, centre = [0, 0]) {
        this._orthoExtent = extent;
        this.controls.target.set(centre[0], centre[1], 0);
        this._pinPlanar();
        this._onResize();
    }

    _pinPlanar() {
        const t = this.controls.target;
        t.z = 0;
        this._ortho.up.set(0, 1, 0);
        this._ortho.position.set(t.x, t.y, 8);
        this._ortho.lookAt(t.x, t.y, 0);
        this._ortho.updateProjectionMatrix();
    }

    /**
     * Frame the scene's own content.
     *
     * Every scene picked its camera by hand, and most of them picked it for
     * something other than what they now draw -- the subject ends up a fifth of
     * the frame with the rest empty. This keeps the viewing *direction* the
     * scene chose, which carries its composition, and only fixes the distance
     * and what is centred.
     *
     * Lights, the grid and the axes are excluded: they are furniture, and the
     * grid especially would otherwise decide the framing all by itself.
     */
    fit({ margin = 1.35 } = {}) {
        const usable = (child) => !(child.isLight || child.isGridHelper || child.isAxesHelper)
            && child.visible !== false
            && !(child.userData && child.userData.furniture);

        // When there is a robot, the robot is the subject. Fitting to everything
        // instead lets a flat context ring a metre across own the bounding
        // sphere and shrink the arm to a detail inside it -- which is exactly
        // how these scenes were framed before.
        const links = this.scene.children.filter((c) => usable(c) && c.linkName);
        const subject = links.length ? links : this.scene.children.filter(usable);

        // expandByObject reads world matrices, and on the frame the scene is
        // first populated they have not been computed yet -- every link would
        // still be sitting at the origin and the box would be one link wide.
        this.scene.updateMatrixWorld(true);
        const box = new THREE.Box3();
        for (const child of subject) box.expandByObject(child);
        if (box.isEmpty()) return false;
        const centre = box.getCenter(new THREE.Vector3());
        const radius = Math.max(box.getBoundingSphere(new THREE.Sphere()).radius, 0.05) * margin;
        if (this.camera.isOrthographicCamera) {
            this._orthoExtent = radius / this.fitScale;   // _onResize applies fitScale
            this.controls.target.set(centre.x, centre.y, 0);
            this._pinPlanar();
        } else {
            const dir = this.camera.position.clone().sub(this.controls.target);
            if (dir.lengthSq() < 1e-9) dir.set(1.4, -1.5, 1.05);
            dir.normalize();
            const half = THREE.MathUtils.degToRad(this.camera.fov * 0.5);
            this.controls.target.copy(centre);
            this.camera.position.copy(centre).addScaledVector(dir, radius / Math.sin(half));
            this.controls.update();
        }
        this._onResize();
        return true;
    }

    /**
     * Fit once the scene has stopped gaining objects — and only when the scene
     * contains a robot.
     *
     * A robot has an unambiguous extent and the spatial scenes were all framed
     * for the stick arm they used to draw, so they are the ones worth fitting
     * automatically. Everything else is left to the camera the scene chose: the
     * planar scenes are hand-framed, and thick lines are the wrong thing to
     * measure anyway — LineSegmentsGeometry reports a bounding box computed
     * from its instance attributes, which is not the box you see.
     */
    _tryFit() {
        const links = this.scene.children.filter((c) => c.linkName).length;
        if (!links) {
            // No robot *yet* is not the same as no robot: the meshes arrive over
            // several frames and the first frame always has none. Keep looking
            // for a couple of seconds before concluding this is a scene that
            // frames itself.
            if (++this._fitWaited > 900) this._fitted = true;
            return;
        }
        const sig = this.scene.children.length + ':' + links;
        if (sig !== this._fitSig) {
            this._fitSig = sig;
            this._fitStable = 0;
            return;
        }
        // ~8 frames of nothing new; long enough for a mesh load to land, short
        // enough that nobody sees the first framing.
        if (++this._fitStable < 8) return;
        if (this.fit({ margin: this.fitMargin * this.fitScale })) this._fitted = true;
    }

    setBackground(hex) {
        this.scene.background = new THREE.Color(hex);
    }

    showAxes(on = true) {
        if (this._axes) this._axes.visible = on;
    }

    showGrid(on = true) {
        for (const c of this.scene.children) if (c.isGridHelper) c.visible = on;
    }

    /** Pin the drawing buffer ratio; pass null to go back to measuring it. */
    setPixelRatio(n) {
        this._pixelRatioOverride = n;
        this._onResize();
    }

    onUpdate(fn) {
        this._updaters.add(fn);
        return () => this._updaters.delete(fn);
    }

    add(obj) {
        this.scene.add(obj && obj.object3D ? obj.object3D : obj);
        return obj;
    }

    remove(obj) {
        this.scene.remove(obj && obj.object3D ? obj.object3D : obj);
    }

    clear() {
        this._updaters.clear();
        this.setPlanar(false);
        for (const child of [...this.scene.children]) {
            if (child.isLight || child.isGridHelper || child.isAxesHelper) continue;
            this.scene.remove(child);
        }
    }

    start() {
        if (this._running) return;
        this._running = true;
        const loop = () => {
            if (!this._running) return;
            requestAnimationFrame(loop);
            this._checkEmbedScale();
            if (this.autoFit && !this._fitted) this._tryFit();
            if (this._planar) {
                this._pinPlanar();
            } else {
                this.controls.update();
            }
            for (const fn of this._updaters) fn();
            this.renderer.render(this.scene, this.camera);
        };
        loop();
    }

    stop() {
        this._running = false;
        window.removeEventListener('resize', this._onResize);
        if (this._parentWindow) {
            try { this._parentWindow.removeEventListener('resize', this._onResize); } catch (err) {}
            this._parentWindow = null;
        }
    }

    /**
     * Size the drawing buffer for the pixels the canvas really covers: the
     * display's own ratio times whatever scale the page puts on top of it.
     * Without the second factor a deck shown larger than 1600x900 -- which is
     * every full-screen projector and most laptops -- upscales the canvas.
     */
    _syncPixelRatio() {
        this._embedScale = embedScale(this.container);
        const wanted = this._pixelRatioOverride || Math.min(
            (window.devicePixelRatio || 1) * this._embedScale, this._maxPixelRatio);
        if (wanted === this._pixelRatio) return;
        this._pixelRatio = wanted;
        this.renderer.setPixelRatio(wanted);
    }

    /**
     * Reveal rescales the stage on window resize, on fullscreen and on
     * overview, and none of that raises an event inside this frame. Polling a
     * few times a second is cheap -- two rect reads -- and quick enough that
     * the soft frame is never seen.
     */
    _checkEmbedScale() {
        const now = performance.now();
        if (now - this._scaleChecked < 200) return;
        this._scaleChecked = now;
        if (Math.abs(embedScale(this.container) - this._embedScale) > 0.005) {
            this._onResize();
        }
    }

    _onResize() {
        const w = Math.max(this.container.clientWidth, 2);
        const h = Math.max(this.container.clientHeight, 2);
        const aspect = w / h;
        if (this.camera.isOrthographicCamera) {
            const e = this._orthoExtent * this.fitScale;
            this.camera.left = -e * aspect;
            this.camera.right = e * aspect;
            this.camera.top = e;
            this.camera.bottom = -e;
        } else {
            this.camera.aspect = aspect;
        }
        this.camera.updateProjectionMatrix();
        this._syncPixelRatio();
        this.renderer.setSize(w, h, false);
        // Line2 draws in screen space, so every thick line needs the canvas size
        setLineResolution(w, h);
    }
}
