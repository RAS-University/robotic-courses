/* Interactive block for Chapter 5.2 (Orthogonal 3R cuspidal robots).
   Single-file implementation by design: UI, math, plotting, and interactions.
*/
(function () {
  "use strict";

  var TAU = Math.PI * 2;

  var ORTHOGONAL_DEFAULTS = Object.freeze({
    d1: 0.0,
    d2: 1.0,
    d3: 0.0,
    a1: 1.0,
    a2: 2.0,
    a3: 1.5,
    alpha1: Math.PI / 2,
    alpha2: Math.PI / 2,
    alpha3: 0.0,
  });

  var LIVE_SAMPLING = Object.freeze({
    theta2Min: -Math.PI,
    theta2Max: Math.PI,
    theta3Min: -Math.PI,
    theta3Max: Math.PI,
    theta2Steps: 120,
    theta3Bins: 130,
    contourNx: 120,
    contourNy: 120,
    rootEps: 1e-7,
    rootIters: 28,
    zeroTol: 1e-4,
    clusterThreshold: 0.035,
  });

  var DENSE_SAMPLING = Object.freeze({
    theta2Min: -Math.PI,
    theta2Max: Math.PI,
    theta3Min: -Math.PI,
    theta3Max: Math.PI,
    theta2Steps: 220,
    theta3Bins: 230,
    contourNx: 220,
    contourNy: 220,
    rootEps: 1e-8,
    rootIters: 34,
    zeroTol: 8e-5,
    clusterThreshold: 0.03,
  });

  var cache = new Map();

  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function roundTo(v, digits) {
    var p = Math.pow(10, digits || 6);
    return Math.round(v * p) / p;
  }
  function toFixedLabel(value, digits) {
    digits = typeof digits === "number" ? digits : 3;
    return (Math.round(value * Math.pow(10, digits)) / Math.pow(10, digits)).toString();
  }

  function wrapToPi(a) {
    var x = (a + Math.PI) % (2 * Math.PI);
    if (x < 0) x += 2 * Math.PI;
    return x - Math.PI;
  }

  function angleDistance(a, b) { return Math.abs(wrapToPi(a - b)); }

  function dedupeAngles(values, tol) {
    tol = tol || 1e-4;
    if (!values.length) return [];
    var arr = values.map(wrapToPi).sort(function (a, b) { return a - b; });
    var out = [arr[0]];
    var i;
    for (i = 1; i < arr.length; i++) {
      if (Math.abs(arr[i] - out[out.length - 1]) > tol) out.push(arr[i]);
    }
    if (out.length > 1 && Math.abs((out[0] + 2 * Math.PI) - out[out.length - 1]) < tol) {
      out.pop();
    }
    return out;
  }

  function hashParams(params, sampling) {
    return JSON.stringify({
      d1: roundTo(params.d1, 6),
      d2: roundTo(params.d2, 6),
      d3: roundTo(params.d3, 6),
      a1: roundTo(params.a1, 6),
      a2: roundTo(params.a2, 6),
      a3: roundTo(params.a3, 6),
      alpha1: roundTo(params.alpha1, 6),
      alpha2: roundTo(params.alpha2, 6),
      alpha3: roundTo(params.alpha3, 6),
      s: sampling.theta2Steps + "x" + sampling.theta3Bins + ":" + sampling.contourNx + "x" + sampling.contourNy,
    });
  }

  function createEl(tag, attrs, text) {
    var el = document.createElement(tag);
    var k;
    if (attrs) {
      for (k in attrs) {
        if (Object.prototype.hasOwnProperty.call(attrs, k)) {
          if (k === "style" && typeof attrs[k] === "object") Object.assign(el.style, attrs[k]);
          else el.setAttribute(k, attrs[k]);
        }
      }
    }
    if (typeof text === "string") el.textContent = text;
    return el;
  }

  function computeDetJOrthogonal(theta2, theta3, params) {
    var a1 = params.a1;
    var a2 = params.a2;
    var a3 = params.a3;
    var d2 = params.d2;
    var d3 = params.d3;

    var s2 = Math.sin(theta2);
    var c2 = Math.cos(theta2);
    var s3 = Math.sin(theta3);
    var c3 = Math.cos(theta3);

    var inner =
      a1 * a2 * s3 +
      a1 * a3 * s3 * c3 +
      a2 * a2 * s3 * c2 +
      a2 * a3 * s3 * c2 * c3 -
      a2 * d2 * c2 * c3 +
      a2 * d3 * s2 * s3 -
      a3 * d2 * c2 * c3 * c3 -
      d2 * d3 * s2 * c3;

    return -a3 * inner;
  }

  function matMul4(A, B) {
    var C = new Array(4);
    var i;
    var j;
    var k;
    for (i = 0; i < 4; i++) {
      C[i] = [0, 0, 0, 0];
      for (j = 0; j < 4; j++) {
        var s = 0;
        for (k = 0; k < 4; k++) s += A[i][k] * B[k][j];
        C[i][j] = s;
      }
    }
    return C;
  }

  function dhMatrix(a, alpha, d, theta) {
    var ct = Math.cos(theta);
    var st = Math.sin(theta);
    var ca = Math.cos(alpha);
    var sa = Math.sin(alpha);
    return [
      [ct, -st * ca, st * sa, a * ct],
      [st, ct * ca, -ct * sa, a * st],
      [0, sa, ca, d],
      [0, 0, 0, 1],
    ];
  }

  function fkOrigins(theta1, theta2, theta3, params) {
    var T = [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ];
    var thetas = [theta1, theta2, theta3];
    var a = [params.a1, params.a2, params.a3];
    var d = [params.d1, params.d2, params.d3];
    var alpha = [params.alpha1, params.alpha2, params.alpha3];
    var origins = [{ x: 0, y: 0, z: 0 }];
    var i;
    for (i = 0; i < 3; i++) {
      T = matMul4(T, dhMatrix(a[i], alpha[i], d[i], thetas[i]));
      origins.push({ x: T[0][3], y: T[1][3], z: T[2][3] });
    }
    return origins;
  }

  function fkFrames(theta1, theta2, theta3, params) {
    var T = [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ];
    var thetas = [theta1, theta2, theta3];
    var a = [params.a1, params.a2, params.a3];
    var d = [params.d1, params.d2, params.d3];
    var alpha = [params.alpha1, params.alpha2, params.alpha3];
    var frames = [];
    var i;
    for (i = 0; i < 3; i++) {
      T = matMul4(T, dhMatrix(a[i], alpha[i], d[i], thetas[i]));
      frames.push({
        origin: { x: T[0][3], y: T[1][3], z: T[2][3] },
        xAxis: { x: T[0][0], y: T[1][0], z: T[2][0] },
        yAxis: { x: T[0][1], y: T[1][1], z: T[2][1] },
        zAxis: { x: T[0][2], y: T[1][2], z: T[2][2] },
      });
    }
    return frames;
  }

  function fkPosition(theta1, theta2, theta3, params) {
    var origins = fkOrigins(theta1, theta2, theta3, params);
    return origins[origins.length - 1];
  }

  function computeRhoZ(theta1, theta2, theta3, params) {
    var ee = fkPosition(theta1, theta2, theta3, params);
    return { rho: Math.sqrt(ee.x * ee.x + ee.y * ee.y), z: ee.z };
  }

  function bisectRoot(fn, lo, hi, eps, maxIters) {
    var fLo = fn(lo);
    var fHi = fn(hi);
    if (!isFinite(fLo) || !isFinite(fHi)) return null;
    if (Math.abs(fLo) < eps) return lo;
    if (Math.abs(fHi) < eps) return hi;
    if (fLo * fHi > 0) return null;

    var mid;
    var fMid;
    var i;
    for (i = 0; i < maxIters; i++) {
      mid = 0.5 * (lo + hi);
      fMid = fn(mid);
      if (!isFinite(fMid)) return null;
      if (Math.abs(fMid) < eps || Math.abs(hi - lo) < eps) return mid;
      if (fLo * fMid <= 0) {
        hi = mid;
        fHi = fMid;
      } else {
        lo = mid;
        fLo = fMid;
      }
    }
    return 0.5 * (lo + hi);
  }

  function sampleTheta3Roots(theta2, params, sampling) {
    var roots = [];
    var tMin = sampling.theta3Min;
    var tMax = sampling.theta3Max;
    var bins = sampling.theta3Bins;
    var dt = (tMax - tMin) / bins;
    var f = function (t3) { return computeDetJOrthogonal(theta2, t3, params); };
    var tA = tMin;
    var fA = f(tA);
    var i;

    for (i = 0; i < bins; i++) {
      var tB = tA + dt;
      var fB = f(tB);
      if (!isFinite(fA) || !isFinite(fB)) {
        tA = tB;
        fA = fB;
        continue;
      }

      if (Math.abs(fA) < sampling.zeroTol) roots.push(tA);
      if (fA * fB < 0) {
        var root = bisectRoot(f, tA, tB, sampling.rootEps, sampling.rootIters);
        if (root !== null) roots.push(root);
      } else if (Math.abs(fB) < sampling.zeroTol) {
        roots.push(tB);
      }

      tA = tB;
      fA = fB;
    }

    return dedupeAngles(roots, 1e-3);
  }

  function computeSingularitySamples(params, samplingConfig) {
    var out = [];
    var t2Min = samplingConfig.theta2Min;
    var t2Max = samplingConfig.theta2Max;
    var n2 = samplingConfig.theta2Steps;
    var dt2 = (t2Max - t2Min) / n2;
    var i;

    for (i = 0; i <= n2; i++) {
      var t2 = t2Min + i * dt2;
      var roots = sampleTheta3Roots(t2, params, samplingConfig);
      var j;
      for (j = 0; j < roots.length; j++) {
        var t3 = roots[j];
        var rz = computeRhoZ(0, t2, t3, params);
        if (!isFinite(rz.rho) || !isFinite(rz.z)) continue;
        out.push({ theta2: t2, theta3: t3, rho: rz.rho, z: rz.z });
      }
    }

    return out;
  }

  function distance2(a, b) {
    var dx = a.rho - b.rho;
    var dz = a.z - b.z;
    return dx * dx + dz * dz;
  }

  function clusterPaths(points, threshold) {
    if (!points.length) return [];
    var sorted = points.slice().sort(function (p, q) {
      if (p.theta2 === q.theta2) return p.theta3 - q.theta3;
      return p.theta2 - q.theta2;
    });

    var paths = [];
    var thr2 = threshold * threshold;
    var i;

    for (i = 0; i < sorted.length; i++) {
      var p = sorted[i];
      var bestIndex = -1;
      var bestDist = Infinity;
      var k;
      for (k = 0; k < paths.length; k++) {
        var tail = paths[k][paths[k].length - 1];
        var d2 = distance2(p, tail);
        if (d2 < bestDist) {
          bestDist = d2;
          bestIndex = k;
        }
      }
      if (bestIndex >= 0 && bestDist < thr2) paths[bestIndex].push(p);
      else paths.push([p]);
    }

    return paths;
  }

  function computeCriticalValues(params, samplingConfig) {
    var samples = computeSingularitySamples(params, samplingConfig);
    var approxScale = Math.max(1.0, params.a1 + params.a2 + params.a3 + Math.abs(params.d2) + Math.abs(params.d3));
    var threshold = samplingConfig.clusterThreshold * approxScale;
    return { samples: samples, paths: clusterPaths(samples, threshold) };
  }
  function vecNorm3(v) {
    return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
  }

  function fkVector(q, params) {
    var p = fkPosition(q[0], q[1], q[2], params);
    return [p.x, p.y, p.z];
  }

  function numericalJacobian(q, params, h) {
    h = h || 1e-5;
    var J = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    var j;
    for (j = 0; j < 3; j++) {
      var qp = [q[0], q[1], q[2]];
      var qm = [q[0], q[1], q[2]];
      qp[j] += h;
      qm[j] -= h;
      var fp = fkVector(qp, params);
      var fm = fkVector(qm, params);
      J[0][j] = (fp[0] - fm[0]) / (2 * h);
      J[1][j] = (fp[1] - fm[1]) / (2 * h);
      J[2][j] = (fp[2] - fm[2]) / (2 * h);
    }
    return J;
  }

  function solveLinear3(A, b) {
    var M = [
      [A[0][0], A[0][1], A[0][2], b[0]],
      [A[1][0], A[1][1], A[1][2], b[1]],
      [A[2][0], A[2][1], A[2][2], b[2]],
    ];

    var col;
    for (col = 0; col < 3; col++) {
      var pivot = col;
      var r;
      for (r = col + 1; r < 3; r++) {
        if (Math.abs(M[r][col]) > Math.abs(M[pivot][col])) pivot = r;
      }
      if (Math.abs(M[pivot][col]) < 1e-12) return null;
      if (pivot !== col) {
        var tmp = M[col];
        M[col] = M[pivot];
        M[pivot] = tmp;
      }
      for (r = col + 1; r < 3; r++) {
        var f = M[r][col] / M[col][col];
        var c;
        for (c = col; c < 4; c++) {
          M[r][c] -= f * M[col][c];
        }
      }
    }

    var x = [0, 0, 0];
    var i;
    for (i = 2; i >= 0; i--) {
      var s = M[i][3];
      var c2;
      for (c2 = i + 1; c2 < 3; c2++) s -= M[i][c2] * x[c2];
      if (Math.abs(M[i][i]) < 1e-12) return null;
      x[i] = s / M[i][i];
    }
    return x;
  }

  function classifyIKBranch(params, eps) {
    eps = eps || 1e-7;
    if (Math.abs(params.a1) < eps) return "a1_zero";
    if (Math.abs(params.alpha1) < eps) return "alpha1_zero";
    return "generic";
  }

  function dedupeSeeds(seeds, tol) {
    tol = tol || 1e-3;
    var out = [];
    var i;
    for (i = 0; i < seeds.length; i++) {
      var q = seeds[i];
      var keep = true;
      var k;
      for (k = 0; k < out.length; k++) {
        if (
          angleDistance(q[0], out[k][0]) < tol &&
          angleDistance(q[1], out[k][1]) < tol &&
          angleDistance(q[2], out[k][2]) < tol
        ) {
          keep = false;
          break;
        }
      }
      if (keep) out.push([wrapToPi(q[0]), wrapToPi(q[1]), wrapToPi(q[2])]);
    }
    return out;
  }

  // Initial guesses for multi-branch IK search.
  function makeIKSeeds(target, params, caseName) {
    var t1Base = Math.atan2(target.y, target.x);
    if (!isFinite(t1Base)) t1Base = 0;

    var theta1Seeds = dedupeAngles([
      t1Base,
      t1Base + Math.PI,
      0,
      Math.PI / 2,
      -Math.PI / 2,
    ], 1e-5);

    var coarse = [-Math.PI, -Math.PI / 2, 0, Math.PI / 2, Math.PI];
    var seeds = [];
    var i;
    var j;
    var k;

    for (i = 0; i < theta1Seeds.length; i++) {
      for (j = 0; j < coarse.length; j++) {
        for (k = 0; k < coarse.length; k++) {
          seeds.push([theta1Seeds[i], coarse[j], coarse[k]]);
        }
      }
    }

    if (caseName === "alpha1_zero") {
      var num = Math.cos(params.alpha2) * params.d3 + params.d2 - target.z + params.d1;
      var den = Math.sin(params.alpha2) * params.a3;
      if (Math.abs(den) > 1e-9) {
        var ratio = num / den;
        if (Math.abs(ratio) <= 1.0 + 1e-7) {
          ratio = clamp(ratio, -1, 1);
          var t3a = -Math.asin(ratio);
          var t3b = Math.PI + Math.asin(ratio);
          for (i = 0; i < theta1Seeds.length; i++) {
            for (j = 0; j < coarse.length; j++) {
              seeds.push([theta1Seeds[i], coarse[j], t3a]);
              seeds.push([theta1Seeds[i], coarse[j], t3b]);
            }
          }
        }
      }
    }

    var off = [-2.2, -1.1, 1.1, 2.2];
    for (i = 0; i < theta1Seeds.length; i++) {
      for (j = 0; j < off.length; j++) {
        seeds.push([theta1Seeds[i], off[j], off[(j + 1) % off.length]]);
      }
    }

    return dedupeSeeds(seeds, 1e-3);
  }

  function solveIKFromSeed(seed, target, params, options) {
    options = options || {};
    var maxIter = options.maxIter || 80;
    var tol = options.tol || 1e-6;
    var q = [wrapToPi(seed[0]), wrapToPi(seed[1]), wrapToPi(seed[2])];
    var bestQ = [q[0], q[1], q[2]];
    var bestErr = Infinity;

    var iter;
    for (iter = 0; iter < maxIter; iter++) {
      var fk = fkVector(q, params);
      var e = [fk[0] - target.x, fk[1] - target.y, fk[2] - target.z];
      var err = vecNorm3(e);
      if (err < bestErr) {
        bestErr = err;
        bestQ = [q[0], q[1], q[2]];
      }
      if (err < tol) {
        return { ok: true, q: [q[0], q[1], q[2]], error: err, iterations: iter + 1 };
      }

      var J = numericalJacobian(q, params, 1e-5);
      var JTJ = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];
      var JTe = [0, 0, 0];
      var r;
      var c;
      var m;
      for (r = 0; r < 3; r++) {
        for (c = 0; c < 3; c++) {
          var s = 0;
          for (m = 0; m < 3; m++) s += J[m][r] * J[m][c];
          JTJ[r][c] = s;
        }
        JTe[r] = J[0][r] * e[0] + J[1][r] * e[1] + J[2][r] * e[2];
      }

      var dampingCandidates = [1e-6, 1e-4, 1e-2, 1e-1];
      var improved = false;
      var dc;
      for (dc = 0; dc < dampingCandidates.length; dc++) {
        var lam = dampingCandidates[dc];
        var H = [
          [JTJ[0][0] + lam, JTJ[0][1], JTJ[0][2]],
          [JTJ[1][0], JTJ[1][1] + lam, JTJ[1][2]],
          [JTJ[2][0], JTJ[2][1], JTJ[2][2] + lam],
        ];
        var delta = solveLinear3(H, [-JTe[0], -JTe[1], -JTe[2]]);
        if (!delta) continue;

        var qTry = [
          wrapToPi(q[0] + delta[0]),
          wrapToPi(q[1] + delta[1]),
          wrapToPi(q[2] + delta[2]),
        ];
        var fkTry = fkVector(qTry, params);
        var eTry = [fkTry[0] - target.x, fkTry[1] - target.y, fkTry[2] - target.z];
        var errTry = vecNorm3(eTry);

        if (errTry <= err || dc === dampingCandidates.length - 1) {
          q = qTry;
          improved = true;
          break;
        }
      }

      if (!improved) break;
    }

    return {
      ok: bestErr < 1e-4,
      q: [wrapToPi(bestQ[0]), wrapToPi(bestQ[1]), wrapToPi(bestQ[2])],
      error: bestErr,
      iterations: maxIter,
    };
  }

  function dedupeSolutions(solutions, tol) {
    tol = tol || 1e-3;
    var out = [];
    var i;
    for (i = 0; i < solutions.length; i++) {
      var s = solutions[i];
      var keep = true;
      var k;
      for (k = 0; k < out.length; k++) {
        if (
          angleDistance(s.theta1, out[k].theta1) < tol &&
          angleDistance(s.theta2, out[k].theta2) < tol &&
          angleDistance(s.theta3, out[k].theta3) < tol
        ) {
          keep = false;
          break;
        }
      }
      if (keep) out.push(s);
    }
    return out;
  }

  function dedupePositionRelatedSolutions(solutions, tol) {
    tol = tol || 1e-3;
    var out = [];
    var i;
    for (i = 0; i < solutions.length; i++) {
      var s = solutions[i];
      var keep = true;
      var k;
      for (k = 0; k < out.length; k++) {
        if (
          angleDistance(s.theta2, out[k].theta2) < tol &&
          angleDistance(s.theta3, out[k].theta3) < tol
        ) {
          keep = false;
          break;
        }
      }
      if (keep) out.push(s);
    }
    return out;
  }

  function getIKSolutions3R(target, params, options) {
    options = options || {};
    var cfg = {
      maxIter: options.maxIter || 80,
      tol: options.tol || 1e-7,
      acceptTol: options.acceptTol || 1e-4,
      maxSolutions: options.maxSolutions || 12,
    };

    var caseName = classifyIKBranch(params);
    var seeds = makeIKSeeds(target, params, caseName);
    var solutions = [];
    var i;

    for (i = 0; i < seeds.length; i++) {
      var solved = solveIKFromSeed(seeds[i], target, params, {
        maxIter: cfg.maxIter,
        tol: cfg.tol,
      });
      if (!solved.ok || solved.error > cfg.acceptTol) continue;

      var fk = fkPosition(solved.q[0], solved.q[1], solved.q[2], params);
      var err = vecNorm3([fk.x - target.x, fk.y - target.y, fk.z - target.z]);
      if (!isFinite(err) || err > cfg.acceptTol) continue;

      solutions.push({
        theta1: wrapToPi(solved.q[0]),
        theta2: wrapToPi(solved.q[1]),
        theta3: wrapToPi(solved.q[2]),
        error: err,
      });
    }

    solutions = dedupeSolutions(solutions, 1e-3);
    solutions.sort(function (a, b) {
      if (a.error !== b.error) return a.error - b.error;
      if (a.theta1 !== b.theta1) return a.theta1 - b.theta1;
      if (a.theta2 !== b.theta2) return a.theta2 - b.theta2;
      return a.theta3 - b.theta3;
    });

    if (solutions.length > cfg.maxSolutions) solutions = solutions.slice(0, cfg.maxSolutions);

    return { caseName: caseName, triedSeeds: seeds.length, solutions: solutions };
  }
  function marchingSquares(fn, bounds, nx, ny) {
    var xMin = bounds.xMin;
    var xMax = bounds.xMax;
    var yMin = bounds.yMin;
    var yMax = bounds.yMax;
    var dx = (xMax - xMin) / nx;
    var dy = (yMax - yMin) / ny;
    var values = new Array(ny + 1);
    var i;
    var j;

    for (j = 0; j <= ny; j++) {
      values[j] = new Array(nx + 1);
      var y = yMin + j * dy;
      for (i = 0; i <= nx; i++) {
        var x = xMin + i * dx;
        values[j][i] = fn(x, y);
      }
    }

    var table = {
      0: [],
      1: [[3, 0]],
      2: [[0, 1]],
      3: [[3, 1]],
      4: [[1, 2]],
      5: [[3, 2], [0, 1]],
      6: [[0, 2]],
      7: [[3, 2]],
      8: [[2, 3]],
      9: [[0, 2]],
      10: [[0, 1], [2, 3]],
      11: [[1, 2]],
      12: [[1, 3]],
      13: [[0, 1]],
      14: [[3, 0]],
      15: [],
    };

    function interpEdge(edge, x0, y0, v00, v10, v11, v01) {
      var t;
      if (edge === 0) {
        t = (0 - v00) / (v10 - v00 || 1e-12);
        return { x: lerp(x0, x0 + dx, t), y: y0 };
      }
      if (edge === 1) {
        t = (0 - v10) / (v11 - v10 || 1e-12);
        return { x: x0 + dx, y: lerp(y0, y0 + dy, t) };
      }
      if (edge === 2) {
        t = (0 - v11) / (v01 - v11 || 1e-12);
        return { x: lerp(x0 + dx, x0, t), y: y0 + dy };
      }
      t = (0 - v01) / (v00 - v01 || 1e-12);
      return { x: x0, y: lerp(y0 + dy, y0, t) };
    }

    var segments = [];
    for (j = 0; j < ny; j++) {
      for (i = 0; i < nx; i++) {
        var x0 = xMin + i * dx;
        var y0 = yMin + j * dy;
        var v00 = values[j][i];
        var v10 = values[j][i + 1];
        var v11 = values[j + 1][i + 1];
        var v01 = values[j + 1][i];
        if (![v00, v10, v11, v01].every(isFinite)) continue;

        var c =
          (v00 > 0 ? 1 : 0) |
          (v10 > 0 ? 2 : 0) |
          (v11 > 0 ? 4 : 0) |
          (v01 > 0 ? 8 : 0);

        var segPairs = table[c];
        var s;
        for (s = 0; s < segPairs.length; s++) {
          var p1 = interpEdge(segPairs[s][0], x0, y0, v00, v10, v11, v01);
          var p2 = interpEdge(segPairs[s][1], x0, y0, v00, v10, v11, v01);
          segments.push([p1, p2]);
        }
      }
    }

    return segments;
  }

  function createTransform(canvas, bounds, padding) {
    var pad = Object.assign({ left: 45, right: 14, top: 26, bottom: 36 }, padding || {});
    var plotW = canvas.width - pad.left - pad.right;
    var plotH = canvas.height - pad.top - pad.bottom;
    var xSpan = Math.max(1e-12, bounds.xMax - bounds.xMin);
    var ySpan = Math.max(1e-12, bounds.yMax - bounds.yMin);
    return {
      pad: pad,
      plotW: plotW,
      plotH: plotH,
      xToPx: function (x) { return pad.left + ((x - bounds.xMin) / xSpan) * plotW; },
      yToPx: function (y) { return pad.top + (1 - (y - bounds.yMin) / ySpan) * plotH; },
    };
  }

  function drawAxes(ctx, canvas, bounds, opts) {
    opts = opts || {};
    var tr = createTransform(canvas, bounds, opts.padding);
    var pad = tr.pad;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 1;
    ctx.strokeRect(pad.left, pad.top, tr.plotW, tr.plotH);

    var xTicks = opts.xTicks || [];
    var yTicks = opts.yTicks || [];
    var i;

    ctx.font = "12px sans-serif";
    for (i = 0; i < xTicks.length; i++) {
      var tx = xTicks[i];
      var xPx = tr.xToPx(tx.value);
      ctx.strokeStyle = "#e2e8f0";
      ctx.beginPath();
      ctx.moveTo(xPx, pad.top);
      ctx.lineTo(xPx, pad.top + tr.plotH);
      ctx.stroke();
      ctx.fillStyle = "#334155";
      ctx.textAlign = "center";
      ctx.fillText(tx.label, xPx, canvas.height - 12);
    }

    for (i = 0; i < yTicks.length; i++) {
      var ty = yTicks[i];
      var yPx = tr.yToPx(ty.value);
      ctx.strokeStyle = "#e2e8f0";
      ctx.beginPath();
      ctx.moveTo(pad.left, yPx);
      ctx.lineTo(pad.left + tr.plotW, yPx);
      ctx.stroke();
      ctx.fillStyle = "#334155";
      ctx.textAlign = "right";
      ctx.fillText(ty.label, pad.left - 8, yPx + 4);
    }

    if (opts.title) {
      ctx.fillStyle = "#0f172a";
      ctx.font = "13px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(opts.title, 12, 16);
    }

    if (opts.xLabel) {
      ctx.fillStyle = "#0f172a";
      ctx.font = "12px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(opts.xLabel, pad.left + tr.plotW / 2, canvas.height - 2);
    }

    if (opts.yLabel) {
      ctx.save();
      ctx.translate(12, pad.top + tr.plotH / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillStyle = "#0f172a";
      ctx.font = "12px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(opts.yLabel, 0, 0);
      ctx.restore();
    }

    return tr;
  }

  function radTicks() {
    return [
      { value: -Math.PI, label: "-pi" },
      { value: -Math.PI / 2, label: "-pi/2" },
      { value: 0, label: "0" },
      { value: Math.PI / 2, label: "pi/2" },
      { value: Math.PI, label: "pi" },
    ];
  }

  function niceTicks(minV, maxV, n) {
    var ticks = [];
    var i;
    if (!isFinite(minV) || !isFinite(maxV) || maxV <= minV) return ticks;
    n = n || 5;
    for (i = 0; i <= n; i++) {
      var t = i / n;
      var v = lerp(minV, maxV, t);
      ticks.push({ value: v, label: toFixedLabel(v, 3) });
    }
    return ticks;
  }

  function boundsFromSamples(samples) {
    if (!samples.length) return { xMin: 0, xMax: 4, yMin: -2, yMax: 2 };
    var rhoMax = 0;
    var zMin = Infinity;
    var zMax = -Infinity;
    var i;
    for (i = 0; i < samples.length; i++) {
      var p = samples[i];
      if (p.rho > rhoMax) rhoMax = p.rho;
      if (p.z < zMin) zMin = p.z;
      if (p.z > zMax) zMax = p.z;
    }
    rhoMax = Math.max(0.2, rhoMax);
    var zPad = Math.max(0.2, (zMax - zMin) * 0.15);
    return { xMin: 0, xMax: rhoMax * 1.08, yMin: zMin - zPad, yMax: zMax + zPad };
  }

  function drawDetPanel(canvas, params, sampling, interaction) {
    var ctx = canvas.getContext("2d");
    var thetaBounds = { xMin: -Math.PI, xMax: Math.PI, yMin: -Math.PI, yMax: Math.PI };
    var tr = drawAxes(ctx, canvas, thetaBounds, {
      title: "Panel A: det(J)=0 in (theta2, theta3)",
      xLabel: "theta2 (rad)",
      yLabel: "theta3 (rad)",
      xTicks: radTicks(),
      yTicks: radTicks(),
    });

    var segments = marchingSquares(
      function (t2, t3) { return computeDetJOrthogonal(t2, t3, params); },
      thetaBounds,
      sampling.contourNx,
      sampling.contourNy
    );

    ctx.strokeStyle = "#dc2626";
    ctx.lineWidth = 1.3;
    var i;
    for (i = 0; i < segments.length; i++) {
      var s = segments[i];
      ctx.beginPath();
      ctx.moveTo(tr.xToPx(s[0].x), tr.yToPx(s[0].y));
      ctx.lineTo(tr.xToPx(s[1].x), tr.yToPx(s[1].y));
      ctx.stroke();
    }

    if (interaction && interaction.sliderTraceJoint && interaction.sliderTraceJoint.length > 1) {
      ctx.strokeStyle = "rgba(147, 51, 234, 0.8)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(
        tr.xToPx(wrapToPi(interaction.sliderTraceJoint[0].theta2)),
        tr.yToPx(wrapToPi(interaction.sliderTraceJoint[0].theta3))
      );
      for (i = 1; i < interaction.sliderTraceJoint.length; i++) {
        ctx.lineTo(
          tr.xToPx(wrapToPi(interaction.sliderTraceJoint[i].theta2)),
          tr.yToPx(wrapToPi(interaction.sliderTraceJoint[i].theta3))
        );
      }
      ctx.stroke();
    }

    if (interaction && interaction.ikSolutions && interaction.ikSolutions.length) {
      ctx.fillStyle = "#1d4ed8";
      ctx.font = "11px sans-serif";
      ctx.textAlign = "left";
      for (i = 0; i < interaction.ikSolutions.length; i++) {
        var ik = interaction.ikSolutions[i];
        var x = tr.xToPx(wrapToPi(ik.theta2));
        var y = tr.yToPx(wrapToPi(ik.theta3));
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, TAU);
        ctx.fill();
        ctx.fillText(String(i + 1), x + 6, y - 6);
      }
    }

    if (interaction && interaction.jointPick) {
      var xJ = tr.xToPx(interaction.jointPick.theta2);
      var yJ = tr.yToPx(interaction.jointPick.theta3);
      ctx.strokeStyle = "#f59e0b";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(xJ - 6, yJ);
      ctx.lineTo(xJ + 6, yJ);
      ctx.moveTo(xJ, yJ - 6);
      ctx.lineTo(xJ, yJ + 6);
      ctx.stroke();
    }

    if (interaction && interaction.sliderPose) {
      var xS = tr.xToPx(wrapToPi(interaction.sliderPose.theta2));
      var yS = tr.yToPx(wrapToPi(interaction.sliderPose.theta3));
      ctx.fillStyle = "#9333ea";
      ctx.beginPath();
      ctx.arc(xS, yS, 4.5, 0, TAU);
      ctx.fill();
      ctx.fillStyle = "#6b21a8";
      ctx.font = "11px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("theta1=" + toFixedLabel(interaction.sliderPose.theta1, 2), xS + 7, yS + 12);
    }

    return { bounds: thetaBounds, tr: tr };
  }

  function drawCriticalPanel(canvas, data, params, interaction) {
    var ctx = canvas.getContext("2d");
    var bounds = boundsFromSamples(data.samples);
    var tr = drawAxes(ctx, canvas, bounds, {
      title: "Panel B: Critical-value plot in (rho, z)",
      xLabel: "rho",
      yLabel: "z",
      xTicks: niceTicks(bounds.xMin, bounds.xMax, 5),
      yTicks: niceTicks(bounds.yMin, bounds.yMax, 5),
    });

    ctx.strokeStyle = "#1d4ed8";
    ctx.lineWidth = 1.2;
    var i;
    var j;
    for (i = 0; i < data.paths.length; i++) {
      var path = data.paths[i];
      if (path.length < 2) continue;
      ctx.beginPath();
      ctx.moveTo(tr.xToPx(path[0].rho), tr.yToPx(path[0].z));
      for (j = 1; j < path.length; j++) ctx.lineTo(tr.xToPx(path[j].rho), tr.yToPx(path[j].z));
      ctx.stroke();
    }

    if (interaction && interaction.sliderTraceWorkspace && interaction.sliderTraceWorkspace.length > 1) {
      ctx.strokeStyle = "rgba(147, 51, 234, 0.8)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(
        tr.xToPx(interaction.sliderTraceWorkspace[0].rho),
        tr.yToPx(interaction.sliderTraceWorkspace[0].z)
      );
      for (i = 1; i < interaction.sliderTraceWorkspace.length; i++) {
        ctx.lineTo(
          tr.xToPx(interaction.sliderTraceWorkspace[i].rho),
          tr.yToPx(interaction.sliderTraceWorkspace[i].z)
        );
      }
      ctx.stroke();
    }

    if (interaction && interaction.ikSolutions && interaction.ikSolutions.length) {
      ctx.fillStyle = "#16a34a";
      for (i = 0; i < interaction.ikSolutions.length; i++) {
        var iks = interaction.ikSolutions[i];
        var rz = computeRhoZ(iks.theta1, iks.theta2, iks.theta3, params);
        ctx.beginPath();
        ctx.arc(tr.xToPx(rz.rho), tr.yToPx(rz.z), 3, 0, TAU);
        ctx.fill();
      }
    }

    if (interaction && interaction.fkPoint) {
      var xF = tr.xToPx(interaction.fkPoint.rho);
      var yF = tr.yToPx(interaction.fkPoint.z);
      ctx.fillStyle = "#dc2626";
      ctx.beginPath();
      ctx.arc(xF, yF, 5, 0, TAU);
      ctx.fill();
      ctx.strokeStyle = "#7f1d1d";
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    if (interaction && interaction.workspacePick) {
      var xW = tr.xToPx(interaction.workspacePick.rho);
      var yW = tr.yToPx(interaction.workspacePick.z);
      ctx.strokeStyle = "#f59e0b";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(xW - 6, yW - 6);
      ctx.lineTo(xW + 6, yW + 6);
      ctx.moveTo(xW + 6, yW - 6);
      ctx.lineTo(xW - 6, yW + 6);
      ctx.stroke();
    }

    if (interaction && interaction.sliderWorkspacePoint) {
      var xS2 = tr.xToPx(interaction.sliderWorkspacePoint.rho);
      var yS2 = tr.yToPx(interaction.sliderWorkspacePoint.z);
      ctx.fillStyle = "#9333ea";
      ctx.beginPath();
      ctx.arc(xS2, yS2, 4.5, 0, TAU);
      ctx.fill();
    }

    return { bounds: bounds, tr: tr };
  }

  function getCanvasPoint(evt, canvas) {
    var rect = canvas.getBoundingClientRect();
    var sx = canvas.width / rect.width;
    var sy = canvas.height / rect.height;
    return { x: (evt.clientX - rect.left) * sx, y: (evt.clientY - rect.top) * sy };
  }

  function canvasPointToData(pt, view) {
    if (!view || !view.tr || !view.bounds) return null;
    var tr = view.tr;
    var pad = tr.pad;
    if (pt.x < pad.left || pt.x > pad.left + tr.plotW || pt.y < pad.top || pt.y > pad.top + tr.plotH) return null;
    var bx = view.bounds;
    var x = bx.xMin + ((pt.x - pad.left) / tr.plotW) * (bx.xMax - bx.xMin);
    var y = bx.yMin + (1 - (pt.y - pad.top) / tr.plotH) * (bx.yMax - bx.yMin);
    return { x: x, y: y };
  }

  function getReachScale(params) {
    return Math.max(0.5, params.a1 + params.a2 + params.a3 + Math.abs(params.d2) + Math.abs(params.d3));
  }

  function initCamera(params) {
    var reach = getReachScale(params);
    return {
      azimuth: -35 * Math.PI / 180,
      elevation: 20 * Math.PI / 180,
      radius: reach * 2.0,
      minRadius: reach * 0.7,
      maxRadius: reach * 4.5,
      target: { x: 0, y: 0, z: params.d1 + 0.2 * reach },
      fovScale: 1.5,
      defaultRadius: reach * 2.0,
    };
  }

  function clampCamera(camera) {
    camera.elevation = clamp(camera.elevation, -80 * Math.PI / 180, 80 * Math.PI / 180);
    camera.radius = clamp(camera.radius, camera.minRadius, camera.maxRadius);
  }

  function updateCameraBounds(state, resetRadius) {
    var reach = getReachScale(state.params);
    state.camera.minRadius = reach * 0.7;
    state.camera.maxRadius = reach * 4.5;
    state.camera.defaultRadius = reach * 2.0;
    state.camera.target.z = state.params.d1 + 0.2 * reach;
    if (resetRadius) state.camera.radius = state.camera.defaultRadius;
    clampCamera(state.camera);
  }

  function cross(a, b) {
    return {
      x: a.y * b.z - a.z * b.y,
      y: a.z * b.x - a.x * b.z,
      z: a.x * b.y - a.y * b.x,
    };
  }

  function dot(a, b) {
    return a.x * b.x + a.y * b.y + a.z * b.z;
  }

  function normalize(v) {
    var n = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
    if (n < 1e-12) return { x: 0, y: 0, z: 1 };
    return { x: v.x / n, y: v.y / n, z: v.z / n };
  }

  function project3D(point, camera) {
    var ce = Math.cos(camera.elevation);
    var se = Math.sin(camera.elevation);
    var ca = Math.cos(camera.azimuth);
    var sa = Math.sin(camera.azimuth);
    var camPos = {
      x: camera.target.x + camera.radius * ce * ca,
      y: camera.target.y + camera.radius * ce * sa,
      z: camera.target.z + camera.radius * se,
    };

    var forward = normalize({
      x: camera.target.x - camPos.x,
      y: camera.target.y - camPos.y,
      z: camera.target.z - camPos.z,
    });
    var worldUp = { x: 0, y: 0, z: 1 };
    var right = normalize(cross(forward, worldUp));
    if (Math.abs(right.x) + Math.abs(right.y) + Math.abs(right.z) < 1e-8) {
      right = { x: 1, y: 0, z: 0 };
    }
    var up = normalize(cross(right, forward));

    var rel = {
      x: point.x - camPos.x,
      y: point.y - camPos.y,
      z: point.z - camPos.z,
    };

    var xCam = dot(rel, right);
    var yCam = dot(rel, up);
    var zCam = dot(rel, forward);
    var zSafe = Math.max(0.05, zCam);

    return {
      x: (xCam / zSafe) * camera.fovScale,
      y: (yCam / zSafe) * camera.fovScale,
      z: zCam,
    };
  }

  function drawEllipse(ctx, c, rx, ry, angle, fill, stroke) {
    ctx.save();
    ctx.translate(c.x, c.y);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.ellipse(0, 0, rx, ry, 0, 0, TAU);
    if (fill) {
      ctx.fillStyle = fill;
      ctx.fill();
    }
    if (stroke) {
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    ctx.restore();
  }

  function addVec(p, v, scale) {
    return {
      x: p.x + v.x * scale,
      y: p.y + v.y * scale,
      z: p.z + v.z * scale,
    };
  }

  function drawCylinder2D(ctx, p1, p2, radius, bodyColor, lidColor, strokeColor, drawCaps) {
    var dx = p2.x - p1.x;
    var dy = p2.y - p1.y;
    var len = Math.sqrt(dx * dx + dy * dy);
    if (len < 1e-8) len = 1e-8;
    var nx = -dy / len;
    var ny = dx / len;
    var angle = Math.atan2(dy, dx);

    ctx.fillStyle = bodyColor;
    ctx.beginPath();
    ctx.moveTo(p1.x + nx * radius, p1.y + ny * radius);
    ctx.lineTo(p2.x + nx * radius, p2.y + ny * radius);
    ctx.lineTo(p2.x - nx * radius, p2.y - ny * radius);
    ctx.lineTo(p1.x - nx * radius, p1.y - ny * radius);
    ctx.closePath();
    ctx.fill();

    if (drawCaps !== false) {
      drawEllipse(ctx, p1, radius, radius * 0.52, angle, lidColor, strokeColor);
      drawEllipse(ctx, p2, radius, radius * 0.52, angle, lidColor, strokeColor);
    }
  }

  function drawSphere2D(ctx, c, r, innerColor, outerColor, strokeColor) {
    var g = ctx.createRadialGradient(
      c.x - r * 0.35,
      c.y - r * 0.35,
      r * 0.2,
      c.x,
      c.y,
      r
    );
    g.addColorStop(0, innerColor);
    g.addColorStop(1, outerColor);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(c.x, c.y, r, 0, TAU);
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  function pickScenePose(state) {
    if (state.interaction.sliderPose) return state.interaction.sliderPose;
    if (state.interaction.jointPick) {
      return { theta1: 0, theta2: state.interaction.jointPick.theta2, theta3: state.interaction.jointPick.theta3 };
    }
    if (state.interaction.ikSolutions && state.interaction.ikSolutions.length) {
      return state.interaction.ikSolutions[0];
    }
    return state.defaultPose;
  }

  function render3DScene(state) {
    var canvas = state.canvases.scene3d;
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0f172a";
    ctx.font = "13px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("Panel C: 3D robot image", 12, 16);

    var pose = pickScenePose(state);
    var origins = fkOrigins(pose.theta1, pose.theta2, pose.theta3, state.params);
    var frames = fkFrames(pose.theta1, pose.theta2, pose.theta3, state.params);
    var projected = origins.map(function (p) { return project3D(p, state.camera); });
    var centerX = canvas.width * 0.54;
    var centerY = canvas.height * 0.60;
    var scale = Math.min(canvas.width, canvas.height) * 0.26;
    var pts = projected.map(function (p) {
      return { x: centerX + p.x * scale, y: centerY - p.y * scale, z: p.z };
    });

    var sizeScale = clamp(state.camera.defaultRadius / state.camera.radius, 0.6, 1.8);
    var linkRadius = clamp(6.8 * sizeScale, 3.5, 10.0);
    var jointRadius = clamp(7.5 * sizeScale, 4.0, 11.0);
    var eeRadius = clamp(8.2 * sizeScale, 5.0, 12.0);

    var linkStyles = [
      { body: "#b45309", stroke: "rgba(120,83,33,0.75)" },
      { body: "#a16207", stroke: "rgba(120,83,33,0.75)" },
      { body: "#92400e", stroke: "rgba(120,83,33,0.75)" },
    ];
    var jointStyles = [
      { body: "#1d4ed8", lid: "#60a5fa", stroke: "rgba(30,58,138,0.85)" },
      { body: "#1e40af", lid: "#60a5fa", stroke: "rgba(30,58,138,0.85)" },
      { body: "#1e3a8a", lid: "#3b82f6", stroke: "rgba(30,58,138,0.85)" },
    ];

    var drawOps = [];
    var i;
    for (i = 0; i < 3; i++) {
      (function (idx) {
        var depth = (pts[idx].z + pts[idx + 1].z) * 0.5;
        drawOps.push({
          depth: depth,
          run: function () {
            var ls = linkStyles[idx];
            drawCylinder2D(ctx, pts[idx], pts[idx + 1], linkRadius, ls.body, ls.body, ls.stroke, false);
          },
        });
      })(i);
    }

    for (i = 0; i < 3; i++) {
      (function (idx) {
        drawOps.push({
          depth: pts[idx].z,
          run: function () {
            var js = jointStyles[idx];
            drawEllipse(
              ctx,
              { x: pts[idx].x, y: pts[idx].y - jointRadius * 0.9 },
              jointRadius,
              jointRadius * 0.5,
              0,
              js.lid,
              js.stroke
            );
            ctx.fillStyle = js.body;
            ctx.fillRect(pts[idx].x - jointRadius, pts[idx].y - jointRadius * 0.9, jointRadius * 2, jointRadius * 1.8);
            drawEllipse(
              ctx,
              { x: pts[idx].x, y: pts[idx].y + jointRadius * 0.9 },
              jointRadius,
              jointRadius * 0.5,
              0,
              js.lid,
              js.stroke
            );
          },
        });
      })(i);
    }

    drawOps.push({
      depth: pts[3].z,
      run: function () {
        drawSphere2D(ctx, pts[3], eeRadius, "#fecaca", "#dc2626", "#991b1b");
      },
    });

    var axisLenWorld = getReachScale(state.params) * 0.16;
    var axisColors = [
      { key: "xAxis", color: "#ef4444" },
      { key: "yAxis", color: "#22c55e" },
      { key: "zAxis", color: "#2563eb" },
    ];
    for (i = 0; i < frames.length; i++) {
      (function (idx) {
        var frame = frames[idx];
        var a;
        for (a = 0; a < axisColors.length; a++) {
          (function (axisItem) {
            var p0W = frame.origin;
            var p1W = addVec(frame.origin, frame[axisItem.key], axisLenWorld);
            var p0P = project3D(p0W, state.camera);
            var p1P = project3D(p1W, state.camera);
            var p0 = { x: centerX + p0P.x * scale, y: centerY - p0P.y * scale, z: p0P.z };
            var p1 = { x: centerX + p1P.x * scale, y: centerY - p1P.y * scale, z: p1P.z };
            drawOps.push({
              depth: (p0.z + p1.z) * 0.5,
              run: function () {
                ctx.strokeStyle = axisItem.color;
                ctx.lineWidth = 1.7;
                ctx.beginPath();
                ctx.moveTo(p0.x, p0.y);
                ctx.lineTo(p1.x, p1.y);
                ctx.stroke();
              },
            });
          })(axisColors[a]);
        }
      })(i);
    }

    drawOps.sort(function (a, b) { return b.depth - a.depth; });
    for (i = 0; i < drawOps.length; i++) drawOps[i].run();

    ctx.fillStyle = "#475569";
    ctx.font = "11px sans-serif";
    ctx.fillText("Drag: rotate | Wheel: zoom", 12, canvas.height - 10);
  }

  function init3DInteraction(canvas, state) {
    if (!canvas || canvas.__cusp3dBound) return;
    canvas.__cusp3dBound = true;

    canvas.addEventListener("pointerdown", function (evt) {
      state.interaction3d.dragging = true;
      state.interaction3d.lastX = evt.clientX;
      state.interaction3d.lastY = evt.clientY;
      if (canvas.setPointerCapture) {
        try { canvas.setPointerCapture(evt.pointerId); } catch (e) {}
      }
    });

    canvas.addEventListener("pointermove", function (evt) {
      if (!state.interaction3d.dragging) return;
      var dx = evt.clientX - state.interaction3d.lastX;
      var dy = evt.clientY - state.interaction3d.lastY;
      state.interaction3d.lastX = evt.clientX;
      state.interaction3d.lastY = evt.clientY;
      state.camera.azimuth += dx * 0.0085;
      state.camera.elevation -= dy * 0.0075;
      clampCamera(state.camera);
      render3DScene(state);
    });

    function stopDrag() {
      state.interaction3d.dragging = false;
    }
    canvas.addEventListener("pointerup", stopDrag);
    canvas.addEventListener("pointercancel", stopDrag);
    canvas.addEventListener("pointerleave", stopDrag);

    canvas.addEventListener("wheel", function (evt) {
      evt.preventDefault();
      var factor = Math.exp(evt.deltaY * 0.0012);
      state.camera.radius = state.camera.radius * factor;
      clampCamera(state.camera);
      render3DScene(state);
    }, { passive: false });
  }
  function renderExpression(targetEl) {
    var tex =
      "$$\\det J_{\\perp}(\\theta_2,\\theta_3)=-a_3\\Big(" +
      "a_1a_2\\sin\\theta_3+a_1a_3\\sin\\theta_3\\cos\\theta_3+a_2^2\\sin\\theta_3\\cos\\theta_2" +
      "+a_2a_3\\sin\\theta_3\\cos\\theta_2\\cos\\theta_3-a_2d_2\\cos\\theta_2\\cos\\theta_3" +
      "+a_2d_3\\sin\\theta_2\\sin\\theta_3-a_3d_2\\cos\\theta_2\\cos^2\\theta_3-d_2d_3\\sin\\theta_2\\cos\\theta_3\\Big)$$";

    targetEl.innerHTML =
      "<h4 style=\"margin:0 0 8px 0;\">Orthogonal 3R determinant (alpha1 = alpha2 = pi/2)</h4>" +
      "<p style=\"margin:0 0 8px 0;color:#334155;\">Use the sliders to change DH geometry (d2, d3, a1, a2, a3). Panel A shows singularity curves where det(J)=0 in (theta2, theta3), and Panel B shows the mapped critical set in the (rho, z) slice.</p>" +
      "<p style=\"margin:0 0 8px 0;color:#334155;\">Click in Panel A to compute a forward-kinematics point in Panel B. Click in Panel B to compute inverse-kinematics branches and plot them in Panel A. Panel C is the 3D geometric interpretation of the current robot and selected pose.</p>" +
      "<div style=\"overflow:auto\">" + tex + "</div>";

    if (window.MathJax && typeof window.MathJax.typesetPromise === "function") {
      window.MathJax.typesetPromise([targetEl]).catch(function () {});
    }
  }

  function resetSliderTrace(state) {
    if (!state.interaction.sliderPose) {
      state.interaction.sliderPose = {
        theta1: state.defaultPose.theta1,
        theta2: state.defaultPose.theta2,
        theta3: state.defaultPose.theta3,
      };
    }
    var p = state.interaction.sliderPose;
    var rz = computeRhoZ(p.theta1, p.theta2, p.theta3, state.params);
    state.interaction.sliderWorkspacePoint = rz;
    state.interaction.sliderTraceJoint = [{ theta2: p.theta2, theta3: p.theta3 }];
    state.interaction.sliderTraceWorkspace = [{ rho: rz.rho, z: rz.z }];
  }

  function applySliderPose(state, theta1, theta2, theta3, appendTrace) {
    if (!state.interaction.sliderPose) {
      state.interaction.sliderPose = { theta1: 0, theta2: 0, theta3: 0 };
    }
    state.interaction.sliderPose.theta1 = wrapToPi(theta1);
    state.interaction.sliderPose.theta2 = wrapToPi(theta2);
    state.interaction.sliderPose.theta3 = wrapToPi(theta3);

    var rz = computeRhoZ(
      state.interaction.sliderPose.theta1,
      state.interaction.sliderPose.theta2,
      state.interaction.sliderPose.theta3,
      state.params
    );
    state.interaction.sliderWorkspacePoint = rz;

    if (!state.interaction.sliderTraceJoint) state.interaction.sliderTraceJoint = [];
    if (!state.interaction.sliderTraceWorkspace) state.interaction.sliderTraceWorkspace = [];

    if (appendTrace) {
      state.interaction.sliderTraceJoint.push({
        theta2: state.interaction.sliderPose.theta2,
        theta3: state.interaction.sliderPose.theta3,
      });
      state.interaction.sliderTraceWorkspace.push({ rho: rz.rho, z: rz.z });
      if (state.interaction.sliderTraceJoint.length > 1800) state.interaction.sliderTraceJoint.shift();
      if (state.interaction.sliderTraceWorkspace.length > 1800) state.interaction.sliderTraceWorkspace.shift();
    }

    if (state.controls.theta1) {
      state.controls.theta1.value = String(state.interaction.sliderPose.theta1);
      state.controls.theta1Value.textContent = toFixedLabel(state.interaction.sliderPose.theta1, 3);
      state.controls.theta2.value = String(state.interaction.sliderPose.theta2);
      state.controls.theta2Value.textContent = toFixedLabel(state.interaction.sliderPose.theta2, 3);
      state.controls.theta3.value = String(state.interaction.sliderPose.theta3);
      state.controls.theta3Value.textContent = toFixedLabel(state.interaction.sliderPose.theta3, 3);
    }
  }

  function clearInteraction(state, clearSliderTrace) {
    state.interaction.jointPick = null;
    state.interaction.fkPoint = null;
    state.interaction.workspacePick = null;
    state.interaction.ikSolutions = [];
    state.interaction.ikCase = null;
    if (clearSliderTrace) {
      resetSliderTrace(state);
    }
  }

  function formatIKInfo(result, target) {
    if (!result.solutions.length) {
      return (
        "Workspace click (rho,z)= (" + toFixedLabel(target.rho, 3) + ", " + toFixedLabel(target.z, 3) + ")\n" +
        "IK branch: " + result.caseName + "\n" +
        "No IK solution found at this point (with y=0 slice)."
      );
    }

    var lines = [
      "Workspace click (rho,z)= (" + toFixedLabel(target.rho, 3) + ", " + toFixedLabel(target.z, 3) + ")",
      "IK branch: " + result.caseName,
      "Solutions: " + result.solutions.length,
    ];

    var i;
    for (i = 0; i < result.solutions.length; i++) {
      var s = result.solutions[i];
      lines.push(
        (i + 1) + ") [theta1, theta2, theta3] = [" +
        toFixedLabel(s.theta1, 4) + ", " +
        toFixedLabel(s.theta2, 4) + ", " +
        toFixedLabel(s.theta3, 4) + "]"
      );
    }

    return lines.join("\n");
  }

  function handleJointSpaceClick(state, evt) {
    var pt = getCanvasPoint(evt, state.canvases.det);
    var pData = canvasPointToData(pt, state.views.det);
    if (!pData) return;

    state.interaction.jointPick = { theta2: pData.x, theta3: pData.y };
    state.interaction.fkPoint = computeRhoZ(0, pData.x, pData.y, state.params);
    applySliderPose(
      state,
      state.interaction.sliderPose ? state.interaction.sliderPose.theta1 : state.defaultPose.theta1,
      pData.x,
      pData.y,
      false
    );
    // Clicking spaces should not accumulate trajectory traces.
    resetSliderTrace(state);

    state.controls.infoText.textContent =
      "Joint-space click: theta2=" + toFixedLabel(pData.x, 4) +
      ", theta3=" + toFixedLabel(pData.y, 4) +
      " -> FK (rho,z)= (" + toFixedLabel(state.interaction.fkPoint.rho, 4) +
      ", " + toFixedLabel(state.interaction.fkPoint.z, 4) + ")";

    renderAll(state, "live");
  }

  function handleWorkspaceClick(state, evt) {
    var pt = getCanvasPoint(evt, state.canvases.critical);
    var pData = canvasPointToData(pt, state.views.critical);
    if (!pData) return;

    var rho = Math.max(0, pData.x);
    var z = pData.y;
    state.interaction.workspacePick = { rho: rho, z: z };

    var ikResult = getIKSolutions3R({ x: rho, y: 0, z: z }, state.params, {
      maxIter: 90,
      tol: 1e-7,
      acceptTol: 2e-4,
      maxSolutions: 12,
    });

    // Show all IK branches, but only one representative per position branch (theta2, theta3).
    var shownSolutions = dedupePositionRelatedSolutions(ikResult.solutions, 1e-3);
    state.interaction.ikSolutions = shownSolutions;
    state.interaction.ikCase = ikResult.caseName;
    if (shownSolutions.length) {
      applySliderPose(
        state,
        shownSolutions[0].theta1,
        shownSolutions[0].theta2,
        shownSolutions[0].theta3,
        false
      );
    }
    // Clicking spaces should not accumulate trajectory traces.
    resetSliderTrace(state);
    state.controls.infoText.textContent = formatIKInfo({
      caseName: ikResult.caseName,
      solutions: shownSolutions,
    }, state.interaction.workspacePick);

    renderAll(state, "live");
  }

  function scheduleLiveRender(state) {
    if (state.debounceTimer) clearTimeout(state.debounceTimer);
    state.debounceTimer = setTimeout(function () {
      renderAll(state, "live");
    }, 220);
  }

  function computePlotData(params, sampling) {
    var key = hashParams(params, sampling);
    if (cache.has(key)) return cache.get(key);
    var result = computeCriticalValues(params, sampling);
    cache.set(key, result);
    return result;
  }

  function renderAll(state, quality) {
    quality = quality || "live";
    var sampling = quality === "dense" ? state.samplingDense : state.samplingLive;
    var statusText = state.controls.statusText;
    var started = performance.now ? performance.now() : Date.now();
    if (statusText) statusText.textContent = quality === "dense" ? "recomputing (dense)..." : "updating...";

    var data = computePlotData(state.params, sampling);
    state.views.det = drawDetPanel(state.canvases.det, state.params, sampling, state.interaction);
    state.views.critical = drawCriticalPanel(state.canvases.critical, data, state.params, state.interaction);
    render3DScene(state);

    if (statusText) {
      var ended = performance.now ? performance.now() : Date.now();
      statusText.textContent = quality + " render in " + Math.round(ended - started) + " ms";
    }
  }
  function mountOrthogonal(containerEl, config) {
    if (!containerEl) return null;
    config = config || {};

    var state = {
      params: Object.assign({}, ORTHOGONAL_DEFAULTS),
      samplingLive: Object.assign({}, LIVE_SAMPLING),
      samplingDense: Object.assign({}, DENSE_SAMPLING),
      defaultPose: { theta1: 0, theta2: 0.4, theta3: -0.9 },
      camera: initCamera(ORTHOGONAL_DEFAULTS),
      interaction3d: { dragging: false, lastX: 0, lastY: 0 },
      controls: {},
      canvases: {},
      views: { det: null, critical: null, scene3d: null },
      interaction: {
        jointPick: null,
        fkPoint: null,
        workspacePick: null,
        ikSolutions: [],
        ikCase: null,
        sliderPose: null,
        sliderWorkspacePoint: null,
        sliderTraceJoint: [],
        sliderTraceWorkspace: [],
      },
      debounceTimer: null,
    };
    updateCameraBounds(state, true);
    applySliderPose(
      state,
      state.defaultPose.theta1,
      state.defaultPose.theta2,
      state.defaultPose.theta3,
      false
    );
    resetSliderTrace(state);

    containerEl.innerHTML = "";
    var root = createEl("div", {
      style: {
        border: "1px solid #e2e8f0",
        borderRadius: "10px",
        padding: "14px",
        margin: "14px 0",
        background: "#ffffff",
      },
    });
    containerEl.appendChild(root);

    var exprCard = createEl("div", {
      style: {
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "10px",
        background: "#f8fafc",
        marginBottom: "12px",
      },
    });
    root.appendChild(exprCard);
    renderExpression(exprCard);

    var controlsCard = createEl("div", {
      style: {
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "10px",
        background: "#fcfcfd",
        marginBottom: "12px",
      },
    });
    root.appendChild(controlsCard);

    controlsCard.appendChild(createEl("h4", { style: { margin: "0 0 10px 0" } }, "Interactive controls"));

    var fixedLine = createEl(
      "p",
      { style: { margin: "0 0 10px 0", fontSize: "12px", color: "#475569" } },
      "Fixed here: d1=0, alpha1=pi/2, alpha2=pi/2, alpha3=0"
    );
    controlsCard.appendChild(fixedLine);

    var paramsRow = createEl("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
        gap: "10px",
      },
    });
    controlsCard.appendChild(paramsRow);

    function addParamSlider(key, min, max, step) {
      var wrap = createEl("div", { style: { display: "block" } });
      var line = createEl("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          fontSize: "12px",
          color: "#334155",
          marginBottom: "4px",
        },
      });
      var labelEl = createEl("span", null, key);
      var valueEl = createEl("span", null, toFixedLabel(state.params[key], 3));
      line.appendChild(labelEl);
      line.appendChild(valueEl);
      wrap.appendChild(line);

      var slider = createEl("input", {
        type: "range",
        min: String(min),
        max: String(max),
        step: String(step),
        value: String(state.params[key]),
        style: { width: "100%" },
      });
      wrap.appendChild(slider);

      slider.addEventListener("input", function () {
        var v = parseFloat(slider.value);
        if (!isFinite(v)) return;
        state.params[key] = clamp(v, min, max);
        valueEl.textContent = toFixedLabel(state.params[key], 3);
        updateCameraBounds(state, false);
        clearInteraction(state, true);
        state.controls.infoText.textContent = "";
        scheduleLiveRender(state);
      });

      paramsRow.appendChild(wrap);
      state.controls[key] = slider;
      state.controls[key + "Value"] = valueEl;
    }

    addParamSlider("d2", -3, 3, 0.01);
    addParamSlider("d3", -3, 3, 0.01);
    addParamSlider("a1", 0.1, 4, 0.01);
    addParamSlider("a2", 0.1, 4, 0.01);
    addParamSlider("a3", 0.1, 4, 0.01);

    var buttonRow = createEl("div", { style: { marginTop: "10px", display: "flex", gap: "8px", flexWrap: "wrap" } });
    controlsCard.appendChild(buttonRow);

    var recomputeBtn = createEl("button", {
      type: "button",
      style: {
        border: "0",
        padding: "6px 10px",
        borderRadius: "6px",
        background: "#111827",
        color: "#fff",
        cursor: "pointer",
      },
    }, "Recompute Curves");
    buttonRow.appendChild(recomputeBtn);

    var resetBtn = createEl("button", {
      type: "button",
      style: {
        border: "1px solid #cbd5e1",
        padding: "6px 10px",
        borderRadius: "6px",
        background: "#fff",
        color: "#0f172a",
        cursor: "pointer",
      },
    }, "Reset Defaults");
    buttonRow.appendChild(resetBtn);

    var resetCameraBtn = createEl("button", {
      type: "button",
      style: {
        border: "1px solid #cbd5e1",
        padding: "6px 10px",
        borderRadius: "6px",
        background: "#fff",
        color: "#0f172a",
        cursor: "pointer",
      },
    }, "Reset Camera");
    buttonRow.appendChild(resetCameraBtn);

    var statusText = createEl("span", { style: { alignSelf: "center", fontSize: "12px", color: "#64748b" } }, "");
    buttonRow.appendChild(statusText);
    state.controls.statusText = statusText;

    var infoText = createEl("div", {
      style: {
        marginTop: "10px",
        fontSize: "12px",
        whiteSpace: "pre-line",
        color: "#0f172a",
        border: "1px dashed #cbd5e1",
        borderRadius: "6px",
        padding: "8px",
        minHeight: "40px",
        background: "#f8fafc",
      },
    }, "");
    controlsCard.appendChild(infoText);
    state.controls.infoText = infoText;

    var grid = createEl("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "10px",
      },
    });
    root.appendChild(grid);

    function updateGridColumns() {
      grid.style.gridTemplateColumns = window.innerWidth < 980 ? "1fr" : "1fr 1fr";
    }
    updateGridColumns();
    window.addEventListener("resize", updateGridColumns);

    function addPanel(name) {
      var panel = createEl("div", {
        style: {
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          padding: "6px",
          background: "#fff",
        },
      });
      var canvas = createEl("canvas", {
        width: "420",
        height: "300",
        style: { width: "100%", height: "auto", display: "block" },
      });
      panel.appendChild(canvas);
      grid.appendChild(panel);
      state.canvases[name] = canvas;
    }

    function addThetaControlPanel() {
      var panel = createEl("div", {
        style: {
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          padding: "10px",
          background: "#fff",
        },
      });
      var title = createEl("div", {
        style: { fontSize: "13px", color: "#0f172a", marginBottom: "8px", fontWeight: "600" },
      }, "Configuration sliders (theta1, theta2, theta3)");
      panel.appendChild(title);

      var subtitle = createEl("div", {
        style: { fontSize: "12px", color: "#475569", marginBottom: "8px" },
      }, "Move sliders to trace joint-space and workspace paths.");
      panel.appendChild(subtitle);

      function addThetaSlider(key) {
        var wrap = createEl("div", { style: { marginBottom: "8px" } });
        var line = createEl("div", {
          style: {
            display: "flex",
            justifyContent: "space-between",
            fontSize: "12px",
            color: "#334155",
            marginBottom: "3px",
          },
        });
        var labelEl = createEl("span", null, key);
        var valueEl = createEl("span", null, toFixedLabel(state.interaction.sliderPose[key], 3));
        line.appendChild(labelEl);
        line.appendChild(valueEl);
        wrap.appendChild(line);

        var slider = createEl("input", {
          type: "range",
          min: String(-Math.PI),
          max: String(Math.PI),
          step: "0.01",
          value: String(state.interaction.sliderPose[key]),
          style: { width: "100%" },
        });
        wrap.appendChild(slider);

        slider.addEventListener("input", function () {
          var v = parseFloat(slider.value);
          if (!isFinite(v)) return;
          var p = state.interaction.sliderPose;
          var t1 = p.theta1;
          var t2 = p.theta2;
          var t3 = p.theta3;
          if (key === "theta1") t1 = v;
          if (key === "theta2") t2 = v;
          if (key === "theta3") t3 = v;
          applySliderPose(state, t1, t2, t3, true);
          state.controls.infoText.textContent =
            "Slider pose: [" +
            toFixedLabel(state.interaction.sliderPose.theta1, 3) + ", " +
            toFixedLabel(state.interaction.sliderPose.theta2, 3) + ", " +
            toFixedLabel(state.interaction.sliderPose.theta3, 3) + "] -> FK (rho,z)= (" +
            toFixedLabel(state.interaction.sliderWorkspacePoint.rho, 3) + ", " +
            toFixedLabel(state.interaction.sliderWorkspacePoint.z, 3) + ")";
          renderAll(state, "live");
        });

        panel.appendChild(wrap);
        state.controls[key] = slider;
        state.controls[key + "Value"] = valueEl;
      }

      addThetaSlider("theta1");
      addThetaSlider("theta2");
      addThetaSlider("theta3");

      grid.appendChild(panel);
    }

    addPanel("det");
    addPanel("critical");
    addPanel("scene3d");
    init3DInteraction(state.canvases.scene3d, state);
    addThetaControlPanel();

    state.canvases.det.addEventListener("click", function (evt) { handleJointSpaceClick(state, evt); });
    state.canvases.critical.addEventListener("click", function (evt) { handleWorkspaceClick(state, evt); });

    recomputeBtn.addEventListener("click", function () { renderAll(state, "dense"); });

    resetBtn.addEventListener("click", function () {
      Object.assign(state.params, ORTHOGONAL_DEFAULTS);
      ["d2", "d3", "a1", "a2", "a3"].forEach(function (k) {
        state.controls[k].value = String(state.params[k]);
        state.controls[k + "Value"].textContent = toFixedLabel(state.params[k], 3);
      });
      updateCameraBounds(state, true);
      applySliderPose(
        state,
        state.defaultPose.theta1,
        state.defaultPose.theta2,
        state.defaultPose.theta3,
        false
      );
      clearInteraction(state, true);
      state.controls.infoText.textContent = "";
      renderAll(state, "dense");
    });

    resetCameraBtn.addEventListener("click", function () {
      state.camera.azimuth = -35 * Math.PI / 180;
      state.camera.elevation = 20 * Math.PI / 180;
      updateCameraBounds(state, true);
      render3DScene(state);
    });

    renderAll(state, "dense");
    return state;
  }

  function init(options) {
    options = options || {};
    var targetId = options.targetId || "orthogonal-3r-interactive";
    var container = document.getElementById(targetId);
    if (!container) return null;
    return mountOrthogonal(container, options);
  }

  var publicApi = {
    init: init,
    mountOrthogonal: mountOrthogonal,
    computeDetJOrthogonal: computeDetJOrthogonal,
    computeRhoZ: computeRhoZ,
    computeSingularitySamples: computeSingularitySamples,
    computeCriticalValues: computeCriticalValues,
    getIKSolutions3R: getIKSolutions3R,
    project3D: project3D,
    render3DScene: render3DScene,
    init3DInteraction: init3DInteraction,
    renderExpression: renderExpression,
    renderAll: renderAll,
    modelDefinitions: {
      orthogonal3R: { enabled: true },
      generic3R: { enabled: false, status: "TODO" },
    },
  };

  window.CuspidalRobotsInteractive = publicApi;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { init(); });
  } else {
    init();
  }
})();
