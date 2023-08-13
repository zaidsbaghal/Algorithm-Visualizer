<template>
  <div class="main">
    <client-only>
      <div v-if="isMobile" class="mobile-view">
        <h1 class="mobile-text">
          This site is not currently supported on mobile :( Try visiting on your
          computer!
        </h1>
      </div>
      <div v-else>
        <div class="algorithm-container">
          <div class="select-container">
            <select
              v-model="AlgoCategory"
              class="algo-select"
              name="algorithms"
              id="algorithms"
            >
              <option value="sorting" selected>Sorting</option>
              <option value="pathfinding">Pathfinding</option>
            </select>
          </div>
        </div>
        <div v-show="AlgoCategory === 'sorting'">
          <grid-loader
            :loading="loaderLoading"
            :color="loaderColor"
            :size="loaderSize"
          ></grid-loader>
          <SortingView></SortingView>
        </div>
        <div v-show="AlgoCategory === 'pathfinding'">
          <PathfindingView></PathfindingView>
        </div>
      </div>
    </client-only>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Computed property
const isMobile = computed(() => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
});

// Data properties
const AlgoCategory = ref("sorting");
const loaderLoading = ref(true);
const loaderColor = ref("#264653");
const loaderSize = ref("300");
</script>

<style lang="scss">
@import "./assets/colors.scss";
.mobile-view {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mobile-text {
  align-items: center;
  justify-content: center;
  text-align: center;
  word-wrap: break-word;
  color: $charcoal;
}

select {
  text-align-last: center;
}

.main {
  display: flex;
  flex-direction: column;
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
      width: 350px;
      padding-left: 20px;
      padding-right: 20px;
      height: 100px;
      font-size: 45px;
      font-weight: bold;
      cursor: pointer;
      background-color: $alabaster;
      border: none;
      color: $charcoal;
      // appearance: none;
    }
    .down-arrow {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
    }
  }
}
</style>
