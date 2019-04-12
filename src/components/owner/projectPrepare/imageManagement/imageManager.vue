<template>
  <div class="multi-part image-manager">
    <el-card class="box-card"
             shadow="always">
      <div slot="header"
           class="clearfix">
        <span>已上传图片</span>
      </div>
      <show-image></show-image>
    </el-card>
    <el-card class="box-card"
             shadow="always">
      <div slot="header"
           class="clearfix">
        <span>上传图片</span>
      </div>
      <upload-image></upload-image>
    </el-card>
  </div>
</template>

<script>
import showImage from '@/components/widget/list-picture-no-name'
import uploadImage from './uploadImage'

export default {
  components: {
    'show-image': showImage,
    'upload-image': uploadImage
  },
  data() {
    return {}
  }
}
</script>
