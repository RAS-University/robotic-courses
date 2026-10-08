import * as THREE from 'three';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';
import * as M from './screw_theory_math.js';
import { sceneKit, frame, label, marker, arrow, updateArrow, polyline, updateLine, panel, slider, select, button, assetURL, matrix4, fmt, vectorText, palette } from './screw_theory_scene.js';

const MODEL='fanuc_crx10ia_support/';const DEG=Math.PI/180;let modelPromise;
function triple(text, fallback) {
  const values=(text || fallback).trim().split(/\s+/).map(Number);
  if(values.length!==3 || values.some(v=>!Number.isFinite(v))) throw new Error('Invalid URDF coordinate triple.');
  return values;
}
function origin(element) {
  return M.rpyPose(triple(element?.getAttribute('xyz'),'0 0 0'),triple(element?.getAttribute('rpy'),'0 0 0'));
}
async function loadModel() {
  modelPromise ||= (async()=> {
    const response=await fetch(assetURL(MODEL+'crx10ial.urdf'));
    if(!response.ok) throw new Error(`URDF request failed (${response.status}).`);
    const xml=new DOMParser().parseFromString(await response.text(),'application/xml');
    if(xml.querySelector('parsererror')) throw new Error('Invalid URDF XML.');
    // This chapter extracts the supplied main serial chain; fixed base/tool branches stay in the copied URDF.
    const joints=Array.from({length:6},(_,i)=> {
      const joint=xml.querySelector(`joint[name="joint_${i+1}"]`);
      if(!joint) throw new Error('The supplied CRX main joint chain is incomplete.');
      const limit=joint.querySelector('limit'),axis=triple(joint.querySelector('axis')?.getAttribute('xyz'),'1 0 0');
      return {name:joint.getAttribute('name'),type:joint.getAttribute('type'),origin:origin(joint.querySelector('origin')),axis:M.scale(axis,1/M.norm(axis)),lower:Number(limit.getAttribute('lower')),upper:Number(limit.getAttribute('upper')),parent:joint.querySelector('parent').getAttribute('link'),child:joint.querySelector('child').getAttribute('link')};
    });
    const loader=new STLLoader();
    const visuals=await Promise.all(['base_link',...joints.map(j=>j.child)].map(async name=> {
      const visual=xml.querySelector(`link[name="${name}"] visual`);
      const filename=visual.querySelector('mesh').getAttribute('filename').split('/').pop();
      const geometry=await loader.loadAsync(assetURL(MODEL+filename));
      const rgba=(visual.querySelector('color')?.getAttribute('rgba') || '.8 .8 .8 1').split(/\s+/).map(Number);
      return {geometry,origin:origin(visual.querySelector('origin')),scale:triple(visual.querySelector('mesh').getAttribute('scale'),'1 1 1'),color:new THREE.Color(...rgba.slice(0,3))};
    }));
    return {joints,visuals,...M.chainHome(joints)};
  })();return modelPromise;
}

const COLORS=['#147b8b','#b55b14','#7951ad','#187a47','#b83b73','#315fbd'];
const SUB=['₀','₁','₂','₃','₄','₅','₆'],SUP=['⁰','¹','²','³','⁴','⁵','⁶'];
const jacobianName=(expression,body)=>SUP[expression]+'J'+SUB[body];
const columnName=(expression,body,joint)=>jacobianName(expression,body)+','+SUB[joint];
function element(tag,className,text) {
  const node=document.createElement(tag);if(className)node.className=className;
  if(text!==undefined)node.textContent=text;return node;
}
function vector(host,name,value,description) {
  const row=element('div','st-fanuc-vector');
  row.dataset.values=JSON.stringify(value);
  row.append(element('strong','',name),element('code','',vectorText(value)));
  if(description)row.append(element('span','',description));host.append(row);
}
function table(host,caption,A,{selected=-1,built=A[0].length,columnLabels,onSelect}={}) {
  host.replaceChildren();
  const grid=element('table'),cap=element('caption','',caption);grid.append(cap);
  const head=document.createElement('tr'),corner=element('th','','row');head.append(corner);
  A[0].forEach((_,j)=>{
    const th=element('th');th.scope='col';th.dataset.joint=String(j+1);
    if(onSelect) {
      const choice=element('button','st-column-choice','joint '+(j+1));
      choice.type='button';choice.style.setProperty('--st-joint-color',COLORS[j]);
      choice.setAttribute('aria-label','Inspect screw '+(j+1));
      choice.setAttribute('aria-pressed',String(j===selected));choice.addEventListener('click',()=>onSelect(j));th.append(choice);
    } else th.textContent=columnLabels?.[j] || 'joint '+(j+1);
    if(j===selected)th.className='st-selected';head.append(th);
  });
  const thead=document.createElement('thead');thead.append(head);grid.append(thead);
  const tbody=document.createElement('tbody'),names=A.length===6?['ξₓ','ξᵧ','ξ_z','ηₓ','ηᵧ','η_z']:['1','2','3','4'];
  A.forEach((row,i)=>{
    const tr=document.createElement('tr'),th=element('th','',names[i]);th.scope='row';tr.append(th);
    if(i===3)tr.className='st-linear-row';
    row.forEach((value,j)=>{
      const td=element('td',j===selected?'st-selected':'',j<built?fmt(value,5):'—');
      td.dataset.joint=String(j+1);
      if(j>=built) {td.classList.add('st-pending');td.setAttribute('aria-label','Screw '+(j+1)+' has not been added');}
      else if(onSelect)td.style.setProperty('--st-joint-color',COLORS[j]);
      tr.append(td);
    });tbody.append(tr);
  });
  grid.append(tbody);host.append(grid);
}
export async function fanucLab(host) {
  const kit=sceneKit(host,{
    camera:[1.9,1.6,2.1],target:[.1,.75,0],grid:3,
    label:'Build a FANUC Jacobian from six joint screws. Colored lines show joint axes; the orange arrow shows the selected joint contribution to the target origin velocity.',
    legend:'Drag to orbit; scroll to zoom. Joint colors match matrix columns. Orange: target-point velocity.'
  });
  const {controls,readout}=panel(host);readout.textContent='Loading FANUC URDF and seven STL visuals…';
  const model=await loadModel(),defaults=[20,-35,40,25,-30,15];
  let built=0,assembling=false,assemblyTimer=null,labVisible=true;
  const visibility=new IntersectionObserver(entries=>{labVisible=entries[0].isIntersecting;});visibility.observe(host);
  const dispose=kit.dispose;
  kit.dispose=()=>{stopAssembly();visibility.disconnect();dispose();};
  const bodyChoice=select(controls,'Target body',[['6','Body 6: flange'],['4','Body 4']]);
  const jointChoice=select(controls,'Inspect screw',model.joints.map((_,i)=>[String(i),'Joint '+(i+1)]));
  const frameChoice=select(controls,'Express in',Array.from({length:7},(_,i)=>[String(i),'F'+SUB[i]+(i===0?' (base)':i===6?' (flange)':'')]));
  [[bodyChoice,'Target body'],[jointChoice,'Inspect screw'],[frameChoice,'Express in']].forEach(([input,name])=>input.setAttribute('aria-label',name));
  const actions=element('div','st-controls st-fanuc-actions');host.append(actions);
  const nextButton=button(actions,'Add screw 1',()=>addNext());
  const allButton=button(actions,'Animate assembly',()=>{
    if(assembling) {stopAssembly();return;}
    if(built===Number(bodyChoice.value))built=0;
    assembling=true;allButton.textContent='Pause assembly';allButton.setAttribute('aria-pressed','true');
    addNext(true);
    if(assembling)assemblyTimer=setInterval(()=>{if(labVisible && !document.hidden)addNext(true);},850);
  });
  allButton.setAttribute('aria-pressed','false');
  button(actions,'Start again',()=>{stopAssembly();built=0;jointChoice.value='0';update();});
  button(actions,'Worked pose',()=>setPose(defaults));
  button(actions,'Home pose',()=>setPose([0,0,0,0,0,0]));
  button(actions,'Reset view',()=>{kit.controls.reset();kit.render();});

  const poseDetails=element('details','st-reveal st-fanuc-pose');
  poseDetails.append(element('summary','','Adjust the pose and PoE factors'));
  const poseControls=element('div','st-controls');poseDetails.append(poseControls);host.append(poseDetails);
  const inputs=model.joints.map((j,i)=>slider(poseControls,'q'+(i+1),j.lower/DEG,j.upper/DEG,defaults[i],.1,'°'));
  const prefix=select(poseControls,'PoE factors',Array.from({length:7},(_,i)=>[String(i),i===6?'All 6':i+' of 6']));prefix.value='6';
  const opacity=slider(poseControls,'CAD opacity',.15,1,.65,.05);

  const explanation=element('section','st-fanuc-construction');
  explanation.setAttribute('aria-label','Construction of the selected screw');host.append(explanation);
  const heading=element('p','st-fanuc-heading'),steps=element('div','st-fanuc-steps');explanation.append(heading,steps);
  const cards=['1 · Locate the current axis','2 · Build the linear part','3 · Make the screw column'].map(title=>{
    const card=element('div','st-fanuc-card');card.append(element('strong','',title));
    const content=element('div');card.append(content);steps.append(card);return content;
  });
  const homeNote=element('p','st-fanuc-home-note');explanation.append(homeNote);

  const data=element('div','st-data st-fanuc-stack');host.append(data);
  const stackStatus=element('p','st-fanuc-stack-status'),stackFormula=element('p','st-fanuc-stack-formula'),Jhost=element('div','st-fanuc-jacobian');
  data.append(stackStatus,stackFormula,Jhost);
  const stackHelp=element('p','st-fanuc-note','Each colored column is one joint’s twist at unit rate. Upper rows are angular; lower rows are the linear intercept of the velocity field. Empty slots (—) have not been added; they are not zero screws. Click a column heading to inspect it.');
  data.append(stackHelp);

  const comparison=element('section','st-fanuc-frame-comparison');host.append(comparison);
  comparison.append(element('p','st-fanuc-heading','What does changing the reference frame mean?'));
  const frameStory=element('p','st-fanuc-note'),frameRule=element('p','st-fanuc-rule'),frameTable=element('div','st-data'),frameBreakdown=element('div','st-fanuc-frame-steps');
  comparison.append(frameStory,frameRule,frameTable,frameBreakdown);
  const frameActions=element('div','st-controls');comparison.append(frameActions);
  button(frameActions,'Use selected joint frame',()=>{stopAssembly();frameChoice.value=String(Number(jointChoice.value)+1);update();});
  button(frameActions,'Return to base frame',()=>{stopAssembly();frameChoice.value='0';update();});
  button(frameActions,'Calculate ³J₄',()=>{stopAssembly();frameChoice.value='3';bodyChoice.value='4';built=4;jointChoice.value='3';update();});
  button(frameActions,'Compare ³J₆ / ⁴J₆',()=>{stopAssembly();bodyChoice.value='6';built=6;frameChoice.value=frameChoice.value==='3'?'4':'3';update();});

  const checks=element('details','st-reveal st-fanuc-checks');checks.append(element('summary','','Pose and determinant checks'));
  const checkText=element('div','st-readout'),Hhost=element('div','st-data');checks.append(checkText,Hhost);host.append(checks);
  host.append(readout);

  const groups=model.visuals.map(spec=>{
    const link=new THREE.Group();link.matrixAutoUpdate=false;
    const mesh=new THREE.Mesh(spec.geometry,new THREE.MeshStandardMaterial({color:spec.color,roughness:.6,metalness:.12,transparent:true,opacity:.65}));
    mesh.matrixAutoUpdate=false;
    mesh.matrix.copy(matrix4(spec.origin)).multiply(new THREE.Matrix4().makeScale(...spec.scale));link.add(mesh);kit.world.add(link);return link;
  });
  const frames=Array.from({length:7},(_,i)=>frame('F'+SUB[i],i===0?.3:.25));kit.world.add(...frames);
  const axes=model.joints.map((_,i)=>{
    const line=polyline([[0,0,0],[0,0,1]],COLORS[i]);
    line.material.transparent=true;line.material.depthTest=false;line.renderOrder=10;
    const point=marker([0,0,0],COLORS[i],.025),name=label('Joint '+(i+1));
    const direction=arrow([0,0,0],[0,0,1],COLORS[i]);kit.world.add(line,point,name,direction);
    return {line,point,name,direction};
  });
  const axisPosition=arrow([0,0,0],[0,0,0],palette.origin);
  const tip=marker([0,0,0],palette.velocity,.035),velocity=arrow([0,0,0],[0,1,0]);
  const frameOffset=polyline([[0,0,0],[0,0,0]],palette.path);kit.world.add(axisPosition,tip,velocity,frameOffset);
  function stopAssembly() {
    clearInterval(assemblyTimer);assemblyTimer=null;
    assembling=false;allButton.textContent='Animate assembly';allButton.setAttribute('aria-pressed','false');
  }
  function addNext(automatic=false) {
    if(!automatic)stopAssembly();
    if(built>=Number(bodyChoice.value))return;
    jointChoice.value=String(built);built+=1;update();
  }
  function setPose(values) {
    stopAssembly();inputs.forEach((input,i)=>{input.value=values[i];input.dispatchEvent(new Event('input'));});
    prefix.value='6';update();
  }
  function update() {
    const body=Number(bodyChoice.value),expressed=Number(frameChoice.value);
    built=Math.min(built,body);
    if(Number(jointChoice.value)>=body)jointChoice.value=String(body-1);
    Array.from(jointChoice.options).forEach((option,i)=>option.disabled=i>=body);
    const selected=Number(jointChoice.value),count=Number(prefix.value),q=inputs.map((input,i)=>i<count?Number(input.value)*DEG:0);
    const Hs=M.forwardURDF(model.joints,q),J0=M.spaceJacobian(model.Y,q);
    const Hexpressed=expressed?Hs[expressed-1]:M.identity(4),HintoFrame=M.inversePose(Hexpressed),Rt=M.rotation(HintoFrame),t=M.position(Hexpressed);
    const J=M.multiply(M.adjoint(HintoFrame),J0.map(row=>row.slice(0,body)));
    groups.forEach((g,i)=>{
      g.matrix.copy(matrix4(i?Hs[i-1]:M.identity(4)));
      g.children[0].material.opacity=Number(opacity.value);g.children[0].material.depthWrite=Number(opacity.value)>.95;
    });
    frames.forEach((f,i)=>{f.matrix.copy(matrix4(i?Hs[i-1]:M.identity(4)));f.visible=i===0 || i===expressed;});
    const jointGeometry=model.joints.map((joint,i)=>{
      const jointPose=M.multiply(i?Hs[i-1]:M.identity(4),joint.origin);
      const p=M.position(jointPose),e=M.matvec(M.rotation(jointPose),joint.axis),a=axes[i],active=i===selected,visible=i<body && (i<built || active);
      updateLine(a.line,[M.add(p,M.scale(e,-.34)),M.add(p,M.scale(e,.42))]);
      a.line.visible=visible;a.line.material.opacity=active?1:.32;
      a.point.position.fromArray(p);a.point.visible=visible;
      a.name.position.fromArray(M.add(p,M.scale(e,.52)));a.name.visible=active;
      updateArrow(a.direction,p,M.scale(e,.38));a.direction.visible=active;
      return {p,e};
    });
    const {p:p0,e:e0}=jointGeometry[selected],p=M.matvec(Rt,M.add(p0,M.scale(t,-1))),e=M.matvec(Rt,e0),eta=M.cross(p,e),column=J.map(row=>row[selected]);
    const target=M.position(Hs[body-1]),xi0=J0.slice(0,3).map(row=>row[selected]),eta0=J0.slice(3).map(row=>row[selected]);
    const targetVelocity=M.add(M.cross(xi0,target),eta0);tip.position.fromArray(target);
    updateArrow(velocity,target,M.scale(targetVelocity,.4));
    updateArrow(axisPosition,t,M.add(p0,M.scale(t,-1)));updateLine(frameOffset,[[0,0,0],t]);

    explanation.style.setProperty('--st-joint-color',COLORS[selected]);
    heading.textContent='Joint '+(selected+1)+' → column '+(selected+1)+' of '+jacobianName(expressed,body);
    cards.forEach(card=>card.replaceChildren());
    vector(cards[0],'p'+SUB[selected+1],p,'point on the axis, in F'+SUB[expressed]+' (m)');
    vector(cards[0],'e'+SUB[selected+1],e,'unit axis direction, in F'+SUB[expressed]);
    vector(cards[1],'η = p × e',eta,'zero pitch for this revolute joint');
    cards[1].append(element('p','st-fanuc-note','The axis position matters: an offset rotation needs this linear component.'));
    const columnVector=element('div','st-screw-column');columnVector.setAttribute('aria-label','Selected screw column');
    column.forEach((value,i)=>{
      const row=element('div',i===3?'st-linear-row':'');row.append(element('span','',['ξₓ','ξᵧ','ξ_z','ηₓ','ηᵧ','η_z'][i]),element('code','',fmt(value,5)));
      row.dataset.component=String(i);row.dataset.value=String(value);columnVector.append(row);
    });
    cards[2].append(element('p','st-fanuc-note','[ξ; η] = [e; p × e]'),columnVector);
    cards[2].append(element('p','st-fanuc-note',selected<built?'This screw is already in its matching matrix slot.':'Choose Add screw '+(built+1)+' to fill the next matrix slot.'));
    homeNote.textContent='From home to current: ⁰J'+SUB[body]+','+SUB[selected+1]+' = Ad(G'+SUB[selected]+')Y'+SUB[selected+1]+'. '+(selected?'G'+SUB[selected]+' contains the upstream joint motions.':'G₀ = I: no upstream joint carries the first axis.')+' Home screw Y'+SUB[selected+1]+' = '+vectorText(model.Y[selected])+'.';
    host.dataset.built=String(built);host.dataset.expressed=String(expressed);host.dataset.body=String(body);host.dataset.selected=String(selected+1);
    nextButton.disabled=built===body;nextButton.textContent=built===body?'Jacobian complete':'Add screw '+(built+1);
    stackStatus.textContent='4 · Stack the screws: '+built+' of '+body+' columns built';
    stackFormula.textContent=jacobianName(expressed,body)+' = [ '+Array.from({length:body},(_,i)=>columnName(expressed,body,i+1)).join('  |  ')+' ]';
    table(Jhost,jacobianName(expressed,body)+' · colored joint axes become matching matrix columns.',J,{selected,built,onSelect:i=>{stopAssembly();jointChoice.value=String(i);update();}});

    frameStory.textContent=expressed===0
      ?'We currently describe the axis from F₀. Choose another frame or Use selected joint frame. Watch its origin and axes appear on the robot, then compare the coordinates below.'
      :'We now measure from the origin and axes of F'+SUB[expressed]+'. The joint angles, physical screw line, and orange point-velocity arrow stay fixed when only this choice changes. The gray arrow runs from the chosen origin to the joint axis. This expresses the body’s absolute twist in new coordinates.';
    frameRule.textContent=jacobianName(expressed,body)+' = Ad(H'+SUB[expressed]+'⁻¹) ⁰J'+SUB[body]+'. Apply the same map to every built column.';
    const pair=xi0.concat(eta0).map((value,i)=>[value,column[i]]);
    table(frameTable,'Same selected screw, two coordinate descriptions',pair,{columnLabels:['In F₀','In F'+SUB[expressed]]});
    frameBreakdown.replaceChildren();
    const rotatedEta=M.matvec(Rt,eta0),originCorrection=M.matvec(Rt,M.scale(M.cross(t,xi0),-1));
    vector(frameBreakdown,'t = origin of F'+SUB[expressed]+' in F₀',t,'metres; gray connector from the base');
    vector(frameBreakdown,'ξⁱ = Rᵀ ξ⁰',column.slice(0,3),'rotate the angular coordinates');
    vector(frameBreakdown,'Rᵀ η⁰',rotatedEta,'rotate the old linear coordinates');
    vector(frameBreakdown,'−Rᵀ(t × ξ⁰)',originCorrection,'account for the new origin');
    vector(frameBreakdown,'ηⁱ = Rᵀ η⁰ − Rᵀ(t × ξ⁰)',column.slice(3),'add the two linear contributions');
    frameBreakdown.append(element('p','st-fanuc-note','Here Hᵢ = [R, t; 0ᵀ, 1] locates Fᵢ in F₀. Reexpressing a twist is different from subtracting that frame’s own motion. η is the velocity-field intercept; the orange arrow is the velocity of the selected body origin.'));

    const Hpoe=M.forwardPoE(model.Y,q,model.A[5]),error=Math.max(...Hs[5].flat().map((x,i)=>Math.abs(x-Hpoe.flat()[i])));
    const J3=M.multiply(M.adjoint(M.inversePose(Hs[2])),J0),J4=M.multiply(M.adjoint(M.inversePose(Hs[3])),J0);
    checkText.textContent='Applied q (degrees): '+vectorText(q.map(x=>x/DEG))+'\nH₆ = '+(count?Array.from({length:count},(_,i)=>'exp(Ŷ'+(i+1)+'q'+(i+1)+')').join(' '):'I')+' A₆\nURDF chain versus PoE: max absolute matrix entry difference = '+error.toExponential(2)+'\ndet(⁰J₆) = '+M.determinant(J0).toFixed(10)+'\ndet(³J₆) = '+M.determinant(J3).toFixed(10)+'\ndet(⁴J₆) = '+M.determinant(J4).toFixed(10);
    table(Hhost,'H₆ · flange pose in F₀',Hs[5],{columnLabels:['1','2','3','4']});
    readout.textContent=built+' of '+body+' screws stacked · '+jacobianName(expressed,body)+' is 6 × '+body+'.\nOrange: body '+body+' origin velocity from joint '+(selected+1)+' at 1 rad/s, scaled by 0.4 s: '+vectorText(targetVelocity)+' m/s in F₀.\n'+(body===4?'Body 4 has four joints: ³J₄ is 6 × 4, so its determinant is undefined.':'Changing the expression frame preserves this six-column Jacobian’s rank and determinant.');
    if(assembling && built===body)stopAssembly();
  }
  controls.addEventListener('change',()=>{stopAssembly();update();});
  poseControls.addEventListener('input',()=>{stopAssembly();update();});
  poseControls.addEventListener('change',()=>{stopAssembly();update();});
  update();
}
