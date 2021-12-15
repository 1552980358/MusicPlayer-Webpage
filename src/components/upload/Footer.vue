<template>
  <div style="background-color: #4285F4; align-items: center; display: table; text-align: center">
    <div style="display: table-cell; vertical-align: middle; width: 100%">
      <div ref="upload" :class="mouseAboveUpload ? 'mouse-above' : 'mouse-leave'" style="width: 10%; float: right" @click="upload">{{ $t('upload.btn_upload') }}</div>
      <div ref="remove" :class="mouseAboveRemove ? 'mouse-above' : 'mouse-leave'" style="width: 10%; float: right" @click="remove">{{ $t('upload.btn_remove') }}</div>
      <div style="width: 50%; float: left">{{ uploadText }}</div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: "Footer",
  data() {
    return {
      mouseAboveUpload: false,
      mouseAboveRemove: false,
      uploadText: ''
    }
  },
  methods: {
    upload() {
      this.$emit('upload')
    },
    uploadFile(files) {
      const host = window.location.origin;
      console.log('Host: ' + host);
      let url, formData, headers;
      let failedFile = [];
      files.forEach((file, index) => {
        this.uploadText = 'Upload (' + (index + 1) + '/' + files.length + '): ' + file.name;
        console.log('=========================================');
        console.log('Upload File: ' + file.name);
        url = host + '/upload?fileName=' + file.name;
        console.log('Target URL: ' + url);
        formData = new FormData();
        formData.append('file', file);
        headers = {'Content-Type': 'multipart/form-data'};
        axios.post(url, formData, {headers}).then(response => {
          console.log('Response status: ' + response.status);
        }).catch((error) => {
          failedFile.push(file);
          console.log('Upload exception caught: ' + error);
        });
      });
      this.$emit('updateFailedFile', failedFile);
      this.uploadText = 'Upload process ended.'
    },
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

div {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

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