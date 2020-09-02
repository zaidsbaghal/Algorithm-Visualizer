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
      let id = this.getId;
      if (this.isWall === true) {
        document.getElementById(id).style.backgroundColor = "#F4F4ED";
        this.isWall = false;
      } else {
        document.getElementById(id).style.backgroundColor = "#264653";
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