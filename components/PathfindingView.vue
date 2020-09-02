<template>
  <div class="path-container fade-in">
    <div class="function-buttons">
      <button
        class="toolbar-button"
        style="background-color: #E76F51"
        :disabled="buttonDisable"
      >Generate New</button>
      <button
        class="toolbar-button"
        style="background-color: #E76F51"
        :disabled="buttonDisable"
      >Reset Graph</button>
      <button class="toolbar-button" :disabled="buttonDisable">Depth First</button>
      <button class="toolbar-button" :disabled="buttonDisable">Breadth First</button>
      <button class="toolbar-button" :disabled="buttonDisable">Dijkstra's</button>
      <button class="toolbar-button" :disabled="buttonDisable">A*</button>
    </div>
    <div class="graph-action">
      <div class="row" v-for="(row, index) in this.grid" :key="index">
        <Node
          v-for="(node,rowindex) in row"
          :key="rowindex"
          :initRow="node.row"
          :initCol="node.col"
          :initIsWall="node.isWall"
          :initIsStart="node.isStart"
          :initIsEnd="node.isEnd"
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
      grid: [[]],
      animations: [], // stores the animations of the current sort
      defaultGraph: [], // stores the newly generated array in unsorted form
      found: false, // is the current array sorted?,
      animSpeed: 1, // animation speed
      buttonDisable: false,
    };
  },
  mounted: function () {
    this.initGrid();
  },
  methods: {
    initGrid: function () {
      const newgrid = [];
      for (let row = 0; row < 35; row++) {
        const currRow = [];
        for (let col = 0; col < 70; col++) {
          currRow.push(this.createNode(col, row));
        }
        newgrid.push(currRow);
      }
      this.grid = newgrid;
    },
    createNode: function (col, row) {
      return {
        col,
        row,
        isStart: false,
        isFinish: false,
        isWall: false,
      };
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