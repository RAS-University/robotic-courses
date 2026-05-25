--[[ PATTERN FORMATION - FLOCKING

     o -- o
    / \  / \
  o -- o -- o
   \ /  \ /
    o -- o

The goal of this exercise is to create a swarm that flocks: the robots first form a
hexagonal pattern around a red LED, and once the pattern is stable they switch to
following an ambiance light source, maintaining the pattern while they move.

The controller has two phases:

  Phase 1 (FORMING) — The robots compute a Lennard-Jones force based on their neighbors
  and an attraction force towards the red LED. These two forces are summed to produce
  the movement direction.

  Phase 2 (FLOCKING) — Once a triggering condition is met (see below), the LED attraction
  is replaced by an attraction towards the ambiance light source. The LJ force continues
  to keep the robots at the right distance from each other, so the pattern is maintained
  while the swarm moves.

  Triggering condition:
  A robot considers itself "formed" when it has perceived at least MIN_NEIGHBORS_TO_FLOCK
  neighbors for FLOCK_COUNTER_THRESHOLD consecutive time steps. Once that counter reaches
  the threshold, the robot switches permanently to flocking mode.

]]

---------------------------------------------------------------------------
-- Parameters
---------------------------------------------------------------------------
TARGET_DIST      = 80    -- target inter-robot distance (cm)
EPSILON          = 50    -- Lennard-Jones strength coefficient
WHEEL_SPEED      = 5     -- max base wheel speed
NEIGHBOR_RANGE   = 200   -- max range to consider a neighbor (cm)

-- Triggering condition
MIN_NEIGHBORS_TO_FLOCK    = 3   -- minimum neighbors required to count a step
FLOCK_COUNTER_THRESHOLD   = 30  -- consecutive steps needed to trigger flocking

-- State variables (reset in init/reset)
flock_counter = 0
flocking      = false

---------------------------------------------------------------------------
-- Vector utilities
---------------------------------------------------------------------------
function angle_to_vector(magnitude, angle)
   return { x = magnitude * math.cos(angle),
            y = magnitude * math.sin(angle) }
end

function vector_add(v1, v2)
   return { x = v1.x + v2.x, y = v1.y + v2.y }
end

function vector_angle(v)
   return math.atan2(v.y, v.x)
end

---------------------------------------------------------------------------
-- Lennard-Jones force for a given distance rho
---------------------------------------------------------------------------
function ComputeLennardJones(rho)
   if rho == 0 then return 0 end
   local ratio = TARGET_DIST / rho
   return -(4 * EPSILON / rho) * (ratio^4 - ratio^2)
end

---------------------------------------------------------------------------
-- Aggregate light-sensor readings into a single direction vector.
-- Each sensor contributes a weighted vector in its own direction.
---------------------------------------------------------------------------
function ComputeVectorToLight()
   local light_vec = { x = 0, y = 0 }
   for i = 1, #robot.light do
      if robot.light[i].value > 0 then
         local vec = angle_to_vector(robot.light[i].value, robot.light[i].angle)
         light_vec = vector_add(light_vec, vec)
      end
   end
   return light_vec
end

---------------------------------------------------------------------------
-- Map a desired heading angle to differential wheel speeds.
-- Taken from pf_hexagonal: projects forward motion onto the target direction
-- and adds a proportional angular correction.
---------------------------------------------------------------------------
function ComputeSpeedFromAngle(angle)
   local KProp         = 20
   local wheelsDistance = 0.14
   local dotProduct

   -- If the target is behind us, rotate in place (no forward motion)
   if angle > math.pi / 2 or angle < -math.pi / 2 then
      dotProduct = 0.0
   else
      local fwd    = { math.cos(0), math.sin(0) }
      local target = { math.cos(angle), math.sin(angle) }
      dotProduct   = fwd[1] * target[1] + fwd[2] * target[2]
   end

   local angularVelocity = KProp * angle
   local left  = dotProduct * WHEEL_SPEED - angularVelocity * wheelsDistance
   local right = dotProduct * WHEEL_SPEED + angularVelocity * wheelsDistance
   return left, right
end

---------------------------------------------------------------------------
-- Main control step
---------------------------------------------------------------------------
function step()
   robot.colored_blob_omnidirectional_camera.enable()
   robot.range_and_bearing.set_data(1, 1)

   -- 1. Compute the Lennard-Jones force from all nearby robots
   local lj_force   = { x = 0, y = 0 }
   local n_neighbors = 0

   for i = 1, #robot.range_and_bearing do
      local neighbor = robot.range_and_bearing[i]
      if neighbor.range <= NEIGHBOR_RANGE then
         local force_mag = ComputeLennardJones(neighbor.range)
         local vec       = angle_to_vector(force_mag, neighbor.horizontal_bearing)
         lj_force        = vector_add(lj_force, vec)
         n_neighbors     = n_neighbors + 1
      end
   end

   -- Triggering condition: increment counter when enough neighbors are seen;
   -- reset it otherwise. Switch permanently to flocking once the threshold is reached.
   if not flocking then
      if n_neighbors >= MIN_NEIGHBORS_TO_FLOCK then
         flock_counter = flock_counter + 1
      else
         flock_counter = 0
      end
      if flock_counter >= FLOCK_COUNTER_THRESHOLD then
         flocking = true
      end
   end

   -- 2. Compute the secondary attractive force
   local attractor_force = { x = 0, y = 0 }

   if not flocking then
      -- Phase 1 (FORMING): attract towards the red LED (omnidirectional camera)
      for i = 1, #robot.colored_blob_omnidirectional_camera do
         local blob = robot.colored_blob_omnidirectional_camera[i]
         if blob.color.red == 255 then
            local vec_led = angle_to_vector(blob.distance, blob.angle)
            attractor_force = vector_add(attractor_force, vec_led)
         end
      end
   else
      -- Phase 2 (FLOCKING): attract towards the ambiance light source (light sensors)
      attractor_force = ComputeVectorToLight()
   end

   -- 3. Aggregate the LJ force and the attractor force
   local sum_force = vector_add(lj_force, attractor_force)

   -- 4. Compute direction of movement
   local mov_dir = vector_angle(sum_force)

   -- 5. Set wheel speeds
   local left_speed, right_speed = ComputeSpeedFromAngle(mov_dir)
   robot.wheels.set_velocity(left_speed, right_speed)

   robot.range_and_bearing.clear_data()
end

---------------------------------------------------------------------------
-- Lifecycle functions
---------------------------------------------------------------------------
function init()
   robot.colored_blob_omnidirectional_camera.enable()
   flock_counter = 0
   flocking      = false
end

function reset()
   robot.colored_blob_omnidirectional_camera.enable()
   flock_counter = 0
   flocking      = false
end

function destroy()
end