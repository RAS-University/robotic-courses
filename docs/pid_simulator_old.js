// class SecondOrderSystem {
//     constructor(naturalFrequency = 2, dampingRatio = 0.7, gain = 2, delaySteps = 0) {
//         this.wn = naturalFrequency;
//         this.zeta = dampingRatio;
//         this.gain = gain;
//         this.x = [0.0, 0.0];
//         this.delaySteps = delaySteps;
//         this.inputBuffer = new Array(this.delaySteps).fill(0.0);
//     }
//     update(controlInput, dt) {
//         this.inputBuffer.push(controlInput);
//         const delayedInput = this.inputBuffer.shift();
//         const dxdt = this.x[1];
//         const dvdt = this.gain * delayedInput - 2 * this.zeta * this.wn * this.x[1] - Math.pow(this.wn, 2) * this.x[0];
//         this.x[0] += dxdt * dt;
//         this.x[1] += dvdt * dt;
//         return this.x[0];
//     }
// }

class SecondOrderSystem {
    constructor(naturalFrequency = 1.5, dampingRatio = 0.3, gain = 1, delaySteps = 1) {
        this.wn = naturalFrequency;
        this.zeta = dampingRatio;
        this.gain = gain;
        this.x = [0.0, 0.0]; // [position, velocity]
        this.delaySteps = delaySteps;
        this.inputBuffer = new Array(this.delaySteps).fill(0.0);
        this.noiseEnabled = false; // NEW
    }

    enableNoise(flag) {
        this.noiseEnabled = flag;
    }

    reset() {
        this.x = [0.0, 0.0];
        this.inputBuffer = new Array(this.delaySteps).fill(0.0);
    }

    update(controlInput, dt) {
        this.inputBuffer.push(controlInput);
        const delayedInput = this.inputBuffer.shift();

        const position = this.x[0];
        const velocity = this.x[1];

        let noise = 0;
        if (this.noiseEnabled) {
            noise = (Math.random() - 0.5) * 0.1; // Adjust amplitude here
        }

        const acceleration = this.gain * Math.pow(this.wn, 2) * delayedInput
            - 2 * this.zeta * this.wn * velocity
            - Math.pow(this.wn, 2) * position
            + noise; // Add noise here

        this.x[1] += acceleration * dt;
        this.x[0] += this.x[1] * dt;

        return this.x[0];
    }
}


// class PIDController {
//     constructor(kp = 1.0, ki = 0.0, kd = 0.0) {
//         this.kp = kp;
//         this.ki = ki;
//         this.kd = kd;
//         this.previousError = 0;
//         this.integral = 0;
//         this.previousDerivative = 0;
//         this.alpha = 0.1; // Low-pass filter coefficient
//     }
//     update(setpoint, processVariable, dt) {
//         const error = setpoint - processVariable;
//         this.integral += error * dt;
        
//         let derivative = 0;
//         if (dt > 0) {
//             derivative = (error - this.previousError) / dt;
//         }
        
//         // Use exponential smoothing instead of moving average
//         const filteredDerivative = this.alpha * derivative + (1 - this.alpha) * this.previousDerivative;
//         this.previousDerivative = filteredDerivative;
        
//         const output = this.kp * error + this.ki * this.integral + this.kd * filteredDerivative;
        
//         console.log(`PID Output: ${output.toFixed(4)}, Error: ${error.toFixed(4)}, Integral: ${this.integral.toFixed(4)}, Derivative: ${filteredDerivative.toFixed(4)}, Kp: ${this.kp.toFixed(4)}, Ki: ${this.ki.toFixed(4)}, Kd: ${this.kd.toFixed(4)}`);

//         this.previousError = error;
//         return output;
//     }
// }
class PIDController {
    constructor(kp = 1.0, ki = 0.0, kd = 0.0) {
        this.kp = kp;
        this.ki = ki;
        this.kd = kd;
        this.alpha = 0.1; // Add this missing line!
        this.reset();
    }
    
    reset() {
        this.previousError = 0;
        this.integral = 0;
        this.previousDerivative = 0;
    }
    
    update(setpoint, processVariable, dt) {
        const error = setpoint - processVariable;
        this.integral += error * dt;
        
        let derivative = 0;
        if (dt > 0) {
            derivative = (error - this.previousError) / dt;
        }
        
        // Use exponential smoothing instead of moving average
        const filteredDerivative = this.alpha * derivative + (1 - this.alpha) * this.previousDerivative;
        this.previousDerivative = filteredDerivative;
        
        const output = this.kp * error + this.ki * this.integral + this.kd * filteredDerivative;
        
        console.log(`PID Output: ${output.toFixed(4)}, Error: ${error.toFixed(4)}, Integral: ${this.integral.toFixed(4)}, Derivative: ${filteredDerivative.toFixed(4)}, Kp: ${this.kp.toFixed(4)}, Ki: ${this.ki.toFixed(4)}, Kd: ${this.kd.toFixed(4)}`);

        this.previousError = error;
        return output;
    }
}
function initializePIDSimulator(containerId, showZieglerNicholsButton = false) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with ID "${containerId}" not found.`);
        return;
    }

    const zieglerNicholsButton = container.querySelector('.ziegler-nichols-button');
    if (zieglerNicholsButton) {
        zieglerNicholsButton.style.display = showZieglerNicholsButton ? 'inline-block' : 'none';
    }

    const numPoints = 2000;
    const config = {
        setpoint: 1.0,
        timePoints: Array.from({length: numPoints}, (_, i) => i * 50 / numPoints),
        dt: 50 / numPoints,
        chart: null,
        sliderElements: {
            kp: container.querySelector('.kp-slider'),
            ki: container.querySelector('.ki-slider'),
            kd: container.querySelector('.kd-slider')
        },
        valueElements: {
            kp: container.querySelector('.kp-value'),
            ki: container.querySelector('.ki-value'),
            kd: container.querySelector('.kd-value')
        },
        initialValues: {
            kp: parseFloat(container.querySelector('.kp-slider').value),
            ki: parseFloat(container.querySelector('.ki-slider').value),
            kd: parseFloat(container.querySelector('.kd-slider').value)
        }
    };
    
    // function updateChart() {
    //     const kp = parseFloat(config.sliderElements.kp.value);
    //     const ki = parseFloat(config.sliderElements.ki.value);
    //     const kd = parseFloat(config.sliderElements.kd.value);
        
    //     config.valueElements.kp.textContent = kp.toFixed(2);
    //     config.valueElements.ki.textContent = ki.toFixed(3);
    //     config.valueElements.kd.textContent = kd.toFixed(2);
        
    //     const pidSystem = new SecondOrderSystem();

    //     const pidController = new PIDController(kp, ki, kd);

    //     const pidOutputHistory = [];
    
    //     for (let i = 0; i < config.timePoints.length; i++) {
    //         const controlSignal = pidController.update(config.setpoint, pidSystem.x[0], config.dt);
    //         const systemOutput = pidSystem.update(controlSignal, config.dt);
    //         pidOutputHistory.push(systemOutput);
    //     }
        
    //     config.chart.data.labels = config.timePoints.map(t => t.toFixed(2));
    //     config.chart.data.datasets[0].data = Array(config.timePoints.length).fill(config.setpoint);
    //     config.chart.data.datasets[1].data = pidOutputHistory;
        
    //     config.chart.update();
    // }

    function updateChart() {
        const kp = parseFloat(config.sliderElements.kp.value);
        const ki = parseFloat(config.sliderElements.ki.value);
        const kd = parseFloat(config.sliderElements.kd.value);
        
        config.valueElements.kp.textContent = kp.toFixed(2);
        config.valueElements.ki.textContent = ki.toFixed(3);
        config.valueElements.kd.textContent = kd.toFixed(2);
        
        const pidSystem = new SecondOrderSystem();
        pidSystem.reset();

        const pidController = new PIDController(kp, ki, kd);
        pidController.reset();

        const pidOutputHistory = [];
        const controlSignalHistory = []; // Track control signals
    
        for (let i = 0; i < config.timePoints.length; i++) {
            const controlSignal = pidController.update(config.setpoint, pidSystem.x[0], config.dt);
            const systemOutput = pidSystem.update(controlSignal, config.dt);
            pidOutputHistory.push(systemOutput);
            controlSignalHistory.push(controlSignal); // Store control signal
        }
        
        // Calculate energy metrics
        const energyConsumption = controlSignalHistory.reduce((sum, signal) => sum + signal * signal * config.dt, 0);
        const maxControlSignal = Math.max(...controlSignalHistory.map(Math.abs));
        
        // Update energy display if it exists
        const energyDisplay = container.querySelector('.energy-display');
        if (energyDisplay) {
            energyDisplay.innerHTML = `
                <strong>Energy Consumption:</strong> ${energyConsumption.toFixed(2)} J<br>
                <strong>Max Control Signal:</strong> ${maxControlSignal.toFixed(2)}<br>
                <span style="color: ${maxControlSignal > 10 ? 'red' : 'green'};">
                    ${maxControlSignal > 10 ? '⚠️ High actuator stress!' : '✓ Actuator safe'}
                </span>
            `;
        }
        
        config.chart.data.labels = config.timePoints.map(t => t.toFixed(2));
        config.chart.data.datasets[0].data = Array(config.timePoints.length).fill(config.setpoint);
        config.chart.data.datasets[1].data = pidOutputHistory;
        config.chart.data.datasets[2].data = controlSignalHistory; // Add control signal data
        
        config.chart.update();
    }
    
    
    function applyZieglerNichols() {
        // Step 1: Find ultimate gain (Ku)
        let ku = 0;
        let foundKu = false;
        let trialKp = 0.1;
        
        const maxKuAttempts = 50;
        for (let attempts = 0; attempts < maxKuAttempts; attempts++) {
            // RESET system and controller for each trial
            const pidSystem = new SecondOrderSystem();
            const pidController = new PIDController(trialKp, 0, 0);
            pidController.reset();
            
            const history = [];
            
            for (let i = 0; i < config.timePoints.length; i++) {
                const controlSignal = pidController.update(config.setpoint, pidSystem.x[0], config.dt);
                const systemOutput = pidSystem.update(controlSignal, config.dt);
                history.push(systemOutput);
            }
            
            // Check for sustained oscillation in the last half of the simulation
            const lastHalf = history.slice(Math.floor(history.length / 2));
            const maxOutput = Math.max(...lastHalf);
            const minOutput = Math.min(...lastHalf);
            const oscillationAmplitude = maxOutput - minOutput;
            
            // Look for sustained oscillation (amplitude > threshold)
            if (oscillationAmplitude > 0.1) {
                ku = trialKp;
                foundKu = true;
                break;
            }
            
            trialKp *= 1.2; // Increase more aggressively
            
            if (trialKp > 50) { // Prevent infinite loop
                break;
            }
        }
        
        if (!foundKu) {
            console.warn("Could not find Ultimate Gain. System may be too stable.");
            alert("Could not find Ultimate Gain. Try a different system or manual tuning.");
            return;
        }
        
        console.log(`Ultimate Gain (Ku) found: ${ku.toFixed(2)}`);

        // Step 2: Find ultimate period (Tu) with the found Ku
        const pidSystem = new SecondOrderSystem();
        const pidController = new PIDController(ku, 0, 0);
        pidController.reset();
        
        const history = [];
        
        for (let i = 0; i < config.timePoints.length; i++) {
            const controlSignal = pidController.update(config.setpoint, pidSystem.x[0], config.dt);
            const systemOutput = pidSystem.update(controlSignal, config.dt);
            history.push({ t: config.timePoints[i], y: systemOutput });
        }
        
        // Find peaks in the last half to avoid transient behavior
        const lastHalfStart = Math.floor(history.length / 2);
        const peakTimes = [];
        
        for (let i = lastHalfStart + 1; i < history.length - 1; i++) {
            if (history[i].y > history[i - 1].y && history[i].y > history[i + 1].y) {
                // Additional check: peak must be significantly above average
                const localAvg = (history[i-1].y + history[i].y + history[i+1].y) / 3;
                if (history[i].y > localAvg + 0.02) {
                    peakTimes.push(history[i].t);
                }
            }
        }
        
        let tu = 0;
        if (peakTimes.length >= 2) {
            // Calculate average period from multiple peaks
            const periods = [];
            for (let i = 1; i < peakTimes.length; i++) {
                periods.push(peakTimes[i] - peakTimes[i-1]);
            }
            tu = periods.reduce((a, b) => a + b, 0) / periods.length;
        }
        
        if (tu <= 0 || !isFinite(tu)) {
            console.warn("Could not find Ultimate Period. Using estimated value.");
            tu = 2.0; // Fallback value
        }
        
        console.log(`Ultimate Period (Tu) found: ${tu.toFixed(2)}`);

        // Step 3: Apply Ziegler-Nichols PID tuning rules
        const kp_zn = 0.6 * ku;
        const ki_zn = 2 * kp_zn / tu; // Ki = 2*Kp/Tu
        const kd_zn = kp_zn * tu / 8;  // Kd = Kp*Tu/8
        
        console.log(`Ziegler-Nichols values: Kp=${kp_zn.toFixed(3)}, Ki=${ki_zn.toFixed(3)}, Kd=${kd_zn.toFixed(3)}`);

        // Apply the values
        if (isFinite(kp_zn) && isFinite(ki_zn) && isFinite(kd_zn) && 
            kp_zn > 0 && ki_zn > 0 && kd_zn > 0) {
            
            config.sliderElements.kp.value = Math.min(kp_zn, parseFloat(config.sliderElements.kp.max));
            config.sliderElements.ki.value = Math.min(ki_zn, parseFloat(config.sliderElements.ki.max));
            config.sliderElements.kd.value = Math.min(kd_zn, parseFloat(config.sliderElements.kd.max));
            updateChart();
            
            alert(`Ziegler-Nichols tuning applied!\nKp: ${kp_zn.toFixed(3)}\nKi: ${ki_zn.toFixed(3)}\nKd: ${kd_zn.toFixed(3)}`);
        } else {
            console.error("Invalid Ziegler-Nichols values calculated.");
            alert("Could not calculate valid Ziegler-Nichols parameters. Try manual tuning.");
        }
    }

    function resetSliders() {
        config.sliderElements.kp.value = config.initialValues.kp;
        config.sliderElements.ki.value = config.initialValues.ki;
        config.sliderElements.kd.value = config.initialValues.kd;
        updateChart();
    }
    
    const ctx = container.querySelector('.pid-chart').getContext('2d');
    config.chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: config.timePoints.map(t => t.toFixed(2)),
            datasets: [{
                label: 'Setpoint',
                data: [],
                borderColor: 'rgb(54, 162, 235)',
                borderDash: [5, 5],
                fill: false,
                pointRadius: 0,
                yAxisID: 'y'
            }, {
                label: 'System Output',
                data: [],
                borderColor: 'rgb(153, 102, 255)',
                fill: false,
                pointRadius: 0,
                yAxisID: 'y'
            }, {
                label: 'Control Signal',
                data: [],
                borderColor: 'rgba(255, 211, 99, 0.84)',
                fill: false,
                pointRadius: 0,
                yAxisID: 'y1' // Use secondary y-axis
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 0
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Time'
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'System Output'
                    },
                    min: -0.5,
                    max: 1.5
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Control Signal (output of the controller)'
                    },
                    grid: {
                        drawOnChartArea: false,
                    },
                }
            }
        }
    });



    config.sliderElements.kp.addEventListener('input', updateChart);
    config.sliderElements.ki.addEventListener('input', updateChart);
    config.sliderElements.kd.addEventListener('input', updateChart);
    container.querySelector('.ziegler-nichols-button')?.addEventListener('click', applyZieglerNichols);
    container.querySelector('.reset-button')?.addEventListener('click', resetSliders);
    
    updateChart();
}