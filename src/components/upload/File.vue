<template>
  <div :class="f.isSelected ? 'div-file-root-selected' : 'div-file-root'" @click="f.isSelected = !f.isSelected">
    <div class="div-content">
      <div class="div-5">{{ index + 1 }}</div>
      <div class="div-60">{{ f.name }}</div>
      <div class="div-15">{{ calculateSize(f.size) }}</div>
      <div class="div-10">{{ $t(f.status === 0 ? 'app.progress_waiting' : f.status === 1 ? 'upload.progress_uploading' : f.status === 2 ? 'app.progress_completed' : 'app.progress_failed') }}</div>
      <div class="div-10">{{ f.upload + '%' }}</div>
    </div>
  </div>
</template>

<script>

export default {
  name: "File",
  props: ['f', 'index'],
  data() {
    return {
      file: null,
      SIZE_UNITS:  ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    }
  },
  methods: {
    calculateSize(size) {
      if (size < 1024) {
        return size + ' B';
      }
      let tmpSize = size;
      let count = 1;
      while ((tmpSize /= 1024) > 1024) {
        count++;
      }
      return (tmpSize).toFixed(2) + ' ' + this.SIZE_UNITS[count];
    }
  },
  mounted() {
    this.file = this.f;
  },
}

</script>

<!--suppress CssUnusedSymbol, CssUnknownProperty -->
<style scoped>

div {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
}

.div-file-root {
  height: 50px;
  width: 100vw;
  align-items: center;
  display: table;
  text-align: center;
  background-color: white;
  color: black;
}

.div-file-root:hover {
  background-color: #E0E0E0;
}

.div-file-root-selected {
  height: 50px;
  width: 100vw;
  align-items: center;
  display: table;
  text-align: center;
  background-color: #4285F4;
  color: white;
}

.div-content {
  display: table-cell;
  vertical-align: middle;
  width: 100vw;
}

.div-5 {
  width: 5vw;
  float: left;
}

.div-10 {
  width: 10vw;
  float: left;
}

.div-60 {
  width: 60vw;
  float: left;
}

.div-15 {
  width: 15vw;
  float: left;
}

</style>