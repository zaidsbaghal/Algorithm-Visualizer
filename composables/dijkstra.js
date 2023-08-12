import { ref } from "vue";

export default {
  setup() {
    // Assuming rowNum and colNum are properties of the component or computed values
    const rowNum = ref(0); // Define the correct initial value
    const colNum = ref(0); // Define the correct initial value

    const getNeighbors = (node) => {
      let result = [];
      let row = node.row;
      let col = node.col;

      //left
      if (
        row >= 0 &&
        row < rowNum.value &&
        col - 1 >= 0 &&
        col - 1 < colNum.value
      ) {
        let id = "Node-" + col + "-" + (row - 1);
        result.push([col - 1, row]);
      }
      // top
      if (
        row - 1 >= 0 &&
        row - 1 < rowNum.value &&
        col >= 0 &&
        col < colNum.value
      ) {
        let id = "Node-" + (col - 1) + "-" + row;
        result.push([col, row - 1]);
      }
      // right
      if (
        row >= 0 &&
        row < rowNum.value &&
        col + 1 >= 0 &&
        col + 1 < colNum.value
      ) {
        let id = "Node-" + col + "-" + (row + 1);
        result.push([col + 1, row]);
      }
      // bottom
      if (
        row + 1 >= 0 &&
        row + 1 < rowNum.value &&
        col >= 0 &&
        col < colNum.value
      ) {
        result.push([col, row + 1]);
      }
      return result;
    };

    const dijkstra = (grid, x, y, animations, pq) => {
      let current = grid[x][y];
      enqueue(pq, current); // Replace with your enqueue method

      while (pq.length > 0) {
        let current = dequeue(pq); // get shortest distance node
        if (current.isEnd == true) {
          let curr = grid[current.col][current.row].parent;
          while (curr != null) {
            if (curr.isStart) {
              break;
            }
            animations.push(["path", curr.col, curr.row]);
            curr = curr.parent;
          }
          animations.push(["end", x, y]);
          pq = [];
          return animations;
        }
        if (!current.isStart) {
          animations.push(["visit", current.col, current.row]);
        }

        let neighbors = getNeighbors(current);
        for (let i = 0; i < neighbors.length; i++) {
          let ncoords = neighbors[i];
          let n = grid[ncoords[0]][ncoords[1]];
          if (document.getElementById(n.id).className === "wall") {
            continue;
          }
          let newDist = current.ddist + 1; // set new distance
          // if new distance is less than the current distance
          if (newDist < n.ddist) {
            n.ddist = newDist; // set new distance of neighbor
            n.parent = current; // set the parent
            enqueue(pq, n); // add to the priority queue
          }
        }
      }

      console.log("not found");
      pq = [];
      animations.push(["nfound", -1, -1]);
      return animations;
    };

    return {
      dijkstra,
      getNeighbors,
    };
  },
};
