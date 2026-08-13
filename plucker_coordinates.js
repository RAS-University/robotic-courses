/* temporary_plucker_demo.js
   Interactive Plucker coordinates demo for a directed line in the x-y plane.

   Use in Markdown/Jekyll as:

   <div id="temporary-plucker-demo"></div>
   <script src="/temporary_plucker_demo.js"></script>
*/

(function () {
  "use strict";

  function mountTemporaryPluckerDemo(root) {
    if (!root || root.dataset.temporaryPluckerMounted === "1") return;
    root.dataset.temporaryPluckerMounted = "1";

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

    const styleId = "temporary-plucker-demo-style";
    if (!document.getElementById(styleId)) {
      const style = el("style", { id: styleId });
      style.textContent = `
.temporary-plucker-demo {
  border: 1px solid #111;
  background: #fff;
  padding: 1rem;
  margin: 1rem 0 1.5rem 0;
}

.temporary-plucker-demo * {
  box-sizing: border-box;
}

.temporary-plucker-demo .demo-grid {
  display: grid;
  grid-template-columns: minmax(280px, 1.6fr) minmax(240px, 1fr);
  gap: 1rem;
  align-items: start;
}

.temporary-plucker-demo svg {
  width: 100%;
  height: auto;
  display: block;
  border: 1px solid #111;
  background: #fff;
  touch-action: none;
}

.temporary-plucker-demo .demo-panel {
  border: 1px solid #111;
  padding: 0.9rem;
  background: #fff;
}

.temporary-plucker-demo .control-row {
  margin-bottom: 0.9rem;
}

.temporary-plucker-demo label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.temporary-plucker-demo input[type="range"] {
  width: 100%;
  accent-color: #111;
}

.temporary-plucker-demo .readout {
  font-family: "Courier New", Courier, monospace;
  font-size: 0.95rem;
  line-height: 1.5;
  white-space: pre-line;
}

.temporary-plucker-demo .hint {
  font-size: 0.95rem;
  margin: 0 0 0.9rem 0;
}

@media (max-width: 840px) {
  .temporary-plucker-demo .demo-grid {
    grid-template-columns: 1fr;
  }
}
`;
      document.head.appendChild(style);
    }

    root.className = "temporary-plucker-demo";

    const grid = el("div", { class: "demo-grid" });
    root.appendChild(grid);

    const svgWrap = el("div");
    grid.appendChild(svgWrap);

    const svg = svgEl("svg", {
      viewBox: "0 0 520 520",
      "aria-label": "Interactive Plucker line sketch in the x-y plane"
    });
    svgWrap.appendChild(svg);

    svg.appendChild(
      svgEl("rect", {
        x: "0",
        y: "0",
        width: "520",
        height: "520",
        fill: "#fff"
      })
    );

    const scene = svgEl("g");
    svg.appendChild(scene);

    const panel = el("div", { class: "demo-panel" });
    grid.appendChild(panel);

    const angleRow = el("div", { class: "control-row" });
    panel.appendChild(angleRow);

    angleRow.appendChild(el("label", { for: "temporary-plucker-angle" }, "Direction of the line"));
    const angleSlider = el("input", {
      id: "temporary-plucker-angle",
      type: "range",
      min: "-180",
      max: "180",
      value: "30",
      step: "1"
    });
    angleRow.appendChild(angleSlider);

    const offsetRow = el("div", { class: "control-row" });
    panel.appendChild(offsetRow);

    offsetRow.appendChild(el("label", { for: "temporary-plucker-offset" }, "Signed distance from the origin"));
    const offsetSlider = el("input", {
      id: "temporary-plucker-offset",
      type: "range",
      min: "-140",
      max: "140",
      value: "70",
      step: "1"
    });
    offsetRow.appendChild(offsetSlider);

    const hint = el("p", { class: "hint" });
    hint.innerHTML =
      "The directed line is parameterized by a unit direction vector \\(\\mathbf{s}\\) and a point \\(P\\) on the line. " +
      "The position vector of \\(P\\) is \\(\\mathbf{p}\\). The moment is \\(\\mathbf{m}_O=\\mathbf{p}\\times\\mathbf{s}\\).";
    panel.appendChild(hint);
    typesetMath(hint);

    const readout = el("div", { id: "temporary-plucker-readout", class: "readout" });
    panel.appendChild(readout);

    const cx = 260;
    const cy = 260;
    const scale = 1.0;
    const lineLength = 420;

    let dragging = null;

    function svgPoint(evt) {
      const pt = svg.createSVGPoint();
      pt.x = evt.clientX;
      pt.y = evt.clientY;
      const ctm = svg.getScreenCTM();
      if (!ctm) return { x: 0, y: 0 };
      const sp = pt.matrixTransform(ctm.inverse());
      return { x: sp.x - cx, y: -(sp.y - cy) };
    }

    function toSvg(p) {
      return { x: cx + p.x, y: cy - p.y };
    }

    function lineState() {
      const theta = Number(angleSlider.value) * Math.PI / 180;
      const d = Number(offsetSlider.value);
      const s = { x: Math.cos(theta), y: Math.sin(theta), z: 0 };
      const n = { x: -Math.sin(theta), y: Math.cos(theta), z: 0 };
      const p = { x: d * n.x, y: d * n.y, z: 0 };
      const m = { x: 0, y: 0, z: p.x * s.y - p.y * s.x };
      return { theta: theta, d: d, s: s, n: n, p: p, m: m };
    }

    function fmt(x) {
      return (Math.abs(x) < 1e-10 ? 0 : x).toFixed(3);
    }

    function draw() {
      const st = lineState();
      scene.innerHTML = "";

      scene.appendChild(svgEl("line", {
        x1: "40",
        y1: String(cy),
        x2: "480",
        y2: String(cy),
        stroke: "#ddd",
        "stroke-width": "1"
      }));

      scene.appendChild(svgEl("line", {
        x1: String(cx),
        y1: "40",
        x2: String(cx),
        y2: "480",
        stroke: "#ddd",
        "stroke-width": "1"
      }));

      const p0 = {
        x: st.p.x - lineLength * 0.5 * st.s.x,
        y: st.p.y - lineLength * 0.5 * st.s.y
      };

      const p1 = {
        x: st.p.x + lineLength * 0.5 * st.s.x,
        y: st.p.y + lineLength * 0.5 * st.s.y
      };

      const a0 = toSvg(p0);
      const a1 = toSvg(p1);
      const P = toSvg(st.p);

      const line = svgEl("line", {
        x1: String(a0.x),
        y1: String(a0.y),
        x2: String(a1.x),
        y2: String(a1.y),
        stroke: "#111",
        "stroke-width": "4",
        "stroke-linecap": "round"
      });
      line.style.cursor = "grab";
      line.addEventListener("pointerdown", function (evt) {
        dragging = "line";
        svg.setPointerCapture(evt.pointerId);
      });
      scene.appendChild(line);

      const tip = toSvg({
        x: st.p.x + 0.5 * lineLength * st.s.x,
        y: st.p.y + 0.5 * lineLength * st.s.y
      });

      const left = toSvg({
        x: st.p.x + 0.5 * lineLength * st.s.x - 18 * st.s.x + 9 * st.n.x,
        y: st.p.y + 0.5 * lineLength * st.s.y - 18 * st.s.y + 9 * st.n.y
      });

      const right = toSvg({
        x: st.p.x + 0.5 * lineLength * st.s.x - 18 * st.s.x - 9 * st.n.x,
        y: st.p.y + 0.5 * lineLength * st.s.y - 18 * st.s.y - 9 * st.n.y
      });

      scene.appendChild(svgEl("polygon", {
        points: tip.x + "," + tip.y + " " + left.x + "," + left.y + " " + right.x + "," + right.y,
        fill: "#111"
      }));

      scene.appendChild(svgEl("line", {
        x1: String(cx),
        y1: String(cy),
        x2: String(P.x),
        y2: String(P.y),
        stroke: "#555",
        "stroke-width": "2",
        "stroke-dasharray": "6 5"
      }));

      scene.appendChild(svgEl("circle", {
        cx: String(cx),
        cy: String(cy),
        r: "5",
        fill: "#111"
      }));

      scene.appendChild(svgEl("circle", {
        cx: String(P.x),
        cy: String(P.y),
        r: "6",
        fill: "#fff",
        stroke: "#111",
        "stroke-width": "2"
      }));

      const handle = svgEl("circle", {
        cx: String(tip.x),
        cy: String(tip.y),
        r: "10",
        fill: "#fff",
        stroke: "#111",
        "stroke-width": "2"
      });
      handle.style.cursor = "grab";
      handle.addEventListener("pointerdown", function (evt) {
        dragging = "handle";
        svg.setPointerCapture(evt.pointerId);
      });
      scene.appendChild(handle);

      function label(text, x, y) {
        scene.appendChild(svgEl("text", {
          x: String(x),
          y: String(y),
          "font-size": "16",
          "font-family": "Arial, sans-serif",
          fill: "#111"
        }, text));
      }

      label("O", cx + 8, cy + 18);
      label("P", P.x + 8, P.y - 8);
      label("L", tip.x + 10, tip.y - 10);
      label("p", (cx + P.x) / 2 + 8, (cy + P.y) / 2 - 8);
      label("s", tip.x - 35 * st.s.x + 10, tip.y - 35 * st.s.y - 10);

      const dot = st.s.x * st.m.x + st.s.y * st.m.y + st.s.z * st.m.z;

      readout.textContent =
        "Plücker coordinates of the directed line\n\n" +
        "L = [ s ; m_O ]\n\n" +
        "s   = [" + fmt(st.s.x) + ", " + fmt(st.s.y) + ", " + fmt(st.s.z) + "]\n" +
        "p   = [" + fmt(st.p.x / scale) + ", " + fmt(st.p.y / scale) + ", " + fmt(st.p.z) + "]\n" +
        "m_O = p × s = [" + fmt(st.m.x) + ", " + fmt(st.m.y) + ", " + fmt(st.m.z / scale) + "]\n\n" +
        "s · m_O = " + fmt(dot);
    }

    svg.addEventListener("pointermove", function (evt) {
      if (!dragging) return;
      const p = svgPoint(evt);
      const st = lineState();

      if (dragging === "line") {
        const d = p.x * st.n.x + p.y * st.n.y;
        offsetSlider.value = String(Math.max(-140, Math.min(140, d)));
      }

      if (dragging === "handle") {
        const dx = p.x - st.p.x;
        const dy = p.y - st.p.y;
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        angleSlider.value = String(angle);
      }

      draw();
    });

    function stopDragging(evt) {
      if (evt && evt.pointerId != null) {
        try {
          svg.releasePointerCapture(evt.pointerId);
        } catch (err) {
          /* Browser compatibility. */
        }
      }
      dragging = null;
    }

    svg.addEventListener("pointerup", stopDragging);
    svg.addEventListener("pointercancel", stopDragging);
    svg.addEventListener("pointerleave", stopDragging);

    angleSlider.addEventListener("input", draw);
    offsetSlider.addEventListener("input", draw);

    draw();

    return {
      root: root,
      draw: draw
    };
  }

  function initTemporaryPluckerDemo() {
    const root = document.getElementById("temporary-plucker-demo");
    if (root) mountTemporaryPluckerDemo(root);
  }

  window.TemporaryPluckerDemo = {
    init: initTemporaryPluckerDemo,
    mount: mountTemporaryPluckerDemo
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTemporaryPluckerDemo);
  } else {
    initTemporaryPluckerDemo();
  }
})();