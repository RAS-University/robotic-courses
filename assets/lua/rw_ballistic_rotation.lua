--[[
		With this controller, a robot performs random walk with obstacle avoidance.
		The robot checks which proximity sensor has the highest value. The turning
		direction and speed depend on the index of the highest reading.
  ]]



--[[ Constants ]]



-- The base wheel speed
SPEED = 5



--[[ Actual code ]]



--[[ Controller init ]]
function init()
	-- nothing to do
end

--[[ Controller step ]]
function step()
	-- Search for the reading with the highest value
	value = -1 -- highest value found so far
	idx = -1   -- index of the highest value
	for i=1,24 do
		if value < robot.proximity[i].value then
			idx = i
			value = robot.proximity[i].value
		end
	end
	-- At this point, 'value' contains the highest proximity reading found
 	-- and 'idx' contains the index of that sensor
	if value == 0 then
		-- The robot has no obstacles around, just go straight
		robot.wheels.set_velocity(SPEED, SPEED)
	else
		-- The robot has obstacles, set wheels according to 'idx'
		if idx <= 12 then
			-- The closest obstacle is between 0 and 180 degrees: soft turn towards the right
			robot.wheels.set_velocity(SPEED, (idx-1) * SPEED / 11)
		else
			-- The closest obstacle is between 180 and 360 degrees: soft turn towards the left
			robot.wheels.set_velocity((24-idx) * SPEED / 11, SPEED)
		end
	end
end

--[[ Controller reset ]]
function reset()
	-- nothing to do
end

--[[ Controller destroy ]]
function destroy()
	-- nothing to do
end