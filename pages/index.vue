<template>
  <div class="sort-container">
    <div class="toolbar-container">
      <div class="main-buttons">
        <button class="toolbar-button" :click="newArray">Generate New Array</button>
        <button class="toolbar-button" :click="resetArray">Reset Array</button>
      </div>
      <div class="function-buttons">
        <button class="toolbar-button" :click="mergeSort">Merge Sort</button>
        <button class="toolbar-button" :click="quickSort">Quick Sort</button>
        <button class="toolbar-button" :click="heapSort">Heap Sort</button>
        <button class="toolbar-button" :click="bubbleSort">Bubble Sort</button>
        <button class="toolbar-button" :click="selectionSort">Selection Sort</button>
        <button class="toolbar-button" :click="insertionSort">Insertion Sort</button>
      </div>
    </div>
    <div class="active-window">
      <div class="array-container">
        <div
          class="array-bar"
          v-for="(value,index) in this.array"
          :key="index"
          :style="{ 'height': `${value * .5}`+'px'}"
        >
          <p class="array-bar-value">{{ value }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mergeSort } from "../SortingAlgorithms/MergeSort.js";
import { quickSort } from "../SortingAlgorithms/QuickSort.js";
import { heapSort } from "../SortingAlgorithms/HeapSort.js";
import { bubbleSort } from "../SortingAlgorithms/BubbleSort.js";
import { selectionSort } from "../SortingAlgorithms/SelectionSort.js";
import { insertionSort } from "../SortingAlgorithms/InsertionSort.js";
export default {
  data: function () {
    return {
      array: []
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.newArray()
    });
  },
  methods: {
    // Function that gets a random number between min and max
    randomIntFromInterval(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    // Resets the array to randomized integers to be sorted
    newArray() {
      console.log("New array.")
      for (let i = 0; i < 40; i++) {
        this.array.push(this.randomIntFromInterval(5, 800));
      }
      // this.$store.commit("setCurrArray", array);
      // this.$store.commit("setDefArray", array.slice(0));
      // this.$store.commit("setSorted", false); // sets he sorted boolean to false
    },

    // Resets array to the unsorted version
    resetArray() {
      this.$store.commit("setCurrArray", this.$store.defaultArr.slice(0));
      this.$store.commit("setSorted", false); // sets he sorted boolean to false
      console.log("Reset array complete.");
    },

    mergeSort() {
      // If array has already been sorted then return
      if (this.state.sorted === true) {
        console.log("Array already sorted.");
        return;
      }

      let res = mergeSort(this.state.array);
      this.setState({ array: res });
      this.setState({ sorted: true }); // Set the array to sorted
    },

    quickSort() {
      // If array has already been sorted then return
      if (this.state.sorted === true) {
        console.log("Array already sorted.");
        return;
      }

      let res = quickSort(this.state.array, 0, this.state.array.length - 1);
      this.setState({ array: res });
      this.setState({ sorted: true }); // Set the array to sorted
    },

    heapSort() {
      if (this.state.sorted === true) {
        console.log("Array already sorted.");
        return;
      }
      let res = heapSort(this.state.array);
      this.setState({ array: res });
      this.setState({ sorted: true }); // Set the array to sorted
    },

    bubbleSort() {
      if (this.state.sorted === true) {
        console.log("Array already sorted.");
        return;
      }

      let res = bubbleSort(this.state.array);
      this.setState({ array: res });
      this.setState({ sorted: true }); // Set the array to sorted
    },

    selectionSort() {
      if (this.state.sorted === true) {
        console.log("Array already sorted.");
        return;
      }

      let res = selectionSort(this.state.array);
      this.setState({ array: res });
      this.setState({ sorted: true }); // Set the array to sorted
    },

    insertionSort() {
      if (this.state.sorted === true) {
        console.log("Array already sorted.");
        return;
      }

      let res = insertionSort(this.state.array);
      this.setState({ array: res });
      this.setState({ sorted: true }); // Set the array to sorted
    },
  },
};
</script>

<style>
.sort-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.active-window {
  display: flex;
  flex-direction: row;
}

.array-container {
  display: flex;
  flex-direction: row;
  height: 88vh;
  width: 100%;
  justify-content: center;
  left: 100px;
  transform: scaleY(-1);
}

.array-bar {
  width: 30px;
  background-color: #a5c9ff;
  display: inline-block;
  margin: 0 4px;
}

.array-bar-value {
  transform: scaleY(-1);
  margin: 0;
}

.toolbar-container {
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: whitesmoke;
}

.toolbar-button {
  margin: 15px;
  background-color: #a5ffc9;
  /* Green */
  border: none;
  color: #090909;
  padding: 10px 16px;
  text-align: center;
  display: inline-block;
  font-size: 16px;
}

.main-buttons {
  padding-left: 20px;
}

.function-buttons {
  padding-right: 20px;
}

.toolbar-button:hover {
  opacity: 0.7;
  cursor: pointer;
}
</style>
