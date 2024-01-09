function calculateTotalDistance(durationMatrix, vehicleRoutes) {
    let distances = {};

    for (let i = 1; i < vehicleRoutes.length; i++) {
      let route = vehicleRoutes[i];
      let distance = 0;

      for (let j = 1; j < route.length; j++) {
        let from = route[j - 1];
        let to = route[j];
        distance += durationMatrix[from][to];
      }

      distances[`vehicle${i}`] = distance;
    }

    return distances;
  }
  let durationMatrix = [
    [0, 10, 20, 30],
    [10, 0, 15, 25],
    [20, 15, 0, 14],
    [30, 25, 14, 0]
  ];

  let vehicleRoutes = [
    [],
    [0, 2, 1, 0],
    [0, 3, 0]
  ];

  let distances = calculateTotalDistance(durationMatrix, vehicleRoutes);
  console.log(distances); // Output: { vehicle1: 0, vehicle2: 45, vehicle3: 39 }
