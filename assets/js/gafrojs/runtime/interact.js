import * as THREE from 'three';

/**
 * Pointer dragging for meshes tagged with userData.drag = { mode: 'xy'|'camera', onMove(pos) }.
 * Imported by demos/scenes/*.js. No data files.
 */
export function enableDragging(viewer) {
    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    const plane = new THREE.Plane();
    const hit = new THREE.Vector3();
    const camDir = new THREE.Vector3();
    let current = null;

    function setNdc(ev) {
        const r = viewer.renderer.domElement.getBoundingClientRect();
        ndc.x = ((ev.clientX - r.left) / r.width) * 2 - 1;
        ndc.y = -((ev.clientY - r.top) / r.height) * 2 + 1;
    }

    function collect() {
        const objs = [];
        viewer.scene.traverse((o) => {
            if (o.userData && o.userData.drag) objs.push(o);
        });
        return objs;
    }

    function setPlane(obj) {
        const mode = (obj.userData.drag && obj.userData.drag.mode) || 'xy';
        if (mode === 'camera') {
            viewer.camera.getWorldDirection(camDir);
            plane.setFromNormalAndCoplanarPoint(camDir, obj.position);
        } else {
            const z = (obj.userData.drag && obj.userData.drag.z) || 0;
            plane.set(new THREE.Vector3(0, 0, 1), -z);
        }
    }

    function onDown(ev) {
        setNdc(ev);
        raycaster.setFromCamera(ndc, viewer.camera);
        const found = raycaster.intersectObjects(collect(), false)[0];
        if (!found) return;
        current = found.object;
        setPlane(current);
        viewer.controls.enabled = false;
        ev.preventDefault();
    }

    function onMove(ev) {
        if (!current) return;
        setNdc(ev);
        raycaster.setFromCamera(ndc, viewer.camera);
        if (!raycaster.ray.intersectPlane(plane, hit)) return;
        const z = (current.userData.drag && current.userData.drag.z) || 0;
        if ((current.userData.drag && current.userData.drag.mode) !== 'camera') hit.z = z;
        current.position.copy(hit);
        if (current.userData.drag.onMove) current.userData.drag.onMove(current.position);
    }

    function onUp() {
        if (!current) return;
        current = null;
        viewer.controls.enabled = true;
    }

    const el = viewer.renderer.domElement;
    el.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return {
        dispose() {
            el.removeEventListener('pointerdown', onDown);
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerup', onUp);
        },
    };
}

export function handleMesh(position, { color = 0x33aa55, radius = 0.05, mode = 'xy', onMove, z = 0 } = {}) {
    const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(radius, 18, 14),
        new THREE.MeshStandardMaterial({
            color, emissive: color, emissiveIntensity: 0.25, metalness: 0.1, roughness: 0.4,
        }),
    );
    const p = position.isVector3 ? position : new THREE.Vector3(...position);
    mesh.position.copy(p);
    mesh.userData.drag = { mode, z, onMove: onMove || (() => {}) };
    return mesh;
}
