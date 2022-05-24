<template>
  <div class="side-bar-div-root">
    <div class="side-bar-div-content-mask" v-on:click="close"></div>
    <div class="side-bar-div-container">
      <div class="side-bar-div-playlist-container">
        <div v-for="playlist in playlistList" :key="playlist.id">
          <playlist-item :playlist="playlist" @openPlaylist="openPlaylist" />
        </div>
      </div>
      <div class="side-bar-div-audio-container">
        <div v-for="audio in audioList" :key="audio.id">
          <audio-item :audio="audio" @play="play" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AudioItem from "@/components/player/AudioItem";
import PlaylistItem from "@/components/player/PlaylistItem";
import {getResource} from "@/util/WebRequestUtil";

export default {
  name: "side-bar",
  props: [],
  components: {PlaylistItem, AudioItem},
  data() {
    return {
      openState: false,
      barWidth: '0',
      audioList: null,
      playlistList: null,

      playlistHeight: '100%',
      currentPlaylist: null,
    };
  },
  methods: {
    updateState(newState) {
      this.barWidth = (this.openState = newState ? '100vw' : '0vw');
    },
    open() {
      this.updateState(true);
    },
    close() {
      this.updateState(false);
    },
    play(id) {
      console.log(id);
    },
    openPlaylist(playlist) {
      this.currentPlaylist = playlist;
      getResource('player/playlist?id=' + playlist.id, res => {
        const audioList = [];
        res.data['list'].forEach(jsonObject => {
          audioList.push({
            id: jsonObject['id'],
            title: jsonObject['title'],
            artist: jsonObject['artist'],
            artistName: jsonObject['artistName'],
            album: jsonObject['album'],
            albumTitle: jsonObject['albumTitle'],
            duration: jsonObject['duration'],
          });
        });
        this.audioList = audioList;
      });
      this.playlistHeight = '0';
    }
  },
}
</script>

<style scoped>

.side-bar-div-root {
  height: 100%;
  width: v-bind(barWidth);
  position: fixed;
  z-index: 1;
  top: 0;
  right: 0;
  background-color: transparent;
  overflow-x: hidden;
  transition: 400ms ease;
}

.side-bar-div-content-mask {
  float: left;
  width: 75%;
  height: 100%;
}

.side-bar-div-container {
  float: right;
  background-color: white;
  width: 25%;
  height: 100%;
  overflow: hidden;
}

.side-bar-div-playlist-container {
  height: v-bind(playlistHeight);
  width: 100%;
  float: left;
  overflow: hidden;

  transition: height 400ms ease;
  -webkit-transition: height 400ms ease;
  -moz-transition: height 400ms ease;
  -ms-transition: height 400ms ease;
  -o-transition: height 400ms ease;
}

.side-bar-div-audio-container {
  height: 100%;
  width: 100%;
  float: left;
  background-color: white;
}

</style>