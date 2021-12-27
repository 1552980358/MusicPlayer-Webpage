<template>
  <div :class="a.isSelected ? 'div-audio-root-selected' : 'div-audio-root'" @click="a.isSelected = !a.isSelected">

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

      <div class="div-text-container-15">
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
  max-width: 100%;
  align-items: center;
  display: table;
  text-align: center;
  background-color: white;
  color: black;
}

.div-audio-root:hover {
  background-color: #E0E0E0;
}

.div-audio-root-selected {
  height: 60px;
  width: 100vw;
  max-width: 100%;
  align-items: center;
  display: table;
  text-align: center;
  background-color: #4285F4;
  color: white;
}

.div-container-root {
  height: 60px;
  display: table-cell;
  vertical-align: middle;
  width: 100vw;
  max-width: 100%;
}

.div-container-50 {
  width: 50vw;
  max-width: 50%;
  float: left;
  display: table-cell;
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
  max-width: 10%;
  align-items: center;
}

.div-text-container-15 {
  height: 60px;
  float: left;
  display: table;
  vertical-align: middle;
  width: 15vw;
  max-width: 15%;
  align-items: center;
}

.div-text {
  display: table-cell;
  width: 100%;
  vertical-align: middle;
}

img {
  height: 40px;
  width: 40px;
  float: left;
  margin: 10px;
}

</style>