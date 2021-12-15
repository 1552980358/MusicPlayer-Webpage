<template>
  <div style="background-color: #4285F4; align-items: center; display: table; text-align: center">
    <div style="display: table-cell; vertical-align: middle; width: 100%">
      <div ref="upload" :class="mouseAboveUpload ? 'mouse-above' : 'mouse-leave'" style="width: 10%; float: right">{{ $t('upload.btn_upload') }}</div>
      <div ref="remove" :class="mouseAboveRemove ? 'mouse-above' : 'mouse-leave'" style="width: 10%; float: right" @click="remove">{{ $t('upload.btn_remove') }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      mouseAboveUpload: false,
      mouseAboveRemove: false
    }
  },
  methods: {
    remove() {
      this.$emit('remove');
    }
  },
  mounted() {
    const upload = this.$refs.upload;
    upload.addEventListener('mouseover', e => {
      e.stopPropagation();
      e.preventDefault();
      this.mouseAboveUpload = true;
    });
    upload.addEventListener('mouseleave', e => {
      e.stopPropagation();
      e.preventDefault();
      this.mouseAboveUpload = false;
    });

    const remove = this.$refs.remove;
    remove.addEventListener('mouseover', e => {
      e.stopPropagation();
      e.preventDefault();
      this.mouseAboveRemove = true;
    });
    remove.addEventListener('mouseleave', e => {
      e.stopPropagation();
      e.preventDefault();
      this.mouseAboveRemove = false;
    });
  }
}
</script>

<!--suppress CssUnusedSymbol -->
<style scoped>

.mouse-leave {
  background-color: #4285F4;
  color: white;
  border: 1px solid #FFF;
}

.mouse-above {
  background-color: white;
  color: #4285F4;
  border: 1px solid white;
}

</style>