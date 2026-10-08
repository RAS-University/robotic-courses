// Angular-first twists and force-first wrenches, matching 01_screw_theory.md.
// Matrices in this module are row-major; Three.js conversion happens in the viewer.
export const add = (a, b) => a.map((x, i) => x + b[i]);
export const scale = (a, s) => a.map(x => x * s);
export const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
export const cross = (a, b) => [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]];
export const norm = a => Math.hypot(...a);
export const identity = n => Array.from({length:n}, (_, i) => Array.from({length:n}, (_, j) => Number(i === j)));
export const transpose = A => A[0].map((_, j) => A.map(row => row[j]));
export const multiply = (A, B) => A.map(row => transpose(B).map(col => dot(row, col)));
export const matvec = (A, v) => A.map(row => dot(row, v));
export const skew = a => [[0,-a[2],a[1]],[a[2],0,-a[0]],[-a[1],a[0],0]];
export const rotation = H => H.slice(0,3).map(row => row.slice(0,3));
export const position = H => H.slice(0,3).map(row => row[3]);
export function pose(R = identity(3), p = [0,0,0]) {
  return [...R.map((row,i) => [...row,p[i]]), [0,0,0,1]];
}
export function inversePose(H) {
  const Rt = transpose(rotation(H));
  return pose(Rt, scale(matvec(Rt,position(H)),-1));
}
export function rodrigues(e, phi) {
  const K = skew(e), K2 = multiply(K,K), I = identity(3);
  return I.map((row,i) => row.map((x,j) => x + Math.sin(phi)*K[i][j] + (1-Math.cos(phi))*K2[i][j]));
}
export function exponential(X, phi) {
  const xi = X.slice(0,3), eta = X.slice(3), magnitude = norm(xi);
  if (magnitude < 1e-12) return pose(identity(3),scale(eta,phi));
  const e = scale(xi,1/magnitude), angle = magnitude*phi, v = scale(eta,1/magnitude);
  const K = skew(e), K2 = multiply(K,K), I = identity(3);
  // Stable Taylor values at small angles avoid cancellation in the translation.
  const oneMinusCos = Math.abs(angle) < 1e-4 ? angle**2/2-angle**4/24+angle**6/720 : 1-Math.cos(angle);
  const angleMinusSin = Math.abs(angle) < 1e-4 ? angle**3/6-angle**5/120+angle**7/5040 : angle-Math.sin(angle);
  const B = I.map((row,i) => row.map((x,j) => angle*x + oneMinusCos*K[i][j] + angleMinusSin*K2[i][j]));
  return pose(rodrigues(e,angle),matvec(B,v));
}
export function screw(e, p, h = 0) { return [...e,...add(cross(p,e),scale(e,h))]; }
export function adjoint(H) {
  const R = rotation(H), pR = multiply(skew(position(H)),R);
  return [...R.map(row => [...row,0,0,0]),...pR.map((row,i) => [...row,...R[i]])];
}
export function transformTwist(H, V) { return matvec(adjoint(H), V); }
export function transformWrench(H, W) {
  const R = rotation(H), f = matvec(R,W.slice(0,3));
  return [...f,...add(cross(position(H),f),matvec(R,W.slice(3)))];
}
export const reciprocal = (W,V) => dot(W.slice(0,3),V.slice(3)) + dot(W.slice(3),V.slice(0,3));
export function forwardPoE(Y, q, A) {
  const G = Y.reduce((H, X, i) => multiply(H,exponential(X,q[i])),identity(4));
  return multiply(G,A);
}
export function spaceJacobian(Y, q, body = Y.length) {
  let G = identity(4);
  const columns = Y.slice(0,body).map((X,i) => {
    const col = transformTwist(G,X);
    G = multiply(G,exponential(X,q[i]));
    return col;
  });
  return transpose(columns);
}
export function determinant(A) {
  if (!A.length || A.some(row => row.length !== A.length)) throw new Error('A determinant requires a square matrix.');
  const B = A.map(row => [...row]); let d = 1;
  for (let i=0;i<B.length;i++) {
    let pivot = i;
    for (let k=i+1;k<B.length;k++) if (Math.abs(B[k][i]) > Math.abs(B[pivot][i])) pivot=k;
    if (Math.abs(B[pivot][i]) < 1e-14) return 0;
    if (pivot !== i) { [B[i],B[pivot]] = [B[pivot],B[i]]; d=-d; }
    d *= B[i][i];
    for (let k=i+1;k<B.length;k++) {
      const ratio = B[k][i]/B[i][i];
      for (let j=i+1;j<B.length;j++) B[k][j]-=ratio*B[i][j];
    }
  }
  return d;
}
export function rpyPose(xyz, rpy) {
  // URDF fixed-axis roll, pitch, yaw: Rz(yaw) Ry(pitch) Rx(roll).
  const R = multiply(multiply(rodrigues([0,0,1],rpy[2]),rodrigues([0,1,0],rpy[1])),rodrigues([1,0,0],rpy[0]));
  return pose(R,xyz);
}
export function chainHome(joints) {
  let H = identity(4); const A = [], Y = [];
  for (const joint of joints) {
    H = multiply(H,joint.origin); A.push(H);
    const e = matvec(rotation(H),joint.axis);
    Y.push(joint.type === 'prismatic' ? [0,0,0,...e] : screw(e,position(H)));
  }
  return {A,Y};
}
export function forwardURDF(joints,q) {
  let H = identity(4);
  return joints.map((joint,i) => {
    const local = joint.type === 'prismatic' ? [0,0,0,...joint.axis] : [...joint.axis,0,0,0];
    H = multiply(multiply(H,joint.origin),exponential(local,q[i]));
    return H;
  });
}
