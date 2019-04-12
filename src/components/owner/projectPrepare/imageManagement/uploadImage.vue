<template>
  <div class="upload-file">
    <div class="upload-component">
      <el-upload action=""
                 list-type="picture-card"
                 ref="upload"
                 multiple
                 :auto-upload="false"
                 :on-preview="$common.showFullScreenPic">
        <i class="el-icon-plus"></i>
      </el-upload>
      <div>
        <a @click.prevent="uploadFile">
          <i class="el-icon-upload2"></i>
          <div>上传</div>
        </a>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%"
           :src="dialogImageUrl"
           alt="">
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    uploadFile() {
      let widget = this.$refs.upload
      console.log(widget)
    }
  }
}
</script>
