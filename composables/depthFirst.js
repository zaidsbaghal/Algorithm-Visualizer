import { ref } from "vue";

const dfsHelper = (x, y, grid, animations, found, rowNum, colNum) => {
  if (found.value === true) {
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

  let neighbors = getNeighbors(current, rowNum, colNum);
  for (let i = 0; i < neighbors.length; i++) {
    let ncoords = neighbors[i];
    let n = grid[ncoords[0]][ncoords[1]];
    if (n.visited != true) {
      if (document.getElementById(n.id).className === "wall") {
        continue; // skip walls
      }
      found.value = dfsHelper(ncoords[0], ncoords[1], grid, animations, found);
      if (found.value === true) {
        return;
      }
    }
  }

  return;
};

const getNeighbors = (node, rowNum, colNum) => {
  let result = [];
  let row = node.row;
  let col = node.col;

  // left
  if (col - 1 >= 0) {
    result.push([row, col - 1]);
  }
  // top
  if (row - 1 >= 0) {
    result.push([row - 1, col]);
  }
  // right
  if (col + 1 < colNum) {
    result.push([row, col + 1]);
  }
  // bottom
  if (row + 1 < rowNum) {
    result.push([row + 1, col]);
  }
  return result;
};

export const dfs = (x, y, grid, animations, rowNum, colNum) => {
  let found = ref(false); // Using ref to make found reactive
  dfsHelper(x, y, grid, animations, found, rowNum, colNum);
  animations.push(["nfound"]); // not found
  return animations;
};
