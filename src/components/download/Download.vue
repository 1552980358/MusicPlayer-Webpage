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
    <div v-for="audio in audioList" :key="audio.id">
      <Audio :a="audio"></Audio>
    </div>
    <Footer class="footer" @back="$emit('changePage', 0)"></Footer>
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
          download: 0
        });
      })
    })
  },
  methods: {

  }
}

</script>

<style scoped>

.div-download-root {
  width: 100vw;
  margin-bottom: 48px;
}

.div-table-container {
  height: 50px;
  width: 100vw;
  align-items: center;
  display: table;
  text-align: center
}

.div-table {
  display: table-cell;
  vertical-align: middle;
  width: 100vw;
}

.div-50 {
  width: 50vw;
  float: left;
}

.div-10 {
  width: 10vw;
  float: left;
}

.div-15 {
  width: 15vw;
  float: left;
}

.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 48px;
}

</style>