<template>
  <div id="app">
    <component :is="currentPage === 1 ? uploadPage : currentPage === 2 ? downloadPage : indexPage" @changePage="changePage"></component>
  </div>
</template>

<script>

import Index from "@/components/index/Index";
import Upload from "@/components/upload/Upload";
import Download from "@/components/download/Download";

export default {
  name: 'App',
  data() {
    return {
      uploadFiles: null,
      currentPage: 0,
      indexPage: Index,
      uploadPage: Upload,
      downloadPage: Download,
    }
  },
  components: {
    Download, Upload, Index
  },
  methods: {
    changePage(page) {
      this.currentPage = page;
    },
  },
  mounted() {
    let parts = document.location.toString().split('/').filter(item => item !== '');
    let endParts = parts[parts.length - 1];
    if (endParts.includes('?')) {
      endParts = endParts.substring(0, endParts.indexOf('?'));
    }
    switch (endParts) {
      case 'upload':
        this.currentPage = 1;
        break;
      case 'download':
        this.currentPage = 2;
        break;
    }
  }
}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0 !important;
  padding: 0 !important;
}

html, body {
  margin: 0 !important;
  padding: 0 !important;
}

component {
  width: 100vw;
  max-width: 100%;
}

</style>
