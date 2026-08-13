/* cuspidal_robots.js
   Self-contained interactive demo for:
   Rotation as an exponential about an arbitrary axis.

   Use in Markdown/Jekyll as:

   <div id="rotation-exp-demo"></div>
   <script src="/cuspidal_robots.js"></script>
*/

(function () {
  "use strict";

  function mountRotationExponentialDemo(root) {
    if (!root || root.dataset.rotationExpMounted === "1") return;
    root.dataset.rotationExpMounted = "1";

    const a1 = 1.0;
    const d1 = 1.0;

    function el(tag, attrs, text) {
      const node = document.createElement(tag);
      if (attrs) {
        Object.keys(attrs).forEach(function (key) {
          if (key === "style" && typeof attrs[key] === "object") {
            Object.assign(node.style, attrs[key]);
          } else {
            node.setAttribute(key, attrs[key]);
          }
        });
      }
      if (typeof text === "string") node.textContent = text;
      return node;
    }

    function svgEl(tag, attrs, text) {
      const node = document.createElementNS("http://www.w3.org/2000/svg", tag);
      if (attrs) {
        Object.keys(attrs).forEach(function (key) {
          node.setAttribute(key, attrs[key]);
        });
      }
      if (typeof text === "string") node.textContent = text;
      return node;
    }

    function fmt(x) {
      if (Math.abs(x) < 1e-10) x = 0;
      return Number(x).toFixed(3);
    }

    function p3(x, y, z) {
      return { x: x, y: y, z: z };
    }

    function add(a, b) {
      return p3(a.x + b.x, a.y + b.y, a.z + b.z);
    }

    function sub(a, b) {
      return p3(a.x - b.x, a.y - b.y, a.z - b.z);
    }

    function mul(s, a) {
      return p3(s * a.x, s * a.y, s * a.z);
    }

    function dot(a, b) {
      return a.x * b.x + a.y * b.y + a.z * b.z;
    }

    function cross(a, b) {
      return p3(
        a.y * b.z - a.z * b.y,
        a.z * b.x - a.x * b.z,
        a.x * b.y - a.y * b.x
      );
    }

    function norm(a) {
      return Math.sqrt(dot(a, a));
    }

    function normalize(a) {
      const n = norm(a);
      if (n < 1e-12) return p3(0, 0, 0);
      return mul(1 / n, a);
    }

    function rodriguesMatrix(e, phi) {
      const ex = e.x;
      const ey = e.y;
      const ez = e.z;

      const c = Math.cos(phi);
      const s = Math.sin(phi);
      const C = 1 - c;

      return [
        [c + ex * ex * C, ex * ey * C - ez * s, ex * ez * C + ey * s],
        [ey * ex * C + ez * s, c + ey * ey * C, ey * ez * C - ex * s],
        [ez * ex * C - ey * s, ez * ey * C + ex * s, c + ez * ez * C]
      ];
    }

    function matVec(M, v) {
      return p3(
        M[0][0] * v.x + M[0][1] * v.y + M[0][2] * v.z,
        M[1][0] * v.x + M[1][1] * v.y + M[1][2] * v.z,
        M[2][0] * v.x + M[2][1] * v.y + M[2][2] * v.z
      );
    }

    const style = el("style");
    style.textContent = `
.rotation-exp-widget {
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 14px;
  background: #ffffff;
  padding: 1rem;
  margin: 1.25rem 0;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
}

.rotation-exp-widget * {
  box-sizing: border-box;
}

.rotation-exp-widget .rew-title {
  margin: 0 0 0.35rem 0;
  font-size: 1.08rem;
  font-weight: 750;
  color: #111827;
}

.rotation-exp-widget .rew-subtitle {
  margin: 0 0 0.85rem 0;
  color: #4b5563;
  font-size: 0.95rem;
  line-height: 1.45;
}

.rotation-exp-widget .rew-howto {
  border-left: 4px solid #2563eb;
  background: #eff6ff;
  color: #1f2937;
  border-radius: 10px;
  padding: 0.75rem 0.9rem;
  margin: 0.85rem 0 1rem 0;
  font-size: 0.93rem;
  line-height: 1.5;
}

.rotation-exp-widget .rew-canvas-wrap {
  width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #fbfdff;
  overflow: hidden;
}

.rotation-exp-widget svg {
  width: 100%;
  height: auto;
  display: block;
  touch-action: none;
  cursor: grab;
}

.rotation-exp-widget svg:active {
  cursor: grabbing;
}

.rotation-exp-widget .rew-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem 0.9rem;
  margin-top: 0.75rem;
  font-size: 0.88rem;
  color: #374151;
}

.rotation-exp-widget .rew-legend span {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}

.rotation-exp-widget .rew-swatch {
  width: 0.95rem;
  height: 0.27rem;
  display: inline-block;
  border-radius: 999px;
}

.rotation-exp-widget .rew-controls {
  display: grid;
  grid-template-columns: repeat(3, minmax(220px, 1fr));
  gap: 0.9rem;
  margin-top: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 0.9rem;
  background: #ffffff;
}

.rotation-exp-widget .rew-control {
  min-width: 0;
}

.rotation-exp-widget label {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  font-weight: 650;
  color: #111827;
  margin-bottom: 0.35rem;
}

.rotation-exp-widget input[type="range"] {
  width: 100%;
  accent-color: #111827;
}

.rotation-exp-widget .rew-readout {
  font-family: "JetBrains Mono", "Courier New", monospace;
  white-space: pre-wrap;
  line-height: 1.48;
  font-size: 0.88rem;
  color: #111827;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 0.9rem;
  margin-top: 1rem;
}

@media (max-width: 900px) {
  .rotation-exp-widget .rew-controls {
    grid-template-columns: 1fr;
  }
}
`;
    document.head.appendChild(style);

    root.className = "rotation-exp-widget";

    root.appendChild(
      el("h4", { class: "rew-title" }, "Rotation as an exponential about an axis")
    );

    root.appendChild(
      el(
        "p",
        { class: "rew-subtitle" },
        "A one-joint robot is fixed by a1 = 1, d1 = 1, alpha1 = pi/2. The joint variable theta1 = phi generates a finite rotation about the bold axis e."
      )
    );

    const howto = el("div", { class: "rew-howto" });
    howto.innerHTML =
      "<strong>How to use:</strong> drag inside the 3D view to rotate the camera, scroll to zoom, and double-click to reset the view. " +
      "Use the sliders to change the rotation angle \\(\\phi\\), move the reference frame along the axis, and tilt the axis \\(\\mathbf e\\). " +
      "The visualization shows how the endpoint motion is naturally written as \\(\\mathbf r(1)=\\exp(\\phi\\tilde{\\mathbf e})\\mathbf r(0)\\).";
    root.appendChild(howto);

    const canvasWrap = el("div", { class: "rew-canvas-wrap" });
    root.appendChild(canvasWrap);

    const svg = svgEl("svg", {
      viewBox: "0 0 980 560",
      role: "img",
      "aria-label": "Interactive rotation exponential demo"
    });
    canvasWrap.appendChild(svg);

    const scene = svgEl("g");
    svg.appendChild(scene);

    const legend = el("div", { class: "rew-legend" });
    legend.innerHTML =
      "<span><span class='rew-swatch' style='background:#111827'></span>axis <b>e</b> and link</span>" +
      "<span><span class='rew-swatch' style='background:#6b7280'></span>r(0)</span>" +
      "<span><span class='rew-swatch' style='background:#2563eb'></span>r(1)</span>" +
      "<span><span class='rew-swatch' style='background:#7c3aed'></span>tangent</span>" +
      "<span><span class='rew-swatch' style='background:#ef4444'></span>phi arc</span>" +
      "<span><span class='rew-swatch' style='background:#f59e0b'></span>movable frame</span>";
    root.appendChild(legend);

    const controls = el("div", { class: "rew-controls" });
    root.appendChild(controls);

    const phiControl = el("div", { class: "rew-control" });
    const phiLabel = el("label", { for: "rotation-exp-phi-slider" });
    const phiValue = el("span", null, "55°");
    phiLabel.appendChild(el("span", null, "theta1 = phi"));
    phiLabel.appendChild(phiValue);
    phiControl.appendChild(phiLabel);

    const phiSlider = el("input", {
      id: "rotation-exp-phi-slider",
      type: "range",
      min: "-180",
      max: "180",
      step: "1",
      value: "55"
    });
    phiControl.appendChild(phiSlider);
    controls.appendChild(phiControl);

    const frameControl = el("div", { class: "rew-control" });
    const frameLabel = el("label", { for: "rotation-exp-frame-slider" });
    const frameValue = el("span", null, "s = 0.400");
    frameLabel.appendChild(el("span", null, "frame position on axis"));
    frameLabel.appendChild(frameValue);
    frameControl.appendChild(frameLabel);

    const frameSlider = el("input", {
      id: "rotation-exp-frame-slider",
      type: "range",
      min: "-0.4",
      max: "1.8",
      step: "0.01",
      value: "0.4"
    });
    frameControl.appendChild(frameSlider);
    controls.appendChild(frameControl);

    const tiltControl = el("div", { class: "rew-control" });
    const tiltLabel = el("label", { for: "rotation-exp-tilt-slider" });
    const tiltValue = el("span", null, "0°");
    tiltLabel.appendChild(el("span", null, "axis tilt beta"));
    tiltLabel.appendChild(tiltValue);
    tiltControl.appendChild(tiltLabel);

    const tiltSlider = el("input", {
      id: "rotation-exp-tilt-slider",
      type: "range",
      min: "-70",
      max: "70",
      step: "1",
      value: "0"
    });
    tiltControl.appendChild(tiltSlider);
    controls.appendChild(tiltControl);

    const readout = el("div", { class: "rew-readout" });
    root.appendChild(readout);

    const W = 980;
    const H = 560;
    const center = { x: 500, y: 305 };

    let azimuth = -0.68;
    let elevation = 0.64;
    let zoom = 1.0;

    let dragging = false;
    let lastPointer = null;

    function project(P) {
      const ca = Math.cos(azimuth);
      const sa = Math.sin(azimuth);
      const ce = Math.cos(elevation);
      const se = Math.sin(elevation);

      const x1 = ca * P.x - sa * P.y;
      const y1 = sa * P.x + ca * P.y;
      const z1 = P.z;
      const y2 = ce * y1 - se * z1;

      const scale = 155 * zoom;

      return {
        x: center.x + scale * x1,
        y: center.y - scale * y2
      };
    }

    function line3(A, B, attrs) {
      const a = project(A);
      const b = project(B);

      const line = svgEl(
        "line",
        Object.assign(
          {
            x1: a.x,
            y1: a.y,
            x2: b.x,
            y2: b.y
          },
          attrs || {}
        )
      );

      scene.appendChild(line);
      return line;
    }

    function arrow3(A, B, attrs) {
      return line3(
        A,
        B,
        Object.assign(
          {
            "marker-end": "url(#rotation-exp-arrow)",
            "stroke-linecap": "round"
          },
          attrs || {}
        )
      );
    }

    function dot3(P, r, attrs) {
      const p = project(P);

      scene.appendChild(
        svgEl(
          "circle",
          Object.assign(
            {
              cx: p.x,
              cy: p.y,
              r: r
            },
            attrs || {}
          )
        )
      );
    }

    function label3(P, text, options) {
      const opts = options || {};
      const p = project(P);

      const dx = opts.dx || 0;
      const dy = opts.dy || 0;
      const x = p.x + dx;
      const y = p.y + dy;

      const fontSize = opts.fontSize || 15;
      const weight = opts.weight || "700";
      const fill = opts.fill || "#111827";

      const width = opts.width || Math.max(42, text.length * fontSize * 0.62 + 14);
      const height = opts.height || fontSize + 10;

      const g = svgEl("g");

      const rect = svgEl("rect", {
        x: x - 7,
        y: y - height + 4,
        width: width,
        height: height,
        rx: 6,
        ry: 6,
        fill: "rgba(255,255,255,0.92)",
        stroke: opts.stroke || "#e5e7eb",
        "stroke-width": 1
      });

      const t = svgEl(
        "text",
        {
          x: x,
          y: y,
          "font-size": fontSize,
          "font-family": "Arial, sans-serif",
          "font-weight": weight,
          fill: fill
        },
        text
      );

      g.appendChild(rect);
      g.appendChild(t);
      scene.appendChild(g);
    }

    function pathFromPoints(points, attrs) {
      if (!points.length) return;

      const d = points
        .map(function (P, i) {
          const p = project(P);
          return (i === 0 ? "M" : "L") + p.x.toFixed(2) + " " + p.y.toFixed(2);
        })
        .join(" ");

      scene.appendChild(
        svgEl(
          "path",
          Object.assign(
            {
              d: d,
              fill: "none"
            },
            attrs || {}
          )
        )
      );
    }

    function drawFrame(origin, axes, len, label, options) {
      const opts = options || {};
      const showLetters = opts.showLetters === true;

      arrow3(origin, add(origin, mul(len, axes.x)), {
        stroke: "#dc2626",
        "stroke-width": 2.2
      });

      arrow3(origin, add(origin, mul(len, axes.y)), {
        stroke: "#16a34a",
        "stroke-width": 2.2
      });

      arrow3(origin, add(origin, mul(len, axes.z)), {
        stroke: "#2563eb",
        "stroke-width": 2.2
      });

      if (showLetters) {
        label3(add(origin, mul(len + 0.08, axes.x)), "x", {
          fill: "#dc2626",
          dx: 10,
          dy: -8,
          width: 24,
          fontSize: 13
        });

        label3(add(origin, mul(len + 0.08, axes.y)), "y", {
          fill: "#16a34a",
          dx: 10,
          dy: 12,
          width: 24,
          fontSize: 13
        });

        label3(add(origin, mul(len + 0.08, axes.z)), "z", {
          fill: "#2563eb",
          dx: 10,
          dy: -8,
          width: 24,
          fontSize: 13
        });
      }

      if (label) {
        label3(origin, label, {
          fill: opts.fill || "#111827",
          dx: opts.dx || 14,
          dy: opts.dy || 26,
          width: opts.width || 68,
          fontSize: opts.fontSize || 14
        });
      }
    }

    function drawArrowMarker() {
      const defs = svgEl("defs");
      defs.innerHTML =
        "<marker id='rotation-exp-arrow' markerWidth='10' markerHeight='10' refX='8' refY='3' orient='auto' markerUnits='strokeWidth'>" +
        "<path d='M0,0 L0,6 L9,3 z' fill='context-stroke'></path>" +
        "</marker>";
      scene.appendChild(defs);
    }

    function drawGrid() {
      for (let i = -4; i <= 4; i++) {
        line3(p3(-2, i * 0.5, 0), p3(2, i * 0.5, 0), {
          stroke: "#e5e7eb",
          "stroke-width": 1
        });

        line3(p3(i * 0.5, -2, 0), p3(i * 0.5, 2, 0), {
          stroke: "#e5e7eb",
          "stroke-width": 1
        });
      }
    }

    function formatMatrix(M) {
      return (
        "[ " + fmt(M[0][0]) + "  " + fmt(M[0][1]) + "  " + fmt(M[0][2]) + " ]\n" +
        "[ " + fmt(M[1][0]) + "  " + fmt(M[1][1]) + "  " + fmt(M[1][2]) + " ]\n" +
        "[ " + fmt(M[2][0]) + "  " + fmt(M[2][1]) + "  " + fmt(M[2][2]) + " ]"
      );
    }

    function render() {
      const phiDeg = Number(phiSlider.value);
      const betaDeg = Number(tiltSlider.value);
      const sAxis = Number(frameSlider.value);

      const phi = (phiDeg * Math.PI) / 180;
      const beta = (betaDeg * Math.PI) / 180;

      phiValue.textContent = phiDeg + "°";
      tiltValue.textContent = betaDeg + "°";
      frameValue.textContent = "s = " + fmt(sAxis);

      scene.innerHTML = "";
      drawArrowMarker();

      scene.appendChild(
        svgEl("rect", {
          x: 0,
          y: 0,
          width: W,
          height: H,
          fill: "#fbfdff"
        })
      );

      drawGrid();

      const O = p3(0, 0, 0);
      const eAxis = normalize(p3(Math.sin(beta), 0, Math.cos(beta)));

      const u = p3(0, 1, 0);
      const v = normalize(cross(eAxis, u));

      const R = rodriguesMatrix(eAxis, phi);

      const qFrame = mul(sAxis, eAxis);
      const centerOfOrbit = mul(d1, eAxis);

      const P0 = add(centerOfOrbit, mul(a1, u));
      const P1 = matVec(R, P0);

      const r0 = sub(P0, qFrame);
      const r1 = sub(P1, qFrame);

      const tangent = cross(eAxis, r1);
      const tangentDir = normalize(tangent);
      const tangentEnd = add(P1, mul(0.42, tangentDir));

      const x1 = normalize(matVec(R, u));
      const y1 = eAxis;
      const z1 = normalize(cross(x1, y1));

      drawFrame(
        O,
        {
          x: p3(1, 0, 0),
          y: p3(0, 1, 0),
          z: p3(0, 0, 1)
        },
        0.25,
        "S",
        { showLetters: false, dx: -34, dy: 34, width: 30 }
      );

      line3(mul(-0.55, eAxis), mul(2.15, eAxis), {
        stroke: "#111827",
        "stroke-width": 5,
        "stroke-linecap": "round"
      });

      arrow3(mul(1.55, eAxis), mul(2.15, eAxis), {
        stroke: "#111827",
        "stroke-width": 5
      });

      label3(add(mul(2.15, eAxis), p3(0.05, 0.04, 0.08)), "e", {
        fill: "#111827",
        dx: 18,
        dy: -16,
        width: 28,
        fontSize: 20,
        weight: "900"
      });

      const orbit = [];
      for (let i = 0; i <= 180; i++) {
        const t = (2 * Math.PI * i) / 180;
        orbit.push(
          add(
            centerOfOrbit,
            add(mul(a1 * Math.cos(t), u), mul(a1 * Math.sin(t), v))
          )
        );
      }

      pathFromPoints(orbit, {
        stroke: "#94a3b8",
        "stroke-width": 1.8,
        "stroke-dasharray": "5 4"
      });

      line3(O, centerOfOrbit, {
        stroke: "#374151",
        "stroke-width": 4,
        "stroke-linecap": "round"
      });

      line3(centerOfOrbit, P1, {
        stroke: "#111827",
        "stroke-width": 6,
        "stroke-linecap": "round"
      });

      dot3(O, 6, { fill: "#111827" });
      dot3(centerOfOrbit, 5, { fill: "#374151" });
      dot3(P0, 5, { fill: "#6b7280" });
      dot3(P1, 7, { fill: "#111827" });
      dot3(qFrame, 5, { fill: "#f59e0b" });

      drawFrame(
        qFrame,
        {
          x: u,
          y: v,
          z: eAxis
        },
        0.24,
        "F_e(s)",
        {
          showLetters: false,
          dx: 18,
          dy: 36,
          width: 82,
          fill: "#92400e"
        }
      );

      arrow3(qFrame, P0, {
        stroke: "#6b7280",
        "stroke-width": 3,
        "stroke-dasharray": "6 5"
      });

      arrow3(qFrame, P1, {
        stroke: "#2563eb",
        "stroke-width": 4
      });

      arrow3(P1, tangentEnd, {
        stroke: "#7c3aed",
        "stroke-width": 4
      });

      const r0LabelPoint = add(qFrame, mul(0.56, sub(P0, qFrame)));
      const r1LabelPoint = add(qFrame, mul(0.62, sub(P1, qFrame)));

      label3(r0LabelPoint, "r(0)", {
        fill: "#6b7280",
        dx: -72,
        dy: -22,
        width: 52
      });

      label3(r1LabelPoint, "r(1)", {
        fill: "#2563eb",
        dx: 24,
        dy: -24,
        width: 52
      });

      drawFrame(
        P1,
        {
          x: x1,
          y: y1,
          z: z1
        },
        0.23,
        "",
        { showLetters: false }
      );

      const arc = [];
      const start = Math.min(0, phi);
      const end = Math.max(0, phi);

      for (let i = 0; i <= 48; i++) {
        const t = start + ((end - start) * i) / 48;
        arc.push(
          add(
            centerOfOrbit,
            add(mul(0.34 * Math.cos(t), u), mul(0.34 * Math.sin(t), v))
          )
        );
      }

      pathFromPoints(arc, {
        stroke: "#ef4444",
        "stroke-width": 3
      });

      if (Math.abs(phi) > 0.03) {
        const mid = phi / 2;
        const phiPoint = add(
          centerOfOrbit,
          add(mul(0.43 * Math.cos(mid), u), mul(0.43 * Math.sin(mid), v))
        );

        label3(phiPoint, "phi", {
          fill: "#ef4444",
          dx: 28,
          dy: 18,
          width: 42
        });
      }

      readout.textContent =
        "r(0) = [" + fmt(r0.x) + ", " + fmt(r0.y) + ", " + fmt(r0.z) + "]^T\n" +
        "r(1) = [" + fmt(r1.x) + ", " + fmt(r1.y) + ", " + fmt(r1.z) + "]^T\n\n" +
        "phi = " + fmt(phi) + " rad  (" + phiDeg + " deg)\n\n" +
        "frame F_e(s):\n" +
        "  origin q = s e = [" + fmt(qFrame.x) + ", " + fmt(qFrame.y) + ", " + fmt(qFrame.z) + "]^T\n" +
        "  axis   e = [" + fmt(eAxis.x) + ", " + fmt(eAxis.y) + ", " + fmt(eAxis.z) + "]^T\n\n" +
        "R(phi, e) = exp(phi e~) =\n" +
        formatMatrix(R);
    }

    phiSlider.addEventListener("input", render);
    frameSlider.addEventListener("input", render);
    tiltSlider.addEventListener("input", render);

    svg.addEventListener("pointerdown", function (event) {
      dragging = true;
      lastPointer = { x: event.clientX, y: event.clientY };
      svg.setPointerCapture(event.pointerId);
    });

    svg.addEventListener("pointermove", function (event) {
      if (!dragging || !lastPointer) return;

      const dx = event.clientX - lastPointer.x;
      const dy = event.clientY - lastPointer.y;

      azimuth += dx * 0.008;
      elevation += dy * 0.008;

      const limit = Math.PI / 2 - 0.08;
      elevation = Math.max(-limit, Math.min(limit, elevation));

      lastPointer = { x: event.clientX, y: event.clientY };
      render();
    });

    svg.addEventListener("pointerup", function (event) {
      dragging = false;
      lastPointer = null;
      try {
        svg.releasePointerCapture(event.pointerId);
      } catch (err) {
        /* Ignore release errors caused by browser differences. */
      }
    });

    svg.addEventListener("pointerleave", function () {
      dragging = false;
      lastPointer = null;
    });

    svg.addEventListener(
      "wheel",
      function (event) {
        event.preventDefault();

        const factor = event.deltaY < 0 ? 1.08 : 0.92;
        zoom *= factor;
        zoom = Math.max(0.55, Math.min(2.25, zoom));

        render();
      },
      { passive: false }
    );

    svg.addEventListener("dblclick", function () {
      azimuth = -0.68;
      elevation = 0.64;
      zoom = 1.0;
      render();
    });

    render();

    return {
      root: root,
      render: render
    };
  }

  function initRotationExponentialDemo() {
    const root = document.getElementById("rotation-exp-demo");
    if (root) mountRotationExponentialDemo(root);
  }

  window.RotationExponentialDemo = {
    init: initRotationExponentialDemo,
    mount: mountRotationExponentialDemo
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initRotationExponentialDemo);
  } else {
    initRotationExponentialDemo();
  }
})();