<template>
  <div class="toolbar-container">
    <div class="function-buttons">
      <button
        class="toolbar-button"
        style="background-color: #E76F51"
        v-on:click="genArray"
      >Generate New</button>
      <button
        class="toolbar-button"
        style="background-color: #E76F51"
        v-on:click="resetArray"
      >Reset Array</button>
      <button class="toolbar-button" v-on:click="mergeSortButton">Merge Sort</button>
      <button class="toolbar-button" v-on:click="quickSortButton">Quick Sort</button>
      <button class="toolbar-button" v-on:click="bubbleSortButton">Bubble Sort</button>
      <button class="toolbar-button" v-on:click="selectionSortButton">Selection Sort</button>
      <button class="toolbar-button" v-on:click="insertionSortButton">Insertion Sort</button>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$emit("merge");
  },
};
</script>
<style lang="scss">
.toolbar-container {
  padding-left: 150px;
  padding-right: 150px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.toolbar-button {
  margin: 15px;
  background-color: $charcoal;
  border: none;
  color: $alabaster;
  padding: 10px 16px;
  text-align: center;
  display: inline-block;
  font-size: 16px;
}

.toolbar-button:hover {
  opacity: 0.7;
  cursor: pointer;
}
</style>