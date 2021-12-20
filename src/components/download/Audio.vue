<template>
  <div ref="div-audio" style="height: 60px" :class="mouseAbove ? 'mouse-above' : 'mouse-leave'" @click="download">
    <!--suppress HtmlRequiredAltAttribute -->
    <img ref="img" style="height: 40px; width: 40px; float: left; margin: 10px 10px 10px 10px" :src="'/require?type=art&audio=' + this.audio.id + '&album=' + this.audio.albumId">
    <div style="height: 60px; float: left; display: table">
      <div style="display: table-cell; vertical-align: middle; align-items: center">
        <div>{{ a.title }}</div>
        <div>{{ a.artist + ' - ' + a.album }}</div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "Audio",
  props: ['a'],
  data() {
    return {
      audio: null,
      mouseAbove: false
    }
  },
  methods: {
    download() {

      const headers = {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': window.location.origin,
        'Access-Control-Allow-Methods': 'POST,GET,OPTIONS',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Max-Age': '0',
      };

      axios({
        url: '/download?id=' + this.audio.id,
        headers: headers,
        responseType: 'blob',
      }).then(res => {
        const { data, headers } = res
        let ext = String(headers['Content-Type']).replace('audio/', '.');
        let url = window.URL.createObjectURL(new Blob([data], {type: headers['content-type']}));
        let dom = document.createElement('a');
        dom.href = url;
        dom.download = this.audio.artist + ' - ' + this.audio.title + ext;
        dom.style.display = 'none';
        document.body.appendChild(dom);
        dom.click();
        dom.parentNode.removeChild(dom);
        window.URL.revokeObjectURL(url);
      });
    }
  },
  mounted() {
    this.audio = this.a;
    const divAudio = this.$refs["div-audio"];
    divAudio.addEventListener('mouseover', e => {
      e.stopPropagation();
      e.preventDefault();
      this.mouseAbove = true;
    });
    divAudio.addEventListener('mouseleave', e => {
      e.stopPropagation();
      e.preventDefault();
      this.mouseAbove = false;
    });
  }
}

</script>

<style scoped>

.mouse-above {
  background-color: #E0E0E0;
}

.mouse-leave {
  background-color: white;
}

</style>