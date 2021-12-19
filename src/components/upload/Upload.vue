<template>
  <div style="margin-bottom: 50px">
    <DropFile @dropFiles='updateFileList'></DropFile>
    <div style="height: 50px; width: 100%; align-items: center; display: table; text-align: center">
      <div style="display: table-cell; vertical-align: middle; width: 100%">
        <div style="width: 10%; float: left">{{ $t('app.div_file_seq') }}</div>
        <div style="width: 60%; float: left">{{ $t('app.div_file_name') }}</div>
        <div style="width: 15%; float: left">{{ $t('app.div_file_size') }}</div>
        <div style="width: 10%; float: left">{{ $t('app.div_file_status') }}</div>
        <div style="width: 5%; float: left">{{ $t('app.div_file_progress') }}</div>
      </div>
    </div>
    <FileList ref="fileList"></FileList>
    <Footer ref="footer" class="footer" @remove="removeFiles" @upload="upload"></Footer>
  </div>
</template>

<script>

import DropFile from "@/components/upload/DropFile";
import FileList from "@/components/upload/FileList";
import Footer from "@/components/upload/Footer";

export default {
  name: 'Upload',
  data() {
    return {
      fileList: null
    }
  },
  components: {
    Footer,
    FileList,
    DropFile
  },
  methods: {
    updateFileList(files) {
      this.fileList = files;
      this.$refs.fileList.updateFileList(files);
    },
    upload() {
      this.$refs.footer.uploadFile(this.fileList);
    },
    removeFiles() {
      this.updateFileList([])
    }
  }
}
</script>

<style scoped>

.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50px;
}

</style>