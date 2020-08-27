<template>
  <div class="sort-container">
    <div class="algorithm-container">
      <div class="select-container">
        <select class="algo-select" name="algorithms" id="algorithms">
          <option value="sorting">Sorting</option>
          <option value="pathfinding">Pathfinding</option>
          <option value="searching">Searching</option>
        </select>
      </div>
    </div>
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
import bubbleSortJS from "~/mixins/BubbleSort.js";
import selectionSortJS from "~/mixins/SelectionSort.js";
import insertionSortJS from "~/mixins/InsertionSort.js";
export default {
  mixins: [
    mergeSortJS,
    quickSortJS,
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
      animSpeed: 10, // animation speed
      context: this,
      processing: false, // is something running currently?
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
    // Resets the color of the array to default
    colorReset: function () {
      const bars = document.getElementsByClassName("array-bar");
      for (let i = 0; i < this.array.length; i++) {
        bars[i].style.backgroundColor = "#264653";
      }
    },
    // Resets the array to randomized integers to be sorted
    newArray: function () {
      this.sorted = false;
      this.array = [];

      for (let i = 0; i < 40; i++) {
        this.$set(this.array, i, this.randomIntFromInterval(50, 999));
      }

      this.defaultArr = this.array.slice(0); // set default array
    },
    // Resets the array to randomized integers to be sorted
    genArray: function () {
      // Check if something is running
      if (this.processing === true) {
        return;
      } else {
        this.colorReset();
        this.newArray();
      }
    },
    // Resets array to the unsorted version
    resetArray: function () {
      // Check if something is running
      if (this.processing === true) {
        return;
      }
      this.colorReset();
      this.array = this.defaultArr.slice(0);

      this.animations = [];
      this.sorted = false;
      console.log("Reset array complete.");
    },
    // Trigger merge sort animation
    mergeSortButton: function () {
      // If array has already been sorted then return
      if (this.sorted === true) {
        console.log("Array already sorted.");
        return;
      }
      // Check if something is running
      if (this.processing === true) {
        return;
      }
      this.processing = true; // set processing to true as we are about to run the algorithm
      const result = this.mergeSort(this.array.slice(), this.animations);
      // let sortedarray = result[0];
      let animations = result[1];

      // Display animations
      for (let i = 0; i < animations.length; i++) {
        // Get animation variables
        let command = animations[i][0];
        const bars = document.getElementsByClassName("array-bar");

        // If we are comparing two elements change their color
        if (command == "curr") {
          let idxone = animations[i][1];
          setTimeout(function () {
            bars[idxone].style.backgroundColor = "#2A9D8F";
          }, i * this.animSpeed);
        } else if (command == "comp") {
          let idxone = animations[i][1];
          let idxtwo = animations[i][2];
          setTimeout(function () {
            bars[idxone].style.backgroundColor = "#E9C46A";
            bars[idxtwo].style.backgroundColor = "#E9C46A";
          }, i * this.animSpeed);
        } else if (command == "clear") {
          let idx = animations[i][1];
          setTimeout(function () {
            bars[idx].style.backgroundColor = "#264653";
          }, i * this.animSpeed);
        } else if (command == "done") {
          let idx = animations[i][1];
          setTimeout(function () {
            bars[idx].style.backgroundColor = "#E76F51";
          }, i * this.animSpeed);
        } else if (command == "sorted") {
          let idx = animations[i][1];
          setTimeout(function () {
            for (let j = 0; j <= idx; j++) {
              bars[j].style.backgroundColor = "#E76F51";
            }
          }, i * this.animSpeed);
        } else {
          // swap command
          let idxone = animations[i][1];
          let idxtwo = animations[i][2];
          let newHeight = animations[i][3];
          setTimeout(
            function () {
              bars[idxone].style.height = `${newHeight * 0.5}px`;
              this.$set(this.array, idxone, newHeight);
              bars[idxone].style.backgroundColor = "#E76F51";
              bars[idxone].style.backgroundColor = "#E76F51";
            }.bind(this),
            i * this.animSpeed
          );
        }
      }
      this.animations = [];
      this.processing = false;
      this.sorted = true; // Set the array to sorted
    },

    quickSortButton: function () {
      // If array has already been sorted then return
      if (this.sorted === true) {
        console.log("Array already sorted.");
        return;
      }
      // Check if something is running
      if (this.processing === true) {
        return;
      }
      this.processing = true; // set processing to true as we are about to run the algorithm

      console.log(this.array, "Quick Sort started.");
      let res = this.quickSort(this.array, 0, this.array.length - 1);
      this.array = res.slice(0);
      this.processing = false;
      this.sorted = true; // Set the array to sorted
      console.log(this.array, "Quick Sort finished.");
    },

    bubbleSortButton() {
      if (this.sorted === true) {
        console.log("Array already sorted.");
        return;
      }
      // Check if something is running
      if (this.processing === true) {
        return;
      }
      this.processing = true; // set processing to true as we are about to run the algorithm

      const result = this.bubbleSort(this.array.slice(), this.animations);
      // let sortedarray = result[0];
      let animations = result[1];

      // Display animations
      for (let i = 0; i < animations.length; i++) {
        // Get animation variables
        let command = animations[i][0];
        const bars = document.getElementsByClassName("array-bar");

        // If we are comparing two elements change their color
        if (command == "curr") {
          let idxone = animations[i][1];
          setTimeout(function () {
            bars[idxone].style.backgroundColor = "#2A9D8F";
          }, i * this.animSpeed);
        } else if (command == "comp") {
          let idxone = animations[i][1];
          let idxtwo = animations[i][2];
          setTimeout(function () {
            bars[idxone].style.backgroundColor = "#E9C46A";
            bars[idxtwo].style.backgroundColor = "#E9C46A";
          }, i * this.animSpeed);
        } else if (command == "clear") {
          let idx = animations[i][1];
          setTimeout(function () {
            bars[idx].style.backgroundColor = "#264653";
          }, i * this.animSpeed);
        } else if (command == "done") {
          let idx = animations[i][1];
          setTimeout(function () {
            bars[idx].style.backgroundColor = "#E76F51";
          }, i * this.animSpeed);
        } else if (command == "sorted") {
          let idx = animations[i][1];
          setTimeout(function () {
            for (let j = 0; j <= idx; j++) {
              bars[j].style.backgroundColor = "#E76F51";
            }
          }, i * this.animSpeed);
        } else {
          // swap command
          let idx = animations[i][1];
          let newHeight = animations[i][2];
          setTimeout(
            function () {
              bars[idx].style.height = `${newHeight * 0.5}px`;
              this.$set(this.array, idx, newHeight);
            }.bind(this),
            i * this.animSpeed
          );
        }
      }
      this.animations = [];
      this.processing = false;
      this.sorted = true; // Set the array to sorted
    },

    selectionSortButton() {
      if (this.sorted === true) {
        console.log("Array already sorted.");
        return;
      }
      // Check if something is running
      if (this.processing === true) {
        return;
      }
      this.processing = true; // set processing to true as we are about to run the algorithm

      const result = this.selectionSort(this.array.slice(), this.animations);

      let animations = result[1];
      // Display animations
      for (let i = 0; i < animations.length; i++) {
        // Get animation variables
        let command = animations[i][0];
        const bars = document.getElementsByClassName("array-bar");

        // If we are comparing two elements change their color
        if (command == "curr") {
          let idxone = animations[i][1];
          setTimeout(function () {
            bars[idxone].style.backgroundColor = "#2A9D8F";
          }, i * this.animSpeed);
        } else if (command == "comp") {
          let idxone = animations[i][1];
          let idxtwo = animations[i][2];
          setTimeout(function () {
            bars[idxone].style.backgroundColor = "#E9C46A";
            bars[idxtwo].style.backgroundColor = "#E9C46A";
          }, i * this.animSpeed);
        } else if (command == "clear") {
          let idx = animations[i][1];
          setTimeout(function () {
            bars[idx].style.backgroundColor = "#264653";
          }, i * this.animSpeed);
        } else if (command == "done") {
          let idx = animations[i][1];
          setTimeout(function () {
            bars[idx].style.backgroundColor = "#E76F51";
          }, i * this.animSpeed);
        } else if (command == "sorted") {
          let idx = animations[i][1];
          setTimeout(function () {
            for (let j = 0; j <= idx; j++) {
              bars[j].style.backgroundColor = "#E76F51";
            }
          }, i * this.animSpeed);
        } else {
          // swap command
          let idxone = animations[i][1];
          let idxtwo = animations[i][2];
          let newHeight = animations[i][3];
          setTimeout(
            function () {
              bars[idxone].style.height = `${newHeight * 0.5}px`;
              this.$set(this.array, idxone, newHeight);
              bars[idxone].style.backgroundColor = "#E76F51";
              bars[idxone].style.backgroundColor = "#E76F51";
            }.bind(this),
            i * this.animSpeed
          );
        }
      }

      this.animations = [];
      this.processing = false;
      this.sorted = true; // Set the array to sorted
    },

    insertionSortButton() {
      if (this.sorted === true) {
        console.log("Array already sorted.");
        return;
      }
      // Check if something is running
      if (this.processing === true) {
        return;
      }
      this.processing = true; // set processing to true as we are about to run the algorithm

      const result = this.insertionSort(this.array.slice(), this.animations);
      // let sortedarray = result[0];
      let animations = result[1];

      // Display animations
      for (let i = 0; i < animations.length; i++) {
        // Get animation variables
        let command = animations[i][0];
        const bars = document.getElementsByClassName("array-bar");

        if (command == "curr") {
          let idxone = animations[i][1];
          setTimeout(function () {
            bars[idxone].style.backgroundColor = "#2A9D8F"; // green
          }, i * this.animSpeed);
        } else if (command == "init") {
          let idxone = animations[i][1];
          setTimeout(function () {
            bars[idxone].style.backgroundColor = "#E76F51"; // red for sorted list
          }, i * this.animSpeed);
        } else if (command == "comp") {
          let idxone = animations[i][1];
          let idxtwo = animations[i][2];
          setTimeout(function () {
            bars[idxone].style.backgroundColor = "#E9C46A"; // comparisons are yellow
            // bars[idxone].style.backgroundColor = "#E76F51"; // switch back to red
            bars[idxtwo].style.backgroundColor = "#E9C46A";
          }, i * this.animSpeed);
        } else {
          // swap command
          let idxone = animations[i][1];
          let idxtwo = animations[i][2];
          let newHeight = animations[i][3];
          setTimeout(
            function () {
              bars[idxone].style.height = `${newHeight * 0.5}px`;
              this.$set(this.array, idxone, newHeight);
              bars[idxone].style.backgroundColor = "#E76F51";
              bars[idxone].style.backgroundColor = "#E76F51";
            }.bind(this),
            i * this.animSpeed
          );
        }
      }

      this.animations = [];
      this.processing = false;
      this.sorted = true; // Set the array to sorted
    },
  },
};
</script>

<style lang="scss">
@import "./assets/scss/colors.scss";

select {
  text-align-last: center;
}

.algorithm-container {
  margin-top: 1rem;
  margin-bottom: 1rem;
  height: 5.5rem;
  display: flex;
  justify-content: center;
  .algo-select {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    text-align: center;
    width: 300px;
    padding-left: 20px;
    padding-right: 20px;
    height: 100px;
    font-size: 45px;
    font-weight: bold;
    cursor: pointer;
    background-color: $alabaster;
    border: none;
    color: $charcoal;
    appearance: none;
  }
}

.sort-container {
  background-color: $alabaster;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
}

.active-window {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  padding: 3rem;
}

.array-container {
  display: flex;
  flex-direction: row;
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
