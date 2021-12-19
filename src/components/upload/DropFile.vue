<template>
  <div id="div-drop-area" ref="div-drop-area" :class="hasDrop || mouseAbove ? 'drop-above' : 'drop-empty'" style="height: 150px; width: 100%; align-items: center; display: table; cursor: pointer" @click="selectFiles">
    <input ref="input-select" type="file" style="display: none" accept="audio/*" @change="inputFiles($event)">
    <h1 style="text-align: center; display: table-cell; vertical-align: middle">{{ hasDrop ? $t('upload.text_drop_above') : $t('upload.text_drop_empty') }}</h1>
  </div>
</template>

<script>

export default {
  name: "DropFile",
  data() {
    return {
      hasDrop: false,
      mouseAbove: false,
      fileList: []
    }
  },
  methods: {
    dropEvent(e) {
      this.hasDrop = false;
      e.stopPropagation();
      e.preventDefault();
      [].forEach.call(e.dataTransfer.files, (file) => {
        if (file.type.includes('audio')) {
          let exists = false
          this.fileList.forEach((f) => {
            if (f.name.localeCompare(file.name) === 0)
              exists = true;
          })
          if (!exists) {
            this.fileList.push({
              file: file,
              name: file.name,
              size: file.size,
              upload: 0,
              status: 0
            });
          } else {
            console.log('File \'' + file.name + '\' exists, ignored.');
          }
        } else {
          const extIndex = file.name.lastIndexOf('.');
          if (extIndex === -1) {
            console.log('File \'' + file.name + '\' with unknown type, ignored.');
          } else {
            console.log('File \'' + file.name + '\' with type ' + file.name.substring(extIndex + 1) + ' is not the type of \'audio/*\', ignored.');
          }
        }
      }, false);
      this.updateFiles();
    },
    selectFiles() {
      this.$refs["input-select"].click();
    },
    inputFiles(e) {
      [].forEach.call(e.target.files, (file) => {
        let exists = false
        this.fileList.forEach((f) => {
          if (f.name.localeCompare(file.name) === 0)
            exists = true;
        })
        if (!exists) {
          this.fileList.push({
            file: file,
            name: file.name,
            size: file.size,
            upload: 0,
            status: 0
          });
        } else {
          console.log('File \'' + file.name + '\' exists, ignored.');
        }
      }, false);
      this.updateFiles();
    },
    updateFiles() {
      this.$emit('dropFiles', this.fileList)
    }
  },
  mounted() {
    let dropArea = this.$refs["div-drop-area"];
    dropArea.addEventListener('drop', this.dropEvent, false);
    dropArea.addEventListener('dragleave', e => {
      e.stopPropagation();
      e.preventDefault();
      this.hasDrop = false;
    })
    dropArea.addEventListener('dragenter', e => {
      e.stopPropagation();
      e.preventDefault();
      this.hasDrop = true;
    })
    dropArea.addEventListener('dragover', e => {
      e.stopPropagation();
      e.preventDefault();
      this.hasDrop = true;
    })
    dropArea.addEventListener('mouseover', e => {
      e.stopPropagation();
      e.preventDefault();
      this.mouseAbove = true;
    });
    dropArea.addEventListener('mouseleave', e => {
      e.stopPropagation();
      e.preventDefault();
      this.mouseAbove = false;
    })
  }
}
</script>

<!--suppress CssUnusedSymbol, CssUnknownProperty -->
<style scoped>

html, body, #div-drop-area {
  width: 100%;
}

.drop-above {
  background-color: #4285F4;
  color: white;
  border: 1px solid #FFF;
}

.drop-empty {
  background-color: white;
  color: black;
  border: 1px solid #000;
}

h1 {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
}

</style>