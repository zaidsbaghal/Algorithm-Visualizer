export default {
  methods: {
    dfs: function (x, y, grid, animations) {
      this.dfsHelper(x, y, grid, animations, false);
      animations.push(["nfound"]); // not found
      return animations;
    },
    // returns an array of all neighbor nodes to a node
    getNeighbors: function (node) {
      let result = [];
      let row = node.row;
      let col = node.col;

      //left
      if (
        row >= 0 &&
        row < this.rowNum &&
        col - 1 >= 0 &&
        col - 1 < this.colNum
      ) {
        let id = "Node-" + col + "-" + row - 1;
        result.push([col - 1, row]);
      }
      // top
      if (
        row - 1 >= 0 &&
        row - 1 < this.rowNum &&
        col >= 0 &&
        col < this.colNum
      ) {
        let id = "Node-" + col - 1 + "-" + row;
        result.push([col, row - 1]);
      }
      // right
      if (
        row >= 0 &&
        row < this.rowNum &&
        col + 1 >= 0 &&
        col + 1 < this.colNum
      ) {
        let id = "Node-" + col + "-" + row + 1;
        result.push([col + 1, row]);
      }
      // bottom
      if (
        row + 1 >= 0 &&
        row + 1 < this.rowNum &&
        col >= 0 &&
        col < this.colNum
      ) {
        result.push([col, row + 1]);
      }
      return result;
    },
    dfsHelper: function (x, y, grid, animations, found) {
      if (found == true) {
        return;
      }
      let current = grid[x][y];
      let currStyle = document.getElementById(current.id).className;

      // Conditions
      if (currStyle === "end") {
        animations.push(["end", x, y]);
        return true;
      } else if (currStyle === "start") {
        // do nothing
      } else {
        animations.push(["visit", x, y]);
        current.visited = true;
      }

      let neighbors = this.getNeighbors(current);
      for (let i = 0; i < neighbors.length; i++) {
        let ncoords = neighbors[i];
        let n = grid[ncoords[0]][ncoords[1]];
        if (n.visited != true) {
          if (document.getElementById(n.id).className === "wall") {
            continue; // skip walls
          }
          found = this.dfsHelper(
            ncoords[0],
            ncoords[1],
            grid,
            animations,
            found
          );
          if (found == true) {
            return;
          }
        }
      }

      return;
    },
  },
};
