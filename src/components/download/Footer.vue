<template>
  <div class="div-footer-root">
    <div class="div-back" @click="$emit('back')">
      <!--suppress HtmlRequiredAltAttribute -->
      <img src="../../assets/back.svg">
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  methods: {

  },
}
</script>

<style scoped>

.div-footer-root {
  height: 48px;
  width: 100vw;
  max-width: 100%;
  background-color: #4285F4;
  display: table;
  align-items: center;
  vertical-align: middle;
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