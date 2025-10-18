function LorenzStep([x, y, z], sigma, rho, beta, dt) {
    // 4th order Runge-Kutta for Lorenz system
    function f([x, y, z]) {
        return [
            sigma * (y - x),
            x * (rho - z) - y,
            x * y - beta * z
        ];
    }
    const k1 = f([x, y, z]);
    const k2 = f([x + 0.5 * dt * k1[0], y + 0.5 * dt * k1[1], z + 0.5 * dt * k1[2]]);
    const k3 = f([x + 0.5 * dt * k2[0], y + 0.5 * dt * k2[1], z + 0.5 * dt * k2[2]]);
    const k4 = f([x + dt * k3[0], y + dt * k3[1], z + dt * k3[2]]);
    return [
        x + dt / 6 * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]),
        y + dt / 6 * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]),
        z + dt / 6 * (k1[2] + 2 * k2[2] + 2 * k3[2] + k4[2])
    ];
}

function initializeLorenzSimulator(containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.warn(`initializeLorenzSimulator: container '${containerId}' not found.`);
        return;
    }
    const sigmaSlider = container.querySelector('.lorenz-sigma-slider');
    const rhoSlider = container.querySelector('.lorenz-rho-slider');
    const betaSlider = container.querySelector('.lorenz-beta-slider');
    const dtSlider = container.querySelector('.lorenz-dt-slider');
    const sigmaVal = container.querySelector('.lorenz-sigma-value');
    const rhoVal = container.querySelector('.lorenz-rho-value');
    const betaVal = container.querySelector('.lorenz-beta-value');
    const dtVal = container.querySelector('.lorenz-dt-value');
    const resetBtn = container.querySelector('.reset-button');
    // Use a div for Plotly 3D plot
    let plotDiv = container.querySelector('.lorenz-plotly-3d');
    if (!plotDiv) {
        plotDiv = document.createElement('div');
        plotDiv.className = 'lorenz-plotly-3d';
        plotDiv.style.width = '100%';
        plotDiv.style.height = '500px';
        // Remove old canvas if present and insert Plotly div in its place
        const oldCanvas = container.querySelector('.lorenz-chart');
        if (oldCanvas && oldCanvas.parentNode) {
            oldCanvas.parentNode.replaceChild(plotDiv, oldCanvas);
        } else {
            // Try to append into .chart-container (used in the markdown page)
            const chartContainer = container.querySelector('.chart-container') || container.querySelector('.pid-chart-container');
            if (chartContainer) chartContainer.appendChild(plotDiv);
            else container.appendChild(plotDiv);
        }
    }

    // Remove any 2D plot if present
    const oldTimePlot = container.querySelector('.lorenz-time-plot');
    if (oldTimePlot) oldTimePlot.remove();

    // If sliders are missing, use sensible defaults
    let params = {
        sigma: sigmaSlider ? parseFloat(sigmaSlider.value) : 10.0,
        rho: rhoSlider ? parseFloat(rhoSlider.value) : 28.0,
        beta: betaSlider ? parseFloat(betaSlider.value) : 8.0/3.0,
        dt: dtSlider ? parseFloat(dtSlider.value) : 0.01
    };

    function updateLabels() {
        sigmaVal.textContent = params.sigma.toFixed(2);
        rhoVal.textContent = params.rho.toFixed(2);
        betaVal.textContent = params.beta.toFixed(2);
        dtVal.textContent = params.dt.toFixed(3);
    }

    // Animation and trajectory state
    let state0 = [0.1, 0, 0];
    let state = state0.slice();
    let xs = [], ys = [], zs = [];
    const TRAIL_LEN = 1000; // Number of points in the tail
    let animTimer = null;
    let running = true;

    function resetTrajectory(randomize = false, resetBtn = false) {
        if (randomize) {
            state0 = [
                Math.random() * 0.5 - 0.25,
                Math.random() * 0.5 - 0.25,
                Math.random() * 0.5 - 0.25 + 1.0
            ];
        } else if (resetBtn) {
            // Reset to default initial condition and parameters
            state0 = [0.1, 0, 0];
            params = {
                sigma: 10.0,
                rho: 28.0,
                beta: 8.0 / 3.0,
                dt: 0.01
            };
            sigmaSlider.value = params.sigma;
            rhoSlider.value = params.rho;
            betaSlider.value = params.beta;
            dtSlider.value = params.dt;
            updateLabels();
        }
        state = state0.slice();
        xs = [state[0]];
        ys = [state[1]];
        zs = [state[2]];
        // Advance the system by 2000 steps before starting animation
        for (let i = 0; i < 2000; ++i) {
            state = LorenzStep(state, params.sigma, params.rho, params.beta, params.dt);
            xs.push(state[0]);
            ys.push(state[1]);
            zs.push(state[2]);
            if (xs.length > TRAIL_LEN) {
                xs.shift(); ys.shift(); zs.shift();
            }
        }
    }

    function plot3D() {
        const trace = {
            x: xs,
            y: ys,
            z: zs,
            mode: 'lines',
            type: 'scatter3d',
            line: { width: 3, color: '#36a2eb' },
            name: 'Trajectory'
        };
        const point = {
            x: [xs[xs.length-1]],
            y: [ys[ys.length-1]],
            z: [zs[zs.length-1]],
            mode: 'markers',
            type: 'scatter3d',
            marker: { size: 6, color: '#e74c3c' },
            name: 'Current'
        };
        const layout = {
            margin: { l: 0, r: 0, b: 0, t: 0 },
            scene: {
                // xaxis: { title: 'x', range: [-30, 30] },
                // yaxis: { title: 'y', range: [-30, 30] },
                // zaxis: { title: 'z', range: [-5, 60] },
                xaxis: { title: 'x' },
                yaxis: { title: 'y' },
                zaxis: { title: 'z' },
                aspectmode: 'auto',
                camera: {
                    eye: { x: 1.2, y: 0.6, z: 0.5 }
                }
            },
            showlegend: false
        };
        Plotly.newPlot(plotDiv, [trace, point], layout, {
            responsive: true,
            // staticPlot: true // Prevents camera from changing during animation
        });
    }

    function animateStep() {
        // Integrate one step
        state = LorenzStep(state, params.sigma, params.rho, params.beta, params.dt);
        xs.push(state[0]);
        ys.push(state[1]);
        zs.push(state[2]);
        if (xs.length > TRAIL_LEN) {
            xs.shift(); ys.shift(); zs.shift();
        }
        // Efficiently update the plot
        Plotly.restyle(plotDiv, {
            x: [xs, [xs[xs.length-1]]],
            y: [ys, [ys[ys.length-1]]],
            z: [zs, [zs[zs.length-1]]]
        }, [0, 1]);
    }

    function startAnimation() {
        if (animTimer) clearInterval(animTimer);
        animTimer = setInterval(() => {
            if (running) animateStep();
        }, 30); // ~33 FPS  <-- Change this value for animation speed
    }

    function stopAnimation() {
        if (animTimer) clearInterval(animTimer);
        animTimer = null;
    }

    function updateParams() {
        params.sigma = sigmaSlider ? parseFloat(sigmaSlider.value) : params.sigma;
        params.rho = rhoSlider ? parseFloat(rhoSlider.value) : params.rho;
        params.beta = betaSlider ? parseFloat(betaSlider.value) : params.beta;
        params.dt = dtSlider ? parseFloat(dtSlider.value) : params.dt;
        updateLabels();
        // Reset trajectory to avoid discontinuity
        resetTrajectory(false);
        plot3D();
    }

    if (sigmaSlider) sigmaSlider.addEventListener('input', updateParams);
    if (rhoSlider) rhoSlider.addEventListener('input', updateParams);
    if (betaSlider) betaSlider.addEventListener('input', updateParams);
    if (dtSlider) dtSlider.addEventListener('input', updateParams);

    if (resetBtn) resetBtn.addEventListener('click', () => {
        resetTrajectory(false, true);
        plot3D();
    });

    // Optionally, add play/pause on click or keyboard
    plotDiv.addEventListener('click', () => {
        running = !running;
    });
    document.addEventListener('keydown', (ev) => {
        if (ev.key === ' ') running = !running;
        if (ev.key === 'r') {
            resetTrajectory(true);
            plot3D();
        }
    });

    // Initial setup
    updateLabels();
    resetTrajectory(false);
    plot3D();
    startAnimation();
}
