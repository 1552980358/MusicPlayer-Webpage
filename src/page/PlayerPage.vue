<template>
  <div id="player-div-background">

    <div id="player-div-content-root-left">
      <div id="player-div-img-container">
        <img id="player-img-art" :src="imgArtUrl"  alt="" />
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

  </div>
</template>

<script>
export default {
  name: "WebPlayer",
  data() {
    return {
      // Colors
      backgroundColor: '#6750A4',
      primaryTextColor: '#FFF',
      secondaryTextColor: '#A4A4A4',

      // Metadata
      metadata: { title: '', artist: '', album: '' },
      imgArtUrl: require('../assets/icon/svg/ic_round_audiotrack.svg'),
    };
  },
}
</script>

<style scoped>

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