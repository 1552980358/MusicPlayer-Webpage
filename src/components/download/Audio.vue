<template>
  <div ref="div-audio" class="div-audio-root" @click="download">

    <div class="div-container-root">
      <div class="div-container-50">

        <!--suppress HtmlRequiredAltAttribute -->
        <img ref="img" :src="imgSrc">

        <div class="div-container-50-text-table">

          <div class="div-container-50-text-table-cell">

            <div>{{ a.title }}</div>
            <div>{{ a.artist + ' - ' + a.album }}</div>

          </div>

        </div>

      </div>

      <div class="div-text-container-10">
        <div class="div-text">{{ calculateDuration(a.duration) }}</div>
      </div>

      <div class="div-text-container-15">
        <div class="div-text">{{ calculateSize(a.size) }}</div>
      </div>

      <div class="div-text-container-10">
        <div class="div-text">{{ $t(a.status === 0 ? 'app.progress_waiting' : a.status === 1 ? 'download.progress_downloading' : a.status === 2 ? 'app.progress_completed' : 'app.progress_failed') }}</div>
      </div>

      <div class="div-text-container-10">
        <div class="div-text">{{ a.download + '%' }}</div>
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
      imgSrc: null,
      SIZE_UNITS:  ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    }
  },
  methods: {
    calculateSize(size) {
      if (size < 1024) {
        return size + ' B';
      }
      let tmpSize = Number(size);
      let count = 1;
      while ((tmpSize /= 1024) > 1024) {
        count++;
      }
      return (tmpSize).toFixed(2) + ' ' + this.SIZE_UNITS[count];
    },
    prefix2Digit(time) {
      if (time < 10) {
        return '0' + time.toFixed(0);
      }
      return time.toFixed(0)
    },
    prefix3Digit(time) {
      if (time < 10) {
        return '00' + time.toString();
      }
      if (time < 99) {
        return '0' + time.toString();
      }
      return time.toString();
    },
    calculateDuration(duration) {
      let tmpDuration = Number(duration);
      return this.prefix2Digit((tmpDuration / 60000)) + ':' + this.prefix2Digit((tmpDuration / 1000 % 60)) + '.' + this.prefix3Digit((tmpDuration % 1000));
    },
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
        onDownloadProgress: e => {
          this.audio.status = 1;
          const percentage = (e.loaded * 100 / e.total).toFixed(0);
          console.log('Download ' + this.audio.title + ' => ' + percentage + '%');
          this.audio.download = percentage;
        }
      }).then(res => {
        this.audio.status = 2;

        const { data, headers } = res
        let ext = String(headers['Content-Type']).replace('audio/', '.');
        const fileName = this.audio.artist + ' - ' + this.audio.title + ext;
        let url = window.URL.createObjectURL(new Blob([data], {type: headers['content-type']}));
        let dom = document.createElement('a');
        dom.href = url;
        dom.download = fileName;
        dom.style.display = 'none';
        document.body.appendChild(dom);
        dom.click();
        dom.parentNode.removeChild(dom);
        window.URL.revokeObjectURL(url);

        console.log('Download ' + this.audio.title + ' with response code: ' + res.status);
      }).catch(e => {
        console.log('Download ' + this.audio.title + ' with exception: ' + e);
        this.audio.status = -1;
      });
    }
  },
  mounted() {
    this.audio = this.a;
    this.imgSrc = '/require?type=art&audio=' + this.a.id + '&album=' + this.a.albumId;
  }
}

</script>

<!--suppress CssUnusedSymbol -->
<style scoped>

.div-audio-root {
  height: 60px;
  width: 100vw;
  align-items: center;
  display: table;
  text-align: center;
  background-color: white;
}

.div-audio-root:hover {
  background-color: #E0E0E0;
}

.div-container-root {
  height: 60px;
  display: table-cell;
  vertical-align: middle;
  width: 100vw
}

.div-container-50 {
  width: 50vw;
  float: left;
}

.div-container-50-text-table {
  height: 60px;
  float: left;
  display: table;
}

.div-container-50-text-table-cell {
  display: table-cell;
  vertical-align: middle;
  align-items: center;
  text-align: left;
}

.div-text-container-10 {
  height: 60px;
  float: left;
  display: table;
  vertical-align: middle;
  width: 10vw;
  align-items: center;
}

.div-text-container-15 {
  height: 60px;
  float: left;
  display: table;
  vertical-align: middle;
  width: 15vw;
  align-items: center;
}

.div-text {
  display: table-cell;
  vertical-align: middle;
}

img {
  height: 40px;
  width: 40px;
  float: left;
  margin: 10px 10px 10px 10px;
}

</style>