/* serial_3r_robot.js
   Aesthetic interactive SVG demo for a 3R serial robot using standard D-H parameters.

   D-H parameters:
     a     = [1, 2, 1.5]
     d     = [0, 1, 0]
     alpha = [pi/2, pi/2, 0]

   Use in Markdown/Jekyll as:

   <div id="serial-3r-demo"></div>
   <script src="/serial_3r_robot.js"></script>
*/

(function () {
  "use strict";

  function mountSerial3RDemo(root) {
    if (!root || root.dataset.serial3rMounted === "1") return;
    root.dataset.serial3rMounted = "1";

    const DH = {
      a: [1.0, 2.0, 1.5],
      d: [0.0, 1.0, 0.0],
      alpha: [Math.PI / 2, Math.PI / 2, 0.0]
    };

    const LINK_COLORS = ["#0f766e", "#d97706", "#6d28d9"];
    const LINK_RADII = [0.11, 0.135, 0.105];

    const JOINT_COLORS = ["#2563eb", "#2563eb", "#2563eb"];
    const JOINT_RADII = [0.19, 0.17, 0.15];
    const JOINT_LENGTHS = [0.55, 0.48, 0.42];

    const SCREW_COLOR = "#7c3aed";
    const TRACE_COLOR = "#f59e0b";

    const LABEL_FONT = 38;
    const SMALL_LABEL_FONT = 32;

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

    function fmt(x) {
      if (Math.abs(x) < 1e-10) x = 0;
      return Number(x).toFixed(3);
    }

    function degToRad(x) {
      return (x * Math.PI) / 180;
    }

    function wrapToPi(x) {
      return x - 2 * Math.PI * Math.floor((x + Math.PI) / (2 * Math.PI));
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

    function dist(a, b) {
      return norm(sub(a, b));
    }

    function identity4() {
      return [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
      ];
    }

    function matMul4(A, B) {
      const C = identity4();

      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          C[i][j] = 0;
          for (let k = 0; k < 4; k++) {
            C[i][j] += A[i][k] * B[k][j];
          }
        }
      }

      return C;
    }

    function dhMatrix(a, alpha, d, theta) {
      const c = Math.cos(theta);
      const s = Math.sin(theta);
      const ca = Math.cos(alpha);
      const sa = Math.sin(alpha);

      // Standard D-H: Rz(theta) Tz(d) Tx(a) Rx(alpha)
      return [
        [c, -s * ca, s * sa, a * c],
        [s, c * ca, -c * sa, a * s],
        [0, sa, ca, d],
        [0, 0, 0, 1]
      ];
    }

    function transformPoint(T, P) {
      return p3(
        T[0][0] * P.x + T[0][1] * P.y + T[0][2] * P.z + T[0][3],
        T[1][0] * P.x + T[1][1] * P.y + T[1][2] * P.z + T[1][3],
        T[2][0] * P.x + T[2][1] * P.y + T[2][2] * P.z + T[2][3]
      );
    }

    function axesFromTransform(T) {
      return {
        x: normalize(p3(T[0][0], T[1][0], T[2][0])),
        y: normalize(p3(T[0][1], T[1][1], T[2][1])),
        z: normalize(p3(T[0][2], T[1][2], T[2][2]))
      };
    }

    function fk(theta) {
      let T = identity4();

      const frames = [
        {
          T: T,
          origin: p3(0, 0, 0),
          axes: axesFromTransform(T)
        }
      ];

      for (let i = 0; i < 3; i++) {
        const A = dhMatrix(DH.a[i], DH.alpha[i], DH.d[i], theta[i]);
        T = matMul4(T, A);

        frames.push({
          T: T,
          origin: transformPoint(T, p3(0, 0, 0)),
          axes: axesFromTransform(T)
        });
      }

      return frames;
    }

    function jointAxesFromFrames(frames) {
      // For standard D-H, theta_i rotates about z_{i-1}.
      return [
        { origin: frames[0].origin, axis: frames[0].axes.z },
        { origin: frames[1].origin, axis: frames[1].axes.z },
        { origin: frames[2].origin, axis: frames[2].axes.z }
      ];
    }

    const style = el("style");
    style.textContent = `
.serial-3r-widget {
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 18px;
  background: #ffffff;
  padding: 1rem;
  margin: 1.25rem 0;
  box-shadow: 0 10px 32px rgba(15, 23, 42, 0.10);
}

.serial-3r-widget * {
  box-sizing: border-box;
}

.serial-3r-widget .s3r-title {
  margin: 0 0 0.35rem 0;
  font-size: 1.15rem;
  font-weight: 800;
  color: #111827;
}

.serial-3r-widget .s3r-subtitle {
  margin: 0 0 0.85rem 0;
  color: #4b5563;
  font-size: 0.97rem;
  line-height: 1.45;
}

.serial-3r-widget .s3r-howto {
  border-left: 4px solid #2563eb;
  background: #eff6ff;
  color: #1f2937;
  border-radius: 12px;
  padding: 0.75rem 0.9rem;
  margin: 0.85rem 0 1rem 0;
  font-size: 0.94rem;
  line-height: 1.5;
}

.serial-3r-widget .s3r-canvas-wrap {
  position: relative;
  width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  background: linear-gradient(180deg, #fbfdff 0%, #f8fafc 100%);
  overflow: hidden;
}

.serial-3r-widget .s3r-equation-overlay {
  position: absolute;
  top: 14px;
  right: 18px;
  max-width: 330px;
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

.serial-3r-widget .s3r-equation-overlay mjx-container {
  font-size: 72% !important;
  margin: 0 !important;
}

.serial-3r-widget svg {
  width: 100%;
  height: auto;
  display: block;
  touch-action: none;
  cursor: grab;
}

.serial-3r-widget svg:active {
  cursor: grabbing;
}

.serial-3r-widget .s3r-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem 0.9rem;
  margin-top: 0.75rem;
  font-size: 0.9rem;
  color: #374151;
}

.serial-3r-widget .s3r-legend span {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}

.serial-3r-widget .s3r-swatch {
  width: 0.95rem;
  height: 0.27rem;
  display: inline-block;
  border-radius: 999px;
}

.serial-3r-widget .s3r-controls {
  display: grid;
  grid-template-columns: repeat(3, minmax(220px, 1fr));
  gap: 0.9rem;
  margin-top: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 0.9rem;
  background: #ffffff;
}

.serial-3r-widget .s3r-control {
  min-width: 0;
}

.serial-3r-widget label {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.35rem;
}

.serial-3r-widget input[type="range"] {
  width: 100%;
  accent-color: #111827;
}

.serial-3r-widget .s3r-buttons {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-top: 0.8rem;
}

.serial-3r-widget button {
  border: 0;
  border-radius: 10px;
  padding: 0.6rem 0.85rem;
  background: #111827;
  color: #ffffff;
  cursor: pointer;
  font-weight: 700;
}

.serial-3r-widget button.secondary {
  background: #f3f4f6;
  color: #111827;
  border: 1px solid #d1d5db;
}

.serial-3r-widget .s3r-readout {
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
  .serial-3r-widget .s3r-controls {
    grid-template-columns: 1fr;
  }

  .serial-3r-widget .s3r-equation-overlay {
    top: 8px;
    right: 8px;
    left: auto;
    max-width: 260px;
    font-size: 0.65rem;
  }

  .serial-3r-widget .s3r-equation-overlay mjx-container {
    font-size: 65% !important;
  }
}
`;
    document.head.appendChild(style);

    root.className = "serial-3r-widget";

    root.appendChild(
      el("h4", { class: "s3r-title" }, "Interactive 3R serial robot schematic")
    );

    root.appendChild(
      el(
        "p",
        { class: "s3r-subtitle" },
        "Standard D-H model with a = [1, 2, 1.5], d = [0, 1, 0], and alpha = [pi/2, pi/2, 0]. The translucent robot is the home configuration, while the opaque robot is the current configuration. The purple lines are the revolute screws Y_1, Y_2, and Y_3."
      )
    );

    const howto = el("div", { class: "s3r-howto" });
    howto.innerHTML =
      "<strong>How to use:</strong> drag inside the 3D view to rotate the camera, scroll to zoom, and double-click to reset the view. " +
      "Move the three sliders to change \\(\\theta_1\\), \\(\\theta_2\\), and \\(\\theta_3\\). " +
      "The orange curve traces the end-effector path with opacity 0.25.";
    root.appendChild(howto);

    const canvasWrap = el("div", { class: "s3r-canvas-wrap" });
    root.appendChild(canvasWrap);

    const svg = svgEl("svg", {
      viewBox: "0 0 1180 720",
      role: "img",
      "aria-label": "Interactive 3R serial robot schematic"
    });
    canvasWrap.appendChild(svg);

    const equationOverlay = el("div", { class: "s3r-equation-overlay" });
    equationOverlay.innerHTML =
      "\\[" +
      "\\mathbf H_i(\\mathbf q)" +
      "=" +
      "\\exp(Y_1 q_1)\\exp(Y_2 q_2)\\cdots\\exp(Y_i q_i)H_i(0)" +
      "\\]";
    canvasWrap.appendChild(equationOverlay);
    typesetMath(equationOverlay);

    const scene = svgEl("g");
    svg.appendChild(scene);

    const legend = el("div", { class: "s3r-legend" });
    legend.innerHTML =
      "<span><span class='s3r-swatch' style='background:#9ca3af'></span>home pose, opacity 0.25</span>" +
      "<span><span class='s3r-swatch' style='background:#0f766e'></span>link 1</span>" +
      "<span><span class='s3r-swatch' style='background:#d97706'></span>link 2</span>" +
      "<span><span class='s3r-swatch' style='background:#6d28d9'></span>link 3</span>" +
      "<span><span class='s3r-swatch' style='background:#2563eb'></span>blue joints</span>" +
      "<span><span class='s3r-swatch' style='background:#7c3aed'></span>screws Y_1 to Y_3</span>" +
      "<span><span class='s3r-swatch' style='background:#f59e0b; opacity:0.25'></span>end-effector trace</span>" +
      "<span><span class='s3r-swatch' style='background:#ef4444'></span>x</span>" +
      "<span><span class='s3r-swatch' style='background:#16a34a'></span>y</span>" +
      "<span><span class='s3r-swatch' style='background:#2563eb'></span>z up</span>";
    root.appendChild(legend);

    const controls = el("div", { class: "s3r-controls" });
    root.appendChild(controls);

    function addSlider(id, labelText, initial) {
      const control = el("div", { class: "s3r-control" });
      const label = el("label", { for: id });
      const value = el("span", null, initial + "°");

      label.appendChild(el("span", null, labelText));
      label.appendChild(value);
      control.appendChild(label);

      const slider = el("input", {
        id: id,
        type: "range",
        min: "-180",
        max: "180",
        step: "1",
        value: String(initial)
      });

      control.appendChild(slider);
      controls.appendChild(control);

      return { slider: slider, value: value };
    }

    const s1 = addSlider("serial-3r-theta1", "theta1", 0);
    const s2 = addSlider("serial-3r-theta2", "theta2", 0);
    const s3 = addSlider("serial-3r-theta3", "theta3", 0);

    const buttons = el("div", { class: "s3r-buttons" });
    const resetThetaButton = el("button", { class: "secondary", type: "button" }, "Reset joints");
    const clearTraceButton = el("button", { class: "secondary", type: "button" }, "Clear trace");
    const resetViewButton = el("button", { class: "secondary", type: "button" }, "Reset view");

    buttons.appendChild(resetThetaButton);
    buttons.appendChild(clearTraceButton);
    buttons.appendChild(resetViewButton);
    root.appendChild(buttons);

    const readout = el("div", { class: "s3r-readout" });
    root.appendChild(readout);

    const W = 1180;
    const H = 720;
    const center = { x: 590, y: 435 };

    let azimuth = -0.72;
    let elevation = -0.52;
    let zoom = 0.88;

    let dragging = false;
    let lastPointer = null;

    const homeFrames = fk([0, 0, 0]);
    let trace = [homeFrames[3].origin];
    let lastThetaRad = [0, 0, 0];

    function currentScale() {
      return 108 * zoom;
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
            "marker-end": "url(#serial-3r-arrow)"
          },
          attrs || {}
        ),
        parent
      );
    }

    function ellipseCapAtPoint(P, angleDeg, rx, ry, attrs, parent) {
      const p = project(P);
      const ellipse = svgEl(
        "ellipse",
        Object.assign(
          {
            cx: p.x,
            cy: p.y,
            rx: rx,
            ry: ry,
            transform: "rotate(" + angleDeg + " " + p.x + " " + p.y + ")"
          },
          attrs || {}
        )
      );

      (parent || scene).appendChild(ellipse);
      return ellipse;
    }

    function cylinder3(A, B, options, parent) {
      const opts = options || {};
      const color = opts.color || "#111827";
      const opacity = opts.opacity == null ? 1 : opts.opacity;
      const radius = opts.radius == null ? 0.08 : opts.radius;
      const highlight = opts.highlight == null ? true : opts.highlight;
      const caps = opts.caps == null ? true : opts.caps;

      const a = project(A);
      const b = project(B);

      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const len = Math.sqrt(dx * dx + dy * dy);

      if (len < 1e-6) return null;

      const ux = dx / len;
      const uy = dy / len;
      const nx = -uy;
      const ny = ux;

      const width = Math.max(5, 2 * radius * currentScale());
      const angleDeg = Math.atan2(dy, dx) * 180 / Math.PI;

      const group = svgEl("g", { opacity: String(opacity) });

      line2(a.x + 3, a.y + 5, b.x + 3, b.y + 5, {
        stroke: "#000000",
        "stroke-width": width + 4,
        opacity: 0.12,
        "stroke-linecap": "round"
      }, group);

      line2(a.x, a.y, b.x, b.y, {
        stroke: color,
        "stroke-width": width,
        "stroke-linecap": "round"
      }, group);

      line2(
        a.x - nx * width * 0.22,
        a.y - ny * width * 0.22,
        b.x - nx * width * 0.22,
        b.y - ny * width * 0.22,
        {
          stroke: "#111827",
          "stroke-width": Math.max(1.5, width * 0.10),
          opacity: 0.25,
          "stroke-linecap": "round"
        },
        group
      );

      if (highlight) {
        line2(
          a.x + nx * width * 0.22,
          a.y + ny * width * 0.22,
          b.x + nx * width * 0.22,
          b.y + ny * width * 0.22,
          {
            stroke: "#ffffff",
            "stroke-width": Math.max(2, width * 0.16),
            opacity: 0.35,
            "stroke-linecap": "round"
          },
          group
        );
      }

      if (caps) {
        ellipseCapAtPoint(A, angleDeg, width * 0.36, width * 0.22, {
          fill: color,
          stroke: "#ffffff",
          "stroke-width": Math.max(1, width * 0.05),
          opacity: 0.95
        }, group);

        ellipseCapAtPoint(B, angleDeg, width * 0.36, width * 0.22, {
          fill: color,
          stroke: "#ffffff",
          "stroke-width": Math.max(1, width * 0.05),
          opacity: 0.95
        }, group);
      }

      (parent || scene).appendChild(group);
      return group;
    }

    function dot3(P, r, attrs, parent) {
      const p = project(P);

      const circle = svgEl(
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

      (parent || scene).appendChild(circle);
      return circle;
    }

    function label3(P, text, options, parent) {
      const opts = options || {};
      const p = project(P);

      const dx = opts.dx || 0;
      const dy = opts.dy || 0;

      const x = p.x + dx;
      const y = p.y + dy;

      const fontSize = opts.fontSize || LABEL_FONT;
      const width = opts.width || Math.max(80, text.length * fontSize * 0.62 + 26);
      const height = opts.height || fontSize + 18;

      const group = svgEl("g", { opacity: String(opts.opacity == null ? 1 : opts.opacity) });

      group.appendChild(
        svgEl("rect", {
          x: x - 12,
          y: y - height + 7,
          width: width,
          height: height,
          rx: 12,
          ry: 12,
          fill: "rgba(255,255,255,0.94)",
          stroke: opts.stroke || "#cbd5e1",
          "stroke-width": 1.5
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
            "font-weight": opts.weight || "850",
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

    function drawArrowMarker() {
      const defs = svgEl("defs");

      defs.innerHTML =
        "<marker id='serial-3r-arrow' markerWidth='14' markerHeight='14' refX='11' refY='4.5' orient='auto' markerUnits='strokeWidth'>" +
        "<path d='M0,0 L0,9 L13,4.5 z' fill='context-stroke'></path>" +
        "</marker>";

      scene.appendChild(defs);
    }

    function drawGrid() {
      const group = svgEl("g", { opacity: "0.9" });

      for (let i = -7; i <= 8; i++) {
        line3(
          p3(-3.0, i * 0.5, 0),
          p3(6.0, i * 0.5, 0),
          {
            stroke: "#e5e7eb",
            "stroke-width": 1
          },
          group
        );

        line3(
          p3(i * 0.5, -3.0, 0),
          p3(i * 0.5, 3.0, 0),
          {
            stroke: "#e5e7eb",
            "stroke-width": 1
          },
          group
        );
      }

      line3(p3(-3.0, 0, 0), p3(6.0, 0, 0), {
        stroke: "#cbd5e1",
        "stroke-width": 2
      }, group);

      line3(p3(0, -3.0, 0), p3(0, 3.0, 0), {
        stroke: "#cbd5e1",
        "stroke-width": 2
      }, group);

      scene.appendChild(group);
    }

    function drawFrame(origin, axes, length, label, opacity, large) {
      const group = svgEl("g", { opacity: String(opacity == null ? 1 : opacity) });
      const width = large ? 6 : 4;

      arrow3(origin, add(origin, mul(length, axes.x)), {
        stroke: "#ef4444",
        "stroke-width": width
      }, group);

      arrow3(origin, add(origin, mul(length, axes.y)), {
        stroke: "#16a34a",
        "stroke-width": width
      }, group);

      arrow3(origin, add(origin, mul(length, axes.z)), {
        stroke: "#2563eb",
        "stroke-width": width + 1
      }, group);

      if (large) {
        label3(add(origin, mul(length * 1.12, axes.x)), "x", {
          dx: 12,
          dy: 10,
          width: 45,
          fontSize: SMALL_LABEL_FONT,
          fill: "#ef4444"
        }, group);

        label3(add(origin, mul(length * 1.12, axes.y)), "y", {
          dx: 12,
          dy: 10,
          width: 45,
          fontSize: SMALL_LABEL_FONT,
          fill: "#16a34a"
        }, group);

        label3(add(origin, mul(length * 1.15, axes.z)), "z", {
          dx: 12,
          dy: -16,
          width: 45,
          fontSize: SMALL_LABEL_FONT,
          fill: "#2563eb"
        }, group);
      }

      if (label) {
        label3(origin, label, {
          dx: -70,
          dy: 42,
          width: 70,
          fontSize: SMALL_LABEL_FONT
        }, group);
      }

      scene.appendChild(group);
    }

    function drawScrewAxes(frames, options) {
      const opts = options || {};
      const axes = jointAxesFromFrames(frames);
      const opacity = opts.opacity == null ? 1 : opts.opacity;
      const labels = opts.labels !== false;
      const group = svgEl("g", { opacity: String(opacity) });

      for (let i = 0; i < 3; i++) {
        const q = axes[i].origin;
        const s = normalize(axes[i].axis);

        const A = add(q, mul(-1.75, s));
        const B = add(q, mul(2.35, s));

        line3(A, B, {
          stroke: SCREW_COLOR,
          "stroke-width": opts.width || 5,
          "stroke-dasharray": "14 9",
          "stroke-linecap": "round"
        }, group);

        if (labels) {
          const labelPoint = add(q, mul(1.25, s));

          const labelOffset = [
            { dx: 22, dy: -18 },
            { dx: 22, dy: -18 },
            { dx: 22, dy: 28 }
          ][i];

          label3(labelPoint, "Y_" + (i + 1), {
            dx: labelOffset.dx,
            dy: labelOffset.dy,
            width: 92,
            fontSize: 34,
            fill: SCREW_COLOR
          }, group);
        }
      }

      scene.appendChild(group);
    }

    function drawRobot(frames, options) {
      const opts = options || {};
      const opacity = opts.opacity == null ? 1 : opts.opacity;
      const showLabels = opts.showLabels === true;
      const showFrames = opts.showFrames === false;
      const group = svgEl("g", { opacity: String(opacity) });

      for (let i = 0; i < frames.length - 1; i++) {
        cylinder3(
          frames[i].origin,
          frames[i + 1].origin,
          {
            color: opts.home ? "#9ca3af" : LINK_COLORS[i],
            radius: LINK_RADII[i],
            opacity: 1,
            highlight: !opts.home,
            caps: true
          },
          group
        );
      }

      const axes = jointAxesFromFrames(frames);

      for (let i = 0; i < 3; i++) {
        const q = axes[i].origin;
        const s = normalize(axes[i].axis);
        const half = JOINT_LENGTHS[i] / 2;

        cylinder3(
          add(q, mul(-half, s)),
          add(q, mul(half, s)),
          {
            color: JOINT_COLORS[i],
            radius: JOINT_RADII[i],
            opacity: 1,
            highlight: !opts.home,
            caps: false
          },
          group
        );
      }

      dot3(frames[3].origin, opts.home ? 11 : 16, {
        fill: opts.home ? "#9ca3af" : "#111827",
        stroke: "#ffffff",
        "stroke-width": opts.home ? 2 : 4
      }, group);

      scene.appendChild(group);

      if (showFrames) {
        for (let i = 0; i < frames.length; i++) {
          const len = i === 0 ? 0.72 : 0.42;

          drawFrame(
            frames[i].origin,
            frames[i].axes,
            len,
            i === 0 ? "F0" : "",
            opts.home ? 0.25 : 0.95,
            i === 0
          );
        }
      }

      if (showLabels) {
        const jointOffsets = [
          { dx: -100, dy: 70 },
          { dx: 50, dy: -42 },
          { dx: 58, dy: 62 }
        ];

        for (let i = 0; i < 3; i++) {
          label3(axes[i].origin, "J" + (i + 1), {
            dx: jointOffsets[i].dx,
            dy: jointOffsets[i].dy,
            width: 76,
            fontSize: LABEL_FONT,
            fill: JOINT_COLORS[i]
          });
        }

        label3(frames[3].origin, "EE", {
          dx: 42,
          dy: -45,
          width: 80,
          fontSize: LABEL_FONT,
          fill: "#111827"
        });
      }
    }

    function formatPoint(P) {
      return "[" + fmt(P.x) + ", " + fmt(P.y) + ", " + fmt(P.z) + "]^T";
    }

    function getThetaDegrees() {
      return [Number(s1.slider.value), Number(s2.slider.value), Number(s3.slider.value)];
    }

    function getThetaRadians() {
      return getThetaDegrees().map(degToRad);
    }

    function addTracePoint(P) {
      const last = trace[trace.length - 1];

      if (!last || dist(last, P) > 0.0025) {
        trace.push(P);
        if (trace.length > 5000) trace = trace.slice(trace.length - 5000);
      }
    }

    function addInterpolatedTrace(fromTheta, toTheta) {
      const deltas = [
        wrapToPi(toTheta[0] - fromTheta[0]),
        wrapToPi(toTheta[1] - fromTheta[1]),
        wrapToPi(toTheta[2] - fromTheta[2])
      ];

      const maxDelta = Math.max(Math.abs(deltas[0]), Math.abs(deltas[1]), Math.abs(deltas[2]));
      const stepRad = degToRad(0.35);
      const n = Math.min(420, Math.max(18, Math.ceil(maxDelta / stepRad)));

      for (let k = 1; k <= n; k++) {
        const t = k / n;

        const q = [
          fromTheta[0] + deltas[0] * t,
          fromTheta[1] + deltas[1] * t,
          fromTheta[2] + deltas[2] * t
        ];

        const frames = fk(q);
        addTracePoint(frames[3].origin);
      }
    }

    function render() {
      const thetaDeg = getThetaDegrees();
      const theta = getThetaRadians();

      s1.value.textContent = thetaDeg[0] + "°";
      s2.value.textContent = thetaDeg[1] + "°";
      s3.value.textContent = thetaDeg[2] + "°";

      const frames = fk(theta);
      const ee = frames[3].origin;
      const homeEE = homeFrames[3].origin;

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

      pathFromPoints(trace, {
        stroke: TRACE_COLOR,
        "stroke-width": 7,
        opacity: 0.25
      });

      drawScrewAxes(homeFrames, {
        opacity: 0.18,
        width: 4,
        labels: false
      });

      drawRobot(homeFrames, {
        opacity: 0.25,
        home: true,
        showFrames: true,
        showLabels: false
      });

      drawScrewAxes(frames, {
        opacity: 0.95,
        width: 5,
        labels: true
      });

      drawRobot(frames, {
        opacity: 1,
        home: false,
        showFrames: true,
        showLabels: false
      });

      readout.textContent =
        "Standard D-H convention: A_i = Rz(theta_i) Tz(d_i) Tx(a_i) Rx(alpha_i)\n" +
        "a     = [1, 2, 1.5]\n" +
        "d     = [0, 1, 0]\n" +
        "alpha = [pi/2, pi/2, 0]\n\n" +
        "theta = [" +
        thetaDeg[0] +
        "°, " +
        thetaDeg[1] +
        "°, " +
        thetaDeg[2] +
        "°]\n" +
        "theta = [" +
        fmt(degToRad(thetaDeg[0])) +
        ", " +
        fmt(degToRad(thetaDeg[1])) +
        ", " +
        fmt(degToRad(thetaDeg[2])) +
        "] rad\n\n" +
        "home EE position    = " +
        formatPoint(homeEE) +
        "\n" +
        "current EE position = " +
        formatPoint(ee) +
        "\n" +
        "trace points        = " +
        trace.length +
        "\n\n" +
        "Screw axes: Y_1 passes through joint 1 along z0, Y_2 passes through joint 2 along z1, Y_3 passes through joint 3 along z2.";
    }

    function updateFromSliders() {
      const target = getThetaRadians();
      addInterpolatedTrace(lastThetaRad, target);
      lastThetaRad = target;
      render();
    }

    function resetJoints() {
      s1.slider.value = "0";
      s2.slider.value = "0";
      s3.slider.value = "0";

      lastThetaRad = [0, 0, 0];
      trace = [homeFrames[3].origin];

      render();
    }

    function clearTrace() {
      const frames = fk(getThetaRadians());
      trace = [frames[3].origin];
      render();
    }

    function resetView() {
      azimuth = -0.72;
      elevation = -0.52;
      zoom = 0.88;
      render();
    }

    s1.slider.addEventListener("input", updateFromSliders);
    s2.slider.addEventListener("input", updateFromSliders);
    s3.slider.addEventListener("input", updateFromSliders);

    resetThetaButton.addEventListener("click", resetJoints);
    clearTraceButton.addEventListener("click", clearTrace);
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
        zoom = Math.max(0.42, Math.min(2.6, zoom));

        render();
      },
      { passive: false }
    );

    svg.addEventListener("dblclick", resetView);

    render();

    return {
      root: root,
      render: render,
      clearTrace: clearTrace,
      resetJoints: resetJoints,
      resetView: resetView
    };
  }

  function initSerial3RDemo() {
    const root = document.getElementById("serial-3r-demo");
    if (root) mountSerial3RDemo(root);
  }

  window.Serial3RRobotDemo = {
    init: initSerial3RDemo,
    mount: mountSerial3RDemo
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSerial3RDemo);
  } else {
    initSerial3RDemo();
  }
})();