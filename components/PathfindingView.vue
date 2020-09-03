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
      <button class="toolbar-button" :disabled="buttonDisable">Depth First</button>
      <button class="toolbar-button" :disabled="buttonDisable">Breadth First</button>
      <button class="toolbar-button" :disabled="buttonDisable">Dijkstra's</button>
      <button class="toolbar-button" :disabled="buttonDisable">A*</button>
    </div>
    <div class="graph-action">
      <div class="row" v-for="(row, index) in this.grid" :key="index">
        <Node
          v-for="node in row"
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
      rowNum: 30,
      colNum: 70,
      grid: [[]],
      startX: 30,
      startY: 15,
      endX: 40,
      endY: 15,
      animations: [], // stores the animations of the current sort
      defaultGraph: [], // stores the newly generated array in unsorted form
      found: false, // is the current array sorted?,
      animSpeed: 1, // animation speed
      buttonDisable: false,
      mousePressed: false,
      moveStart: false,
      moveEnd: false,
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
    mouseEnter: function (node) {
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
    mouseOut: function (node) {
      if (this.moveStart == true) {
        document.getElementById(node.id).className = "box";
      } else if (this.moveEnd == true) {
        document.getElementById(node.id).className = "box";
      }
    },
    mouseDown: function (node) {
      if (node.isStart == true) {
        node.isStart = false;
        this.moveStart = true;
      } else if (node.isEnd == true) {
        node.isEnd = false;
        this.moveEnd = true;
      } else {
        this.mousePressed = true;
        this.makeWall(node);
      }
    },
    mouseUp: function (node) {
      if (this.moveStart == true) {
        document.getElementById(node.id).className = "start";
        node.isStart = true;
        this.moveStart = false;
      } else if (this.moveEnd == true) {
        document.getElementById(node.id).className = "end";
        node.isEnd = true;
        this.moveEnd = false;
      }
      this.mousePressed = false;
    },
    // Stylize wall of box (Does not set the nodes isWall data yer for speed purposes)
    makeWall: function (node) {
      if (node.isStart == false && node.isEnd == false) {
        let element = document.getElementById(node.id);
        if (element.className === "wall") {
          element.className = "box";
        } else {
          element.className = "wall";
        }
      }
    },
    setStart: function () {
      let id = this.grid[this.startY][this.startX].id;
      document.getElementById(id).className = "start";
      this.grid[this.startY][this.startX].isStart = true;
    },
    setEnd: function () {
      let id = this.grid[this.endY][this.endX].id;
      document.getElementById(id).className = "end";
      this.grid[this.endY][this.endX].isEnd = true;
    },
    // Initialize the grid
    initGrid: function () {
      let newgrid = [];
      for (let row = 0; row < this.rowNum; row++) {
        const currRow = [];
        for (let col = 0; col < this.colNum; col++) {
          currRow.push(this.createNode(col, row));
        }
        newgrid.push(currRow);
      }
      this.grid = newgrid.slice();
    },
    createNode: function (col, row) {
      if (col == this.startX && row == this.startY) {
        return {
          col,
          row,
          isStart: true,
          isEnd: false,
          isWall: false,
          id: "Node-" + row + "-" + col,
        };
      } else if (col == this.endX && row == this.endY) {
        return {
          col,
          row,
          isStart: false,
          isEnd: true,
          isWall: false,
          id: "Node-" + row + "-" + col,
        };
      }
      return {
        col,
        row,
        isStart: false,
        isEnd: false,
        isWall: false,
        id: "Node-" + row + "-" + col,
      };
    },
    resetGrid: function () {
      console.log("resetting");
      for (let row = 0; row < this.rowNum; row++) {
        for (let col = 0; col < this.colNum; col++) {
          let node = this.grid[row][col];
          if (node.isStart == false && node.isEnd == false) {
            node.isWall = false;
            document.getElementById(node.id).className = "box";
          }
        }
      }
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .row {
      display: flex;
    }
  }
}
</style>