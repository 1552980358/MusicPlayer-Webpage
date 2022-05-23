<template>
  <div class="side-bar-div-root">
    <div class="side-bar-div-content-mask" v-on:click="close"></div>
    <div class="side-bar-div-container">
    </div>
  </div>
</template>

<script>
export default {
  name: "side-bar",
  data() {
    return {
      openState: false,
      barWidth: '0',
      audioList: [ { id: '1', title: 't', artistName: 'Art', albumTitle: 'Alb', imageUrl: null }],
    };
  },
  methods: {
    updateState(newState) {
      this.barWidth = (this.openState = newState ? '100vw' : '0vw');
    },
    open() {
      this.updateState(true);
    },
    close() {
      this.updateState(false);
    },
  },
}
</script>

<style scoped>

.side-bar-div-root {
  height: 100%;
  width: v-bind(barWidth);
  position: fixed;
  z-index: 1;
  top: 0;
  right: 0;
  background-color: transparent;
  overflow-x: hidden;
  transition: 400ms ease;
}

.side-bar-div-content-mask {
  float: left;
  width: 75%;
  height: 100%;
}

.side-bar-div-container {
  float: right;
  background-color: white;
  width: 25%;
  height: 100%;
}

</style>