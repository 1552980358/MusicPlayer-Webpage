<template>
  <div ref="div-audio" style="height: 60px; width: 100%; align-items: center; display: table; text-align: center" :class="mouseAbove ? 'mouse-above' : 'mouse-leave'" @click="download">

    <div style="height: 100%; display: table-cell; vertical-align: middle; width: 100%">
      <div style="width: 50%; float: left">

        <!--suppress HtmlRequiredAltAttribute -->
        <img ref="img" style="height: 40px; width: 40px; float: left; margin: 10px 10px 10px 10px" :src="imgSrc">

        <div style="height: 60px; float: left; display: table">

          <div style="display: table-cell; vertical-align: middle; align-items: center; text-align: left">

            <div>{{ a.title }}</div>
            <div>{{ a.artist + ' - ' + a.album }}</div>

          </div>

        </div>

      </div>


      <div style="height: 60px; float: left; display: table; vertical-align: middle; width: 10%; align-items: center;">
        <div style="display: table-cell; vertical-align: middle">{{ calculateDuration(a.duration) }}</div>
      </div>

      <div style="height: 60px; float: left; display: table; vertical-align: middle; width: 15%; align-items: center;">
        <div style="display: table-cell; vertical-align: middle">{{ calculateSize(a.size) }}</div>
      </div>

      <div style="height: 60px; float: left; display: table; vertical-align: middle; width: 10%; align-items: center;">
        <div style="display: table-cell; vertical-align: middle">{{ $t(a.status === 0 ? 'app.progress_waiting' : a.status === 1 ? 'download.progress_downloading' : a.status === 2 ? 'app.progress_completed' : 'app.progress_failed') }}</div>
      </div>

      <div style="height: 60px; float: left; display: table; vertical-align: middle; width: 10%; align-items: center;">
        <div style="display: table-cell; vertical-align: middle">{{ a.download + '%' }}</div>
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
      mouseAbove: false,
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
  },
  updated() {
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

<!--suppress CssUnusedSymbol -->
<style scoped>

.mouse-above {
  background-color: #E0E0E0;
}

.mouse-leave {
  background-color: white;
}

</style>