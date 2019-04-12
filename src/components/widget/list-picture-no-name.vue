<template>
  <el-row class="show-pic"
          :gutter="10">
    <el-col :lg="6"
            :sm="8"
            :md="6"
            v-for="(pic, index) in imgVOs"
            :key="index">
      <el-card :body-style="{ padding: '0px' }"
               shadow="hover">
        <div class="image-div">
          <img :src="pic.url"
               class="image"
               @click.stop.prevent="showFullImg(pic.url)">
          <i class="el-icon-download"
             @click.stop="downloadFile(pic.fileAddr)"></i>
        </div>
        <div style="padding: 14px;"
             v-if="pic.desc">
          <span>{{ pic.desc }}</span>
          <div class="bottom clearfix">
            <time class="time">{{ pic.updateTime }}</time>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%"
           :src="dialogImageUrl"
           alt="">
    </el-dialog>
  </el-row>
</template>

<script>
export default {
  props: ['imgVOs'],
  data() {
    return {
      imgs: [{
        url: 'static/images/wallpaper.jpg'
      }, {
        url: 'static/images/4.png'
      }, {
        url: 'static/images/wallpaper.jpg'
      }, {
        url: 'static/images/4.png'
      }, {
        url: 'static/images/wallpaper.jpg'
      }, {
        url: 'static/images/4.png'
      }, {
        url: 'static/images/wallpaper.jpg'
      }, {
        url: 'static/images/4.png'
      }, {
        url: 'static/images/wallpaper.jpg'
      }, {
        url: 'static/images/4.png'
      }],
      dialogVisible: false,
      dialogImageUrl: ''
    }
  },
  methods: {
    showFullImg(url) {
      /* this.dialogImageUrl = url
      this.dialogVisible = true */
      let param = {
        flag: true,
        url: url
      }
      this.$store.dispatch('setShowImg', param)
    },
    downloadFile(addr) {
      let Base64 = require('js-base64').Base64
      let strBase = Base64.encode(Base64.encode(addr))
      let url = location.origin + '/api/download/' + strBase
      window.open(url, '_self')
    }
  }
}
</script>
