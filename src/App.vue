<template>
  <div id="app">
    <Download></Download>
  </div>
</template>

<script>

import Download from "@/components/download/Download";
export default {
  name: 'App',
  data() {
    return {
      fileList: null
    }
  },
  components: {
    Download,
  },
  methods: {
  }
}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
