<template>
  <div class="main">
    <div class="algorithm-container">
      <div class="select-container">
        <select v-model="AlgoCategory" class="algo-select" name="algorithms" id="algorithms">
          <option value="sorting" selected>Sorting</option>
          <option value="pathfinding">Pathfinding</option>
          <option value="searching">Searching</option>
        </select>
      </div>
    </div>
    <div v-show="AlgoCategory === 'sorting'">
      <grid-loader :loading="loaderLoading" :color="loaderColor" :size="loaderSize"></grid-loader>
      <SortingView></SortingView>
    </div>
    <div v-show="AlgoCategory === 'pathfinding'">
      <PathfindingView></PathfindingView>
    </div>
    <div v-show="AlgoCategory === 'searching'">
      <p>Searching Component</p>
    </div>
  </div>
</template>

<script>
import SortingView from "~/components/SortingView.vue";
import PathfindingView from "~/components/PathfindingView.vue";
import GridLoader from "vue-spinner/src/GridLoader.vue";
export default {
  components: {
    SortingView,
    PathfindingView,
    GridLoader,
  },
  data: function () {
    return {
      AlgoCategory: "sorting",
      loaderLoading: true,
      loaderColor: "#264653",
      loaderSize: "300",
    };
  },
};
</script>

<style lang="scss">
@import "./assets/scss/colors.scss";

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
    .down-arrow{
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
    }
  }
}
</style>
