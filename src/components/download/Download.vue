<template>
  <div style="width: 100%">
    <div style="height: 50px; width: 100%; align-items: center; display: table; text-align: center">
      <div style="display: table-cell; vertical-align: middle; width: 100%">
        <div style="width: 50%; float: left">{{ $t('download.div_name') }}</div>
        <div style="width: 10%; float: left">{{ $t('download.div_duration') }}</div>
        <div style="width: 15%; float: left">{{ $t('app.div_file_size') }}</div>
        <div style="width: 10%; float: left">{{ $t('app.div_file_status') }}</div>
        <div style="width: 10%; float: left">{{ $t('app.div_file_progress') }}</div>
      </div>
    </div>
    <div v-for="audio in audioList" :key="audio.id">
      <Audio :a="audio"></Audio>
    </div>
  </div>
</template>

<script>

import Audio from "@/components/download/Audio";
import axios from "axios";
export default {
  name: "Download",
  components: {Audio},
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
  }
}

</script>

<style scoped>

</style>