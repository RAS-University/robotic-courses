--[[Aggregation with two spots and taxis behaviors

This controller extends the two-spot aggregation (Exercise 2) with a taxis behavior.

In Exercise 2, robots that are stopped on a spot emit a signal (data[1] = 1) to let
others know a cluster is forming. However, the walking robots still use a pure random
walk to find the spot, which is slow and undirected.

The taxis behavior makes exploration directed: a walking robot that perceives enough
signaling robots nearby computes an attraction vector towards them and moves in that
direction. This is analogous to how ants follow pheromone trails. The robot leaves the
taxis state and resumes random walk if it loses the cluster signal, or transitions to
the stopped state if it reaches the black spot.

States:
  WALK   — random walk; switches to TAXIS if enough signaling robots are seen
  AVOID  — in-place rotation to escape obstacles (from WALK)
  TAXIS  — directed movement towards signaling robots
  GO_FWD — move forward after finding the black spot (to avoid blocking the entrance)
  STOP   — stopped on the spot; emits signal and periodically decides whether to leave
  LEAVE  — leave the spot and return to WALK

]]

---------------------------------------------------------------------------
-- States
---------------------------------------------------------------------------
WALK   = "WALK"
AVOID  = "AVOID"
GO_FWD = "GO_FWD"
STOP   = "STOP"
LEAVE  = "LEAVE"
TAXIS  = "TAXIS"

---------------------------------------------------------------------------
-- Parameters
---------------------------------------------------------------------------
MAX_TURN_STEPS  = 20    -- max steps for in-place rotation (obstacle avoidance)
FWD_STEPS       = 40    -- steps to go straight after finding the spot
SLEEP_STEPS     = 200   -- steps to sleep before deciding to stay or leave
BASE_LEAVE_PROB = 0.18  -- base probability to leave (scaled by neighbor count)
LEAVE_STEPS     = 50    -- steps to go straight when leaving the spot

-- Taxis parameters
MIN_SIGNAL_ROBOTS = 2   -- minimum signaling robots needed to trigger taxis
TAXIS_RANGE       = 150 -- max range (cm) to consider a signaling robot
TAXIS_SPEED       = 10  -- base speed during taxis movement

---------------------------------------------------------------------------
-- Global state variables
---------------------------------------------------------------------------
current_state        = WALK
is_obstacle_sensed   = false
is_black_sensed      = false
number_robot_sensed  = 0
current_turn_steps   = 0
current_fwd_steps    = 0
current_sleep_steps  = 0

---------------------------------------------------------------------------
-- Utility: table copy (required before sorting robot tables)
---------------------------------------------------------------------------
function table.copy(t)
   local t2 = {}
   for k, v in pairs(t) do
      t2[k] = v
   end
   return t2
end

---------------------------------------------------------------------------
-- Proximity processing: sets is_obstacle_sensed
-- Only front sensors (|angle| < pi/2) are considered.
---------------------------------------------------------------------------
function ProcessProx()
   is_obstacle_sensed = false
   local sort_prox = table.copy(robot.proximity)
   table.sort(sort_prox, function(a, b) return a.value > b.value end)
   if sort_prox[1].value > 0.05 and math.abs(sort_prox[1].angle) < math.pi / 2 then
      is_obstacle_sensed = true
   end
end

---------------------------------------------------------------------------
-- Ground processing: sets is_black_sensed
---------------------------------------------------------------------------
function ProcessGround()
   is_black_sensed = false
   local sort_ground = table.copy(robot.motor_ground)
   table.sort(sort_ground, function(a, b) return a.value < b.value end)
   if sort_ground[1].value == 0 then
      is_black_sensed = true
   end
end

---------------------------------------------------------------------------
-- Count nearby robots that are emitting signal (data[1] == 1).
-- Used by the STOP state to decide whether to stay or leave.
---------------------------------------------------------------------------
function CountRAB()
   number_robot_sensed = 0
   for i = 1, #robot.range_and_bearing do
      if robot.range_and_bearing[i].range < 150 and
         robot.range_and_bearing[i].data[1] == 1 then
         number_robot_sensed = number_robot_sensed + 1
      end
   end
end

---------------------------------------------------------------------------
-- Compute the taxis attraction vector.
-- Only robots within TAXIS_RANGE that are emitting signal contribute.
-- Returns: att_vector {x, y}, n_signal (number of signaling robots found)
---------------------------------------------------------------------------
function ComputeTaxisVector()
   local att_vector  = { x = 0, y = 0 }
   local n_signal    = 0
   for i = 1, #robot.range_and_bearing do
      local r   = robot.range_and_bearing[i]
      if r.range <= TAXIS_RANGE and r.data[1] == 1 then
         att_vector.x = att_vector.x + math.cos(r.horizontal_bearing) * r.range
         att_vector.y = att_vector.y + math.sin(r.horizontal_bearing) * r.range
         n_signal = n_signal + 1
      end
   end
   return att_vector, n_signal
end

---------------------------------------------------------------------------
-- Taxis velocity: move towards att_angle, with obstacle avoidance.
-- Mirrors exactly the pseudocode given in the exercise description.
---------------------------------------------------------------------------
function SetTaxisVelocity(att_angle)
   if is_obstacle_sensed then
      -- Obstacle avoidance: rotate in place to the left
      robot.wheels.set_velocity(-10, 10)
   elseif att_angle < 0 then
      -- Target is to the right: faster left wheel
      robot.wheels.set_velocity(math.max(0.5, math.cos(att_angle)) * TAXIS_SPEED, 0)
   elseif att_angle > 0 then
      -- Target is to the left: faster right wheel
      robot.wheels.set_velocity(0, math.max(0.5, math.cos(att_angle)) * TAXIS_SPEED)
   else
      -- Target is straight ahead
      robot.wheels.set_velocity(TAXIS_SPEED, TAXIS_SPEED)
   end
end

---------------------------------------------------------------------------
-- Main control step
---------------------------------------------------------------------------
function step()

   ProcessProx()
   ProcessGround()

   -- WALK: random walk; switch to TAXIS if a cluster signal is perceived,
   -- or to GO_FWD if the black spot is found directly.
   if current_state == WALK then
      robot.wheels.set_velocity(10, 10)

      if is_obstacle_sensed then
         current_state      = AVOID
         current_turn_steps = math.random(MAX_TURN_STEPS)

      elseif is_black_sensed then
         current_state     = GO_FWD
         current_fwd_steps = FWD_STEPS

      else
         -- Check for taxis trigger
         local _, n_signal = ComputeTaxisVector()
         if n_signal >= MIN_SIGNAL_ROBOTS then
            current_state = TAXIS
         end
      end

   -- AVOID: rotate in place for a random number of steps.
   elseif current_state == AVOID then
      robot.wheels.set_velocity(-10, 10)
      current_turn_steps = current_turn_steps - 1
      if current_turn_steps <= 0 then
         current_state = WALK
      end

   -- TAXIS: compute attraction vector and move towards signaling robots.
   -- Exit to GO_FWD if the spot is found; return to WALK if signal is lost.
   elseif current_state == TAXIS then

      if is_black_sensed then
         current_state     = GO_FWD
         current_fwd_steps = FWD_STEPS
      else
         local att_vector, n_signal = ComputeTaxisVector()

         if n_signal < MIN_SIGNAL_ROBOTS then
            -- Lost the cluster; resume random walk
            current_state = WALK
         else
            -- Move towards the aggregation cluster
            local att_angle = math.atan2(att_vector.y, att_vector.x)
            SetTaxisVelocity(att_angle)
         end
      end

   -- GO_FWD: move straight after finding the spot to avoid blocking the entrance.
   -- Stop if far enough in, if another robot is sensed, or if the black is lost.
   elseif current_state == GO_FWD then
      current_fwd_steps = current_fwd_steps - 1
      robot.wheels.set_velocity(10, 10)
      if current_fwd_steps <= 0 or is_obstacle_sensed or not is_black_sensed then
         current_state = STOP
      end

   -- STOP: emit signal and periodically decide whether to stay or leave.
   elseif current_state == STOP then
      robot.wheels.set_velocity(0, 0)
      robot.range_and_bearing.set_data(1, 1)   -- signal: "I am aggregated here"
      current_sleep_steps = current_sleep_steps + 1

      if current_sleep_steps == SLEEP_STEPS then
         current_sleep_steps = 0
         CountRAB()
         local prob = BASE_LEAVE_PROB * (number_robot_sensed + 1)
         if robot.random.uniform() < prob then
            current_state = STOP   -- stay
         else
            robot.range_and_bearing.set_data(1, 0)
            current_state = LEAVE
         end
      end

   -- LEAVE: go straight for LEAVE_STEPS, then resume random walk.
   elseif current_state == LEAVE then
      robot.wheels.set_velocity(10, 10)
      current_fwd_steps = current_fwd_steps + 1
      if is_obstacle_sensed then
         current_state      = AVOID
         current_turn_steps = math.random(MAX_TURN_STEPS)
      end
      if current_fwd_steps > LEAVE_STEPS then
         current_fwd_steps = 0
         current_state     = WALK
      end
   end

end

---------------------------------------------------------------------------
-- Lifecycle functions
---------------------------------------------------------------------------
function init()
   current_state = WALK
end

function reset()
   current_state        = WALK
   is_obstacle_sensed   = false
   is_black_sensed      = false
   number_robot_sensed  = 0
   current_turn_steps   = 0
   current_fwd_steps    = 0
   current_sleep_steps  = 0
end

function destroy()
end