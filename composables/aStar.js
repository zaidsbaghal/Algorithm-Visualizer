export default {
  methods: {
    aStar: function (grid, startX, startY, endX, endY, animations) {
      var priorityQueue = []; // Priority Queue to store nodes
      let startNode = grid[startX][startY];
      let endNode = grid[endX][endY];
      startNode.g = 0; // The cost of going from the start node to the start node is zero
      startNode.f = this.getDistance(startNode, endNode); // f(n) = g(n) + h(n), here h(n) is heuristic function

      this.enqueueStar(priorityQueue, startNode);

      // Loop until the priority queue is empty
      while (!this.isEmpty(priorityQueue)) {
        let currentNode = this.dequeue(priorityQueue); // Get node with the lowest f score
        if (currentNode.isEnd) {
          // Reconstruct the path
          currentNode = currentNode.parent;
          while (!currentNode.isStart) {
            animations.push(["path", currentNode.col, currentNode.row]);
            currentNode = currentNode.parent;
          }
          priorityQueue = [];
          return animations;
        }

        if (!currentNode.isStart) {
          animations.push(["visit", currentNode.col, currentNode.row]);
        }

        currentNode.closed = true; // Mark the current node as closed

        let neighbors = this.getNeighbors(currentNode);
        for (let i = 0; i < neighbors.length; i++) {
          let [neighborRow, neighborCol] = neighbors[i];
          let neighborNode = grid[neighborRow][neighborCol];
          if (
            neighborNode.closed ||
            document.getElementById(neighborNode.id).className === "wall"
          ) {
            continue; // Skip if neighbor is closed or is a wall
          }
          if (!neighborNode.isEnd) {
            animations.push(["fringe", neighborNode.col, neighborNode.row]);
          }

          let tentativeGScore =
            currentNode.g + this.getDistance(currentNode, neighborNode); // Compute temporary g score

          var isNeighborVisited = neighborNode.visited;
          if (tentativeGScore < neighborNode.g || !isNeighborVisited) {
            neighborNode.visited = true;
            neighborNode.parent = currentNode;
            neighborNode.g = tentativeGScore;
            neighborNode.f =
              neighborNode.g + this.getDistance(neighborNode, endNode); // Update f score

            if (!isNeighborVisited) {
              this.enqueueStar(priorityQueue, neighborNode);
            } else {
              this.reorder(priorityQueue, neighborNode);
            }
          }
        }
      }

      // No path found
      priorityQueue = [];
      animations.push(["nfound", -1, -1]);
      return animations;
    },

    // Function to calculate the Manhattan distance between two nodes
    getDistance: function (currentNode, neighborNode) {
      let distance =
        Math.abs(neighborNode.col - currentNode.col) +
        Math.abs(neighborNode.row - currentNode.row);
      return distance;
    },

    // Function to get the neighboring nodes
    getNeighbors: function (node) {
      let neighbors = [];
      let row = node.row;
      let col = node.col;

      // Check all four directions (left, top, right, bottom)
      if (col - 1 >= 0) {
        neighbors.push([row, col - 1]);
      }
      if (row - 1 >= 0) {
        neighbors.push([row - 1, col]);
      }
      if (col + 1 < this.colNum) {
        neighbors.push([row, col + 1]);
      }
      if (row + 1 < this.rowNum) {
        neighbors.push([row + 1, col]);
      }
      return neighbors;
    },
  },
};