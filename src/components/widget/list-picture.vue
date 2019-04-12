<template>
  <div class="attachment-view">
    <el-row :gutter="20">
      <el-col :lg="6"
              :md="8"
              :xs="12"
              v-for="(file, index) in allFiles"
              :key="index">
        <div class="img-block"
             @click.stop="showFullScreenPic(file.fileAddr)"
             :title="file.name">
          <div class="image-div">
            <img :src="file.url"
                 alt="文件">
            <i class="el-icon-download"
               @click.stop="downloadFile(file.fileAddr)"></i>
          </div>
          <div class="name-background"></div>
          <div class="name-block">{{ file.name }}</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: ['files'],
  data() {
    return {
      allFiles: []
    }
  },
  methods: {
    downloadFile(addr) {
      let Base64 = require('js-base64').Base64
      let strBase = Base64.encode(Base64.encode(addr))
      let url = location.origin + '/api/download/' + strBase
      window.open(url, '_self')
    },
    showFullScreenPic(url) {
      let param = {
        flag: true,
        url: '/api/files/' + url
      }
      this.$common.showFullScreenPic(param)
    },
    dealFiles(files) {
      let imgExt = ['.png', '.jpg', '.jpeg', '.bmp', '.gif']
      files.map(item => {
        let addr = item.fileAddr
        item.name = addr.substring(addr.lastIndexOf('-') + 1)
        let type = addr.substr(addr.lastIndexOf('.'))
        if (imgExt.indexOf(type) > -1) {
          item.url = '/api/files/' + addr
        } else {
          item.url = 'static/images/wallpaper.jpg'
        }
      })
      return files
    }
  },
  mounted() {
    let files = this.files
    this.allFiles = this.dealFiles(files)
  }
}
</script>
