/**
 * Removes square brackets from a string.
 * @param {string} str - The string to remove square brackets from.
 * @returns {string} - The string without square brackets.
 */
function removeBrackets(str) {
  return str.replace(/[\[\]]/g, '');
}

/**
 * Reads input from a file and returns an object containing drone and location data.
 * @param {string} filename - The path to the input file.
 * @returns {Object} - An object containing arrays of drone and location data.
 */
function readInputFromFile(filename) {
    const data = fs.readFileSync(filename, 'utf8').split('\n').map(line => line.trim());
    const drones = [];
    const locations = [];

    const droneData = data[0].split(',').map(item => item.trim());
    for (let i = 0; i < droneData.length; i += 2) {
        const name = droneData[i]; 
        const capacity = parseInt(removeBrackets(droneData[i + 1]));
        drones.push({ name, capacity });
    }

    for (let i = 1; i < data.length; i++) {
        const [name, weight] = data[i].split(',').map(item => removeBrackets(item.trim())); 
        locations.push({ name, weight: parseInt(weight) });
    }

    return { drones, locations };
}

/**
 * Sorts the drones array in ascending order based on their capacity.
 * @param {Array} drones - An array of drone objects.
 */
function sortDrones(drones) {
    drones.sort((a, b) => a.capacity - b.capacity);
}

/**
 * Sorts the deliveries array in ascending order based on the weight of the locations.
 * @param {Array} deliveries - An array of location objects.
 */
function sortDeliveries(deliveries) {
  deliveries.sort((a, b) => a.weight - b.weight);
}

/**
 * Assigns deliveries to drones based on their capacity and the weight of the locations.
 * @param {Array} drones - An array of drone objects.
 * @param {Array} locations - An array of location objects.
 * @returns {Object} - An object containing arrays of assigned deliveries for each drone.
 */
function assignDeliveries(drones, locations) {
    const deliveries = {};
    const alreadyAssigned = [];

    drones.forEach(drone => {
        deliveries[drone.name] = [];
        let remainingCapacity = drone.capacity;
        let currentTrip = [];

        const remainingLocations = locations.filter(location => !alreadyAssigned.includes(location.name));

        remainingLocations.forEach(location => {
          if (location.weight <= remainingCapacity) {
            currentTrip.push(location.name);
            alreadyAssigned.push(location.name);
            remainingCapacity -= location.weight;
          } else if(currentTrip.length > 0 ) {
              deliveries[drone.name].push(currentTrip);
              currentTrip = [];
              remainingCapacity = drone.capacity;
          }
        })

        if (currentTrip.length > 0) {
            deliveries[drone.name].push(currentTrip);
        }
    });

    return deliveries;
}

/**
 * Displays the assigned deliveries for each drone.
 * @param {Object} deliveries - An object containing arrays of assigned deliveries for each drone.
 */
function displayDeliveries(deliveries) {
    for (const drone in deliveries) {
        console.log(`[${drone}]`);
        deliveries[drone].forEach((trip, index) => {
            console.log(`Trip #${index + 1}`);
            console.log(trip.join(', '));
        });
        console.log();
    }
}

/**
 * The main function that orchestrates the execution of the program.
 */
function main() {
    const { drones, locations } = readInputFromFile('input.txt');
    sortDrones(drones);
    sortDeliveries(locations);
    const deliveries = assignDeliveries(drones, locations);
    displayDeliveries(deliveries);
}

main();
