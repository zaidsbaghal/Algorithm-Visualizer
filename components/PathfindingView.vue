<template>
  <div class="path-container fade-in">
    <div class="function-buttons">
      <button
        class="toolbar-button"
        style="background-color: #E76F51"
        :disabled="buttonDisable"
        v-on:click="resetGrid"
      >Reset Grid</button>
      <button
        class="toolbar-button"
        style="background-color: #E76F51"
        :disabled="buttonDisable"
      >Reset Visualization</button>
      <button class="toolbar-button" :disabled="buttonDisable" v-on:click="dfs">Depth First</button>
      <button class="toolbar-button" :disabled="buttonDisable">Breadth First</button>
      <button class="toolbar-button" :disabled="buttonDisable">Dijkstra's</button>
      <button class="toolbar-button" :disabled="buttonDisable">A*</button>
    </div>
    <div class="graph-action">
      <div class="col" v-for="(col, index) in this.grid" :key="index">
        <Node
          v-for="node in col"
          :key="node.id"
          :id="node.id"
          :row="node.row"
          :col="node.col"
          :isWall="node.isWall"
          :isStart="node.isStart"
          :isEnd="node.isEnd"
          v-on:mousedown.native="mouseDown(node)"
          v-on:mouseup.native="mouseUp(node)"
          v-on:mouseenter.native="mouseEnter(node)"
          v-on:mouseout.native="mouseOut(node)"
        ></Node>
      </div>
    </div>
  </div>
</template>
<script>
import Node from "~/components/GridNode.vue";
export default {
  components: {
    Node,
  },
  data: function () {
    return {
      rowNum: 30, // grid rows
      colNum: 70, // grid columns
      grid: [[]], // store the 2day array that corresponds with the grid
      startNode: null,
      endNode: null,
      startX: 30, // x coordinate of start node
      startY: 15, // y coordinate of start node
      endX: 40, // x coordinate of end node
      endY: 15, // y coordinate of end node
      animations: [], // stores the animations of the current sort
      defaultGraph: [], // stores the newly generated array in unsorted form
      found: false, // is the current array sorted?,
      animSpeed: 1, // animation speed
      buttonDisable: false, // disable the action buttons of the toolbar?
      mousePressed: false, // is the mouse currently pressed?
      moveStart: false, // are we moving the start node?
      moveEnd: false, // are we moving the end node?
      prevNode: null, // Stores state of previous node when moving
    };
  },
  mounted: function () {
    this.initGrid();
    this.$nextTick(function () {
      this.setStart();
      this.setEnd();
    });
  },
  methods: {
    // Function is called when we enter a node
    mouseEnter: function (node) {
      this.prevNode = document.getElementById(node.id).className.slice();
      if (this.moveStart == true) {
        document.getElementById(node.id).className = "start";
      }
      if (this.moveEnd == true) {
        document.getElementById(node.id).className = "end";
      }
      if (this.mousePressed == true) {
        this.makeWall(node);
      }
    },
    // function is called when we leave a node
    mouseOut: function (node) {
      // Reset old node
      if (this.moveStart == true) {
        if (this.prevNode === "start") {
          document.getElementById(node.id).className = "box";
        } else {
          document.getElementById(node.id).className = this.prevNode;
        }
      } else if (this.moveEnd == true) {
        if (this.prevNode === "end") {
          document.getElementById(node.id).className = "box";
        } else {
          document.getElementById(node.id).className = this.prevNode;
        }
      }
    },
    //function is called when the mouse is pressed down on a node
    mouseDown: function (node) {
      let element = document.getElementById(node.id);
      if (element.className === "start") {
        this.moveStart = true;
      } else if (element.className === "end") {
        this.moveEnd = true;
      } else {
        this.mousePressed = true;
        this.makeWall(node);
      }
      console.log(node);
    },
    // function is called when we release the mouse press on a node
    mouseUp: function (node) {
      if (this.moveStart == true) {
        document.getElementById(node.id).className = "start";
        this.startY = node.row;
        this.startX = node.col;
        this.moveStart = false;
      } else if (this.moveEnd == true) {
        document.getElementById(node.id).className = "end";
        this.endY = node.row;
        this.endX = node.col;
        this.moveEnd = false;
      }
      this.mousePressed = false;
    },
    // Stylize wall of box (Does not set the nodes isWall data yet for speed purposes)
    makeWall: function (node) {
      let element = document.getElementById(node.id);
      if (element.className === "start" || element.className === "end") {
        return;
      } else {
        let element = document.getElementById(node.id);
        if (element.className === "wall") {
          element.className = "box";
        } else {
          element.className = "wall";
        }
      }
    },
    // Initialize the start node
    setStart: function () {
      let id = this.grid[this.startX][this.startY].id;
      document.getElementById(id).className = "start";
      this.grid[this.startX][this.startY].isStart = true;
    },
    // Initialize the end node
    setEnd: function () {
      let id = this.grid[this.endX][this.endY].id;
      document.getElementById(id).className = "end";
      this.grid[this.endX][this.endY].isEnd = true;
    },
    // Initialize the grid
    initGrid: function () {
      let newgrid = [];
      for (let col = 0; col < this.colNum; col++) {
        const currCol = [];
        for (let row = 0; row < this.rowNum; row++) {
          currCol.push(this.createNode(row, col));
        }
        newgrid.push(currCol);
      }
      this.grid = newgrid.slice();
    },
    // Create the node object for a cell
    createNode: function (row, col) {
      if (col == this.startX && row == this.startY) {
        return {
          col,
          row,
          isStart: true,
          isEnd: false,
          isWall: false,
          id: "Node-" + col + "-" + row,
        };
      } else if (col == this.endX && row == this.endY) {
        return {
          col,
          row,
          isStart: false,
          isEnd: true,
          isWall: false,
          id: "Node-" + col + "-" + row,
        };
      }
      return {
        col,
        row,
        isStart: false,
        isEnd: false,
        isWall: false,
        id: "Node-" + col + "-" + row,
      };
    },
    // Clears all walls from the grid
    resetGrid: function () {
      console.log("resetting");
      for (let col = 0; col < this.colNum; col++) {
        for (let row = 0; row < this.rowNum; row++) {
          let node = this.grid[col][row];
          let eleClass = document.getElementById(node.id).className;
          if (eleClass !== "start" && eleClass !== "end") {
            node.isWall = false;
            document.getElementById(node.id).className = "box";
          }
        }
      }
    },
    // returns an array of all neighbor nodes to a node
    getNeighbors: function (node) {
      result = [];
      let row = node.row;
      let col = node.col;

      //left
      if (
        row >= 0 &&
        row <= this.rowNum &&
        col - 1 >= 0 &&
        col - 1 <= this.colNum
      ) {
        let id = "Node-" + col + "-" + row - 1;
        result.append(document.getElementById(id));
      }
      // top
      if (
        row - 1 >= 0 &&
        row - 1 <= this.rowNum &&
        col >= 0 &&
        col <= this.colNum
      ) {
        let id = "Node-" + col - 1 + "-" + row;
        result.append(document.getElementById(id));
      }
      // right
      if (
        row >= 0 &&
        row <= this.rowNum &&
        col + 1 >= 0 &&
        col + 1 <= this.colNum
      ) {
        let id = "Node-" + col + "-" + row + 1;
        result.append(document.getElementById(id));
      }
      // bottom
      if (
        row + 1 >= 0 &&
        row + 1 <= this.rowNum &&
        col >= 0 &&
        col <= this.colNum
      ) {
        let id = "Node-" + col + 1 + "-" + row;
        result.append(document.getElementById(id));
      }
    },
    dfs: function () {
      console.log(this.startX + " " + this.startY);
      let id = "Node-" + this.startX + "-" + this.startY;
      let startElement = document.getElementById(id);
      this.dfsHelper([startElement]);
    },
    dfsHelper: function (array) {
      console.log(array);
    },
  },
};
</script>
<style lang="scss">
@import "./assets/scss/colors.scss";
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
    .col {
    }
  }
}
</style>