<template>
  <div id="bottom-control-bar-div-root">
    <div id="bottom-control-bar-div-container">

      <div id="bottom-control-bar-div-control-container">

        <div class="bottom-control-bar-div-control-prev-next-container">
          <ic-round-skip-prev class="bottom-control-bar-ic" :color="color" />
        </div>

        <div id="bottom-control-bar-div-control-play-pause-container">
          <img draggable="false"
               :src="require(playState ? '@/assets/icon/svg/ic_round_pause.svg' : '@/assets/icon/svg/ic_round_play.svg')"
               alt="" />
        </div>

        <div class="bottom-control-bar-div-control-prev-next-container">
          <ic-round-skip-next class="bottom-control-bar-ic" :color="color" />
        </div>

      </div>

      <div class="bottom-control-bar-div-queue-container" v-on:click="openSideBar">
        <ic-round-queue-music class="bottom-control-bar-ic" :color="color" />
      </div>

    </div>
  </div>
</template>

<script>
import IcRoundSkipPrev from "@/components/player/image/ic-round-skip-prev";
import IcRoundSkipNext from "@/components/player/image/ic-round-skip-next";
import IcRoundQueueMusic from "@/components/player/image/ic-round-queue-music";

export default {
  name: "bottom-control-bar",
  components: {IcRoundQueueMusic, IcRoundSkipNext, IcRoundSkipPrev},
  props: [ 'playState', 'metadata', 'color' ],
  data() {
    return {
    };
  },
  methods: {
    openSideBar() {
      this.$emit('openSideBar');
    }
  }
}
</script>

<style scoped>

img {
  width: 100%;
  height: 100%;
}

#bottom-control-bar-div-root {
  width: 100%;
  height: 56px;
  position: fixed;
  bottom: 0;
}

#bottom-control-bar-div-container {
  width: 100%;
  height: 100%;
  position: relative;
}

#bottom-control-bar-div-control-container {
  height: 36px;
  width: 156px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -18px 0 0 -78px;
}

.bottom-control-bar-div-control-prev-next-container {
  float: left;
  height: 36px;
  width: 36px;
}

.bottom-control-bar-ic {
  width: 100%;
  height: 100%;
}

#bottom-control-bar-div-control-play-pause-container {
  float: left;
  height: 36px;
  width: 36px;
  margin-left: 12px;
  margin-right: 12px;
  background: white;
  border-radius: 36px;
}

.bottom-control-bar-div-queue-container {
  height: 36px;
  width: 36px;
  position: absolute;
  left: 95%;
  top: 50%;
  margin: -18px 0 0 -18px;
}

</style>