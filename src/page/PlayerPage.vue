<template>
  <div id="player-div-background" :style="{ 'background-color': backgroundColor }">

    <div id="player-div-content-root-left">
      <div id="player-div-img-container">
        <img id="player-img-art" :src="imgArtUrl"  alt="" />
      </div>
    </div>

    <div id="player-div-content-root-right">
      <div id="player-div-metadata-container">
        <div>
          <div id="player-div-title" class="player-div-metadata" :style="{ 'color': primaryTextColor }">{{ metadata.title }}</div>
          <div id="player-div-artist" class="player-div-metadata" :style="{ 'color': secondaryTextColor }">{{ metadata.artist }}</div>
          <div id="player-div-album" class="player-div-metadata" :style="{ 'color': secondaryTextColor }">{{ metadata.album }}</div>
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
      metadata: { title: 'abcdefghijklmnopqrstuvwxyz', artist: '456', album: '789' },
      imgArtUrl: '',
    };
  },
}
</script>

<style scoped>

#player-div-background {
  width: 100vw;
  height: 100vh;
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

#player-div-title {
  font-size: 24px;
}

#player-div-artist {
  margin-top: 5px;
  margin-bottom: 5px;
}

#player-div-album {
}

.player-div-metadata {
  font-size: 18px;
  text-align: center;
}

</style>