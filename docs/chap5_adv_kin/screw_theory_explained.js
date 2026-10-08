import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import * as M from './screw_theory_math.js';
import { sceneKit, frame, marker, arrow, updateArrow, polyline, updateLine, panel, slider, select, playback, loadCup, assetURL, matrix4, fmt, vectorText, palette } from './screw_theory_scene.js';
import { fanucLab } from './screw_theory_fanuc.js';

const DEG=Math.PI/180;
const factories={motion:motionLab,vectors:vectorLab,growth:growthLab,rotation2:rotation2Lab,rotation3:rotation3Lab,forces:forceLab,screw:screwLab,plucker:pluckerLab,adjoint:adjointLab,fanuc:fanucLab,door:doorLab};
const observer=new IntersectionObserver(entries=>{
  for(const entry of entries) if(entry.isIntersecting) {
    const host=entry.target;observer.unobserve(host);
    Promise.resolve().then(()=> {
      host.querySelector('.st-fallback')?.remove();return factories[host.dataset.stLab](host);
    }).then(()=>{
      const key=host.querySelector('.st-session-key');
      const controls=host.querySelector('.st-fanuc-actions') || host.querySelector('.st-controls');
      if(key && controls)controls.after(key);
      host.dataset.ready='true';
    }).catch(error=> {
      host.dataset.ready='error';
      const p=document.createElement('p');p.className='st-fallback';p.textContent='This interaction could not start. The prediction, equations, and worked answer alongside it can still be used.';host.append(p);
      console.error(`Screw theory lab ${host.id}:`,error);
    });
  }
},{rootMargin:'100px'});
document.querySelectorAll('[data-st-lab]').forEach(host=>observer.observe(host));

function bind(controls,update) { controls.addEventListener('input',update);controls.addEventListener('change',update);update(); }
function paintCup(cup,opacity) {
  cup.traverse(o=>{if(o.isMesh){o.material=o.material.clone();o.material.transparent=true;o.material.opacity=opacity;o.material.depthWrite=opacity>.9;}});
}
async function motionLab(host) {
  const kit=sceneKit(host,{label:'A cup translating, rotating, or doing both. Drag to orbit.'});
  const {controls,readout}=panel(host);
  const mode=select(controls,'Motion',[['translate','Slide the cup'],['rotate','Turn the cup'],['both','Turn and slide']]);
  const phi=slider(controls,'Progress φ',0,180,60,.1,'°');
  const cup=await loadCup(),ghost=await loadCup();paintCup(ghost,.18);kit.world.add(cup,ghost);
  const F0=frame('F₀',.6),Fi=frame('Fᵢ',.45);kit.world.add(F0,Fi);
  const trace=polyline(Array.from({length:81},()=>[0,0,0]));kit.world.add(trace);
  const update=()=> {
    const angle=Number(phi.value)*DEG,rot=mode.value==='translate'?0:angle;
    const slide=mode.value==='rotate'?0:.35*angle;
    const H=M.pose(M.rodrigues([0,0,1],rot),[.6*Math.cos(rot),.6*Math.sin(rot),.12+slide]);
    cup.matrixAutoUpdate=false;cup.matrix.copy(matrix4(H));Fi.matrix.copy(matrix4(H));ghost.position.set(.6,0,.12);
    updateLine(trace,Array.from({length:81},(_,i)=>{const a=rot*i/80;return [.6*Math.cos(a),.6*Math.sin(a),.12+slide*i/80];}));
    readout.textContent=`Same rigid cup; every pair of material points keeps its distance.\nOrientation change: ${fmt(rot/DEG,1)}°. Height change: ${fmt(slide)} m.\nA frame records where the cup is AND how it is turned.`;
  };
  bind(controls,update);playback(kit,controls,phi,update,25);
}
function makeSVG(host,label) {
  const stage=document.createElement('div');stage.className='st-stage';
  stage.innerHTML=`<svg viewBox="0 0 600 340" role="img" aria-label="${label}" style="width:100%;height:100%"></svg>`;
  host.append(stage);return stage.querySelector('svg');
}
function vectorLab(host) {
  const svg=makeSVG(host,'Two plane vectors, their scaled sum, and the zero vector');
  const {controls,readout}=panel(host),alpha=slider(controls,'Scale α',-2,2,1,.1),beta=slider(controls,'Scale β',-2,2,1,.1);
  const update=()=> {
    const a=[1,.4],b=[-.3,1],c=M.add(M.scale(a,Number(alpha.value)),M.scale(b,Number(beta.value)));
    const arr=(v,color,name)=>`<line x1="300" y1="190" x2="${300+v[0]*70}" y2="${190-v[1]*70}" stroke="${color}" stroke-width="4" marker-end="url(#${host.id}-arrow)"/><text x="${308+v[0]*70}" y="${185-v[1]*70}" fill="${color}">${name}</text>`;
    svg.innerHTML=`<defs><marker id="${host.id}-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="context-stroke"/></marker></defs><path d="M30 190H570M300 20V325" stroke="#b5c7d3"/><circle cx="300" cy="190" r="4" fill="#304d62"/>${arr(a,'#137d92','a')}${arr(b,'#913f84','b')}${arr(c,'#d4751a','αa + βb')}<text x="315" y="215" fill="#304d62">0</text>`;
    readout.textContent=`a = ${vectorText(a)}, b = ${vectorText(b)}\nαa + βb = ${vectorText(c)}. Still a vector in the same plane.\nSet both scales to 0. The zero vector must belong to the space.`;
  };bind(controls,update);
}
function growthLab(host) {
  const svg=makeSVG(host,'Repeated proportional changes converging to an exponential');
  const {controls,readout}=panel(host),n=slider(controls,'Number of steps n',1,128,4,1),rate=slider(controls,'Rate a',-1,1,1,.1);
  const update=()=> {
    const steps=Number(n.value),a=Number(rate.value),xy=(t,x)=>`${60+470*t},${290-75*x}`;
    const exact=Array.from({length:101},(_,i)=>xy(i/100,Math.exp(a*i/100))).join(' ');
    const approx=Array.from({length:steps+1},(_,i)=>xy(i/steps,(1+a/steps)**i)).join(' ');
    svg.innerHTML=`<path d="M60 30V290H550" stroke="#b5c7d3" fill="none"/><polyline points="${exact}" fill="none" stroke="#137d92" stroke-width="3"/><polyline points="${approx}" fill="none" stroke="#d4751a" stroke-width="3"/><text x="62" y="23" fill="#304d62">x(t), x(0)=1</text><text x="525" y="315" fill="#304d62">t=1</text><text x="75" y="325" fill="#137d92">teal: exp(at)</text><text x="300" y="325" fill="#d4751a">orange: n repeated updates</text>`;
    const discrete=(1+a/steps)**steps,continuous=Math.exp(a);
    readout.textContent=`(1 + a/n)ⁿ = ${fmt(discrete,6)}\nexp(a) = ${fmt(continuous,6)}; absolute error = ${fmt(Math.abs(discrete-continuous),6)}\n${a>0?'Growth':a<0?'Decay':'No change'}: ẋ = a x. Increase n to turn small updates into continuous evolution.`;
  };bind(controls,update);
}
function rotation2Lab(host) {
  const kit=sceneKit(host,{camera:[0,3.8,.01],target:[0,0,0],label:'Planar rotation with a tangent velocity and an approximation using small steps.'});
  kit.world.add(frame('F₀',1.2));
  const {controls,readout}=panel(host),phi=slider(controls,'Angle φ',-180,180,60,.1,'°'),n=slider(controls,'Small steps n',1,100,8,1);
  const radius=polyline([[0,0,0],[1,0,0]],palette.axis),tangent=arrow([1,0,0],[0,.5,0]);
  const exact=marker([1,0,0],palette.axis),approx=marker([1,0,0],palette.force);kit.world.add(radius,tangent,exact,approx);
  kit.world.add(polyline(Array.from({length:121},(_,i)=>[Math.cos(i*Math.PI/60),Math.sin(i*Math.PI/60),0])));
  const update=()=> {
    const angle=Number(phi.value)*DEG,steps=Number(n.value),r=[Math.cos(angle),Math.sin(angle),0];
    let z=[1,0];for(let i=0;i<steps;i++) z=[z[0]-angle/steps*z[1],z[1]+angle/steps*z[0]];
    exact.position.fromArray(r);approx.position.set(z[0],z[1],0);updateLine(radius,[[0,0,0],r]);updateArrow(tangent,r,[-.5*r[1],.5*r[0],0]);
    readout.textContent=`Teal point: exp(Ωφ)[1,0] = ${vectorText(r.slice(0,2))}\nPurple point: (I + Ωφ/n)ⁿ[1,0] = ${vectorText(z)}\nExact radius = 1; approximate radius = ${fmt(M.norm(z),6)}.\nThe orange tangent shows dr/dφ = Ωr. Finite Euler steps can stretch the circle; the exponential preserves it.`;
  };bind(controls,update);playback(kit,controls,phi,update,25);
}
function rotation3Lab(host) {
  const kit=sceneKit(host,{target:[0,0,0],label:'Rotation about an arbitrary 3D axis; a vector keeps its component along the axis.'});
  const {controls,readout}=panel(host),phi=slider(controls,'Angle φ',-180,180,45,.1,'°'),az=slider(controls,'Axis azimuth',-180,180,30,1,'°'),inc=slider(controls,'Axis tilt',0,90,35,1,'°');
  const F0=frame('F₀',.9),Fi=frame('Fᵢ',.75),axis=arrow([0,0,0],[0,0,1],palette.axis),rArrow=arrow([0,0,0],[1,0,0]),parallel=arrow([0,0,0],[0,0,.4],palette.force);
  kit.world.add(F0,Fi,axis,rArrow,parallel);
  const update=()=> {
    const a=Number(az.value)*DEG,b=Number(inc.value)*DEG,e=[Math.sin(b)*Math.cos(a),Math.sin(b)*Math.sin(a),Math.cos(b)];
    const R=M.rodrigues(e,Number(phi.value)*DEG),r=M.matvec(R,[1,0,0]);Fi.matrix.copy(matrix4(M.pose(R)));
    updateArrow(axis,[0,0,0],M.scale(e,1.3));updateArrow(rArrow,[0,0,0],r);updateArrow(parallel,[0,0,0],M.scale(e,e[0]));
    readout.textContent=`e = ${vectorText(e)}\nRotated r = ${vectorText(r)}; |r| = ${fmt(M.norm(r),6)}\ne · r = ${fmt(M.dot(e,r),6)} = e · r(0); det(R) = ${fmt(M.determinant(R),6)}\nTeal axis e, orange rotated vector, purple invariant parallel component.`;
  };bind(controls,update);playback(kit,controls,phi,update,25);
}
function forceLab(host) {
  const kit=sceneKit(host,{target:[0,.5,0],label:'One applied force or two opposite forces producing a pure couple.'});
  const {controls,readout}=panel(host),mode=select(controls,'Force system',[['single','One applied force'],['couple','Two opposite forces']]),arm=slider(controls,'Half separation a',.1,.8,.4,.01,' m'),strength=slider(controls,'Force magnitude',0,10,5,.1,' N');
  kit.world.add(frame('O',.4));
  const block=new THREE.Mesh(new THREE.BoxGeometry(1.7,.5,.2),new THREE.MeshStandardMaterial({color:0x779dae,transparent:true,opacity:.5}));block.position.z=.5;kit.world.add(block);
  const f1=arrow([0,0,.5],[0,.5,0],palette.force),f2=arrow([0,0,.5],[0,-.5,0],palette.force),moment=arrow([0,0,0],[0,0,1],palette.axis);kit.world.add(f1,f2,moment);
  const update=()=> {
    const a=Number(arm.value),f=Number(strength.value),r1=[a,0,.5],r2=[-a,0,.5],force1=[0,f,0],force2=[0,mode.value==='couple'?-f:0,0];
    const net=M.add(force1,force2),m=M.add(M.cross(r1,force1),M.cross(r2,force2));
    updateArrow(f1,r1,M.scale(force1,.08));updateArrow(f2,r2,M.scale(force2,.08));updateArrow(moment,[0,0,0],M.scale(m,.12));
    readout.textContent=`Resultant f = ${vectorText(net)} N\nMoment about O: m = ${vectorText(m)} N·m\nW = [f; m] = ${vectorText([...net,...m])}\n${mode.value==='couple'?'The forces cancel, but the turning effect remains. Zero resultant force does not mean zero wrench.':'Move the point of application: the force vector stays the same while its moment changes.'}\nPurple arrows: forces (0.08 m/N). Teal arrow: moment (0.12 m/(N·m)).`;
  };bind(controls,update);
}
async function screwLab(host) {
  const kit=sceneKit(host,{target:[.3,.6,0],legend:'Teal: axis · orange: point velocity (scaled by 0.4 s) · faint cup: reference pose.'});
  const {controls,readout}=panel(host),mode=select(controls,'Motion',[['helical','Helical'],['rotation','Pure rotation'],['translation','Pure translation']]),phi=slider(controls,'Parameter φ',-180,180,65,.1,'°'),h=slider(controls,'Pitch h',-.3,.3,.12,.01,' m/rad'),offset=slider(controls,'Axis offset pₓ',-.4,.4,.1,.01,' m'),speed=slider(controls,'Rate φ̇',-2,2,1,.1);
  const cup=await loadCup(),ghost=await loadCup();paintCup(ghost,.18);cup.matrixAutoUpdate=false;kit.world.add(cup,ghost);
  const F0=frame('F₀',.35),Fi=frame('Fᵢ',.35),axis=polyline([[0,0,-.6],[0,0,1.7]],palette.axis),velocity=arrow([.6,0,.3],[0,.5,0]),trace=polyline(Array.from({length:101},()=>[0,0,0]));kit.world.add(F0,Fi,axis,velocity,trace);
  let lastTranslation=false;
  const update=()=> {
    const translation=mode.value==='translation',pitch=mode.value==='rotation'?0:Number(h.value),p=[Number(offset.value),0,0],e=[0,0,1];
    h.disabled=mode.value!=='helical';phi.parentElement.querySelector('span').textContent=translation?'Parameter φ (m)':'Parameter φ (°)';
    if(translation!==lastTranslation) {
      const next=translation?Number(phi.value)/180:Number(phi.value)*180;
      phi.min=translation?-1:-180;phi.max=translation?1:180;phi.step=translation ? .01 : .1;phi.value=next;lastTranslation=translation;
    }
    phi.parentElement.querySelector('output').textContent=`${phi.value}${translation?' m':'°'}`;
    speed.parentElement.querySelector('span').textContent=translation?'Rate φ̇ (m/s)':'Rate φ̇ (rad/s)';
    const parameter=translation?Number(phi.value):Number(phi.value)*DEG,X=translation?[0,0,0,0,0,1]:M.screw(e,p,pitch),A=M.pose(M.identity(3),[p[0]+.65,0,.18]);
    const H=M.multiply(M.exponential(X,parameter),A),r=M.position(H),V=M.scale(X,Number(speed.value));
    cup.matrix.copy(matrix4(H));Fi.matrix.copy(matrix4(H));ghost.position.fromArray(M.position(A));
    updateLine(axis,[[p[0],0,-1],[p[0],0,1.8]]);const vr=M.add(M.cross(V.slice(0,3),r),V.slice(3));updateArrow(velocity,r,M.scale(vr,.4));
    updateLine(trace,Array.from({length:101},(_,i)=>M.position(M.multiply(M.exponential(X,parameter*i/100),A))));
    readout.textContent=`φ = ${fmt(parameter)} ${translation?'m':'rad'}; φ̇ = ${fmt(Number(speed.value))} ${translation?'m/s':'rad/s'}\nX = ${vectorText(X)}\nV = [ω; v] = ${vectorText(V)}\nMarked frame origin ṙ = ω × r + v = ${vectorText(vr)} m/s\n${translation?'Pure translation: ω = 0; no finite pitch or unique axis location.':`Pitch h = ${fmt(pitch)} m/rad; axial slide = hφ = ${fmt(pitch*parameter)} m; lead per turn = ${fmt(2*Math.PI*pitch)} m.`}\nChanging φ̇ changes the velocity arrows, not the selected pose.`;
  };bind(controls,update);playback(kit,controls,phi,update,()=>mode.value==='translation' ? .2 : 25);
}
function pluckerLab(host) {
  const kit=sceneKit(host,{target:[0,0,0],label:'A directed line, its closest point, and different points on the same axis.'});
  const {controls,readout}=panel(host),beta=slider(controls,'Axis tilt',-80,80,25,1,'°'),offset=slider(controls,'Line offset',-.7,.7,.4,.01,' m'),lambda=slider(controls,'Choose point λ',-1,1,0,.01,' m'),h=slider(controls,'Pitch h',-.3,.3,0,.01,' m/rad');
  const line=polyline([[0,0,-1],[0,0,1]],palette.axis),pArrow=arrow([0,0,0],[.4,0,0]),direction=arrow([0,0,0],[0,0,.5],palette.axis),point=marker([0,0,0]),closest=marker([0,0,0],palette.force);kit.world.add(frame('O',.5),line,pArrow,direction,point,closest);
  const update=()=> {
    const b=Number(beta.value)*DEG,e=[Math.sin(b),0,Math.cos(b)],p0=M.scale([Math.cos(b),0,-Math.sin(b)],Number(offset.value)),p=M.add(p0,M.scale(e,Number(lambda.value))),lineMoment=M.cross(p,e),eta=M.add(lineMoment,M.scale(e,Number(h.value)));
    updateLine(line,[M.add(p0,M.scale(e,-1.4)),M.add(p0,M.scale(e,1.4))]);updateArrow(pArrow,[0,0,0],p);updateArrow(direction,p,M.scale(e,.5));point.position.fromArray(p);closest.position.fromArray(p0);
    readout.textContent=`e = ${vectorText(e)}\np = ${vectorText(p)}; p × e = ${vectorText(lineMoment)}\nPlücker line pair: [e; p × e]. e · (p × e) = ${fmt(M.dot(e,lineMoment),6)}\nScrew X = [e; p × e + h e] = ${vectorText([...e,...eta])}\ne · η = ${fmt(M.dot(e,eta),6)} = h. Slide λ: the line moment stays fixed.\nPurple point: closest point p⊥. Orange point: the selected p on the same line.`;
  };bind(controls,update);
}
function adjointLab(host) {
  const kit=sceneKit(host,{target:[.3,.4,0],label:'The same velocity field expressed at two differently placed reference frames.'});
  const {controls,readout}=panel(host),phi=slider(controls,'Frame b rotation',-180,180,30,.1,'°'),px=slider(controls,'Frame b offset pₓ',-.6,.8,.5,.01,' m');
  const a=frame('Fₐ',.5),b=frame('Fᵦ',.5),point=marker([0,0,0]),va=arrow([0,0,0],[0,1,0]);kit.world.add(a,b,point,va);
  const update=()=> {
    const H=M.pose(M.rodrigues([0,0,1],Number(phi.value)*DEG),[Number(px.value),.2,.1]),Vb=[0,0,1,.15,0,.05],Wb=[1,0,0,0,0,.2];
    const V=M.transformTwist(H,Vb),W=M.transformWrench(H,Wb),r=M.add(M.matvec(M.rotation(H),[.6,0,.2]),M.position(H));b.matrix.copy(matrix4(H));point.position.fromArray(r);
    updateArrow(va,r,M.scale(M.add(M.cross(V.slice(0,3),r),V.slice(3)),.5));
    readout.textContent=`ᵇV = ${vectorText(Vb)}\nᵃV = Ad(H) ᵇV = ${vectorText(V)}\nᵇW = ${vectorText(Wb)}\nᵃW = ${vectorText(W)}\nPower: ᵇW ⊙ ᵇV = ${fmt(M.reciprocal(Wb,Vb),6)} W = ᵃW ⊙ ᵃV = ${fmt(M.reciprocal(W,V),6)} W\nOrange arrow: actual velocity at the marked point, scaled by 0.5 s.`;
  };bind(controls,update);
}
async function doorLab(host) {
  const kit=sceneKit(host,{camera:[3,2.6,3.3],target:[.35,.9,0],legend:'Teal: ideal hinge axis · purple: applied force · orange: handle velocity for ω = 1 rad/s.'});
  const {controls,readout}=panel(host),phi=slider(controls,'Door angle φ',0,100,35,.1,'°'),strength=slider(controls,'Force / couple magnitude',-20,20,10,.1),mode=select(controls,'Apply',[['tangent','Tangential push at handle (N)'],['radial','Force toward hinge (N)'],['vertical','Vertical force at handle (N)'],['couple','Pure hinge-axis couple (N·m)']]);
  const door=await new OBJLoader().loadAsync(assetURL('door_panel.obj'));
  door.traverse(o=>{if(o.isMesh)o.material=new THREE.MeshStandardMaterial({color:0xbcccad,roughness:.7,transparent:true,opacity:.8});});kit.world.add(door);
  kit.world.add(polyline([[0,0,0],[0,0,2.05]],palette.axis),frame('hinge O',.35));
  const handle=marker([.85,0,.9],palette.origin,.055),force=arrow([0,0,0],[1,0,0],palette.force),velocity=arrow([0,0,0],[1,0,0]),couple=arrow([0,0,1],[0,0,.5],palette.force);kit.world.add(handle,force,velocity,couple);
  const update=()=> {
    const angle=Number(phi.value)*DEG,c=Math.cos(angle),s=Math.sin(angle),r=[.85*c,.85*s,.9],value=Number(strength.value);
    door.rotation.z=angle;handle.position.fromArray(r);
    const f=mode.value==='tangent'?M.scale([-s,c,0],value):mode.value==='radial'?M.scale([-c,-s,0],value):mode.value==='vertical'?[0,0,value]:[0,0,0];
    const m=M.add(M.cross(r,f),[0,0,mode.value==='couple'?value:0]),W=[...f,...m],V=[0,0,1,0,0,0],P=M.reciprocal(W,V);
    updateArrow(force,r,M.scale(f,.035));updateArrow(velocity,r,[-.425*s,.425*c,0]);updateArrow(couple,[0,0,1],mode.value==='couple'?[0,0,value*.04]:[0,0,0]);
    readout.textContent=`Hinge twist V = [0,0,1; 0,0,0], with φ̇ = 1 rad/s\nHandle r = ${vectorText(r)} m; ṙ = ${vectorText([-.85*s,.85*c,0])} m/s\nW = [f; m] = ${vectorText(W)}\nW ⊙ V = m_z φ̇ = ${fmt(P)} W\n${Math.abs(P)<1e-9?'Reciprocal: this wrench does zero power on the allowed hinge motion.':'Nonreciprocal: this wrench can drive or oppose the hinge motion.'}\nThis compares virtual power at a chosen pose; it does not simulate force-driven dynamics.`;
  };bind(controls,update);playback(kit,controls,phi,update,15);
}
