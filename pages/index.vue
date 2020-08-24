<template>
  <div class="sort-container">
    <div class="toolbar-container">
      <div class="main-buttons">
        <button class="toolbar-button" v-on:click="newArray">Generate New Array</button>
        <button class="toolbar-button" v-on:click="resetArray">Reset Array</button>
      </div>
      <div class="function-buttons">
        <button class="toolbar-button" v-on:click="mergeSortButton">Merge Sort</button>
        <button class="toolbar-button" v-on:click="quickSortButton">Quick Sort</button>
        <button class="toolbar-button" v-on:click="heapSortButton">Heap Sort</button>
        <button class="toolbar-button" v-on:click="bubbleSortButton">Bubble Sort</button>
        <button class="toolbar-button" v-on:click="selectionSortButton">Selection Sort</button>
        <button class="toolbar-button" v-on:click="insertionSortButton">Insertion Sort</button>
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
import mergeSortJS from "~/mixins/MergeSort.js";
import quickSortJS from "~/mixins/QuickSort.js";
import heapSortJS from "~/mixins/HeapSort.js";
import bubbleSortJS from "~/mixins/BubbleSort.js";
import selectionSortJS from "~/mixins/SelectionSort.js";
import insertionSortJS from "~/mixins/InsertionSort.js";
export default {
  mixins: [
    mergeSortJS,
    quickSortJS,
    heapSortJS,
    bubbleSortJS,
    selectionSortJS,
    insertionSortJS,
  ],
  data: function () {
    return {
      array: [], // stores the currently displayed array on screen
      animations: [], // stores the animations of the current sort
      defaultArr: [], // stores the newly generated array in unsorted form
      sorted: false, // is the current array sorted?,
      animSpeed: 20, // animation speed
    };
  },
  beforeMount: function () {
    this.$nextTick(function () {
      this.newArray();
    });
  },
  methods: {
    // Function that gets a random number between min and max
    randomIntFromInterval(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    // Resets the array to randomized integers to be sorted
    newArray: function () {
      this.sorted = false;
      this.array = [];
      for (let i = 0; i < 40; i++) {
        this.array.push(this.randomIntFromInterval(50, 800));
      }
      this.defaultArr = this.array.slice(0); // set default array
    },

    // Resets array to the unsorted version
    resetArray: function () {
      this.array = this.defaultArr.slice(0);
      this.sorted = false;
      console.log("Reset array complete.");
    },

    mergeSortButton: function () {
      // If array has already been sorted then return
      if (this.sorted === true) {
        console.log("Array already sorted.");
        return;
      }

      let res = this.mergeSort(this.array);
      this.array = res;
      this.sorted = true; // Set the array to sorted
    },

    quickSortButton: function () {
      // If array has already been sorted then return
      if (this.sorted === true) {
        console.log("Array already sorted.");
        return;
      }
      console.log(this.array, "Quick Sort started.");
      let res = this.quickSort(this.array, 0, this.array.length - 1);
      this.array = res.slice(0);
      this.sorted = true; // Set the array to sorted
      console.log(this.array, "Quick Sort finished.");
    },

    heapSortButton() {
      if (this.sorted === true) {
        console.log("Array already sorted.");
        return;
      }
      let res = this.heapSort(this.array);
      this.array = res.slice(0);
      this.sorted = true; // Set the array to sorted
    },

    bubbleSortButton() {
      if (this.sorted === true) {
        console.log("Array already sorted.");
        return;
      }

      const result = this.bubbleSort(this.array, this.animations);
      // this.array = result[0].slice(0);
      let sortedarray = result[0];
      let animations = result[1];
      this.sorted = true; // Set the array to sorted

      // Display animations
      for (let i = 0; i < animations.length; i++) {
        // Get animation variables
        let command = animations[i][0];
        const bars = document.getElementsByClassName("array-bar");
        const barsValues = document.getElementsByClassName("array-bar-value");
        let changeColor = false;
        let color = "$charcoal";

        // If we are comparing two elements change their color
        if (command == "comp1") {
          changeColor = true;
          color = "#E76F51";
        } else if (command == "comp2") {
          changeColor = true;
          color = "#E76F51";
        }
        if (changeColor == true) {
          let idxone = animations[i][1];
          let idxtwo = animations[i][2];
          setTimeout(() => {
            bars[idxone].style.backgroundColor = color;
            bars[idxone].style.backgroundColor = color;
          }, i * this.animSpeed);
        } else {
          let index = animations[i][1];
          let newHeight = animations[i][2];
          setTimeout(() => {
            bars[index].style.height = `${newHeight * 0.5}px`;
            barsValues[index].innerHTML = newHeight;
          }, i * this.animSpeed);
        }
      }
    },

    selectionSortButton() {
      if (this.sorted === true) {
        console.log("Array already sorted.");
        return;
      }

      let res = this.selectionSort(this.array);
      this.array = res.slice(0);
      this.sorted = true; // Set the array to sorted
    },

    insertionSortButton() {
      if (this.sorted === true) {
        console.log("Array already sorted.");
        return;
      }

      let res = this.insertionSort(this.array);
      this.array = res.slice(0);
      this.sorted = true; // Set the array to sorted
    },
  },
};
</script>

<style lang="scss">
@import "./assets/scss/colors.scss";

.sort-container {
  background-color: $alabaster;
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
  background-color: $charcoal;
  display: inline-block;
  margin: 0 4px;
}

.array-bar-value {
  color: $alabaster;
  transform: scaleY(-1);
  margin: 0;
  display: flex;
  justify-content: center;
}

.toolbar-container {
  padding-left: 40px;
  padding-right: 40px;
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.toolbar-button {
  margin: 15px;
  background-color: $persian-green;
  border: none;
  color: $alabaster;
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
