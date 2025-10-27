function phase_plane_saturation()
    % Phase plane analysis of the nonlinear system with saturation
    % dot{x1} = x1 + sat(-9/2*x1 + 1/2*x2)
    % dot{x2} = -x2 + sat(-9/2*x1 + 1/2*x2)

    % Define grid for vector field
    xmin = -4; xmax = 4;
    ymin = -3; ymax = 3;
    nx = 25; ny = 25;
    [X1, X2] = meshgrid(linspace(xmin, xmax, nx), linspace(ymin, ymax, ny));

    % Vector field
    U = X1 + sat(-4.5 * X1 + 0.5 * X2);
    V = -X2 + sat(-4.5 * X1 + 0.5 * X2);

    % Normalize arrows for nicer quiver plot
    M = hypot(U, V);
    M(M == 0) = 1;
    U2 = U ./ M;
    V2 = V ./ M;

    % Plot setup
    figure('Position', [200 100 1000 600]); hold on;
    quiver(X1, X2, U2, V2, 0.6, 'Color', [0.5 0.5 0.5]);
    colormap('parula'); % ✅ Changed from 'plasma' to 'parula'

    xlabel('x_1', 'FontSize', 14);
    ylabel('x_2', 'FontSize', 14);
    title('Phase plane: vector field + trajectories', 'FontSize', 18);
    xlim([xmin xmax]);
    ylim([ymin ymax]);
    grid on;

    % Compute and plot nullclines (dx/dt = 0 and dy/dt = 0)
    DX = U;
    DY = V;
    contour(X1, X2, DX, [0 0], 'r--', 'LineWidth', 2);
    contour(X1, X2, DY, [0 0], 'b--', 'LineWidth', 2);

    % List of initial conditions
    ic_list = [
        -0.5,  2.4;
        -1.01, -1.5;
        -0.99, -1.5;
         0,   -2.75;
         0,   -1.0;
         1.001, 2;
         0.999, 2
    ];

    % Time span for integration
    tspan = [0 40];

    % Simulate trajectories
    for k = 1:size(ic_list,1)
        ic = ic_list(k,:);
        [t, z] = ode45(@(t, z) f(t, z), tspan, ic);
        plot(z(:,1), z(:,2), '-k', 'LineWidth', 1);
        plot(ic(1), ic(2), 'xr', 'LineWidth', 2, 'MarkerSize', 8);
    end

    % Legend
    legend({'Vector field', 'dx1/dt = 0', 'dx2/dt = 0', ...
        'Trajectories', 'Start points'}, ...
        'Location', 'northeastoutside');

    hold off;

    % Save figure
    saveas(gcf, 'Phase_plane_plot_MATLAB.png');
end

%-------------------------------------------------------------
% System dynamics
function dz = f(~, z)
    x1 = z(1);
    x2 = z(2);
    u = -4.5 * x1 + 0.5 * x2;
    dx1 = x1 + sat(u);
    dx2 = -x2 + sat(u);
    dz = [dx1; dx2];
end

%-------------------------------------------------------------
% Saturation function
function y = sat(u)
    y = min(max(u, -1), 1);
end