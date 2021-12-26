<template>
  <div class="div-footer-root">
    <div class="div-back" @click="$emit('back')">
      <!--suppress HtmlRequiredAltAttribute -->
      <img src="../../assets/back.svg">
    </div>
    <div class="div-table">
      <div class="div-button" @click="$emit('upload')">{{ $t('upload.btn_upload') }}</div>
      <div class="div-button" @click="$emit('removeAllFiles')">{{ $t('upload.btn_remove') }}</div>
      <div class="div-button" @click="$emit('removeSelected')">{{ $t('upload.btn_remove_selected') }}</div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: "Footer",
  data() {
    return {
    }
  },
  methods: {
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

.div-footer-root {
  background-color: #4285F4;
  align-items: center;
  display: table;
  text-align: center;
  height: 48px;
}

.div-back {
  display: table-cell;
  vertical-align: middle;
  height: 24px;
  width: 24px;
}

.div-table {
  display: table-cell;
  vertical-align: middle;
  width: 100vw;
}

.div-button {
  width: 10vw;
  float: right;
  background-color: #4285F4;
  color: white;
  border: 1px solid #FFF;
  margin-right: 8px;
}

.div-button:hover {
  background-color: white;
  color: #4285F4;
  border: 1px solid white;
}

img {
  margin-left: 8px;
}

</style>