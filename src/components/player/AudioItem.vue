<template>
  <div class="audio-item-div-root" v-on:dblclick="play">
    <div class="audio-item-div-metadata-container">
      <div class="audio-item-div-metadata-title">{{audio.title}}</div>
      <div class="audio-item-div-metadata-subtitle">{{audio.artistName}} - {{audio.albumTitle}}</div>
    </div>
  </div>
</template>

<!--suppress JSUnusedGlobalSymbols -->
<script>
export default {
  name: "audio-item",
  props: ['audio'],
  data() {
    return {
      imageUrl: null,
    };
  },
  created() {
    if ((this.imageUrl = this.audio.imageUrl) == null) {
      this.imageUrl = require('@/assets/icon/svg/ic_round_audiotrack_purple.svg');
    }
  },
  methods: {
    play() {
      this.$emit('play', this.audio.id);
    },
  },
}
</script>

<style scoped>

.audio-item-div-root {
  width: 100%;

  transition: background-color 200ms ease;
  -moz-transition: background-color 200ms ease;
  -webkit-transition: background-color 200ms ease;
  -o-transition: background-color 200ms ease;
}

.audio-item-div-root:hover {
  width: 100%;
  background-color: lightgray;

  transition: background-color 200ms ease;
  -moz-transition: background-color 200ms ease;
  -webkit-transition: background-color 200ms ease;
  -o-transition: background-color 200ms ease;
}

.audio-item-div-metadata-container {
  width: 100%;
}

.audio-item-div-metadata-title {
  width: 90%;
  padding: 8px 5% 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.audio-item-div-metadata-subtitle {
  width: 100%;
  padding: 0 5% 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

</style>