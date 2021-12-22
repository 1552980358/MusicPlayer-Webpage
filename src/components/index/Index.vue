<template>
  <div class="div-index">
    <div class="div-background"></div>
    <div class="div-box" >
      <h1 class="h1-poem">人间能得几回闻</h1>
      <h1 class="h1-poem">——此曲只应天上有</h1>
      <hr/>
      <h2 @click="changePage(1)" class="h2-button">Upload</h2>
      <h2 @click="changePage(2)" class="h2-button">Download</h2>
    </div>
  </div>
</template>

<script>

export default {
  name: "Index",
  data() {
    return {
    }
  },
  methods: {
    changePage(page) {
      this.$emit('changePage', page);
    }
  }
}

</script>

<!--suppress CssUnknownProperty -->
<style scoped>

div {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.div-index {
  width: 100vw;
  height: 100vh;
  background-repeat: no-repeat;
  background-position:top;
  background-size: cover;
  background-image: url("~@/assets/index-background.jpg");
}

.div-box {
  height: 50%;
  width: 75%;
  position: absolute;
  top: 25%;
  left: 12.5%;
}

.div-background {
  width: 100vw;
  height: 100vh;
  background-color: rgba(94, 106, 196, 0.75);
}

.h1-poem {
  color: white;
  font-size: 40px;
}

.h2-button {
  float: left;
  border: 2px solid rgba(255, 255, 255, 0.6);
  padding: 5px;
  margin: 5px;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  font-size: 25px;
}

.h2-button:hover {
  border: 2px solid white;
  color: white;
}

.h2-button:active {
  color: #5E6AC4;
  background-color: white;
}

</style>