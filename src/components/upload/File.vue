<template>
  <div ref="div-file" style="height: 50px; width: 100%; align-items: center; display: table; text-align: center" :class="mouseAbove ? 'mouse-above' : 'mouse-leave'">
    <div style="display: table-cell; vertical-align: middle; width: 100%">
      <div style="width: 15%; float: left">{{ index + 1 }}</div>
      <div style="width: 70%; float: left">{{ f.name }}</div>
      <div style="width: 15%; float: left">{{ calculateSize(f.size) }}</div>
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
      mouseAbove: false,
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
    const divFile = this.$refs["div-file"]
    divFile.addEventListener('mouseover', e => {
      e.stopPropagation();
      e.preventDefault();
      this.mouseAbove = true;
    });
    divFile.addEventListener('mouseleave', e => {
      e.stopPropagation();
      e.preventDefault();
      this.mouseAbove = false;
    });
  },
}

</script>

<!--suppress CssUnusedSymbol, CssUnknownProperty -->
<style scoped>

.mouse-above {
  background-color: #E0E0E0;
}

.mouse-leave {
  background-color: white;
}

div {

  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
}

</style>