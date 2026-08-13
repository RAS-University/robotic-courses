(function () {
  const svg = document.getElementById("temporary-screw-svg");
  const scene = document.getElementById("temporary-screw-scene");
  const angleSlider = document.getElementById("temporary-screw-angle");
  const offsetSlider = document.getElementById("temporary-screw-offset");
  const readout = document.getElementById("temporary-screw-readout");

  if (!svg || !scene || !angleSlider || !offsetSlider || !readout) return;

  const NS = "http://www.w3.org/2000/svg";
  const center = { x: 260, y: 260 };
  const axisHalfLength = 220;
  const lineHalfLength = 260;
  const state = {
    angleDeg: Number(angleSlider.value),
    offset: Number(offsetSlider.value),
    dragging: null
  };

  function createSvg(tag, attrs) {
    const el = document.createElementNS(NS, tag);
    Object.entries(attrs).forEach(([key, value]) => {
      el.setAttribute(key, value);
    });
    return el;
  }

  const xAxis = createSvg("line", {
    x1: center.x - axisHalfLength,
    y1: center.y,
    x2: center.x + axisHalfLength,
    y2: center.y,
    stroke: "#111",
    "stroke-width": "1.5"
  });

  const yAxis = createSvg("line", {
    x1: center.x,
    y1: center.y - axisHalfLength,
    x2: center.x,
    y2: center.y + axisHalfLength,
    stroke: "#111",
    "stroke-width": "1.5"
  });

  const xLabel = createSvg("text", {
    x: center.x + axisHalfLength - 10,
    y: center.y - 10,
    fill: "#111",
    "font-size": "18",
    "text-anchor": "middle"
  });
  xLabel.textContent = "x";

  const yLabel = createSvg("text", {
    x: center.x + 12,
    y: center.y - axisHalfLength + 16,
    fill: "#111",
    "font-size": "18",
    "text-anchor": "middle"
  });
  yLabel.textContent = "y";

  const origin = createSvg("circle", {
    cx: center.x,
    cy: center.y,
    r: "4",
    fill: "#111"
  });

  const originLabel = createSvg("text", {
    x: center.x + 14,
    y: center.y + 18,
    fill: "#111",
    "font-size": "18"
  });
  originLabel.textContent = "O";

  const screwLine = createSvg("line", {
    stroke: "#111",
    "stroke-width": "3",
    "stroke-linecap": "round",
    cursor: "grab"
  });

  const directionArrow = createSvg("line", {
    stroke: "#111",
    "stroke-width": "2.5",
    "marker-end": "url(#temporary-arrow)",
    cursor: "grab"
  });

  const handle = createSvg("circle", {
    r: "8",
    fill: "#fff",
    stroke: "#111",
    "stroke-width": "2",
    cursor: "grab"
  });

  const oaLine = createSvg("line", {
    stroke: "#111",
    "stroke-width": "2",
    "stroke-dasharray": "7 5"
  });

  const footPoint = createSvg("circle", {
    r: "5",
    fill: "#111"
  });

  const aLabel = createSvg("text", {
    fill: "#111",
    "font-size": "18"
  });
  aLabel.textContent = "A";

  const sLabel = createSvg("text", {
    fill: "#111",
    "font-size": "18"
  });
  sLabel.textContent = "s";

  const oaLabel = createSvg("text", {
    fill: "#111",
    "font-size": "18",
    "text-anchor": "middle"
  });
  oaLabel.textContent = "OA";

  const momentArc = createSvg("path", {
    fill: "none",
    stroke: "#111",
    "stroke-width": "2",
    "marker-end": "url(#temporary-arrow)"
  });

  const momentLabel = createSvg("text", {
    fill: "#111",
    "font-size": "18"
  });
  momentLabel.textContent = "m";

  const defs = createSvg("defs", {});
  const marker = createSvg("marker", {
    id: "temporary-arrow",
    markerWidth: "8",
    markerHeight: "8",
    refX: "7",
    refY: "4",
    orient: "auto",
    markerUnits: "strokeWidth"
  });
  const arrowPath = createSvg("path", {
    d: "M 0 0 L 8 4 L 0 8 z",
    fill: "#111"
  });
  marker.appendChild(arrowPath);
  defs.appendChild(marker);

  scene.appendChild(defs);
  scene.appendChild(xAxis);
  scene.appendChild(yAxis);
  scene.appendChild(xLabel);
  scene.appendChild(yLabel);
  scene.appendChild(oaLine);
  scene.appendChild(momentArc);
  scene.appendChild(screwLine);
  scene.appendChild(directionArrow);
  scene.appendChild(handle);
  scene.appendChild(origin);
  scene.appendChild(footPoint);
  scene.appendChild(originLabel);
  scene.appendChild(aLabel);
  scene.appendChild(sLabel);
  scene.appendChild(oaLabel);
  scene.appendChild(momentLabel);

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function toSvgPoint(clientX, clientY) {
    const rect = svg.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 520;
    const y = ((clientY - rect.top) / rect.height) * 520;
    return { x, y };
  }

  function fmt(value) {
    const rounded = Math.abs(value) < 1e-9 ? 0 : value;
    return rounded.toFixed(3);
  }

  function render() {
    const theta = state.angleDeg * Math.PI / 180;
    const s = { x: Math.cos(theta), y: Math.sin(theta) };
    const n = { x: -Math.sin(theta), y: Math.cos(theta) };
    const A = {
      x: center.x + state.offset * n.x,
      y: center.y - state.offset * n.y
    };

    const p1 = {
      x: A.x - lineHalfLength * s.x,
      y: A.y + lineHalfLength * s.y
    };
    const p2 = {
      x: A.x + lineHalfLength * s.x,
      y: A.y - lineHalfLength * s.y
    };

    const arrowEnd = {
      x: A.x + 90 * s.x,
      y: A.y - 90 * s.y
    };
    const arrowStart = {
      x: A.x + 25 * s.x,
      y: A.y - 25 * s.y
    };

    const handlePos = {
      x: A.x + 130 * s.x,
      y: A.y - 130 * s.y
    };

    const mz = n.x * s.y - n.y * s.x;
    const signedMoment = state.offset * mz;
    const arcRadius = 34;
    const arcStart = { x: center.x + arcRadius, y: center.y };
    const arcEnd = { x: center.x, y: center.y - arcRadius };
    const altArcEnd = { x: center.x, y: center.y + arcRadius };

    screwLine.setAttribute("x1", p1.x);
    screwLine.setAttribute("y1", p1.y);
    screwLine.setAttribute("x2", p2.x);
    screwLine.setAttribute("y2", p2.y);

    directionArrow.setAttribute("x1", arrowStart.x);
    directionArrow.setAttribute("y1", arrowStart.y);
    directionArrow.setAttribute("x2", arrowEnd.x);
    directionArrow.setAttribute("y2", arrowEnd.y);

    handle.setAttribute("cx", handlePos.x);
    handle.setAttribute("cy", handlePos.y);

    oaLine.setAttribute("x1", center.x);
    oaLine.setAttribute("y1", center.y);
    oaLine.setAttribute("x2", A.x);
    oaLine.setAttribute("y2", A.y);

    footPoint.setAttribute("cx", A.x);
    footPoint.setAttribute("cy", A.y);

    aLabel.setAttribute("x", A.x + 10);
    aLabel.setAttribute("y", A.y - 10);

    sLabel.setAttribute("x", arrowEnd.x + 8);
    sLabel.setAttribute("y", arrowEnd.y - 8);

    oaLabel.setAttribute("x", (center.x + A.x) / 2 + 14);
    oaLabel.setAttribute("y", (center.y + A.y) / 2 - 8);

    if (signedMoment >= 0) {
      momentArc.setAttribute("d", `M ${arcStart.x} ${arcStart.y} A ${arcRadius} ${arcRadius} 0 0 0 ${arcEnd.x} ${arcEnd.y}`);
      momentLabel.setAttribute("x", center.x + 16);
      momentLabel.setAttribute("y", center.y - 42);
    } else {
      momentArc.setAttribute("d", `M ${arcStart.x} ${arcStart.y} A ${arcRadius} ${arcRadius} 0 0 1 ${altArcEnd.x} ${altArcEnd.y}`);
      momentLabel.setAttribute("x", center.x + 16);
      momentLabel.setAttribute("y", center.y + 52);
    }

    readout.textContent =
      "Current screw\n" +
      "S = [s; m_O]\n" +
      `s   = [${fmt(s.x)}, ${fmt(s.y)}, 0]^T\n` +
      `OA  = [${fmt(state.offset * n.x)}, ${fmt(state.offset * n.y)}, 0]^T\n` +
      `m_O = OA x s = [0, 0, ${fmt(signedMoment)}]^T`;
  }

  function syncControls() {
    angleSlider.value = String(Math.round(state.angleDeg));
    offsetSlider.value = String(Math.round(state.offset));
  }

  angleSlider.addEventListener("input", () => {
    state.angleDeg = Number(angleSlider.value);
    render();
  });

  offsetSlider.addEventListener("input", () => {
    state.offset = Number(offsetSlider.value);
    render();
  });

  handle.addEventListener("pointerdown", (event) => {
    state.dragging = "rotate";
    handle.setPointerCapture(event.pointerId);
    event.preventDefault();
  });

  screwLine.addEventListener("pointerdown", (event) => {
    state.dragging = "translate";
    screwLine.setPointerCapture(event.pointerId);
    event.preventDefault();
  });

  svg.addEventListener("pointermove", (event) => {
    if (!state.dragging) return;

    const point = toSvgPoint(event.clientX, event.clientY);
    const dx = point.x - center.x;
    const dy = center.y - point.y;

    if (state.dragging === "rotate") {
      state.angleDeg = Math.atan2(dy, dx) * 180 / Math.PI;
    } else if (state.dragging === "translate") {
      const theta = state.angleDeg * Math.PI / 180;
      const n = { x: -Math.sin(theta), y: Math.cos(theta) };
      state.offset = clamp(dx * n.x + dy * n.y, -140, 140);
    }

    syncControls();
    render();
  });

  function stopDrag(event) {
    if (!state.dragging) return;
    state.dragging = null;
    if (event && event.target && event.target.releasePointerCapture) {
      try {
        event.target.releasePointerCapture(event.pointerId);
      } catch (err) {
        // ignore release errors from browsers that already released capture
      }
    }
  }

  handle.addEventListener("pointerup", stopDrag);
  screwLine.addEventListener("pointerup", stopDrag);
  handle.addEventListener("pointercancel", stopDrag);
  screwLine.addEventListener("pointercancel", stopDrag);
  svg.addEventListener("pointerleave", () => {
    if (state.dragging === "translate") {
      state.dragging = null;
    }
  });

  render();
})();
