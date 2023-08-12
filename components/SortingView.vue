<template>
  <div class="sort-container fade-in">
    <div class="function-buttons">
      <button
        class="toolbar-button"
        style="background-color: #e76f51"
        v-on:click="genArray"
        :disabled="buttonDisable"
      >
        Generate New
      </button>
      <button
        class="toolbar-button"
        style="background-color: #e76f51"
        v-on:click="resetArray"
        :disabled="buttonDisable"
      >
        Reset Array
      </button>
      <button
        class="toolbar-button"
        v-on:click="mergeSortButton"
        :disabled="buttonDisable"
      >
        Merge Sort
      </button>
      <button
        class="toolbar-button"
        v-on:click="quickSortButton"
        :disabled="buttonDisable"
      >
        Quick Sort
      </button>
      <button
        class="toolbar-button"
        v-on:click="bubbleSortButton"
        :disabled="buttonDisable"
      >
        Bubble Sort
      </button>
      <button
        class="toolbar-button"
        v-on:click="selectionSortButton"
        :disabled="buttonDisable"
      >
        Selection Sort
      </button>
      <button
        class="toolbar-button"
        v-on:click="insertionSortButton"
        :disabled="buttonDisable"
      >
        Insertion Sort
      </button>
    </div>
    <div class="active-window">
      <div class="array-container">
        <div
          class="array-bar"
          v-for="(value, index) in array"
          :key="index"
          :style="{ height: `${value * heightFactor}` + 'px' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeMount } from "vue";

export default {
  setup() {
    const array = ref([]);
    const animations = ref([]);
    const defaultArr = ref([]);
    const sorted = ref(false);
    const animSpeed = ref(1);
    const buttonDisable = ref(false);

    const genArray = () => {
      // Check if something is running

      colorReset();
      newArray();
    };

    const resetArray = () => {
      // Check if something is running
      colorReset();
      array.value = defaultArr.value.slice(0);

      animations.value = [];
      sorted.value = false;
    };

    const disableButtons = () => {
      buttonDisable.value = true;
    };

    const enableButtons = () => {
      buttonDisable.value = false;
    };

    const randomIntFromInterval = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };

    const colorReset = () => {
      const bars = document.getElementsByClassName("array-bar");
      for (let i = 0; i < array.value.length; i++) {
        bars[i].style.backgroundColor = "#264653";
      }
    };

    const newArray = () => {
      sorted.value = false;
      array.value = [];

      for (let i = 0; i < 80; i++) {
        array.value[i] = randomIntFromInterval(50, 999);
      }

      defaultArr.value = array.value.slice(0); // set default array
    };

    const heightFactor = computed(() => {
      var mq = window.matchMedia(
        "(min-device-width: 1200px) and (max-device-width: 1600px)"
      );
      return mq.matches ? 0.55 : 0.65;
    });

    onBeforeMount(() => {
      newArray(); // Assuming newArray is defined within the component
    });

    onMounted(async () => {
      await $nuxt.$loading.start(); // assuming $nuxt.$loading is defined
      setTimeout(() => $nuxt.$loading.finish(), 1000);
    });

    // Trigger merge sort animation
    const mergeSortButton = () => {
      // If array has already been sorted then return
      if (sorted.value === true) {
        return;
      }

      // Disable buttons while running
      disableButtons();

      const result = mergeSort(array.value.slice(), animations.value);
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
          }, i * animSpeed.value);
        } else if (command == "comp") {
          let idxone = animations[i][1];
          let idxtwo = animations[i][2];
          setTimeout(function () {
            bars[idxone].style.backgroundColor = "#E9C46A";
            bars[idxtwo].style.backgroundColor = "#E9C46A";
          }, i * animSpeed.value);
        } else if (command == "clear") {
          let idx = animations[i][1];
          setTimeout(function () {
            try {
              bars[idx].style.backgroundColor = "#264653";
            } catch (err) {}
          }, i * animSpeed.value);
        } else if (command == "done") {
          let idx = animations[i][1];
          setTimeout(function () {
            bars[idx].style.backgroundColor = "#E76F51";
          }, i * animSpeed.value);
        } else if (command == "sorted") {
          let idx = animations[i][1];
          new Promise((resolve, reject) => {
            setTimeout(function () {
              for (let j = 0; j <= idx; j++) {
                bars[j].style.backgroundColor = "#E76F51";
              }
              resolve();
            }, i * animSpeed.value);
          }).then(() => {
            animations.value = [];
            enableButtons();
            sorted.value = true; // Set the array to sorted
          });
        } else {
          // swap command
          let idxone = animations[i][1];
          let idxtwo = animations[i][2];
          let newHeight = animations[i][3];
          setTimeout(() => {
            bars[idxone].style.height = `${newHeight * heightFactor.value}px`;
            array.value[idxone] = newHeight; // Replacing the $set call
            bars[idxone].style.backgroundColor = "#264653";
          }, i * animSpeed.value);
        }
      }
    };

    const quickSortButton = () => {
      // If array has already been sorted then return
      if (sorted.value === true) {
        return;
      }

      // Disable buttons while running
      disableButtons();

      const result = quickSort(
        array.value.slice(),
        0,
        array.value.length - 1,
        animations.value
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
          }, i * animSpeed.value);
        } else if (command == "comp") {
          let idxone = animations[i][1];
          let idxtwo = animations[i][2];
          setTimeout(function () {
            bars[idxone].style.backgroundColor = "#E9C46A";
            bars[idxtwo].style.backgroundColor = "#E9C46A";
          }, i * animSpeed.value);
        } else if (command == "clear") {
          let idx = animations[i][1];
          setTimeout(function () {
            try {
              bars[idx].style.backgroundColor = "#264653";
            } catch (error) {}
          }, i * animSpeed.value);
        } else if (command == "left") {
          let idx = animations[i][1];
          setTimeout(function () {
            bars[idx].style.backgroundColor = "#F4A261";
          }, i * animSpeed.value);
        } else if (command == "right") {
          let idx = animations[i][1];
          setTimeout(function () {
            bars[idx].style.backgroundColor = "#E76F51";
          }, i * animSpeed.value);
        } else if (command == "sorted") {
          let idx = animations[i][1];
          new Promise((resolve, reject) => {
            setTimeout(function () {
              for (let j = 0; j <= idx; j++) {
                bars[j].style.backgroundColor = "#E76F51";
              }
              resolve();
            }, i * animSpeed.value);
          }).then(() => {
            animations.value = [];
            enableButtons();
            sorted.value = true; // Set the array to sorted
          });
        } else {
          // swap command
          let idxone = animations[i][1];
          let idxtwo = animations[i][2];
          let newHeight = animations[i][3];
          setTimeout(() => {
            bars[idxone].style.height = `${newHeight * heightFactor.value}px`;
            array.value[idxone] = newHeight; // Replacing the $set call
            bars[idxone].style.backgroundColor = "#E9C46A";
          }, i * animSpeed.value);
        }
      }
    };

    const bubbleSortButton = () => {
      if (sorted.value === true) {
        return;
      }
      // Disable buttons while running
      disableButtons();

      const result = bubbleSort(array.value.slice(), animations.value);
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
          }, i * animSpeed.value);
        } else if (command == "comp") {
          let idxone = animations[i][1];
          let idxtwo = animations[i][2];
          setTimeout(function () {
            bars[idxone].style.backgroundColor = "#E9C46A";
            bars[idxtwo].style.backgroundColor = "#E9C46A";
          }, i * animSpeed.value);
        } else if (command == "clear") {
          let idx = animations[i][1];
          setTimeout(function () {
            bars[idx].style.backgroundColor = "#264653";
          }, i * animSpeed.value);
        } else if (command == "done") {
          let idx = animations[i][1];
          setTimeout(function () {
            bars[idx].style.backgroundColor = "#E76F51";
          }, i * animSpeed.value);
        } else if (command == "sorted") {
          let idx = animations[i][1];
          new Promise((resolve, reject) => {
            setTimeout(function () {
              for (let j = 0; j <= idx; j++) {
                bars[j].style.backgroundColor = "#E76F51";
              }
              resolve();
            }, i * animSpeed.value);
          }).then(() => {
            animations.value = [];
            enableButtons();
            sorted.value = true; // Set the array to sorted
          });
        } else {
          // swap command
          let idx = animations[i][1];
          let newHeight = animations[i][2];
          setTimeout(() => {
            bars[idxone].style.height = `${newHeight * heightFactor.value}px`;
            array.value[idxone] = newHeight; // Replacing the $set call
          }, i * animSpeed.value);
        }
      }
    };

    const selectionSortButton = () => {
      if (sorted.value === true) {
        return;
      }
      // Disable buttons while running
      disableButtons();
      const result = selectionSort(array.value.slice(), animations.value);

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
          }, i * animSpeed.value);
        } else if (command == "comp") {
          let idxone = animations[i][1];
          let idxtwo = animations[i][2];
          setTimeout(function () {
            bars[idxone].style.backgroundColor = "#E9C46A";
            bars[idxtwo].style.backgroundColor = "#E9C46A";
          }, i * animSpeed.value);
        } else if (command == "clear") {
          let idx = animations[i][1];
          setTimeout(function () {
            bars[idx].style.backgroundColor = "#264653";
          }, i * animSpeed.value);
        } else if (command == "done") {
          let idx = animations[i][1];
          setTimeout(function () {
            bars[idx].style.backgroundColor = "#E76F51";
          }, i * animSpeed.value);
        } else if (command == "sorted") {
          let idx = animations[i][1];
          new Promise((resolve, reject) => {
            setTimeout(function () {
              for (let j = 0; j <= idx; j++) {
                bars[j].style.backgroundColor = "#E76F51";
              }
              resolve();
            }, i * animSpeed.value);
          }).then(() => {
            animations.value = [];
            enableButtons();
            sorted.value = true; // Set the array to sorted
          });
        } else {
          // swap command
          let idxone = animations[i][1];
          let idxtwo = animations[i][2];
          let newHeight = animations[i][3];
          setTimeout(() => {
            bars[idxone].style.height = `${newHeight * heightFactor.value}px`;
            array.value[idxone] = newHeight; // Replacing the $set call
            bars[idxone].style.backgroundColor = "#E76F51";
          }, i * animSpeed.value);
        }
      }
    };

    const insertionSortButton = () => {
      if (sorted.value === true) {
        return;
      }
      // Disable buttons while running
      disableButtons();
      const result = insertionSort(array.value.slice(), animations.value);
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
          }, i * animSpeed.value);
        } else if (command == "init") {
          let idxone = animations[i][1];
          setTimeout(function () {
            bars[idxone].style.backgroundColor = "#E76F51"; // red for sorted list
          }, i * animSpeed.value);
        } else if (command == "comp") {
          let idxone = animations[i][1];
          let idxtwo = animations[i][2];
          setTimeout(function () {
            bars[idxone].style.backgroundColor = "#E9C46A"; // comparisons are yellow
            bars[idxtwo].style.backgroundColor = "#E9C46A";
          }, i * animSpeed.value);
        } else if (command == "sorted") {
          let idx = animations[i][1];
          new Promise((resolve, reject) => {
            setTimeout(function () {
              for (let j = 0; j <= idx; j++) {
                bars[j].style.backgroundColor = "#E76F51";
              }
              resolve();
            }, i * animSpeed.value);
          }).then(() => {
            animations.value = [];
            enableButtons();
            sorted.value = true; // Set the array to sorted
          });
        } else {
          // swap command
          let idxone = animations[i][1];
          let idxtwo = animations[i][2];
          let newHeight = animations[i][3];
          setTimeout(() => {
            bars[idxone].style.height = `${newHeight * heightFactor.value}px`;
            array.value[idxone] = newHeight; // Replacing the $set call
            bars[idxone].style.backgroundColor = "#264653";
          }, i * animSpeed.value);
        }
      }
    };

    return {
      array,
      animations,
      genArray,
      resetArray,
      mergeSortButton,
      quickSortButton,
      bubbleSortButton,
      selectionSortButton,
      insertionSortButton,
      buttonDisable,
    };
  },
};
</script>

<style lang="scss">
@import "./assets/colors.scss";
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
@media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
  .sort-container {
    padding-left: 85px;
    padding-right: 85px;
  }

  .toolbar-button {
    margin: 10px;
  }

  .active-window {
    height: 75vh;
    padding: 1rem;
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
    width: 10px;
    background-color: $charcoal;
    display: inline-block;
    margin: 0 1px;
  }
}
</style>