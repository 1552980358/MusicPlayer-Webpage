<template>
  <div style="background-color: #4285F4; align-items: center; display: table; text-align: center">
    <div style="display: table-cell; vertical-align: middle; width: 100%">
      <div ref="upload" :class="mouseAboveUpload ? 'mouse-above' : 'mouse-leave'" style="width: 10%; float: right" @click="upload">{{ $t('upload.btn_upload') }}</div>
      <div ref="remove" :class="mouseAboveRemove ? 'mouse-above' : 'mouse-leave'" style="width: 10%; float: right" @click="remove">{{ $t('upload.btn_remove') }}</div>
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
    }
  },
  methods: {
    upload() {
      this.$emit('upload')
    },
    uploadFile(files) {
      if (files.length === 0) {
        return;
      }
      const host = window.location.origin;
      console.log('Host: ' + host);

      let url, formData, headers, percent; //, failedFile = [];
      headers = {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': host,
        'Access-Control-Allow-Methods': 'POST,GET,OPTIONS',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Max-Age': '0'
      };
      files.forEach(file => {
        console.log('=========================================');
        console.log('Upload File: ' + file.name);
        url = '/upload?fileName=' + file.name;
        console.log('Target URL: ' + url);
        formData = new FormData();
        formData.append('file', file.file);
        axios({
          url: url,
          method: 'POST',
          headers: headers,
          data: formData,
          onUploadProgress: progressEvent => {
            percent = (progressEvent.loaded * 100 / progressEvent.total);
            console.log('Upload \'' + file.name + '\' => ' + percent + '%');
            file.status = 1;
            file.upload = percent;
          }
        }).then(response => {
          console.log('Upload \'' + file.name + '\' with response code ' + response.status);
          file.status = 2;
        }).catch(exception => {
          console.log('Upload \'' + file.name + '\' with exception: ' + exception);
          file.status = -1;
        })
      });
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
  /*noinspection CssUnknownProperty*/
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