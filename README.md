# Drone Delivery Service

A squad of drones is tasked with delivering packages for a major online reseller in a world
where time and distance do not matter. Each drone can carry a specific weight and can make
multiple deliveries before returning to home base to pick up additional loads; however, the goal
is to make the fewest number of trips as each time the drone returns to home base, it is
extremely costly to refuel and reload the drone.

The purpose of the written software is to accept input which will include the name of each
drone and the maximum weight it can carry, along with a series of locations and the total weight
needed to be delivered to that specific location. The software should highlight the most efficient
deliveries for each drone to make on each trip.

Assume that time and distance to each drop off location do not matter, and that the size of
each package is also irrelevant. It is also assumed that the cost to refuel and restock each
drone is a constant and does not vary between drones. The maximum number of drones in a
squad is 100, and there is no maximum number of deliveries which are required.


## Installation

1. Clone the repository.
2. Write the file input `input.txt` using this following format:

```
[DroneA], [200], [DroneB], [250], [DroneC], [100]
[LocationA], [200]
[LocationB], [150]
[LocationC], [50]
[LocationD], [150]
[LocationE], [100]
[LocationF], [200]
[LocationG], [50]
[LocationH], [80]
[LocationI], [70]
[LocationJ], [50]
[LocationK], [30]
[LocationL], [20]
[LocationM], [50]
[LocationN], [30]
[LocationO], [20]
[LocationP], [90]
```

3. Run this script using nodejs
```bash
node main.js
```