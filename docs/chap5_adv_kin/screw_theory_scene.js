import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// The scene/world separation follows ENG_654's threeUtils.js and poeUrdfPlayground.js.
// All robotics coordinates stay z-up. Only the display root is rotated into Three.js.
export const assetURL = file => new URL(`./assets/${file}`, import.meta.url).href;
export const v3 = a => new THREE.Vector3(...a);
export const matrix4 = H => new THREE.Matrix4().set(...H.flat());
export const fmt = (x, digits = 3) => (Math.abs(x) < .5*10**-digits ? 0 : x).toFixed(digits);
export const vectorText = a => `[${a.map(x => fmt(x)).join(', ')}]`;
export const palette = {axis:0x137d92, velocity:0xd4751a, force:0x913f84, origin:0x304d62, path:0x9fadb5};

const kits = new Set(); let lastTime = 0;
function tick(time) {
  const dt = Math.min((time-lastTime)/1000, .05); lastTime = time;
  if (!document.hidden) for (const kit of kits) if (kit.visible) {
    kit.onTick?.(dt);
    kit.controls.update(); kit.render();
  }
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);

export function sceneKit(container, options = {}) {
  const stage = document.createElement('div'); stage.className='st-stage';
  container.append(stage);
  const scene = new THREE.Scene(); scene.background=new THREE.Color(0xf3f7fa);
  const camera=new THREE.PerspectiveCamera(40,1,.01,100);
  camera.position.fromArray(options.camera || [3,2.7,3]);
  const renderer=new THREE.WebGLRenderer({antialias:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1,2));
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  stage.append(renderer.domElement);
  renderer.domElement.tabIndex=0;
  renderer.domElement.setAttribute('role','img');
  renderer.domElement.setAttribute('aria-label',options.label || 'Interactive 3D scene. Drag to orbit, scroll to zoom, arrow keys to pan.');
  scene.add(new THREE.HemisphereLight(0xffffff,0x75879b,2));
  const light=new THREE.DirectionalLight(0xffffff,2.4); light.position.set(3,7,5);scene.add(light);
  const world=new THREE.Group();world.rotation.x=-Math.PI/2;scene.add(world);
  const grid=new THREE.GridHelper(options.grid || 4,16,0xc4d3dd,0xe0e8ed);
  grid.rotation.x=Math.PI/2;world.add(grid);
  const controls=new OrbitControls(camera,renderer.domElement);
  controls.enableDamping=true;controls.dampingFactor=.08;
  controls.target.fromArray(options.target || [.3,.4,0]);controls.update();
  controls.saveState();
  controls.listenToKeyEvents(renderer.domElement);
  const legend=document.createElement('div');legend.className='st-legend';
  legend.textContent=options.legend || 'Axes: x red · y green · z blue. Drag to orbit; scroll to zoom.';stage.append(legend);
  const kit={stage,scene,camera,renderer,world,controls,visible:true,onTick:null,render:()=>renderer.render(scene,camera)};
  const resize=()=> {
    const w=Math.max(stage.clientWidth,1),h=Math.max(stage.clientHeight,1);
    renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();kit.render();
  };
  const ro=new ResizeObserver(resize);ro.observe(stage);resize();
  const io=new IntersectionObserver(entries=>{kit.visible=entries[0].isIntersecting;});io.observe(stage);
  kits.add(kit);
  renderer.domElement.addEventListener('webglcontextlost',event=> {
    event.preventDefault();kit.visible=false;legend.textContent='3D context paused. Reload to restore it; the worked example below remains available.';
  });
  kit.dispose=()=> {
    kits.delete(kit);ro.disconnect();io.disconnect();controls.dispose();
    world.traverse(object=> {
      object.geometry?.dispose();
      const materials=Array.isArray(object.material)?object.material:[object.material];
      materials.filter(Boolean).forEach(m=>{m.map?.dispose();m.dispose();});
    });renderer.dispose();
  };
  return kit;
}
window.addEventListener('pagehide',event=>{if (!event.persisted) for(const kit of [...kits]) kit.dispose();});

export function frame(name, length=.5) {
  const g=new THREE.Group();g.matrixAutoUpdate=false;g.add(new THREE.AxesHelper(length));
  const t=label(name);t.position.set(length*.3,length*.2,length*.3);g.add(t);return g;
}
export function label(text) {
  const canvas=document.createElement('canvas');canvas.width=256;canvas.height=64;
  const ctx=canvas.getContext('2d');ctx.fillStyle='#ffffffdd';ctx.fillRect(0,0,256,64);
  ctx.fillStyle='#233e51';ctx.font='600 27px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(text,128,32);
  const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;
  const s=new THREE.Sprite(new THREE.SpriteMaterial({map:texture,depthTest:false}));s.scale.set(.5,.125,1);return s;
}
export function arrow(origin, direction, color=palette.velocity) {
  const a=new THREE.ArrowHelper(new THREE.Vector3(1,0,0),v3(origin),1,color,.12,.065);
  a.line.material.depthTest=false;a.cone.material.depthTest=false;a.line.renderOrder=20;a.cone.renderOrder=20;
  updateArrow(a,origin,direction);return a;
}
export function updateArrow(a, origin, direction) {
  const d=v3(direction),length=d.length();a.position.fromArray(origin);a.visible=length>1e-8;
  if (a.visible) {a.setDirection(d.normalize());a.setLength(length,Math.min(.13,.3*length),Math.min(.065,.15*length));}
}
export function marker(position,color=palette.velocity,radius=.045) {
  const m=new THREE.Mesh(new THREE.SphereGeometry(radius,16,12),new THREE.MeshStandardMaterial({color}));
  m.position.fromArray(position);return m;
}
export function polyline(points,color=palette.path) {
  return new THREE.Line(new THREE.BufferGeometry().setFromPoints(points.map(v3)),new THREE.LineBasicMaterial({color}));
}
export function updateLine(line,points) {
  const attr=line.geometry.getAttribute('position');
  if (attr.count!==points.length) throw new Error('Polyline vertex count changed.');
  points.forEach((p,i)=>attr.setXYZ(i,...p));attr.needsUpdate=true;line.geometry.computeBoundingSphere();
}
export function panel(container) {
  const controls=document.createElement('div');controls.className='st-controls';container.append(controls);
  const readout=document.createElement('div');readout.className='st-readout';readout.setAttribute('role','status');container.append(readout);
  return {controls,readout};
}
export function slider(panel, name, min, max, value, step=1, unit='') {
  const label=document.createElement('label');const caption=document.createElement('span');caption.textContent=name;
  const input=document.createElement('input');input.type='range';Object.assign(input,{min,max,step,value});
  const out=document.createElement('output');
  const update=()=>{out.textContent=`${input.value}${unit}`;};input.addEventListener('input',update);update();
  label.append(caption,input,out);panel.append(label);return input;
}
export function select(panel,name,options) {
  const label=document.createElement('label');label.append(document.createTextNode(name));
  const input=document.createElement('select');
  options.forEach(([value,text])=>{const option=document.createElement('option');option.value=value;option.textContent=text;input.append(option);});
  label.append(input);panel.append(label);return input;
}
export function button(panel,text,click) {
  const b=document.createElement('button');b.type='button';b.textContent=text;b.addEventListener('click',click);panel.append(b);return b;
}
export function playback(kit,controls,input,update,rate=30) {
  let playing=false,parameter=Number(input.value),animating=false,range=`${input.min}:${input.max}`;
  input.addEventListener('input',()=>{if(!animating)parameter=Number(input.value);});
  const b=button(controls,'Play',()=>{playing=!playing;b.textContent=playing?'Pause':'Play';b.setAttribute('aria-pressed',String(playing));});
  b.setAttribute('aria-pressed','false');
  kit.onTick=dt=>{if (playing) {
    const nextRange=`${input.min}:${input.max}`;
    if(range!==nextRange) {range=nextRange;parameter=Number(input.value);}
    parameter+=(typeof rate==='function'?rate():rate)*dt;
    if (parameter>Number(input.max)) parameter=Number(input.min);
    input.value=parameter;animating=true;input.dispatchEvent(new Event('input'));animating=false;
  }};
  button(controls,'Reset view',()=>{kit.controls.reset();kit.render();});
}
let cupPromise;
export async function loadCup() {
  cupPromise ||= new GLTFLoader().loadAsync(assetURL('cup.glb')).then(gltf=>gltf.scene);
  return (await cupPromise).clone(true);
}
