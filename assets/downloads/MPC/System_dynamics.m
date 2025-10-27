% Define the values
c_A0 = 1.0;   % Initial concentration of A (mol/L)
C_B0 = 0.0;   % Initial concentration of B (mol/L)
C_C0 = 0.0;   % Initial concentration of C (mol/L)
k1 = 2.0;     % Rate constant for A -> B (1/min)
k2 = 1.0;     % Rate constant for B -> C (1/min)

A_0 = 5.0;    % Initial concentration of A

% Time vector
T = linspace(0, 10, 100);    
U = zeros(size(T));          % Input (none, zero vector)
X0 = [A_0; 0; 0];            % Initial state

% Define the state-space representation
A = [-k1   0    0;
      k1  -k2   0;
      0    k2   0];
B = [0; 0; 0];         % No input
C = [0 0 1];           % We are interested in concentration of C
D = 0;

% Create the state-space system
system = ss(A, B, C, D);

% Simulate system response with initial conditions
[yout, T, xout] = initial(system, X0, T);

% Plot dynamics
figure;
plot(T, xout(:,1), '--b', 'DisplayName', 'Concentration of A'); hold on;
plot(T, xout(:,2), '--g', 'DisplayName', 'Concentration of B');
plot(T, yout, '-r', 'LineWidth', 2, 'DisplayName', 'Concentration of C');
xlabel('Time (min)');
ylabel('Concentration (mol/L)');
title('System Dynamics initial state A = 5 mol/L');
legend('show');
grid on;