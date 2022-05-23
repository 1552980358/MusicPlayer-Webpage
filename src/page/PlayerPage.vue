<template>
  <div id="player-div-background">

    <div id="player-div-content-root-left">
      <div id="player-div-img-container">
        <img id="player-img-art" draggable="false" :src="imgArtUrl"  alt="" />
      </div>
    </div>

    <div id="player-div-content-root-right">
      <div id="player-div-metadata-container">
        <div id="player-div-metadata-box">
          <div id="player-div-metadata-title" class="player-div-metadata">{{ metadata.title }}</div>
          <div id="player-div-metadata-artist" class="player-div-metadata">{{ metadata.artist }}</div>
          <div id="player-div-metadata-album" class="player-div-metadata">{{ metadata.album }}</div>
        </div>
      </div>
    </div>

    <BottomControlBar :play-state="playState" @openSideBar="openSideBar" :color="buttonColor"></BottomControlBar>
  </div>

  <SideBar ref="side-bar"></SideBar>
</template>

<script>
import BottomControlBar from "@/components/player/BottomControlBar";
import SideBar from "@/components/player/SideBar";
export default {
  name: "WebPlayer",
  components: {SideBar, BottomControlBar},
  data() {
    return {
      // Colors
      backgroundColor: '#6750A4',
      primaryTextColor: '#FFF',
      secondaryTextColor: '#A4A4A4',
      buttonColor: '#FFF',

      // Metadata
      metadata: { title: '', artist: '', album: '' },
      imgArtUrl: require('../assets/icon/svg/ic_round_audiotrack.svg'),

      playState: false,
    };
  },
  methods: {
    openSideBar() {
      this.$refs["side-bar"].open();
    },
  },
}
</script>

<style scoped>

div, img {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
}

#player-div-background {
  width: 100vw;
  height: 100vh;
  background-color: v-bind(backgroundColor);
}

#player-div-content-root-left {
  float: left;
  width: 50%;
  height: 100%;
}

#player-div-img-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#player-img-art {
  width: 20vw;
  height: 20vw;
}

#player-div-content-root-right {
  float: right;
  width: 50%;
  height: 100%;
}

#player-div-metadata-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#player-div-metadata-box {
  width: 100%;
}

.player-div-metadata {
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
}

#player-div-metadata-title {
  font-size: 24px;
  color: v-bind(primaryTextColor);
}

#player-div-metadata-artist {
  font-size: 18px;
  color: v-bind(secondaryTextColor);
}

#player-div-metadata-album {
  font-size: 18px;
  color: v-bind(secondaryTextColor);
}

</style>