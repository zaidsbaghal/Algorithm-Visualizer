<template>
  <div class="box" v-bind:id="this.id"></div>
</template>
<script>
export default {
  props: {
    row: Number,
    col: Number,
    isWall: Boolean,
    isStart: Boolean,
    isEnd: Boolean,
    id: String,
  },
};
</script>
<style lang="scss">
@import "./assets/scss/colors.scss";
.box {
  // animation: fadeIn ease 1s;
  width: 25px;
  height: 25px;
  border: 1px solid $charcoal;
  background-color: $alabaster;
}
.wall {
  animation: fadeIn ease 1s;
  width: 25px;
  height: 25px;
  border: 1px solid $charcoal;
  background-color: $charcoal;
}
</style>