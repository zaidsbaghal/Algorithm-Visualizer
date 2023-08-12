<template>
  <div class="path-container fade-in">
    <div class="function-buttons">
      <button
        class="toolbar-button"
        style="background-color: #e76f51"
        :disabled="buttonDisable"
        v-on:click="resetGrid"
      >
        Reset Grid
      </button>
      <button
        class="toolbar-button"
        style="background-color: #e76f51"
        :disabled="buttonDisable"
        v-on:click="resetVis"
      >
        Reset Visualization
      </button>
      <button
        class="toolbar-button"
        :disabled="buttonDisable"
        v-on:click="depthFirstButton"
      >
        Depth First
      </button>
      <button
        class="toolbar-button"
        :disabled="buttonDisable"
        v-on:click="breadthFirstButton"
      >
        Breadth First
      </button>
      <button
        class="toolbar-button"
        :disabled="buttonDisable"
        v-on:click="dijkstraButton"
      >
        Dijkstra's
      </button>
      <button
        class="toolbar-button"
        :disabled="buttonDisable"
        v-on:click="aStarButton"
      >
        A*
      </button>
    </div>
    <div class="graph-action">
      <div class="col" v-for="(col, index) in grid" :key="index">
        <Node
          v-for="node in col"
          :key="node.id"
          :id="node.id"
          :row="node.row"
          :col="node.col"
          :isWall="node.isWall"
          :isStart="node.isStart"
          :isEnd="node.isEnd"
          :visited="node.visited"
          :parent="node.parent"
          :ddist="node.ddist"
          v-on:mousedown="mouseDown(node)"
          v-on:mouseup="mouseUp(node)"
          v-on:mouseenter="mouseEnter(node)"
          v-on:mouseout="mouseOut(node)"
        ></Node>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, ref } from "vue";

export default {
  setup() {
    const rowNum = ref(30);
    const colNum = ref(70);
    const grid = ref([[]]);
    const startNode = ref(null);
    const endNode = ref(null);
    const startX = ref(30);
    const startY = ref(15);
    const endX = ref(40);
    const endY = ref(15);
    const animations = ref([]);
    const defaultGraph = ref([]);
    const found = ref(false);
    const animSpeed = ref(10);
    const buttonDisable = ref(false);
    const mousePressed = ref(false);
    const moveStart = ref(false);
    const moveEnd = ref(false);
    const prevNode = ref(null);
    const viz = ref(false);

    onMounted(() => {
      initGrid();
      setStart();
      setEnd();
    });

    const initGrid = () => {
      let newgrid = [];
      for (let col = 0; col < colNum.value; col++) {
        const currCol = [];
        for (let row = 0; row < rowNum.value; row++) {
          currCol.push(createNode(row, col));
        }
        newgrid.push(currCol);
      }
      grid.value = newgrid;
    };

    const disableButtons = () => {
      buttonDisable.value = true;
    };

    const enableButtons = () => {
      buttonDisable.value = false;
    };

    const mouseEnter = (node) => {
      prevNode.value = document.getElementById(node.id).className.slice();
      if (moveStart.value) {
        document.getElementById(node.id).className = "start";
      }
      if (moveEnd.value) {
        document.getElementById(node.id).className = "end";
      }
      if (mousePressed.value) {
        makeWall(node);
      }
    };

    // function is called when we leave a node
    const mouseOut = (node) => {
      // Reset old node
      if (moveStart.value == true) {
        if (prevNode.value === "start") {
          node.isStart = false;
          document.getElementById(node.id).className = "box";
        } else {
          document.getElementById(node.id).className = prevNode.value;
        }
      } else if (moveEnd.value == true) {
        if (prevNode.value === "end") {
          node.isEnd = false;
          document.getElementById(node.id).className = "box";
        } else {
          document.getElementById(node.id).className = prevNode.value;
        }
      }
    };

    //function is called when the mouse is pressed down on a node
    const mouseDown = (node) => {
      if (viz.value) {
        return;
      }
      let element = document.getElementById(node.id);
      if (element.className === "start") {
        moveStart.value = true;
      } else if (element.className === "end") {
        moveEnd.value = true;
      } else {
        mousePressed.value = true;
        makeWall(node);
      }
    };

    // function is called when we release the mouse press on a node
    const mouseUp = (node) => {
      if (moveStart.value === true) {
        node.isStart = true;
        document.getElementById(node.id).className = "start";
        startY.value = node.row;
        startX.value = node.col;
        moveStart.value = false;
      } else if (moveEnd.value === true) {
        node.isEnd = true;
        document.getElementById(node.id).className = "end";
        endY.value = node.row;
        endX.value = node.col;
        moveEnd.value = false;
      }
      mousePressed.value = false;
    };

    // Stylize wall of box (Does not set the nodes isWall data yet for speed purposes)
    const makeWall = (node) => {
      let element = document.getElementById(node.id);
      if (
        element.className === "start" ||
        element.className === "end" ||
        element.className === "visited" ||
        element.className === "path" ||
        viz.value
      ) {
        return;
      } else {
        let element = document.getElementById(node.id);
        if (element.className === "wall") {
          element.className = "box";
        } else {
          element.className = "wall";
        }
      }
    };

    // Initialize the start node
    const setStart = () => {
      startX.value = 30;
      startY.value = 15;
      let id = grid.value[30][15].id;
      document.getElementById(id).className = "start";
      grid.value[30][15].isStart = true;
      grid.value[30][15].ddist = 0;
    };

    // Initialize the end node
    const setEnd = () => {
      endX.value = 40;
      endY.value = 15;
      let id = grid.value[40][15].id;
      document.getElementById(id).className = "end";
      grid.value[40][15].isEnd = true;
    };

    // Create the node object for a cell
    const createNode = (row, col) => {
      if (col === startX.value && row === startY.value) {
        return {
          col,
          row,
          isStart: true,
          isEnd: false,
          isWall: false,
          visited: false,
          id: "Node-" + col + "-" + row,
          parent: null,
          ddist: 0,
          g: Number.POSITIVE_INFINITY,
          h: Number.POSITIVE_INFINITY,
          f: Number.POSITIVE_INFINITY,
          closed: false,
        };
      } else if (col === endX.value && row === endY.value) {
        return {
          col,
          row,
          isStart: false,
          isEnd: true,
          isWall: false,
          visited: false,
          id: "Node-" + col + "-" + row,
          parent: null,
          ddist: Number.POSITIVE_INFINITY,
          g: Number.POSITIVE_INFINITY,
          h: Number.POSITIVE_INFINITY,
          f: Number.POSITIVE_INFINITY,
          closed: false,
        };
      }
      return {
        col,
        row,
        isStart: false,
        isEnd: false,
        isWall: false,
        visited: false,
        id: "Node-" + col + "-" + row,
        parent: null,
        ddist: Number.POSITIVE_INFINITY,
        g: Number.POSITIVE_INFINITY,
        h: Number.POSITIVE_INFINITY,
        f: Number.POSITIVE_INFINITY,
        closed: false,
      };
    };

    // Clears all walls from the grid
    const resetGrid = () => {
      viz.value = false;
      for (let col = 0; col < colNum.value; col++) {
        for (let row = 0; row < rowNum.value; row++) {
          let node = grid.value[col][row];
          let eleClass = document.getElementById(node.id).className;
          node.isWall = false;
          node.visited = false;
          node.closed = false;
          node.isStart = false;
          node.isEnd = false;
          node.ddist = Number.POSITIVE_INFINITY;
          node.f = Number.POSITIVE_INFINITY;
          node.g = Number.POSITIVE_INFINITY;
          node.h = Number.POSITIVE_INFINITY;
          document.getElementById(node.id).className = "box";
        }
      }
      setStart();
      setEnd();
    };

    const resetVis = () => {
      viz.value = false;
      for (let col = 0; col < colNum.value; col++) {
        for (let row = 0; row < rowNum.value; row++) {
          let node = grid.value[col][row];
          let eleClass = document.getElementById(node.id).className;
          node.visited = false;
          node.closed = false;
          node.ddist = Number.POSITIVE_INFINITY; // Reset Dijkstra Distance
          node.f = Number.POSITIVE_INFINITY;
          node.g = Number.POSITIVE_INFINITY;
          node.h = Number.POSITIVE_INFINITY;
          if (eleClass === "start" || eleClass === "end") {
            if (eleClass == "start") {
              node.ddist = 0;
            }
            continue;
          }
          if (eleClass != "wall") {
            document.getElementById(node.id).className = "box";
          }
        }
      }
    };

    const depthFirstButton = () => {
      if (viz.value) {
        return;
      }
      disableButtons();
      viz.value = true;
      try {
        animations.value = dfs(
          startX.value,
          startY.value,
          grid.value,
          animations.value
        );
      } catch (err) {
        enableButtons();
      }

      for (let i = 0; i < animations.value.length; i++) {
        let command = animations.value[i][0]; // current command
        let x = animations.value[i][1]; // current x
        let y = animations.value[i][2]; // current y
        let current;
        try {
          current = grid.value[x][y]; // current node object
        } catch (err) {
          enableButtons();
          continue;
        }

        if (command === "curr") {
          setTimeout(function () {
            document.getElementById(current.id).className = "visited";
          }, i * animSpeed.value);
        } else if (command === "visit") {
          setTimeout(function () {
            document.getElementById(current.id).className = "path";
          }, i * animSpeed.value);
        } else {
          new Promise((resolve, reject) => {
            setTimeout(function () {
              resolve();
            }, i * animSpeed.value);
          })
            .then(() => {
              animations.value = [];
              enableButtons();
            })
            .catch(() => {
              enableButtons();
            });
          break;
        }
      }
    };

    const breadthFirstButton = () => {
      if (viz.value) {
        return;
      }
      viz.value = true;
      disableButtons();
      animations.value = bfs(
        startX.value,
        startY.value,
        grid.value,
        animations.value
      );
      for (let i = 0; i < animations.value.length; i++) {
        if (
          animations.value[i] == null ||
          animations.value[i] === "undefined"
        ) {
          continue;
        }
        let command = animations.value[i][0]; // current command
        let x = animations.value[i][1]; // current x
        let y = animations.value[i][2]; // current y

        let current;
        try {
          current = grid.value[x][y]; // current node object
        } catch (err) {
          enableButtons();
          continue;
        }

        if (command === "curr") {
          setTimeout(function () {
            document.getElementById(current.id).className = "visited";
          }, i * animSpeed.value);
        } else if (command === "visit") {
          setTimeout(function () {
            document.getElementById(current.id).className = "visited";
          }, i * animSpeed.value);
        } else if (command === "path") {
          new Promise((resolve, reject) => {
            setTimeout(function () {
              document.getElementById(current.id).className = "path";
              resolve();
            }, i * animSpeed.value);
          }).then(() => {
            animations.value = [];
            enableButtons();
            i = animations.value.length;
          });
        } else {
          // End command
          i = animations.value.length;
          animations.value = [];
        }
      }
    };

    const dijkstraButton = () => {
      if (viz.value) {
        return;
      }
      viz.value = true;
      disableButtons();
      var pq = [];
      animations.value = dijkstra(
        grid.value,
        startX.value,
        startY.value,
        animations.value,
        pq
      );

      for (let i = 0; i < animations.value.length; i++) {
        let command = animations.value[i][0]; // current command
        let x = animations.value[i][1]; // current x
        let y = animations.value[i][2]; // current y
        let current;
        try {
          current = grid.value[x][y]; // current node object
        } catch (err) {
          enableButtons();
          continue;
        }

        if (command === "curr") {
          setTimeout(function () {
            document.getElementById(current.id).className = "visited";
          }, i * animSpeed.value);
        } else if (command === "visit") {
          setTimeout(function () {
            document.getElementById(current.id).className = "visited";
          }, i * animSpeed.value);
        } else if (command === "path") {
          new Promise((resolve, reject) => {
            setTimeout(function () {
              document.getElementById(current.id).className = "path";
              resolve();
            }, i * animSpeed.value);
          }).then(() => {
            pq = [];
            animations.value = [];
            enableButtons();
          });
        } else {
          // End command
          i = animations.value.length;
          pq = [];
          animations.value = [];
          return;
        }
      }
    };

    const aStarButton = () => {
      if (viz.value) {
        return;
      }
      viz.value = true;
      disableButtons();
      var pq = [];

      animations.value = aStar(
        grid.value,
        startX.value,
        startY.value,
        endX.value,
        endY.value,
        animations.value
      );

      for (let i = 0; i < animations.value.length; i++) {
        let command = animations.value[i][0]; // current command
        let x = animations.value[i][1]; // current x
        let y = animations.value[i][2]; // current y
        let current;
        try {
          current = grid.value[x][y]; // current node object
        } catch (err) {
          enableButtons();
          continue;
        }
        if (command === "visit") {
          setTimeout(function () {
            document.getElementById(current.id).className = "visited";
          }, i * animSpeed.value);
        } else if (command === "fringe") {
          setTimeout(function () {
            document.getElementById(current.id).className = "fringe";
          }, i * animSpeed.value);
        } else if (command === "path") {
          new Promise((resolve, reject) => {
            setTimeout(function () {
              document.getElementById(current.id).className = "path";
              resolve();
            }, i * animSpeed.value);
          }).then(() => {
            animations.value = [];
            enableButtons();
          });
        } else {
          // End command
          i = animations.value.length;
          pq = [];
          animations.value = [];
          return;
        }
      }
    };

    return {
      rowNum,
      colNum,
      grid,
      startNode,
      endNode,
      startX,
      startY,
      endX,
      endY,
      animations,
      defaultGraph,
      found,
      animSpeed,
      buttonDisable,
      mousePressed,
      moveStart,
      moveEnd,
      prevNode,
      viz,
      initGrid,
      disableButtons,
      enableButtons,
      mouseEnter,
      mouseOut,
      mouseDown,
      mouseUp,
      makeWall,
      setStart,
      setEnd,
      createNode,
      resetGrid,
      resetVis,
      depthFirstButton,
      breadthFirstButton,
      dijkstraButton,
      aStarButton,
    };
  },
};
</script>
<style lang="scss">
@import "./assets/colors.scss";
.path-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .function-buttons {
    padding-bottom: 3rem;
  }
  .graph-action {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: rotateX(180deg);
  }
}
</style>