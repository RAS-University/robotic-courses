/* screw_point_motion_demo.js
   Interactive 3D screw-motion demo for transforming a point.

   Use in Markdown/Jekyll as:

   <div id="screw-point-motion-demo"></div>
   <script src="/screw_point_motion_demo.js"></script>
*/

(function () {
  "use strict";

  function mountScrewPointMotionDemo(root) {
    if (!root || root.dataset.screwPointMounted === "1") return;
    root.dataset.screwPointMounted = "1";

    const W = 1180;
    const H = 720;
    const center = { x: 590, y: 390 };

    const AXIS_COLOR = "#7c3aed";
    const TRACE_COLOR = "#f59e0b";
    const POINT_COLOR = "#111827";

    let azimuth = -0.68;
    let elevation = -0.46;
    let zoom = 0.95;

    let dragging = false;
    let lastPointer = null;
    let moving = false;

    let point = p3(1, 2, 1);
    let trace = [point];

    const thetaStep = (35 * Math.PI) / 180;
    const prismaticStep = 0.65;

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

    function typesetMath(node) {
      function tryTypeset() {
        if (window.MathJax && window.MathJax.typesetPromise) {
          window.MathJax.typesetPromise([node]).catch(function () {
            /* Ignore MathJax rendering errors. */
          });
        }
      }

      tryTypeset();
      setTimeout(tryTypeset, 250);
      setTimeout(tryTypeset, 1000);
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
      if (n < 1e-12) return p3(0, 0, 1);
      return mul(1 / n, a);
    }

    function dist(a, b) {
      return norm(sub(a, b));
    }

    function fmt(x) {
      if (Math.abs(x) < 1e-10) x = 0;
      return Number(x).toFixed(3);
    }

    function degToRad(x) {
      return (x * Math.PI) / 180;
    }

    function currentScale() {
      return 98 * zoom;
    }

    function project(P) {
      const ca = Math.cos(azimuth);
      const sa = Math.sin(azimuth);
      const ce = Math.cos(elevation);
      const se = Math.sin(elevation);

      const x1 = ca * P.x - sa * P.y;
      const y1 = sa * P.x + ca * P.y;
      const z1 = P.z;

      const y2 = ce * y1 - se * z1;
      const depth = se * y1 + ce * z1;

      const scale = currentScale();

      return {
        x: center.x + scale * x1,
        y: center.y - scale * y2,
        depth: depth
      };
    }

    function line2(x1, y1, x2, y2, attrs, parent) {
      const line = svgEl(
        "line",
        Object.assign(
          {
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2,
            "stroke-linecap": "round"
          },
          attrs || {}
        )
      );

      (parent || scene).appendChild(line);
      return line;
    }

    function line3(A, B, attrs, parent) {
      const a = project(A);
      const b = project(B);

      return line2(a.x, a.y, b.x, b.y, attrs, parent);
    }

    function arrow3(A, B, attrs, parent) {
      return line3(
        A,
        B,
        Object.assign(
          {
            "marker-end": "url(#screw-point-arrow)"
          },
          attrs || {}
        ),
        parent
      );
    }

    function dot3(P, r, attrs, parent) {
      const p = project(P);

      const c = svgEl(
        "circle",
        Object.assign(
          {
            cx: p.x,
            cy: p.y,
            r: r
          },
          attrs || {}
        )
      );

      (parent || scene).appendChild(c);
      return c;
    }

    function label3(P, text, options, parent) {
      const opts = options || {};
      const p = project(P);

      const x = p.x + (opts.dx || 0);
      const y = p.y + (opts.dy || 0);

      const fontSize = opts.fontSize || 24;
      const width = opts.width || Math.max(60, text.length * fontSize * 0.62 + 20);
      const height = opts.height || fontSize + 14;

      const group = svgEl("g", {
        opacity: String(opts.opacity == null ? 1 : opts.opacity)
      });

      group.appendChild(
        svgEl("rect", {
          x: x - 10,
          y: y - height + 6,
          width: width,
          height: height,
          rx: 10,
          ry: 10,
          fill: "rgba(255,255,255,0.92)",
          stroke: opts.stroke || "#cbd5e1",
          "stroke-width": 1.2
        })
      );

      group.appendChild(
        svgEl(
          "text",
          {
            x: x,
            y: y,
            "font-size": fontSize,
            "font-family": "Arial, Helvetica, sans-serif",
            "font-weight": opts.weight || "800",
            fill: opts.fill || "#111827"
          },
          text
        )
      );

      (parent || scene).appendChild(group);
      return group;
    }

    function pathFromPoints(points, attrs, parent) {
      if (!points.length) return null;

      const d = points
        .map(function (P, i) {
          const p = project(P);
          return (i === 0 ? "M" : "L") + p.x.toFixed(2) + " " + p.y.toFixed(2);
        })
        .join(" ");

      const path = svgEl(
        "path",
        Object.assign(
          {
            d: d,
            fill: "none",
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
          },
          attrs || {}
        )
      );

      (parent || scene).appendChild(path);
      return path;
    }

    function rodriguesAroundAxis(P, q, e, theta) {
      const r = sub(P, q);
      const rParallel = mul(dot(r, e), e);
      const rPerp = sub(r, rParallel);
      const er = cross(e, rPerp);

      const rotated = add(
        add(rParallel, mul(Math.cos(theta), rPerp)),
        mul(Math.sin(theta), er)
      );

      return add(q, rotated);
    }

    function screwTransformPoint(P, state, amount) {
      const q = state.q;
      const e = state.e;

      if (state.isPrismatic) {
        return add(P, mul(amount, e));
      }

      const theta = amount;
      const rotated = rodriguesAroundAxis(P, q, e, theta);
      const translation = mul(state.h * theta, e);

      return add(rotated, translation);
    }

    function pitchFromSlider(v) {
      if (v >= 100) return Infinity;
      if (v <= 0) return 0;

      return v / (100 - v);
    }

    function pitchLabel(h) {
      if (h === Infinity) return "∞  (prismatic)";
      if (Math.abs(h) < 1e-12) return "0  (revolute)";
      return fmt(h) + "  (finite screw)";
    }

    function getState() {
      const q = p3(
        Number(qxSlider.slider.value),
        Number(qySlider.slider.value),
        Number(qzSlider.slider.value)
      );

      const az = degToRad(Number(azSlider.slider.value));
      const elv = degToRad(Number(elSlider.slider.value));

      const e = normalize(
        p3(
          Math.cos(elv) * Math.cos(az),
          Math.cos(elv) * Math.sin(az),
          Math.sin(elv)
        )
      );

      const pitchSliderValue = Number(pitchSlider.slider.value);
      const h = pitchFromSlider(pitchSliderValue);

      return {
        q: q,
        e: e,
        h: h,
        isPrismatic: h === Infinity,
        pitchSliderValue: pitchSliderValue
      };
    }

    function drawArrowMarker() {
      const defs = svgEl("defs");

      defs.innerHTML =
        "<marker id='screw-point-arrow' markerWidth='10' markerHeight='10' refX='8' refY='3.5' orient='auto' markerUnits='strokeWidth'>" +
        "<path d='M0,0 L0,7 L10,3.5 z' fill='context-stroke'></path>" +
        "</marker>";

      scene.appendChild(defs);
    }

    function drawGrid() {
      const group = svgEl("g", { opacity: "0.9" });

      for (let i = -6; i <= 6; i++) {
        line3(
          p3(-3, i * 0.5, 0),
          p3(4.5, i * 0.5, 0),
          {
            stroke: "#e5e7eb",
            "stroke-width": 1
          },
          group
        );

        line3(
          p3(i * 0.5, -3, 0),
          p3(i * 0.5, 3.5, 0),
          {
            stroke: "#e5e7eb",
            "stroke-width": 1
          },
          group
        );
      }

      line3(p3(-3, 0, 0), p3(4.5, 0, 0), {
        stroke: "#cbd5e1",
        "stroke-width": 2
      }, group);

      line3(p3(0, -3, 0), p3(0, 3.5, 0), {
        stroke: "#cbd5e1",
        "stroke-width": 2
      }, group);

      scene.appendChild(group);
    }

    function drawWorldFrame() {
      const O = p3(0, 0, 0);

      arrow3(O, p3(0.55, 0, 0), {
        stroke: "#ef4444",
        "stroke-width": 3
      });

      arrow3(O, p3(0, 0.55, 0), {
        stroke: "#16a34a",
        "stroke-width": 3
      });

      arrow3(O, p3(0, 0, 0.65), {
        stroke: "#2563eb",
        "stroke-width": 3.5
      });

      label3(p3(0.62, 0, 0), "x", {
        dx: 6,
        dy: 8,
        width: 30,
        fontSize: 18,
        fill: "#ef4444"
      });

      label3(p3(0, 0.62, 0), "y", {
        dx: 6,
        dy: 8,
        width: 30,
        fontSize: 18,
        fill: "#16a34a"
      });

      label3(p3(0, 0, 0.72), "z", {
        dx: 6,
        dy: -8,
        width: 30,
        fontSize: 18,
        fill: "#2563eb"
      });
    }

    function drawScrew(state) {
      const q = state.q;
      const e = state.e;

      const A = add(q, mul(-4.0, e));
      const B = add(q, mul(4.0, e));

      const group = svgEl("g");

      line3(A, B, {
        stroke: AXIS_COLOR,
        "stroke-width": 6,
        "stroke-linecap": "round"
      }, group);

      line3(A, B, {
        stroke: "#ffffff",
        "stroke-width": 2,
        opacity: 0.45,
        "stroke-linecap": "round"
      }, group);

      arrow3(q, add(q, mul(0.85, e)), {
        stroke: AXIS_COLOR,
        "stroke-width": 5
      }, group);

      dot3(q, 9, {
        fill: "#ffffff",
        stroke: AXIS_COLOR,
        "stroke-width": 4
      }, group);

      label3(add(q, mul(1.0, e)), "e", {
        dx: 10,
        dy: -8,
        width: 34,
        fontSize: 22,
        fill: AXIS_COLOR
      }, group);

      label3(add(q, mul(-1.25, e)), "screw axis", {
        dx: 12,
        dy: 34,
        width: 138,
        fontSize: 22,
        fill: AXIS_COLOR
      }, group);

      scene.appendChild(group);
    }

    function drawPointAndTrace() {
      pathFromPoints(trace, {
        stroke: TRACE_COLOR,
        "stroke-width": 7,
        opacity: 0.32
      });

      dot3(point, 16, {
        fill: POINT_COLOR,
        stroke: "#ffffff",
        "stroke-width": 4
      });

      label3(point, "p", {
        dx: 20,
        dy: -18,
        width: 42,
        fontSize: 28,
        fill: POINT_COLOR
      });
    }

    function updateSliderDisplays() {
      qxSlider.value.textContent = qxSlider.slider.value;
      qySlider.value.textContent = qySlider.slider.value;
      qzSlider.value.textContent = qzSlider.slider.value;

      azSlider.value.textContent = azSlider.slider.value + "°";
      elSlider.value.textContent = elSlider.slider.value + "°";

      const h = pitchFromSlider(Number(pitchSlider.slider.value));
      pitchSlider.value.textContent = pitchLabel(h);
    }

    function updateReadout(state) {
      readout.textContent =
        "Screw axis\n" +
        "q = [" + fmt(state.q.x) + ", " + fmt(state.q.y) + ", " + fmt(state.q.z) + "]^T\n" +
        "e = [" + fmt(state.e.x) + ", " + fmt(state.e.y) + ", " + fmt(state.e.z) + "]^T\n" +
        "h = " + pitchLabel(state.h) + "\n\n" +
        "Current point\n" +
        "p = [" + fmt(point.x) + ", " + fmt(point.y) + ", " + fmt(point.z) + "]^T\n\n" +
        "Motion applied by the Move point button\n" +
        (state.isPrismatic
          ? "p' = p + Δd e,    Δd = " + fmt(prismaticStep)
          : "p' = R(e, Δθ)(p - q) + q + h Δθ e,    Δθ = 35°") +
        "\n\n" +
        "Trace points = " + trace.length;
    }

    function render() {
      const state = getState();
      updateSliderDisplays();

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
      drawWorldFrame();
      drawScrew(state);
      drawPointAndTrace();

      updateReadout(state);
    }

    function addTracePoint(P) {
      const last = trace[trace.length - 1];

      if (!last || dist(last, P) > 0.005) {
        trace.push(P);
        if (trace.length > 2500) trace = trace.slice(trace.length - 2500);
      }
    }

    function movePoint() {
      if (moving) return;

      const state = getState();
      const start = point;
      const amount = state.isPrismatic ? prismaticStep : thetaStep;

      moving = true;
      moveButton.disabled = true;

      const t0 = performance.now();
      const duration = 100;

      function step(now) {
        const raw = Math.min(1, (now - t0) / duration);
        const t = raw < 0.5 ? 2 * raw * raw : 1 - Math.pow(-2 * raw + 2, 2) / 2;

        point = screwTransformPoint(start, state, amount * t);
        addTracePoint(point);
        render();

        if (raw < 1) {
          requestAnimationFrame(step);
        } else {
          point = screwTransformPoint(start, state, amount);
          addTracePoint(point);
          moving = false;
          moveButton.disabled = false;
          render();
        }
      }

      requestAnimationFrame(step);
    }

    function resetPoint() {
      point = p3(1, 2, 1);
      trace = [point];
      render();
    }

    function clearTrace() {
      trace = [point];
      render();
    }

    function resetScrew() {
      qxSlider.slider.value = "0";
      qySlider.slider.value = "0";
      qzSlider.slider.value = "0";

      azSlider.slider.value = "35";
      elSlider.slider.value = "25";

      pitchSlider.slider.value = "0";

      render();
    }

    function resetView() {
      azimuth = -0.68;
      elevation = -0.46;
      zoom = 0.95;
      render();
    }

    const styleId = "screw-point-motion-style";
    if (!document.getElementById(styleId)) {
      const style = el("style", { id: styleId });
      style.textContent = `
.screw-point-widget {
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 18px;
  background: #ffffff;
  padding: 1rem;
  margin: 1.25rem 0;
  box-shadow: 0 10px 32px rgba(15, 23, 42, 0.10);
}

.screw-point-widget * {
  box-sizing: border-box;
}

.screw-point-widget .sp-title {
  margin: 0 0 0.35rem 0;
  font-size: 1.15rem;
  font-weight: 800;
  color: #111827;
}

.screw-point-widget .sp-subtitle {
  margin: 0 0 0.85rem 0;
  color: #4b5563;
  font-size: 0.97rem;
  line-height: 1.45;
}

.screw-point-widget .sp-howto {
  border-left: 4px solid #7c3aed;
  background: #f5f3ff;
  color: #1f2937;
  border-radius: 12px;
  padding: 0.75rem 0.9rem;
  margin: 0.85rem 0 1rem 0;
  font-size: 0.94rem;
  line-height: 1.5;
}

.screw-point-widget .sp-canvas-wrap {
  position: relative;
  width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  background: linear-gradient(180deg, #fbfdff 0%, #f8fafc 100%);
  overflow: hidden;
}

.screw-point-widget svg {
  width: 100%;
  height: auto;
  display: block;
  touch-action: none;
  cursor: grab;
}

.screw-point-widget svg:active {
  cursor: grabbing;
}

.screw-point-widget .sp-equation-overlay {
  position: absolute;
  top: 14px;
  right: 18px;
  max-width: 335px;
  padding: 0.45rem 0.65rem;
  background: rgba(255, 255, 255, 0.90);
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  box-shadow: 0 5px 14px rgba(15, 23, 42, 0.08);
  color: #111827;
  font-size: 0.72rem;
  line-height: 1.15;
  pointer-events: none;
  z-index: 5;
}

.screw-point-widget .sp-equation-overlay mjx-container {
  font-size: 72% !important;
  margin: 0 !important;
}

.screw-point-widget .sp-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem 0.9rem;
  margin-top: 0.75rem;
  font-size: 0.9rem;
  color: #374151;
}

.screw-point-widget .sp-legend span {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}

.screw-point-widget .sp-swatch {
  width: 0.95rem;
  height: 0.27rem;
  display: inline-block;
  border-radius: 999px;
}

.screw-point-widget .sp-controls {
  display: grid;
  grid-template-columns: repeat(3, minmax(210px, 1fr));
  gap: 0.9rem;
  margin-top: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 0.9rem;
  background: #ffffff;
}

.screw-point-widget .sp-control {
  min-width: 0;
}

.screw-point-widget label {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.35rem;
}

.screw-point-widget input[type="range"] {
  width: 100%;
  accent-color: #7c3aed;
}

.screw-point-widget .sp-pitch-marks {
  display: flex;
  justify-content: space-between;
  font-size: 0.78rem;
  color: #6b7280;
  margin-top: 0.1rem;
}

.screw-point-widget .sp-buttons {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-top: 0.8rem;
}

.screw-point-widget button {
  border: 0;
  border-radius: 10px;
  padding: 0.6rem 0.85rem;
  background: #111827;
  color: #ffffff;
  cursor: pointer;
  font-weight: 700;
}

.screw-point-widget button.primary {
  background: #7c3aed;
}

.screw-point-widget button.secondary {
  background: #f3f4f6;
  color: #111827;
  border: 1px solid #d1d5db;
}

.screw-point-widget button:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.screw-point-widget .sp-readout {
  font-family: "JetBrains Mono", "Courier New", monospace;
  white-space: pre-wrap;
  line-height: 1.48;
  font-size: 0.9rem;
  color: #111827;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 0.9rem;
  margin-top: 1rem;
}

@media (max-width: 900px) {
  .screw-point-widget .sp-controls {
    grid-template-columns: 1fr;
  }

  .screw-point-widget .sp-equation-overlay {
    top: 8px;
    right: 8px;
    max-width: 270px;
    font-size: 0.65rem;
  }

  .screw-point-widget .sp-equation-overlay mjx-container {
    font-size: 65% !important;
  }
}
`;
      document.head.appendChild(style);
    }

    root.className = "screw-point-widget";

    root.appendChild(
      el("h4", { class: "sp-title" }, "Interactive screw motion of a point")
    );

    root.appendChild(
      el(
        "p",
        { class: "sp-subtitle" },
        "The purple line is the screw axis with direction e and pitch h. The black point starts at p = [1, 2, 1]^T. Press Move point to apply the current screw motion and generate the orange trace."
      )
    );

    const howto = el("div", { class: "sp-howto" });
    howto.innerHTML =
      "<strong>How to use:</strong> drag inside the 3D view to rotate the camera, scroll to zoom, and double-click to reset the view. " +
      "Move the screw axis using the sliders, choose the direction \\(\\mathbf e\\), and adjust the pitch \\(h\\). " +
      "At \\(h=0\\), the motion is revolute. At \\(h=\\infty\\), the motion is prismatic.";
    root.appendChild(howto);
    typesetMath(howto);

    const canvasWrap = el("div", { class: "sp-canvas-wrap" });
    root.appendChild(canvasWrap);

    const svg = svgEl("svg", {
      viewBox: "0 0 1180 720",
      role: "img",
      "aria-label": "Interactive screw motion of a point"
    });
    canvasWrap.appendChild(svg);

    const equationOverlay = el("div", { class: "sp-equation-overlay" });
    equationOverlay.innerHTML =
      "\\[" +
      "\\mathbf p' = \\exp(\\hat{Y}\\,\\Delta q)\\,\\mathbf p" +
      "\\]";
    canvasWrap.appendChild(equationOverlay);
    typesetMath(equationOverlay);

    const scene = svgEl("g");
    svg.appendChild(scene);

    const legend = el("div", { class: "sp-legend" });
    legend.innerHTML =
      "<span><span class='sp-swatch' style='background:#7c3aed'></span>screw axis</span>" +
      "<span><span class='sp-swatch' style='background:#111827'></span>moving point</span>" +
      "<span><span class='sp-swatch' style='background:#f59e0b; opacity:0.32'></span>point trace</span>" +
      "<span><span class='sp-swatch' style='background:#ef4444'></span>x</span>" +
      "<span><span class='sp-swatch' style='background:#16a34a'></span>y</span>" +
      "<span><span class='sp-swatch' style='background:#2563eb'></span>z up</span>";
    root.appendChild(legend);

    const controls = el("div", { class: "sp-controls" });
    root.appendChild(controls);

    function addSlider(id, labelText, min, max, value, step) {
      const control = el("div", { class: "sp-control" });

      const label = el("label", { for: id });
      const valueNode = el("span", null, String(value));

      label.appendChild(el("span", null, labelText));
      label.appendChild(valueNode);
      control.appendChild(label);

      const slider = el("input", {
        id: id,
        type: "range",
        min: String(min),
        max: String(max),
        value: String(value),
        step: String(step)
      });

      control.appendChild(slider);
      controls.appendChild(control);

      return {
        control: control,
        slider: slider,
        value: valueNode
      };
    }

    const qxSlider = addSlider("sp-qx", "axis point qx", -2, 2, 0, 0.05);
    const qySlider = addSlider("sp-qy", "axis point qy", -2, 2, 0, 0.05);
    const qzSlider = addSlider("sp-qz", "axis point qz", -1, 3, 0, 0.05);

    const azSlider = addSlider("sp-az", "direction azimuth", -180, 180, 35, 1);
    const elSlider = addSlider("sp-el", "direction elevation", -80, 80, 25, 1);

    const pitchSlider = addSlider("sp-pitch", "pitch h", 0, 100, 0, 1);
    const pitchMarks = el("div", { class: "sp-pitch-marks" });
    pitchMarks.innerHTML =
      "<span>0: revolute</span><span>finite screw</span><span>∞: prismatic</span>";
    pitchSlider.control.appendChild(pitchMarks);

    const buttons = el("div", { class: "sp-buttons" });
    const moveButton = el("button", { class: "primary", type: "button" }, "Move point");
    const resetPointButton = el("button", { class: "secondary", type: "button" }, "Reset point");
    const clearTraceButton = el("button", { class: "secondary", type: "button" }, "Clear trace");
    const resetScrewButton = el("button", { class: "secondary", type: "button" }, "Reset screw");
    const resetViewButton = el("button", { class: "secondary", type: "button" }, "Reset view");

    buttons.appendChild(moveButton);
    buttons.appendChild(resetPointButton);
    buttons.appendChild(clearTraceButton);
    buttons.appendChild(resetScrewButton);
    buttons.appendChild(resetViewButton);
    root.appendChild(buttons);

    const readout = el("div", { class: "sp-readout" });
    root.appendChild(readout);

    [
      qxSlider.slider,
      qySlider.slider,
      qzSlider.slider,
      azSlider.slider,
      elSlider.slider,
      pitchSlider.slider
    ].forEach(function (slider) {
      slider.addEventListener("input", render);
    });

    moveButton.addEventListener("click", movePoint);
    resetPointButton.addEventListener("click", resetPoint);
    clearTraceButton.addEventListener("click", clearTrace);
    resetScrewButton.addEventListener("click", resetScrew);
    resetViewButton.addEventListener("click", resetView);

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
        /* Browser compatibility. */
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
        zoom = Math.max(0.42, Math.min(2.7, zoom));

        render();
      },
      { passive: false }
    );

    svg.addEventListener("dblclick", resetView);

    render();

    return {
      root: root,
      render: render,
      resetPoint: resetPoint,
      clearTrace: clearTrace,
      resetScrew: resetScrew,
      resetView: resetView
    };
  }

  function initScrewPointMotionDemo() {
    const root = document.getElementById("screw-point-motion-demo");
    if (root) mountScrewPointMotionDemo(root);
  }

  window.ScrewPointMotionDemo = {
    init: initScrewPointMotionDemo,
    mount: mountScrewPointMotionDemo
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initScrewPointMotionDemo);
  } else {
    initScrewPointMotionDemo();
  }
})();
