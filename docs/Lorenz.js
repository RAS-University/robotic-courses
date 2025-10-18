/**
 * lorenz.js
 * Self-contained module to create an interactive Lorenz attractor widget.
 *
 * Usage (in your Just the Docs markdown page):
 *
 * <!-- ensure Plotly is loaded first -->
 * <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
 * <script src="/assets/js/lorenz.js"></script> <!-- or correct path -->
 *
 * <!-- placeholder where widget will be rendered -->
 * <div id="lorenz-widget" style="width:100%;max-width:1000px;margin:0 auto;"></div>
 *
 * <script>
 *   // basic init - will create controls + plot in #lorenz-widget
 *   LorenzWidget.init('lorenz-widget', { sigma: 10, rho: 28, beta: 8/3 });
 * </script>
 *
 * The module exposes:
 *  - LorenzWidget.init(containerId, options)
 *  - LorenzWidget.reset()
 *  - LorenzWidget.start()/LorenzWidget.stop()
 *
 * NOTE: Plotly must be available on window.Plotly prior to calling init.
 */

(function (global) {
  if (!global) return;
  const L = {};

  /* ----------------------
     Default configuration
     ---------------------- */
  const DEFAULTS = {
    sigma: 10.0,
    rho: 28.0,
    beta: 8.0 / 3.0,
    dt: 0.01,
    speed: 5,          // integration steps per visual update
    trailLen: 600,
    initialState: [0.1, 0.0, 0.0],
    updateIntervalMs: 30, // ~33 fps
  };

  /* ----------------------
     Utilities
     ---------------------- */
  function el(tag, attrs = {}, children = []) {
    const e = document.createElement(tag);
    for (const k in attrs) {
      if (k === 'style') {
        for (const s in attrs.style) e.style[s] = attrs.style[s];
      } else if (k.startsWith('on') && typeof attrs[k] === 'function') {
        e.addEventListener(k.slice(2), attrs[k]);
      } else if (k === 'html') {
        e.innerHTML = attrs[k];
      } else {
        e.setAttribute(k, attrs[k]);
      }
    }
    (Array.isArray(children) ? children : [children]).forEach(c => {
      if (typeof c === 'string') e.appendChild(document.createTextNode(c));
      else if (c) e.appendChild(c);
    });
    return e;
  }

  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  /* ----------------------
     Lorenz system + RK4 integrator
     ---------------------- */
  function lorenzDeriv([x, y, z], params) {
    const { sigma, rho, beta } = params;
    return [
      sigma * (y - x),
      rho * x - y - x * z,
      x * y - beta * z
    ];
  }

  function rk4Step(state, dt, derivs, params) {
    const a = derivs(state, params);
    const s2 = state.map((v, i) => v + 0.5 * dt * a[i]);
    const b = derivs(s2, params);
    const s3 = state.map((v, i) => v + 0.5 * dt * b[i]);
    const c = derivs(s3, params);
    const s4 = state.map((v, i) => v + dt * c[i]);
    const d = derivs(s4, params);
    return state.map((v, i) => v + dt * (a[i] + 2 * b[i] + 2 * c[i] + d[i]) / 6);
  }

  /* ----------------------
     CSS (injected once)
     ---------------------- */
  let cssInjected = false;
  function injectCSS() {
    if (cssInjected) return;
    cssInjected = true;
    const css = `
.lorenz-controls{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-bottom:10px}
.lorenz-ctrl{display:flex;flex-direction:column;font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial;font-size:13px}
.lorenz-ctrl label{font-weight:600;margin-bottom:4px}
.lorenz-ctrl input[type=range]{width:180px}
.lorenz-buttons{margin-left:auto;display:flex;gap:8px;align-items:center}
.lorenz-btn{padding:6px 10px;border-radius:6px;border:1px solid #bbb;background:#fff;cursor:pointer}
.lorenz-btn.primary{background:#007bff;color:#fff;border-color:#006ae6}
.lorenz-plot{width:100%;height:600px;border:1px solid #eee}
@media (max-width:800px){ .lorenz-plot{height:420px} }
`;
    const s = document.createElement('style');
    s.type = 'text/css';
    s.appendChild(document.createTextNode(css));
    document.head.appendChild(s);
  }

  /* ----------------------
     Widget core
     ---------------------- */
  function Widget(containerId, options = {}) {
    this.containerId = containerId;
    this.container = document.getElementById(containerId);
    if (!this.container) throw new Error(`LorenzWidget: container '${containerId}' not found.`);
    this.opts = Object.assign({}, DEFAULTS, options);
    this.params = { sigma: this.opts.sigma, rho: this.opts.rho, beta: this.opts.beta };
    this.dt = this.opts.dt;
    this.speed = this.opts.speed;
    this.trailLen = this.opts.trailLen;
    this.updateIntervalMs = this.opts.updateIntervalMs;
    this.running = true;
    this.state = this.opts.initialState.slice();
    this.xs = []; this.ys = []; this.zs = [];
    this.animTimer = null;
    this.plotId = `${containerId}-plot`;
    this._build();
    this._seedTransient();
    this._renderPlot();
    this.start();
  }

  Widget.prototype._build = function () {
    injectCSS();
    // clear container
    this.container.innerHTML = '';

    // controls
    const controls = el('div', { class: 'lorenz-controls' });

    function makeRange(id, min, max, step, value, labelText) {
      const label = el('label', {}, [labelText, ' ', el('span', { class: 'small' }, value.toString())]);
      const input = el('input', { type: 'range', id: id, min: min, max: max, step: step, value: value });
      return { label, input };
    }

    // sigma
    const sigmaWrap = el('div', { class: 'lorenz-ctrl' });
    const sigmaLabel = el('label', {}, ['σ (sigma) ', el('span', { id: `${this.plotId}-sigmaVal`, class: 'small' }, this.params.sigma)]);
    const sigmaIn = el('input', { type: 'range', min: 0.1, max: 30, step: 0.1, value: this.params.sigma });
    sigmaWrap.appendChild(sigmaLabel); sigmaWrap.appendChild(sigmaIn);

    // rho
    const rhoWrap = el('div', { class: 'lorenz-ctrl' });
    const rhoLabel = el('label', {}, ['ρ (rho) ', el('span', { id: `${this.plotId}-rhoVal`, class: 'small' }, this.params.rho)]);
    const rhoIn = el('input', { type: 'range', min: 0.1, max: 50, step: 0.1, value: this.params.rho });
    rhoWrap.appendChild(rhoLabel); rhoWrap.appendChild(rhoIn);

    // beta
    const betaWrap = el('div', { class: 'lorenz-ctrl' });
    const betaLabel = el('label', {}, ['β (beta) ', el('span', { id: `${this.plotId}-betaVal`, class: 'small' }, this.params.beta)]);
    const betaIn = el('input', { type: 'range', min: 0.1, max: 10, step: 0.0001, value: this.params.beta });
    betaWrap.appendChild(betaLabel); betaWrap.appendChild(betaIn);

    // dt
    const dtWrap = el('div', { class: 'lorenz-ctrl' });
    const dtLabel = el('label', {}, ['dt (step) ', el('span', { id: `${this.plotId}-dtVal`, class: 'small' }, this.dt)]);
    const dtIn = el('input', { type: 'range', min: 0.001, max: 0.05, step: 0.001, value: this.dt });
    dtWrap.appendChild(dtLabel); dtWrap.appendChild(dtIn);

    // speed
    const speedWrap = el('div', { class: 'lorenz-ctrl' });
    const speedLabel = el('label', {}, ['Speed (steps/update) ', el('span', { id: `${this.plotId}-speedVal`, class: 'small' }, this.speed)]);
    const speedIn = el('input', { type: 'range', min: 1, max: 50, step: 1, value: this.speed });
    speedWrap.appendChild(speedLabel); speedWrap.appendChild(speedIn);

    // trail length
    const trailWrap = el('div', { class: 'lorenz-ctrl' });
    const trailLabel = el('label', {}, ['Trail length ', el('span', { id: `${this.plotId}-trailVal`, class: 'small' }, this.trailLen)]);
    const trailIn = el('input', { type: 'range', min: 50, max: 4000, step: 10, value: this.trailLen });
    trailWrap.appendChild(trailLabel); trailWrap.appendChild(trailIn);

    controls.appendChild(sigmaWrap);
    controls.appendChild(rhoWrap);
    controls.appendChild(betaWrap);
    controls.appendChild(dtWrap);
    controls.appendChild(speedWrap);
    controls.appendChild(trailWrap);

    // buttons
    const buttons = el('div', { class: 'lorenz-buttons' });
    const playBtn = el('button', { class: 'lorenz-btn primary' }, 'Pause');
    const resetBtn = el('button', { class: 'lorenz-btn' }, 'Reset');
    buttons.appendChild(playBtn); buttons.appendChild(resetBtn);
    controls.appendChild(buttons);

    // plot area
    const plotDiv = el('div', { id: this.plotId, class: 'lorenz-plot' });

    this.container.appendChild(controls);
    this.container.appendChild(plotDiv);

    // store references
    this._dom = {
      sigmaIn, rhoIn, betaIn, dtIn, speedIn, trailIn,
      sigmaVal: sigmaLabel.querySelector('span') || null,
      rhoVal: rhoLabel.querySelector('span') || null,
      betaVal: betaLabel.querySelector('span') || null,
      dtVal: dtLabel.querySelector('span') || null,
      speedVal: speedLabel.querySelector('span') || null,
      trailVal: trailLabel.querySelector('span') || null,
      playBtn, resetBtn, plotDiv
    };

    // wire events
    const self = this;
    sigmaIn.addEventListener('input', function () {
      self.params.sigma = parseFloat(this.value);
      if (self._dom.sigmaVal) self._dom.sigmaVal.textContent = this.value;
    });
    rhoIn.addEventListener('input', function () {
      self.params.rho = parseFloat(this.value);
      if (self._dom.rhoVal) self._dom.rhoVal.textContent = this.value;
    });
    betaIn.addEventListener('input', function () {
      self.params.beta = parseFloat(this.value);
      if (self._dom.betaVal) self._dom.betaVal.textContent = this.value;
    });
    dtIn.addEventListener('input', function () {
      self.dt = parseFloat(this.value);
      if (self._dom.dtVal) self._dom.dtVal.textContent = this.value;
    });
    speedIn.addEventListener('input', function () {
      self.speed = parseInt(this.value, 10);
      if (self._dom.speedVal) self._dom.speedVal.textContent = this.value;
    });
    trailIn.addEventListener('input', function () {
      self.trailLen = parseInt(this.value, 10);
      if (self._dom.trailVal) self._dom.trailVal.textContent = this.value;
      // trim arrays now if needed
      if (self.xs.length > self.trailLen) {
        const start = self.xs.length - self.trailLen;
        self.xs = self.xs.slice(start); self.ys = self.ys.slice(start); self.zs = self.zs.slice(start);
      }
    });

    playBtn.addEventListener('click', function () {
      self.running = !self.running;
      playBtn.textContent = self.running ? 'Pause' : 'Play';
      playBtn.classList.toggle('primary', self.running);
    });

    resetBtn.addEventListener('click', function () {
      self._resetStateRandom();
    });

    // keyboard shortcuts
    window.addEventListener('keydown', function (ev) {
      if (ev.key === ' ') { ev.preventDefault(); self.running = !self.running; playBtn.textContent = self.running ? 'Pause' : 'Play'; playBtn.classList.toggle('primary', self.running); }
      if (ev.key === 'r') { self._resetStateRandom(); }
    });
  };

  Widget.prototype._seedTransient = function () {
    // run some transient steps to avoid starting in an obvious place
    for (let i = 0; i < 200; i++) {
      this.state = rk4Step(this.state, this.dt, lorenzDeriv, this.params);
    }
    this.xs = [this.state[0]]; this.ys = [this.state[1]]; this.zs = [this.state[2]];
  };

  Widget.prototype._renderPlot = function () {
    if (!global.Plotly) {
      this._dom.plotDiv.innerHTML = '<div style="padding:20px;color:#a00">Plotly is not loaded. Please include Plotly (https://cdn.plot.ly/plotly-latest.min.js) in the page.</div>';
      return;
    }

    const lineTrace = {
      x: this.xs.slice(),
      y: this.ys.slice(),
      z: this.zs.slice(),
      mode: 'lines',
      type: 'scatter3d',
      line: { width: 2 },
      hoverinfo: 'none',
      name: 'Trajectory'
    };

    const pointTrace = {
      x: [this.state[0]],
      y: [this.state[1]],
      z: [this.state[2]],
      mode: 'markers',
      type: 'scatter3d',
      marker: { size: 4, symbol: 'circle', line: { width: 1 } },
      name: 'Current'
    };

    const layout = {
      showlegend: false,
      margin: { l: 0, r: 0, b: 0, t: 0 },
      scene: {
        xaxis: { title: 'x' }, yaxis: { title: 'y' }, zaxis: { title: 'z' },
        aspectmode: 'auto'
      }
    };

    global.Plotly.newPlot(this._dom.plotDiv, [lineTrace, pointTrace], layout, { responsive: true });
  };

  Widget.prototype._animateTick = function () {
    // integrate 'speed' steps
    for (let s = 0; s < this.speed; s++) {
      this.state = rk4Step(this.state, this.dt, lorenzDeriv, this.params);
      this.xs.push(this.state[0]); this.ys.push(this.state[1]); this.zs.push(this.state[2]);
      if (this.xs.length > this.trailLen) {
        this.xs.shift(); this.ys.shift(); this.zs.shift();
      }
    }

    // restyle traces 0 (line) and 1 (point)
    // use Plotly.restyle to be efficient
    try {
      global.Plotly.restyle(this._dom.plotDiv, { x: [this.xs, [this.state[0]]], y: [this.ys, [this.state[1]]], z: [this.zs, [this.state[2]]] }, [0, 1]);
    } catch (err) {
      // if restyle fails (plot not ready), try to redraw
      // console.warn('Plotly restyle failed, redrawing', err);
      this._renderPlot();
    }
  };

  Widget.prototype.start = function () {
    if (this.animTimer) clearInterval(this.animTimer);
    const self = this;
    // Prevent multiple intervals
    if (this.animTimer) return;
    this.animTimer = setInterval(function () {
      if (self.running) self._animateTick();
    }, this.updateIntervalMs);
  };

  Widget.prototype.stop = function () {
    if (this.animTimer) clearInterval(this.animTimer);
    this.animTimer = null;
  };

  Widget.prototype._resetStateRandom = function () {
    this.state = [Math.random() * 0.5 - 0.25, Math.random() * 0.5 - 0.25, Math.random() * 0.5 - 0.25 + 1.0];
    this.xs = [this.state[0]]; this.ys = [this.state[1]]; this.zs = [this.state[2]];
    // update plot immediately
    try {
      global.Plotly.restyle(this._dom.plotDiv, { x: [this.xs, [this.state[0]]], y: [this.ys, [this.state[1]]], z: [this.zs, [this.state[2]]] }, [0, 1]);
    } catch (err) {
      this._renderPlot();
    }
  };

  Widget.prototype.reset = function () {
    this._resetStateRandom();
  };

  /* ----------------------
     Public API
     ---------------------- */
  L._instances = {};

  L.init = function (containerId, options = {}) {
    if (!containerId) throw new Error('LorenzWidget.init requires a containerId string');
    // if instance exists, stop and replace
    if (L._instances[containerId]) {
      try { L._instances[containerId].stop(); } catch (e) {}
      delete L._instances[containerId];
    }
    const w = new Widget(containerId, options);
    L._instances[containerId] = w;
    return w;
  };

  L.get = function (containerId) {
    return L._instances[containerId] || null;
  };

  L.start = function (containerId) {
    const w = L.get(containerId);
    if (w) { w.running = true; w.start(); }
  };

  L.stop = function (containerId) {
    const w = L.get(containerId);
    if (w) { w.running = false; }
  };

  L.reset = function (containerId) {
    const w = L.get(containerId);
    if (w) w.reset();
  };

  // attach to global
  global.LorenzWidget = L;

})(typeof window !== 'undefined' ? window : this);