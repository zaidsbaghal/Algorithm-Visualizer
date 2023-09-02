<template>
  <div class="box" :id="id" :ref="ref"></div>
</template>
<script setup>
const props = defineProps({
  row: {
    type: Number,
    default: 0, // Default value, change as needed
  },
  col: {
    type: Number,
    default: 0, // Default value, change as needed
  },
  isWall: {
    type: Boolean,
    default: false,
  },
  isStart: {
    type: Boolean,
    default: false,
  },
  isEnd: {
    type: Boolean,
    default: false,
  },
  visited: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
    default: "", // Default value, change as needed
  },
  ref: {
    type: String,
    default: "",
  },
  parent: {
    type: Object,
    default: null, // Default value, change as needed
  },
  ddist: {
    type: Number,
    default: 0, // Default value, change as needed
  },
  g: {
    type: Number,
    default: 0, // Default value, change as needed
  },
  h: {
    type: Number,
    default: 0, // Default value, change as needed
  },
  f: {
    type: Number,
    default: 0, // Default value, change as needed
  },
  closed: {
    type: Boolean,
    default: false,
  },
});
const divRef = ref(props.ref);
</script>
<style lang="scss">
@import "./assets/colors.scss";
.box {
  // animation: fadeIn ease 1s;
  width: 25px;
  height: 25px;
  border: 0.5px solid $charcoal;
  background-color: $alabaster;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
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