import { ref } from "vue";

// Assuming rowNum and colNum are properties of the component or computed values
const rowNum = ref(0); // You should define the correct initial value
const colNum = ref(0); // You should define the correct initial value

const dfsHelper = (x, y, grid, animations, found) => {
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

  let neighbors = getNeighbors(current);
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
    let id = "Node-" + col + "-" + (row - 1); // Fixed the expression
    result.push([col - 1, row]);
  }
  // top
  if (
    row - 1 >= 0 &&
    row - 1 < rowNum.value &&
    col >= 0 &&
    col < colNum.value
  ) {
    let id = "Node-" + (col - 1) + "-" + row; // Fixed the expression
    result.push([col, row - 1]);
  }
  // right
  if (
    row >= 0 &&
    row < rowNum.value &&
    col + 1 >= 0 &&
    col + 1 < colNum.value
  ) {
    let id = "Node-" + col + "-" + (row + 1); // Fixed the expression
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

export const dfs = (x, y, grid, animations) => {
  let found = ref(false); // Using ref to make found reactive
  dfsHelper(x, y, grid, animations, found);
  animations.push(["nfound"]); // not found
  return animations;
};
