<template>
  <el-form ref="form"
           :model="form"
           label-width="135px"
           :rules="rules">
    <el-row :gutter="20">
      <el-col :lg="12"
              :md="12"
              :xs="12">
        <el-form-item label="申报时间："
                      prop="year">
          <el-date-picker v-model="form.year"
                          type="year"
                          placeholder="选择日期"
                          value-format="yyyy">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :lg="12"
              :md="12"
              :xs="24">
        <el-form-item label="更新人："
                      prop="submitter">
          <el-input v-model="form.submitter"></el-input>
        </el-form-item>
      </el-col>
      <el-col :lg="12"
              :md="12"
              :xs="24">
        <el-form-item label="申报额（万元）："
                      prop="applyFigure">
          <el-input v-model="form.applyFigure"></el-input>
        </el-form-item>
      </el-col>
      <el-col :lg="12"
              :md="12"
              :xs="24">
        <el-form-item label="核准额（万元）："
                      prop="approvedFigure">
          <el-input v-model="form.approvedFigure"></el-input>
        </el-form-item>
      </el-col>
      <el-col :lg="24"
              :md="24"
              :xs="24">
        <el-form-item label="上传附件">
          <el-upload action=""
                     :auto-upload="false"
                     multiple
                     ref="fileUpload"
                     list-type="picture-card"
                     :on-preview="$common.showFullScreenPic"
                     :file-list="fileList"
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
                     @click="submitAll">修改</el-button>
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
  props: ['modifyData'],
  data() {
    let form = this.modifyData
    return {
      form: form,
      fileList: [],
      rules: {
        year: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        submitter: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        applyFigure: [
          { required: true, validator: this.validNum, trigger: 'blur' }
        ],
        approvedFigure: [
          { required: true, validator: this.validNum, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    validNum(rule, value, callback) {
      if (!value) {
        return callback(new Error('必填'))
      } else if (isNaN(value)) {
        return callback(new Error('只能填数字！'))
      } else {
        callback()
      }
    },
    submitPlan() {
      this.$http.put('/api/annualinvestment', this.form, { loading: { operation: true } }).then(res => {
        if (res.code === 1002) {
          this.$message({ type: 'success', message: '投融资计划修改成功！' })
          this.$emit('getAllNodes')
          this.$emit('closeDialog')
        } else {
          this.$alert(res.msg, '警告', {
            type: 'error'
          })
        }
      })
    },
    submitAll() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 上传
          let files = this.$refs.fileUpload.uploadFiles
          this.$common.uploadFile(files).then(id => {
            this.form.tempFolderRelativePath = id
            this.$nextTick(() => {
              this.submitPlan()
            })
          })
        }
      })
    }
  },
  mounted() {
    this.form = JSON.parse(JSON.stringify(this.modifyData))
    this.fileList = this.$common.pushAttachment(this.form.annualInvestmentFiles)
  }
}
</script>
