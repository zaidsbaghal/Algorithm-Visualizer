<template>
  <div class="box" v-on:click="makeWall" v-bind:id="this.getId"></div>
</template>
<script>
export default {
  props: {
    initRow: Number,
    initCol: Number,
    innitIsWall: Boolean,
    initIsStart: Boolean,
    initIsEnd: Boolean,
  },
  data: function () {
    return {
      row: this.initRow,
      col: this.initCol,
      isWall: this.innitIsWall,
      isStart: this.initIsStart,
      isEnd: this.initIsEnd,
    };
  },
  computed: {
    getId: function () {
      return "Node-" + this.row + "-" + this.col;
    },
  },
  methods: {
    makeWall: function () {
      if (this.isWall === true) {
        this.isWall = false;
      } else {
        this.isWall = true;
      }
    },
  },
};
</script>
<style lang="scss">
@import "./assets/scss/colors.scss";
.box {
  width: 20px;
  height: 20px;
  border: 1px solid $charcoal;
}
</style>