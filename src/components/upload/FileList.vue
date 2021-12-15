<template>
  <div>
    <div v-for="(f, i) in fileList" :key="f.name">
      <File :f="f" :index="i"></File>
    </div>
  </div>
</template>

<script>

import File from "@/components/upload/File";

export default {
  name: "FileList",
  components: {File},
  data() {
    return {
      fileList: null
    }
  },
  methods: {
    updateFileList(files) {
      this.fileList = files
    }
  }
}
</script>

<style scoped>

</style>