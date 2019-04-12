<template>
  <el-form ref="form"
           :model="form"
           label-width="95px"
           :rules="rules">
    <el-row :gutter="20">
      <el-col :lg="24"
              :md="24"
              :xs="24">
        <el-form-item label="节点名称：">
          <el-input v-model="form.planProject"
                    disabled="disabled"></el-input>
        </el-form-item>
      </el-col>
      <el-col :lg="12"
              :md="12"
              :xs="24">
        <el-form-item label="编制单位："
                      prop="compileUnit">
          <el-input v-model="form.compileUnit"></el-input>
        </el-form-item>
      </el-col>
      <el-col :lg="12"
              :md="12"
              :xs="24">
        <el-form-item label="文号："
                      prop="referenceNumber">
          <el-input v-model="form.referenceNumber"></el-input>
        </el-form-item>
      </el-col>
      <el-col :lg="12"
              :md="12"
              :xs="24">
        <el-form-item label="批复单位："
                      prop="approvalUnit">
          <el-input v-model="form.approvalUnit"></el-input>
        </el-form-item>
      </el-col>
      <el-col :lg="12"
              :md="12"
              :xs="24">
        <el-form-item label="批复时间："
                      prop="approvalDate">
          <el-date-picker v-model="form.approvalDate"
                          type="date"
                          placeholder="选择日期"
                          value-format="yyyy-MM-dd">
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
      <el-col :lg="24"
              :md="24"
              :xs="24">
        <el-form-item label="批复状态：">
          <!-- <el-input v-model="form.approvalStatus"></el-input> -->
          <el-radio-group v-model="form.approvalStatus">
            <el-radio :label="0">未批复</el-radio>
            <el-radio :label="1">通过</el-radio>
            <el-radio :label="2">驳回</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :lg="24"
              :md="24"
              :xs="24">
        <el-form-item label="上传附件">
          <el-upload action=""
                     :auto-upload="false"
                     multiple
                     list-type="picture-card"
                     :on-perview="$common.showFullScreenPic"
                     ref="fileUpload"
                     :file-list="fileList"
                     class="dialog-upload">
            <i class="el-icon-plus"></i>
            <!-- <el-button size="mini"
                       type="success"><i class="fa fa-upload"></i> 点击上传</el-button> -->
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </el-form-item>
      </el-col>
      <!-- <div class="tool-bar">
                <el-button type="primary" size="small">提交计划</el-button>
                <el-button type="info" size="small">取消</el-button>
            </div> -->
      <el-col :lg="24"
              :md="24"
              :xs="24">
        <div style="text-align:center;">
          <el-button type="primary"
                     size="small"
                     @click="submitAll">修改计划</el-button>
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
    return {
      form: this.modifyData,
      fileList: [],
      rules: {
        compileUnit: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        referenceNumber: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        approvalUnit: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        approvalDate: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        submitter: [
          { required: true, message: '必填', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitPlan() {
      this.$http.put('/api/preprogress', this.form, { loading: { operation: true } }).then(res => {
        if (res.code === 1002) {
          this.$emit('closeDialog')
          this.$message({ type: 'success', message: '计划修改成功！' })
          this.$emit('getAllNodes')
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
    // this.getNextNode()
    this.form.approvalStatus = parseInt(this.form.approvalStatus)
    this.fileList = this.$common.pushAttachment(this.form.preProgressEntryFiles)
  }
}
</script>
