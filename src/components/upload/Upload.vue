<template>
  <div class="div-upload-root">
    <DropFile ref="drop-file" @dropFiles='updateFileList'></DropFile>
    <div class="div-column-title-container">
      <div class="div-column-title">
        <div class="div-5">{{ $t('app.div_file_seq') }}</div>
        <div class="div-60">{{ $t('app.div_file_name') }}</div>
        <div class="div-15">{{ $t('app.div_file_size') }}</div>
        <div class="div-10">{{ $t('app.div_file_status') }}</div>
        <div class="div-10">{{ $t('app.div_file_progress') }}</div>
      </div>
    </div>
    <FileList ref="fileList" class="file-list"></FileList>
    <Footer ref="footer" class="footer" @removeAllFiles="updateFileList([])" @upload="upload" @back="back" @removeSelected="removeSelected"></Footer>
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
      this.$refs["drop-file"].fileList = files;
    },
    upload() {
      this.$refs.footer.uploadFile(this.fileList);
    },
    back() {
      this.$emit('changePage', 0);
    },
    findSelected() {
      let found = false;
      let index = 0;
      this.fileList.some(file => {
        if (file.isSelected) {
          found = true;
          return true;
        }
        index++;
      });
      if (found) {
        return index;
      }
      return -1;
    },
    removeSelected() {
      let index;
      while ((index = this.findSelected()) !== -1) {
        this.fileList.splice(index, 1);
      }
    },
  },
  mounted() {
    window.addEventListener('popstate', this.back, false);
    window.history.pushState('forward', null, 'upload');
    window.history.forward(1);
  },
  destroyed() {
    window.removeEventListener('popstate', this.back, false);
  }
}
</script>

<style scoped>

.div-upload-root {
  width: 100vw;
  margin-bottom: 50px;
}

.file-list {
  width: 100vw;
}

.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 48px;
}

.div-column-title {
  display: table-cell;
  vertical-align: middle;
  width: 100vw;
}

.div-column-title-container {
  height: 50px;
  width: 100vw;
  align-items: center;
  display: table;
  text-align: center
}

.div-60 {
  width: 60vw;
  float: left;
}

.div-10 {
  width: 10vw;
  float: left;
}

.div-15 {
  width: 15vw;
  float: left;
}

.div-5 {
  width: 5vw;
  float: left;
}

</style>