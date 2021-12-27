<template>
  <div class="div-footer-root">
    <div class="div-back" @click="$emit('back')">
      <!--suppress HtmlRequiredAltAttribute -->
      <div class="div-back-img"></div>
    </div>
    <div class="div-table">
      <div class="div-button" @click="$emit('downloadSelected')">{{ $t('download.div_download_selected') }}</div>
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
  height: 48px;
  width: 48px;
  max-height: 48px;
  max-width: 48px;
}

.div-back-img {
  width: 32px;
  height: 32px;
  display: block;
  margin-left: 12px;
  background-image: url("~@/assets/back.svg");
}

.div-back-img:hover {
  background-image: url("~@/assets/back-hover.svg");
}

.div-table {
  display: table-cell;
  width: 100vw;
  vertical-align: middle;
}

.div-button {
  width: 10vw;
  float: right;
  background-color: #4285F4;
  color: white;
  border: 1px solid white;
  margin-right: 8px;
  text-align: center;
}

.div-button:hover {
  background-color: white;
  color: #4285F4;
  border: 1px solid white;
}

div {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  /*noinspection CssUnknownProperty*/
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

</style>