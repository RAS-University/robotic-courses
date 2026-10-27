
--[[ PATTERN FORMATION

     o -- o
    / \  / \
  o -- o -- o
   \ /  \ /
    o -- o

The goal of this exercise is to let the robot move in order to form an hexagonal pattern.
In order to do this the robots try to position themselves in order to minimize a potential
field computed using the Lennard-Jones potential.
Simplifying a lot, the Lennard-Jones potential is a model for the interaction between atoms:
- if two atoms are too close, they will be subject to a repulsion force, pushing them away one from the other;
- if they are too far away, they will be subject to an attraction force, pushing them close one to the other;
- if they are at the right distance, they will be subject to no force, leaving them there;
This force can be used to let robots move to a position in which the distance between all robots is equal.

The trick is that a robot computes the virtual force "created" by that the other robots seen.

]]
---------------------------------------------------------------------------
-- global variables
TARGET_DIST = 100 -- the target distance between robots, in cm
EPSILON = 80 -- a coefficient to increase the force of the repulsion/attraction function
WHEEL_SPEED = 5 -- max wheel speed
---------------------------------------------------------------------------
NEIGHBOR_RANGE = 200  -- Max distance to consider a neighbor

-- Velocity control
MAX_SPEED = 10

LIGHT_RANGE = 0

-- Vector operations
function angle_to_vector(magnitude, angle)
   return {x = magnitude * math.cos(angle), y = magnitude * math.sin(angle)}
end

function vector_add(v1, v2)
   return {x = v1.x + v2.x, y = v1.y + v2.y}
end

function vector_length(v)
   return math.sqrt(v.x * v.x + v.y * v.y)
end

function vector_angle(v)
   return math.atan2(v.y, v.x)
end

-- Lennard-Jones force computation
function ComputeLennardJones(rho)
   if rho == 0 then return 0 end
   local delta_rho = TARGET_DIST / rho
   return -4 * (EPSILON/rho) * (delta_rho^4 - delta_rho^2)
end

---------------------------------------------------------------------------
--Step function
function step()
robot.colored_blob_omnidirectional_camera.enable()
       -- Compute total Lennard-Jones force from neighbors
   local lj_force = {x = 0, y = 0}
   local led_force = {x = 0, y = 0}
   for i = 1, #robot.range_and_bearing do
      local neighbor = robot.range_and_bearing[i]
      local r = neighbor.range
      local bearing = neighbor.horizontal_bearing
      if r <= NEIGHBOR_RANGE then
         local force_mag = ComputeLennardJones(r)
         local vec = angle_to_vector(force_mag, bearing)
         lj_force = vector_add(lj_force, vec)
      end
   end

   for i = 1, #robot.colored_blob_omnidirectional_camera do
        local led = robot.colored_blob_omnidirectional_camera[i]
        local red_led = led.color.red 
        if red_led == 255 then
            local led_distance = led.distance
            local led_angle = led.angle
            if led_distance >= LIGHT_RANGE then
                -- local force_light = ComputeLennardJones(l_value) * 10
                local vec_led = angle_to_vector(led_distance, led_angle)
                lj_force = vector_add(lj_force, vec_led)
            end
        end
   end

      -- 3. Aggregate forces


   -- Compute movement direction
   local mov_angle = vector_angle(lj_force)

   -- Set wheel speeds
   local left_speed, right_speed = ComputeSpeedFromAngle(mov_angle)
   robot.wheels.set_velocity(left_speed, right_speed)

   -- Optional: broadcast constant ID to be detected by others
   robot.range_and_bearing.set_data(1, 1)

end

--This function computes the necessary wheel speed to go in the direction of the desired angle.
-- Map angle to wheel speeds
function ComputeSpeedFromAngle(angle)
   local base = MAX_SPEED
   local delta = angle / (math.pi / 2) -- Normalize between -1 and 1
   local left = base * (1 - delta)
   local right = base * (1 + delta)
   return left, right
end

function init()
    robot.colored_blob_omnidirectional_camera.enable()
end

function reset()
    robot.colored_blob_omnidirectional_camera.enable()
end

function destroy()
end