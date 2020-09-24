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
    visited: Boolean,
    id: String,
    parent: Object,
    ddist: Number,
    g: Number,
    h: Number,
    f: Number,
    closed: Boolean,
  },
};
</script>
<style lang="scss">
@import "./assets/scss/colors.scss";
.box {
  // animation: fadeIn ease 1s;
  width: 25px;
  height: 25px;
  border: 0.5px solid $charcoal;
  background-color: $alabaster;
}
.wall {
  animation: fadeIn ease 1s;
  width: 25px;
  height: 25px;
  border: 0.5px solid $charcoal;
  background-color: $charcoal;
}
.start {
  width: 25px;
  height: 25px;
  border: 0.5px solid $charcoal;
  background-color: #2a9d8f;
}
.end {
  width: 25px;
  height: 25px;
  border: 0.5px solid $charcoal;
  background-color: #e76f51;
}
.visited {
  animation: fadeIn ease 1s;
  width: 25px;
  height: 25px;
  border: 0.5px solid $charcoal;
  background-color: $orange-yellow;
}
.path {
  animation: fadeIn ease 1s;
  width: 25px;
  height: 25px;
  border: 0.5px solid $charcoal;
  background-color: $sandy-brown;
}
.fringe {
  animation: fadeIn ease 1s;
  width: 25px;
  height: 25px;
  border: 0.5px solid $charcoal;
  background-color: $aqua;
}
@media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
  .box {
    // animation: fadeIn ease 1s;
    width: 18px;
    height: 18px;
  }
  .wall {
    width: 18px;
    height: 18px;
  }
  .start {
    width: 18px;
    height: 18px;
  }
  .end {
    width: 18px;
    height: 18px;
  }
  .visited {
    width: 18px;
    height: 18px;
  }
  .path {
    width: 18px;
    height: 18px;
  }
  .fringe {
    width: 18px;
    height: 18px;
  }
}
</style>