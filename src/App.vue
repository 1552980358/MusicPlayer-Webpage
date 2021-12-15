<template>
  <div id="app">
    <Upload></Upload>
  </div>
</template>

<script>

import Upload from "@/components/upload/Upload";
export default {
  name: 'App',
  data() {
    return {
      fileList: null
    }
  },
  components: {
    Upload
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
