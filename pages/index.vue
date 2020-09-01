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
    <div v-if="AlgoCategory === 'sorting'">
      <SortingView></SortingView>
    </div>
    <div v-else-if="AlgoCategory === 'pathfinding'">
      <PathfindingView></PathfindingView>
    </div>
    <div v-else>hi 2</div>
  </div>
</template>

<script>
import SortingView from "~/components/SortingView.vue";
import PathfindingView from "~/components/PathfindingView.vue";
export default {
  components: {
    SortingView,
    PathfindingView,
  },
  data: function () {
    return {
      AlgoCategory: "sorting",
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
}
</style>
