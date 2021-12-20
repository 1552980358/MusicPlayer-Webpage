<template>
  <div>
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
        });
      })
    })
  }
}

</script>

<style scoped>

</style>