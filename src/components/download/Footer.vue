<template>
  <div class="div-footer-root">
    <div class="div-back" @click="back">
      <!--suppress HtmlRequiredAltAttribute -->
      <img src="../../assets/back.svg">
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  methods: {
    back() {
      this.$emit('back')
    },
  },
}
</script>

<style scoped>

.div-footer-root {
  height: 48px;
  width: 100vw;
  background-color: #4285F4;
  display: table;
}

.div-back {
  display: table-cell;
  vertical-align: middle;
  height: 24px;
  width: 24px;
}

img {
  margin-left: 8px;
}

</style>