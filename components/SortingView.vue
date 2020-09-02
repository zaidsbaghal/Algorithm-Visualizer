<template>
  <div class="sort-container fade-in">
    <div class="function-buttons">
      <button
        class="toolbar-button"
        style="background-color: #E76F51"
        v-on:click="genArray"
        :disabled="buttonDisable"
      >Generate New</button>
      <button
        class="toolbar-button"
        style="background-color: #E76F51"
        v-on:click="resetArray"
        :disabled="buttonDisable"
      >Reset Array</button>
      <button
        class="toolbar-button"
        v-on:click="mergeSortButton"
        :disabled="buttonDisable"
      >Merge Sort</button>
      <button
        class="toolbar-button"
        v-on:click="quickSortButton"
        :disabled="buttonDisable"
      >Quick Sort</button>
      <button
        class="toolbar-button"
        v-on:click="bubbleSortButton"
        :disabled="buttonDisable"
      >Bubble Sort</button>
      <button
        class="toolbar-button"
        v-on:click="selectionSortButton"
        :disabled="buttonDisable"
      >Selection Sort</button>
      <button
        class="toolbar-button"
        v-on:click="insertionSortButton"
        :disabled="buttonDisable"
      >Insertion Sort</button>
    </div>
    <div class="active-window">
      <div class="array-container">
        <div
          class="array-bar"
          v-for="(value,index) in this.array"
          :key="index"
          :style="{ 'height': `${value * .65}`+'px'}"
        ></div>
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
      animSpeed: 1, // animation speed
      context: this,
      buttonDisable: false, // is something running currently?
    };
  },
  mounted: function () {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();

      setTimeout(() => this.$nuxt.$loading.finish(), 1000);
    });
  },
  beforeMount: function () {
    this.$nextTick(function () {
      this.newArray();
    });
  },
  methods: {
    disableButtons: function () {
      this.buttonDisable = true;
    },
    enableButtons: function () {
      this.buttonDisable = false;
    },
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

      for (let i = 0; i < 80; i++) {
        this.$set(this.array, i, this.randomIntFromInterval(50, 999));
      }

      this.defaultArr = this.array.slice(0); // set default array
    },
    // Resets the array to randomized integers to be sorted
    genArray: function () {
      // Check if something is running

      this.colorReset();
      this.newArray();
    },
    // Resets array to the unsorted version
    resetArray: function () {
      // Check if something is running
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

      // Disable buttons while running
      this.disableButtons();

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
            try {
              bars[idxone].style.backgroundColor = "#2A9D8F";
            } catch (error) {}
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
            try {
              bars[idx].style.backgroundColor = "#264653";
            } catch (err) {}
          }, i * this.animSpeed);
        } else if (command == "done") {
          let idx = animations[i][1];
          setTimeout(function () {
            bars[idx].style.backgroundColor = "#E76F51";
          }, i * this.animSpeed);
        } else if (command == "sorted") {
          let idx = animations[i][1];
          new Promise((resolve, reject) => {
            setTimeout(function () {
              for (let j = 0; j <= idx; j++) {
                bars[j].style.backgroundColor = "#E76F51";
              }
              resolve();
            }, i * this.animSpeed);
          }).then(() => {
            this.animations = [];
            this.enableButtons();
            this.sorted = true; // Set the array to sorted
          });
        } else {
          // swap command
          let idxone = animations[i][1];
          let idxtwo = animations[i][2];
          let newHeight = animations[i][3];
          setTimeout(
            function () {
              bars[idxone].style.height = `${newHeight * 0.65}px`;
              this.$set(this.array, idxone, newHeight);
              bars[idxone].style.backgroundColor = "#264653";
              bars[idxone].style.backgroundColor = "#264653";
            }.bind(this),
            i * this.animSpeed
          );
        }
      }
    },

    quickSortButton: function () {
      // If array has already been sorted then return
      if (this.sorted === true) {
        console.log("Array already sorted.");
        return;
      }

      // Disable buttons while running
      this.disableButtons();

      const result = this.quickSort(
        this.array.slice(),
        0,
        this.array.length - 1,
        this.animations
      );
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
            try {
              bars[idxone].style.backgroundColor = "#2A9D8F";
            } catch (error) {}
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
            try {
              bars[idx].style.backgroundColor = "#264653";
            } catch (error) {}
          }, i * this.animSpeed);
        } else if (command == "left") {
          let idx = animations[i][1];
          setTimeout(function () {
            bars[idx].style.backgroundColor = "#F4A261";
          }, i * this.animSpeed);
        } else if (command == "right") {
          let idx = animations[i][1];
          setTimeout(function () {
            bars[idx].style.backgroundColor = "#E76F51";
          }, i * this.animSpeed);
        } else if (command == "sorted") {
          let idx = animations[i][1];
          new Promise((resolve, reject) => {
            setTimeout(function () {
              for (let j = 0; j <= idx; j++) {
                bars[j].style.backgroundColor = "#E76F51";
              }
              resolve();
            }, i * this.animSpeed);
          }).then(() => {
            this.animations = [];
            this.enableButtons();
            this.sorted = true; // Set the array to sorted
          });
        } else {
          // swap command
          let idxone = animations[i][1];
          let idxtwo = animations[i][2];
          let newHeight = animations[i][3];
          setTimeout(
            function () {
              bars[idxone].style.height = `${newHeight * 0.65}px`;
              this.$set(this.array, idxone, newHeight);
              bars[idxone].style.backgroundColor = "#E9C46A";
              bars[idxone].style.backgroundColor = "#E9C46A";
            }.bind(this),
            i * this.animSpeed
          );
        }
      }
    },

    bubbleSortButton() {
      if (this.sorted === true) {
        console.log("Array already sorted.");
        return;
      }
      // Disable buttons while running
      this.disableButtons();

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
          new Promise((resolve, reject) => {
            setTimeout(function () {
              for (let j = 0; j <= idx; j++) {
                bars[j].style.backgroundColor = "#E76F51";
              }
              resolve();
            }, i * this.animSpeed);
          }).then(() => {
            this.animations = [];
            this.enableButtons();
            this.sorted = true; // Set the array to sorted
          });
        } else {
          // swap command
          let idx = animations[i][1];
          let newHeight = animations[i][2];
          setTimeout(
            function () {
              bars[idx].style.height = `${newHeight * 0.65}px`;
              this.$set(this.array, idx, newHeight);
            }.bind(this),
            i * this.animSpeed
          );
        }
      }
    },

    selectionSortButton() {
      if (this.sorted === true) {
        console.log("Array already sorted.");
        return;
      }
      // Disable buttons while running
      this.disableButtons();
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
          new Promise((resolve, reject) => {
            setTimeout(function () {
              for (let j = 0; j <= idx; j++) {
                bars[j].style.backgroundColor = "#E76F51";
              }
              resolve();
            }, i * this.animSpeed);
          }).then(() => {
            this.animations = [];
            this.enableButtons();
            this.sorted = true; // Set the array to sorted
          });
        } else {
          // swap command
          let idxone = animations[i][1];
          let idxtwo = animations[i][2];
          let newHeight = animations[i][3];
          setTimeout(
            function () {
              bars[idxone].style.height = `${newHeight * 0.65}px`;
              this.$set(this.array, idxone, newHeight);
              bars[idxone].style.backgroundColor = "#E76F51";
              bars[idxone].style.backgroundColor = "#E76F51";
            }.bind(this),
            i * this.animSpeed
          );
        }
      }
    },

    insertionSortButton() {
      if (this.sorted === true) {
        console.log("Array already sorted.");
        return;
      }
      // Disable buttons while running
      this.disableButtons();
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
        } else if (command == "sorted") {
          let idx = animations[i][1];
          new Promise((resolve, reject) => {
            setTimeout(function () {
              for (let j = 0; j <= idx; j++) {
                bars[j].style.backgroundColor = "#E76F51";
              }
              resolve();
            }, i * this.animSpeed);
          }).then(() => {
            this.animations = [];
            this.enableButtons();
            this.sorted = true; // Set the array to sorted
          });
        } else {
          // swap command
          let idxone = animations[i][1];
          let idxtwo = animations[i][2];
          let newHeight = animations[i][3];
          setTimeout(
            function () {
              bars[idxone].style.height = `${newHeight * 0.65}px`;
              this.$set(this.array, idxone, newHeight);
              bars[idxone].style.backgroundColor = "#264653";
              bars[idxone].style.backgroundColor = "#264653";
            }.bind(this),
            i * this.animSpeed
          );
        }
      }
    },
  },
};
</script>

<style lang="scss">
@import "./assets/scss/colors.scss";
.sort-container {
  padding-left: 150px;
  padding-right: 150px;
  width: 100%;
  display: flex;
  flex-direction: column;
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

.active-window {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 75vh;
  padding: 3rem;
}

.array-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  left: 100px;
  height: 100%;
  transform: scaleY(-1);
}

.array-bar {
  width: 15px;
  background-color: $charcoal;
  display: inline-block;
  margin: 0 2px;
}

.array-bar-value {
  font-size: 8px;
  color: $alabaster;
  transform: scaleY(-1);
  margin: 0;
  display: flex;
  justify-content: center;
}
</style>