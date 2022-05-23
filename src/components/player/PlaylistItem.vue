<template>
  <div class="playlist-item-div-root" v-on:click="openPlaylist">
    <div class="playlist-item-div">{{playlist.title}}</div>
  </div>
</template>

<script>
export default {
  name: "playlist-item",
  props: ['playlist'],
  methods: {
    openPlaylist() {
      this.$emit('openPlaylist', this.playlist);
    },
  },
}
</script>

<style scoped>

.playlist-item-div-root {
  width: 100%;
  padding: 8px 16px;

  transition: background-color 200ms ease;
  -moz-transition: background-color 200ms ease;
  -webkit-transition: background-color 200ms ease;
  -o-transition: background-color 200ms ease;
}

.playlist-item-div-root:hover {
  width: 100%;
  padding: 8px 16px;
  background: lightgray;

  transition: background-color 200ms ease;
  -moz-transition: background-color 200ms ease;
  -webkit-transition: background-color 200ms ease;
  -o-transition: background-color 200ms ease;
}

</style>