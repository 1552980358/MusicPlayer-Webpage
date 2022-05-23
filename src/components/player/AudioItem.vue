<template>
  <div id="audio-item-div-root" v-on:dblclick="play">
    <div id="audio-item-div-metadata-container">
      <div class="audio-item-div-metadata">{{audio.title}}</div>
      <div class="audio-item-div-metadata">{{audio.artistName}} - {{audio.albumTitle}}</div>
    </div>
  </div>
</template>

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

#audio-item-div-root {
  width: 100%;
  padding: 8px 16px;

  transition: background-color 200ms ease;
  -moz-transition: background-color 200ms ease;
  -webkit-transition: background-color 200ms ease;
  -o-transition: background-color 200ms ease;
}

#audio-item-div-root:hover {
  width: 100%;
  padding: 8px 16px;
  background-color: gray;

  transition: background-color 200ms ease;
  -moz-transition: background-color 200ms ease;
  -webkit-transition: background-color 200ms ease;
  -o-transition: background-color 200ms ease;
}

.audio-item-div-metadata {

}

</style>