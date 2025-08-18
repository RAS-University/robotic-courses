import tkinter as tk
from tkinter import ttk
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
from collections import deque

class SecondOrderSystem:
    def __init__(self, natural_frequency=2.0, damping_ratio=0.5, gain=1.0, delay_steps=10):
        self.wn = natural_frequency
        self.zeta = damping_ratio
        self.gain = gain
        self.x = np.zeros(2)
        self.delay_steps = delay_steps
        self.input_buffer = deque([0.0] * self.delay_steps)

    def update(self, control_input, dt):
        self.input_buffer.append(control_input)
        delayed_input = self.input_buffer.popleft()
        
        dxdt = self.x[1]
        dvdt = self.gain * delayed_input - 2 * self.zeta * self.wn * self.x[1] - self.wn**2 * self.x[0]
        
        self.x[0] += dxdt * dt
        self.x[1] += dvdt * dt
        
        return self.x[0]

class PIDController:
    def __init__(self, kp=1.0, ki=0.0, kd=0.0):
        self.kp = kp
        self.ki = ki
        self.kd = kd
        self.previous_error = 0
        self.integral = 0
        self.derivative_filter = deque([0.0] * 5)

    def update(self, setpoint, process_variable, dt):
        error = setpoint - process_variable
        self.integral += error * dt
        
        if dt > 0:
            derivative = (error - self.previous_error) / dt
        else:
            derivative = 0.0
            
        self.derivative_filter.append(derivative)
        self.derivative_filter.popleft()
        filtered_derivative = sum(self.derivative_filter) / len(self.derivative_filter)
        
        output = self.kp * error + self.ki * self.integral + self.kd * filtered_derivative
        self.previous_error = error
        
        return output

class PIDInterface:
    def __init__(self, master):
        self.master = master
        master.title("PID Controller Tuning")

        style = ttk.Style(self.master)
        style.configure("TLabel", font=("Arial", 12))
        style.configure("TScale", troughcolor="gray", sliderrelief="flat")
        self.master.bind("<Configure>", self.on_resize)
        
        self.setpoint = 1
        self.time_points = np.linspace(0, 50, 1000)
        self.dt = self.time_points[-1] / len(self.time_points)

        self.kp_val = tk.DoubleVar(value=2.5)
        self.ki_val = tk.DoubleVar(value=0.02)
        self.kd_val = tk.DoubleVar(value=12.0)

        self.create_widgets()
        self.update_plot(None)

    def create_widgets(self):
        slider_frame = ttk.Frame(self.master)
        slider_frame.grid(row=0, column=0, columnspan=3, sticky="ew")
        slider_frame.grid_columnconfigure(1, weight=1)
        
        # Kp Slider
        ttk.Label(slider_frame, text="Kp:").grid(row=0, column=0, padx=5, pady=5, sticky="w")
        self.kp_slider = tk.Scale(slider_frame, from_=0, to=30, variable=self.kp_val, command=self.update_plot, resolution=0.01, orient="horizontal", length=300)
        self.kp_slider.grid(row=0, column=1, padx=5, pady=5, sticky="ew")
        self.kp_label = ttk.Label(slider_frame)
        self.kp_label.grid(row=0, column=2, padx=5, pady=5, sticky="w")
        self.kp_slider.bind("<Right>", lambda e: self.kp_slider.set(self.kp_val.get() + 0.01))
        self.kp_slider.bind("<Left>", lambda e: self.kp_slider.set(self.kp_val.get() - 0.01))

        # Ki Slider
        ttk.Label(slider_frame, text="Ki:").grid(row=1, column=0, padx=5, pady=5, sticky="w")
        self.ki_slider = tk.Scale(slider_frame, from_=0, to=5, variable=self.ki_val, command=self.update_plot, resolution=0.001, orient="horizontal", length=300)
        self.ki_slider.grid(row=1, column=1, padx=5, pady=5, sticky="ew")
        self.ki_label = ttk.Label(slider_frame)
        self.ki_label.grid(row=1, column=2, padx=5, pady=5, sticky="w")
        self.ki_slider.bind("<Right>", lambda e: self.ki_slider.set(self.ki_val.get() + 0.01))
        self.ki_slider.bind("<Left>", lambda e: self.ki_slider.set(self.ki_val.get() - 0.01))

        # Kd Slider
        ttk.Label(slider_frame, text="Kd:").grid(row=2, column=0, padx=5, pady=5, sticky="w")
        self.kd_slider = tk.Scale(slider_frame, from_=0, to=40, variable=self.kd_val, command=self.update_plot, resolution=0.1, orient="horizontal", length=300)
        self.kd_slider.grid(row=2, column=1, padx=5, pady=5, sticky="ew")
        self.kd_label = ttk.Label(slider_frame)
        self.kd_label.grid(row=2, column=2, padx=5, pady=5, sticky="w")
        self.kd_slider.bind("<Right>", lambda e: self.kd_slider.set(self.kd_val.get() + 0.01))
        self.kd_slider.bind("<Left>", lambda e: self.kd_slider.set(self.kd_val.get() - 0.01))

        # Tuning button
        button_frame = ttk.Frame(slider_frame)
        button_frame.grid(row=3, column=0, columnspan=3, pady=10, sticky="ew")
        button_frame.grid_columnconfigure(0, weight=1)
        button_frame.grid_columnconfigure(1, weight=1)

        tune_button = ttk.Button(button_frame, text="Ziegler-Nichols Tune", command=self.perform_ziegler_nichols_tuning)
        tune_button.grid(row=0, column=0, padx=5, pady=5) # Removed sticky="ew"

        reset_button = ttk.Button(button_frame, text="Reset", command=self.reset_simulation)
        reset_button.grid(row=0, column=1, padx=5, pady=5) # Removed sticky="ew"

        # Plot
        self.fig, self.ax = plt.subplots(figsize=(8, 6))
        self.canvas = FigureCanvasTkAgg(self.fig, master=self.master)
        self.canvas_widget = self.canvas.get_tk_widget()
        self.canvas_widget.grid(row=1, column=0, columnspan=3, padx=5, pady=5, sticky="nsew")

        self.ax.grid(True)
        self.line_setpoint, = self.ax.plot([], [], '--b', label='Setpoint')
        self.line_pid, = self.ax.plot([], [], '-m', label='PID Control')
        self.ax.legend()
        
        self.master.grid_columnconfigure(0, weight=1)
        self.master.grid_rowconfigure(1, weight=1)

    def on_resize(self, event):
        width = self.master.winfo_width()
        height = self.master.winfo_height()

        new_tk_size = int(min(width, height) / 50)
        if new_tk_size < 8: new_tk_size = 8
        style = ttk.Style(self.master)
        style.configure("TLabel", font=("Arial", new_tk_size))
        
        new_plot_size = int(min(width, height) / 50)
        if new_plot_size < 8: new_plot_size = 8
        
        self.ax.set_title("System Response", fontsize=new_plot_size + 4)
        self.ax.set_xlabel("Time", fontsize=new_plot_size)
        self.ax.set_ylabel("Output", fontsize=new_plot_size)
        self.ax.tick_params(axis='both', which='major', labelsize=new_plot_size)
        self.ax.legend(fontsize=new_plot_size)

        style.configure("TButton", font=("Arial", new_tk_size))
        
        self.canvas.draw_idle()
    
    def perform_ziegler_nichols_tuning(self):
        print("Performing Ziegler-Nichols tuning...")
        ku_found = False
        ku = 0
        pu = 0
        
        # Search for ultimate gain (Ku)
        for kp_test in np.arange(0.1, 10, 0.1):
            pid_system = SecondOrderSystem()
            pid_controller = PIDController(kp=kp_test, ki=0, kd=0)
            
            output_history = []
            for t in self.time_points:
                control_signal = pid_controller.update(self.setpoint, pid_system.x[0], self.dt)
                system_output = pid_system.update(control_signal, self.dt)
                output_history.append(system_output)
            
            # Check for sustained oscillations
            crossings = np.where(np.diff(np.sign(np.array(output_history) - self.setpoint)))[0]
            if len(crossings) > 4: # Must cross setpoint multiple times
                peaks = np.where((np.diff(np.sign(np.diff(output_history)))) == -2)[0] + 1
                if len(peaks) > 1:
                    peak_amplitudes = [output_history[p] for p in peaks]
                    if np.std(peak_amplitudes[-3:]) < 0.05 * self.setpoint: # Check for stable amplitude
                        ku = kp_test
                        pu = self.time_points[peaks[-1]] - self.time_points[peaks[-2]]
                        ku_found = True
                        break
        
        if ku_found:
            kp_tuned = 0.6 * ku
            ki_tuned = (1.2 * ku) / pu
            kd_tuned = (ku * pu) / 8
            
            print(f"Ultimate Gain (Ku): {ku:.2f}")
            print(f"Ultimate Period (Pu): {pu:.2f} s")
            print(f"Calculated PID Gains: Kp={kp_tuned:.2f}, Ki={ki_tuned:.2f}, Kd={kd_tuned:.2f}")
            
            # Update sliders with calculated values
            self.kp_val.set(kp_tuned)
            self.ki_val.set(ki_tuned)
            self.kd_val.set(kd_tuned)
            self.update_plot(None)
        else:
            print("Ziegler-Nichols tuning failed. Could not find sustained oscillations.")

    def update_plot(self, event):
        self.kp_label.config(text=f"{self.kp_val.get():.2f}")
        self.ki_label.config(text=f"{self.ki_val.get():.2f}")
        self.kd_label.config(text=f"{self.kd_val.get():.2f}")

        pid_system = SecondOrderSystem()
        pid_controller = PIDController(kp=self.kp_val.get(), ki=self.ki_val.get(), kd=self.kd_val.get())

        pid_output_history = []
        for t in self.time_points:
            control_signal = pid_controller.update(self.setpoint, pid_system.x[0], self.dt)
            system_output = pid_system.update(control_signal, self.dt)
            pid_output_history.append(system_output)
        
        self.line_setpoint.set_data(self.time_points, [self.setpoint] * len(self.time_points))
        self.line_pid.set_data(self.time_points, pid_output_history)
        
        self.ax.relim()
        self.ax.autoscale_view()
        self.canvas.draw()
    
    def reset_simulation(self):
        self.kp_val.set(2.5)
        self.ki_val.set(0.02)
        self.kd_val.set(12.0)
        self.update_plot(None)

if __name__ == "__main__":
    root = tk.Tk()
    app = PIDInterface(root)
    root.mainloop()