<template>
  <div class="div-download-root">
    <div class="div-table-container">
      <div class="div-table">
        <div class="div-50">{{ $t('download.div_name') }}</div>
        <div class="div-15">{{ $t('download.div_duration') }}</div>
        <div class="div-15">{{ $t('app.div_file_size') }}</div>
        <div class="div-10">{{ $t('app.div_file_status') }}</div>
        <div class="div-10">{{ $t('app.div_file_progress') }}</div>
      </div>
    </div>
    <div class="div-list" v-for="audio in audioList" :key="audio.id">
      <Audio :a="audio" class="div-audio"></Audio>
    </div>
    <Footer class="footer" @back="$emit('changePage', 0)" @downloadSelected="downloadSelected"></Footer>
  </div>
</template>

<script>

import Audio from "@/components/download/Audio";
import Footer from "@/components/download/Footer";
import axios from "axios";

export default {
  name: "Download",
  components: {Footer, Audio},
  data() {
    return {
      audioList: null,
    }
  },
  mounted() {
    const headers = {
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Origin': window.location.origin,
      'Access-Control-Allow-Methods': 'POST,GET,OPTIONS',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Max-Age': '0'
    };
    axios({
      url: 'require?type=list',
      method: 'GET',
      headers: headers
    }).then(response => {
      this.audioList = [];
      response.data['list'].forEach(jsonObject => {
        this.audioList.push({
          id: jsonObject['id'],
          title: jsonObject['title'],
          artist: jsonObject['artist'],
          album: jsonObject['album'],
          albumId: jsonObject['albumId'],
          duration: jsonObject['duration'],
          size: jsonObject['size'],
          status: 0,
          download: 0,
          isSelected: false,
        });
      })
    })
  },
  methods: {
    downloadSelected() {

      const headers = {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': window.location.origin,
        'Access-Control-Allow-Methods': 'POST,GET,OPTIONS',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Max-Age': '0',
      };

      this.audioList.forEach(audio => {
        if (audio.isSelected) {
          axios({
            url: '/download?id=' + audio.id,
            headers: headers,
            responseType: 'blob',
            onDownloadProgress: e => {
              audio.status = 1;
              const percentage = (e.loaded * 100 / e.total).toFixed(0);
              console.log('Download ' + audio.title + ' => ' + percentage + '%');
              audio.download = percentage;
            }
          }).then(res => {
            audio.status = 2;

            const { data, headers } = res
            let ext = String(headers['Content-Type']).replace('audio/', '.');
            const fileName = audio.artist + ' - ' + audio.title + ext;
            let url = window.URL.createObjectURL(new Blob([data], {type: headers['content-type']}));
            let dom = document.createElement('a');
            dom.href = url;
            dom.download = fileName;
            dom.style.display = 'none';
            document.body.appendChild(dom);
            dom.click();
            dom.parentNode.removeChild(dom);
            window.URL.revokeObjectURL(url);

            console.log('Download ' + audio.title + ' with response code: ' + res.status);
          }).catch(e => {
            console.log('Download ' + audio.title + ' with exception: ' + e);
            audio.status = -1;
          });
        }
      })
    },
  }
}

</script>

<style scoped>

.div-download-root {
  width: 100vw;
  max-width: 100%;
  margin-bottom: 48px;
}

.div-table-container {
  height: 50px;
  width: 100vw;
  max-width: 100%;
  display: table;
  text-align: center
}

.div-table {
  display: table-cell;
  vertical-align: middle;
  width: 100vw;
  max-width: 100%;
}

.div-50 {
  width: 50vw;
  float: left;
  max-width: 50%;
}

.div-10 {
  width: 10vw;
  float: left;
  max-width: 10%;
}

.div-15 {
  width: 15vw;
  float: left;
  max-width: 15%;
}

.div-audio {
  width: 100vw;
  max-width: 100%;
}

.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 48px;
  max-width: 100%;
}

</style>