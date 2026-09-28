--[[Aggregation with one spot

The goal of this exercise is to let the robot aggregate on the black spot at the center of the enviroment.
The task is quite easy: the robots do random walk until the find the black spot, then they stop.
However, notice that if a robot stops as soon as it finds black, it will prevent other robots to enter the
spot. For this reason, it still moves a bit once it finds black.

This behavior is the base behavior for aggregation with two spots and aggregation with no spots.
]]


-- States, see more in step()
WALK = "WALK"
AVOID = "AVOID"
GO_FWD = "GO_FWD"
STOP = "STOP"

-- global variables
current_state = WALK -- the current state of the robot
is_obstacle_sensed = false -- is the robot sensing an obstacle?
is_black_sensed = false -- is the robot sensing black?

-- variables for obstacle avoidance
MAX_TURN_STEPS = 20 
current_turn_steps = 0

-- variables for go straight behavior
FWD_STEPS = 40
current_fwd_steps = 0

-- function used to copy two tables
function table.copy(t)
  local t2 = {}
  for k,v in pairs(t) do
    t2[k] = v
  end
  return t2
end

-- the main loop
function step()
      
   ProcessProx() -- check for obstacles
	ProcessGround() -- check for black spots

   -- The default behavior is to go straight.
   -- The robot changes behavior if it senses an obstacle or a black spot
   if current_state == WALK then
		robot.wheels.set_velocity(10,10)
		if is_obstacle_sensed then -- obstacle sensed
		   current_state = AVOID -- change state to avoidance
		   current_turn_steps = math.random(MAX_TURN_STEPS) -- set the number of steps to turn on the spot
		elseif is_black_sensed then -- black area sensed
			current_state = GO_FWD -- change state
			current_fwd_steps = FWD_STEPS -- set the number of steps to go straight
		end
	-- to avoid obstacles, the robot turns on itself for a random number of steps 
   -- between 0 and MAX_TURN_STEPS
   elseif current_state == AVOID then
		robot.wheels.set_velocity(-10,10)
		current_turn_steps = current_turn_steps - 1
		if current_turn_steps <= 0 then
		   current_state = WALK
		end
	-- if the robot is on a black area, it tries to go straight for a bit more in order to avoid
   -- stopping on the border and prevent other robots to enter the spot.
   -- It stops if i) it has gone far enough, ii) it sensed another robot, iii) it is going out on the white
	elseif current_state == GO_FWD then
		current_fwd_steps = current_fwd_steps - 1
		robot.wheels.set_velocity(10,10)
		if current_fwd_steps <= 0 or is_obstacle_sensed or not(is_black_sensed) then
		   current_state = STOP
		end
	-- the robot is stopped, do nothing
	elseif current_state == STOP then
		robot.wheels.set_velocity(0,0)
   end

end

-- Sense obstacles by sorting the proximity sensor values and checking the biggest.
-- If it is bigger than a threshold, then there is an obstacle.
-- We ignore sensors on the back of the robot (abs(angle) < pi/2)
function ProcessProx()
   is_obstacle_sensed = false
   sort_prox = table.copy(robot.proximity)
   table.sort(sort_prox, function(a,b) return a.value>b.value end)
   if sort_prox[1].value > 0.05 and math.abs(sort_prox[1].angle) < math.pi/2
      then is_obstacle_sensed = true
   end
end

-- Sense the black spot. If at least one sensor is sensing black, we return true
function ProcessGround()
	is_black_sensed = false
	sort_ground = table.copy(robot.motor_ground)
   table.sort(sort_ground, function(a,b) return a.value<b.value end)
	if sort_ground[1].value == 0 then
		is_black_sensed = true
	end
end

-- init/reset/destroy
function init()
   current_state = WALK
end
function reset()
	current_state = WALK
	is_obstacle_sensed = false
	is_black_sensed = false
	current_turn_steps = 0
	current_fwd_steps = 0
end
function destroy()
end