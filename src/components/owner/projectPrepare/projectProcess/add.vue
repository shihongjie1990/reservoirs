<template>
  <el-form ref="form"
           :model="form"
           label-width="135px"
           class="tender-add"
           :rules="rules">
    <el-row :gutter="20">
      <el-col :lg="24"
              :md="24"
              :xs="24">
        <el-form-item label="形象进度名称"
                      prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
      </el-col>
      <el-col :lg="24"
              :md="24"
              :xs="24">
        <el-form-item label="详情说明"
                      prop="desc">
          <el-input v-model="form.desc"
                    type="textarea"
                    :rows="5"></el-input>
        </el-form-item>
      </el-col>
      <el-col :lg="24"
              :md="24"
              :xs="24">
        <el-form-item label="上传附件"
                      class="upload-item">
          <el-upload action=""
                     :auto-upload="false"
                     list-type="picture-card"
                     :on-preview="$common.showFullScreenPic"
                     multiple
                     ref="fileUpload"
                     class="dialog-upload">
            <i class="el-icon-plus"></i>
            <!-- <el-button size="mini"
                       type="success"><i class="fa fa-upload"></i> 点击上传</el-button> -->
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </el-form-item>
      </el-col>
      <el-col :lg="24"
              :md="24"
              :xs="24">
        <div style="text-align:center;">
          <el-button type="primary"
                     size="small"
                     @click="submitAll">提交</el-button>
          <el-button type="info"
                     size="small"
                     @click="$emit('closeDialog')">取消</el-button>
        </div>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      rules: {
        title: [
          { required: true, message: '未输入名称', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '未输入详情说明', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitAll() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let files = this.$refs.fileUpload.uploadFiles
          this.$common.uploadFile(files).then(id => {
            id && (this.form.tempFolderRelativePath = id)
            this.$http.post('/api/visualProgress', this.form, { loading: { operation: true } }).then(res => {
              if (res.code === 1002) {
                this.$message.success('新增成功！')
                this.$emit('getAllProcess')
                this.$emit('closeDialog')
              } else {
                this.$message.error(res.msg || res.content)
              }
            })
          })
        }
      })
    },
    uploadFile() {
      let files = this.$refs.fileUpload.uploadFiles
      if (files && files.length > 0) {
        let fd = new FormData()
        files.map((item, index) => {
          let raw = item.raw
          if (item.raw) {
            fd.append('uploadfile', raw)
          }
        })
        this.$http.post('/api/file/uploadtempfiles', fd).then(res => {
          if (res.code === 1002) {
            this.form.tempFolderRelativePath = res.data
            this.$nextTick(() => {
              this.submitAll()
            })
          }
        })
      } else {
        this.submitAll()
      }
    }
  }
}
</script>
