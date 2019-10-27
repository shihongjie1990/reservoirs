<template>
  <el-form ref="form"
           :model="form"
           label-width="200px"
           :rules="rules">
    <el-row :gutter="20">
      <el-col :lg="24"
              :md="24"
              :xs="24">
        <el-form-item label="来文编号"
                      prop="applicationDocId">
          <el-input v-model="form.applicationDocId"></el-input>
        </el-form-item>
      </el-col>
      <!-- <el-col :lg="24"
              :md="24"
              :xs="24">
        <el-form-item label="今年目标"
                      prop="target">
          <el-input v-model="form.target"></el-input>
        </el-form-item>
      </el-col> -->
      <el-col :lg="12"
              :md="12"
              :xs="12">
        <el-form-item label="资金筹措情况（万元）"
                      prop="countyFinancing">
          <el-input v-model="form.countyFinancing"></el-input>
        </el-form-item>
      </el-col>
      <el-col :lg="12"
              :md="12"
              :xs="12">
        <el-form-item label="资金累计拨付（万元）"
                      prop="countyAccumulatedAllocation">
          <el-input v-model="form.countyAccumulatedAllocation"></el-input>
        </el-form-item>
      </el-col>
      <el-col :lg="12"
              :md="12"
              :xs="12">
        <el-form-item label="至今累计完成投资（万元）"
                      prop="completedInvestmentSofar">
          <el-input v-model="form.completedInvestmentSofar"></el-input>
        </el-form-item>
      </el-col>
      <el-col :lg="12"
              :md="12"
              :xs="12">
        <el-form-item label="本年累计完成投资（万元）"
                      prop="completedInvestmentCurrentYear">
          <el-input v-model="form.completedInvestmentCurrentYear"></el-input>
        </el-form-item>
      </el-col>
      <el-col :lg="24"
              :md="24"
              :xs="24">
        <el-form-item label="主要依据"
                      prop="basis">
          <el-input v-model="form.basis"
                    type="textarea"
                    :rows="4"
                    placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-col>
      <!-- <el-col :lg="12"
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
      </el-col> -->
      <el-col :lg="12"
              :md="12"
              :xs="24">
        <el-form-item label="申请拨付金额"
                      prop="applicationAmount">
          <el-input v-model="form.applicationAmount"></el-input><span class="last-unit">（万元）</span>
        </el-form-item>
      </el-col>
      <el-col :lg="12"
              :md="12"
              :xs="24">
        <el-form-item label="大写:">
          <span>{{ cnumeral }}</span>
        </el-form-item>
      </el-col>
      <!-- <el-col :lg="12"
              :md="12"
              :xs="24">
        <el-form-item label="核准额（万元）："
                      prop="approvedFigure">
          <el-input v-model="form.approvedFigure"></el-input>
        </el-form-item>
      </el-col> -->
      <el-col :lg="24"
              :md="24"
              :xs="24">
        <el-form-item label="上传附件">
          <el-upload action=""
                     :auto-upload="false"
                     multiple
                     list-type="picture-card"
                     :on-preview="$common.showFullScreenPic"
                     ref="fileUpload"
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
      form: {
        basis: '201X年省级开工X型水库，中央资金计划未下达。目前处于XX阶段。按照进度及资金构成，中央+省级应拨XX万元，按投资构成省级资金已全部拨付并垫付中央资金XX万元；项目共同投资协议已签订，省级融资贷款已落实，市县配套资金到位XX万元。'
      },
      rules: {
        applicationDocId: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        countyFinancing: [
          { required: true, validator: this.validNum, trigger: 'blur' }
        ],
        countyAccumulatedAllocation: [
          { required: true, validator: this.validNum, trigger: 'blur' }
        ],
        completedInvestmentSofar: [
          { required: true, validator: this.validNum, trigger: 'blur' }
        ],
        completedInvestmentCurrentYear: [
          { required: true, validator: this.validNum, trigger: 'blur' }
        ],
        basis: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        applicationAmount: [
          { required: true, validator: this.validNum, trigger: 'blur' }
        ]
      },
      cnumeral: ''
    }
  },
  watch: {
    'form.applicationAmount'(curValue, oldValue) {
      let cnumeral = this.numbertoChinese(curValue * 10000)
      this.cnumeral = cnumeral
      this.form.applicationAmountChn = cnumeral
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
    // 大小写转换
    numbertoChinese(str) {
      var num = parseFloat(str)
      let strOutput = ''
      let strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分'
      num += '00'
      var intPos = num.indexOf('.')
      if (intPos >= 0) {
        num = num.substring(0, intPos) + num.substr(intPos + 1, 2)
      }
      strUnit = strUnit.substr(strUnit.length - num.length)
      for (var i = 0; i < num.length; i++) {
        strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(num.substr(i, 1), 1) + strUnit.substr(i, 1)
      }
      return strOutput.replace(/零角零分$/, '整').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(/^元/, '零元')
    },
    submitPlan() {
      this.$http.post('/api/fund', this.form, { loading: { operation: true } }).then(res => {
        if (res.code === 1002) {
          this.$message({ type: 'success', message: '添加成功！' })
          this.$emit('getAllNodes')
          this.$emit('closeDialog')
        } else {
          if (res.msg.indexOf('重复') > 0) {
            this.$alert('每年只能添加一条投资计划！', '提示', {
              type: 'warning'
            })
          } else {
            this.$alert(res.msg, '警告', {
              type: 'error'
            })
          }
        }
      })
    },
    uploadFiles() {
      let files = this.$refs.fileUpload.uploadFiles
      if (files && files.length > 0) {
        let fd = new FormData()
        let fileUpload = () => {
          this.$http.post('/api/file/uploadtempfiles', fd).then(res => {
            if (res.code === 1002) {
              this.form.tempFolderRelativePath = res.data
              this.$nextTick(() => {
                // 提交修改信息
                /*  this.$http.put(`/api/`, this.form).then(result => {
                   if (result.code === 1002) {
                     this.$message({ type: 'success', message: `${this.form.plantName}修改成功` })
                     this.$router.push({ path: '/reservoirs' })
                   } else {
                     this.$alert(result.data, '错误', { type: 'warning' })
                   }
                 }, resultErr => {
                   this.$alert('修改失败', '错误', { type: 'warning' })
                 }) */
                this.submitPlan()
              })
            }
          })
        }
        let defList = []
        files.map((item, index) => {
          let raw = item.raw
          if (item.raw) {
            fd.append('uploadfile', raw)
          } else {
            let defItem = new Promise((resolve, reject) => {
              this.getImageFileFromUrl(item.url, item.name).then(file => {
                fd.append('uploadfile', file)
                resolve()
              })
            })
            defList.push(defItem)
          }
        })
        if (defList.length === 0) {
          fileUpload()
        } else {
          Promise.all(defList).then(fileList => {
            fileUpload()
          })
        }
      }
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
  }
}
</script>
