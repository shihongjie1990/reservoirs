<template>
  <div class="contract-add">
    <!-- <div class="title"><span>新增合同</span></div> -->
    <el-form ref="form"
             :model="formData"
             label-width="100px"
             :rules="rules">
      <el-row :gutter="20">
        <el-col :lg="12"
                :md="12"
                :xs="24">
          <el-form-item label="合同名称："
                        prop="name">
            <el-input v-model="formData.name"
                      placeholder="请输入合同名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :lg="12"
                :md="12"
                :xs="24">
          <el-form-item label="合同编号："
                        prop="number">
            <el-input v-model="formData.number"
                      placeholder="请输入合同编号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :lg="12"
                :md="12"
                :xs="24">
          <el-form-item label="合同类型："
                        prop="type">
            <el-select v-model="formData.type"
                       placeholder="请选择合同类型">
              <el-option v-for="item in options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="12"
                :md="12"
                :xs="24">
          <el-form-item label="签订时间："
                        prop="signDate">
            <el-date-picker v-model="formData.signDate"
                            type="date"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :lg="12"
                :md="12"
                :xs="24">
          <el-form-item label="甲方："
                        prop="partya">
            <el-input v-model="formData.partya"
                      placeholder="请输入甲方"></el-input>
          </el-form-item>
        </el-col>
        <el-col :lg="12"
                :md="12"
                :xs="24">
          <el-form-item label="乙方："
                        prop="partyb">
            <el-input v-model="formData.partyb"
                      placeholder="请输入乙方"></el-input>
          </el-form-item>
        </el-col>
        <el-col :lg="12"
                :md="12"
                :xs="12">
          <el-form-item label="合同金额："
                        prop="price">
            <el-input v-model="formData.price"
                      placeholder="请输入合同金额"></el-input>
          </el-form-item>
        </el-col>
        <el-col :lg="12"
                :md="12"
                :xs="12">
          <el-form-item label="合同形式：">
            <!-- <el-input v-model="formData.label" placeholder="请输入合同金额"></el-input> -->
            <el-radio-group v-model="formData.label">
              <el-radio :label="1">合同内</el-radio>
              <el-radio :label="2">合同外</el-radio>
            </el-radio-group>
            <el-tooltip class="item"
                        effect="dark"
                        content="每个项目只能有一条合同内的合同信息"
                        placement="right-end"
                        style="margin-left:20px">
              <i class="fa fa-exclamation-circle"></i>
            </el-tooltip>
          </el-form-item>
        </el-col>
        <el-col :lg="24"
                :md="24"
                :xs="24">
          <el-form-item label="内容："
                        prop="content">
            <el-input v-model="formData.content"
                      type="textarea"
                      :rows="5"
                      placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :lg="24"
                :md="24"
                :xs="24">
          <el-form-item label="备注：">
            <el-input v-model="formData.remark"
                      type="textarea"
                      :rows="5"
                      placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :lg="24"
                :md="24"
                :xs="24">
          <el-form-item label="上传附件">
            <el-upload action=""
                       :auto-upload="false"
                       :on-preview="$common.showFullScreenPic"
                       multiple
                       list-type="picture-card"
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        label: 2
      },
      options: [
        {
          value: '设计采购施工总承包(EPC)类',
          label: '设计采购施工总承包(EPC)类'
        },
        {
          value: '项目管理承包（PMC)类',
          label: '项目管理承包（PMC)类'
        },
        {
          value: '设计类',
          label: '设计类'
        },
        {
          value: '施工类',
          label: '施工类'
        },
        {
          value: '监理类',
          label: '监理类'
        },
        {
          value: '设备采购类',
          label: '设备采购类'
        },
        {
          value: '招标代理类',
          label: '招标代理类'
        },
        {
          value: '技术服务类',
          label: '技术服务类'
        },
        {
          value: '移民类',
          label: '移民类'
        },
        {
          value: '其他类',
          label: '其他类'
        }
      ],
      rules: {
        name: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        signDate: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        partya: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        partyb: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        price: [
          { required: true, validator: this.validNum, trigger: 'blur' }
        ],
        content: [
          { required: true, message: '必填', trigger: 'blur' }
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
    submitForm() {
      this.$http.post('/api/contract', this.formData, { loading: { operation: true } }).then(res => {
        if (res.code === 1002) {
          this.$message({ message: '新增合同成功', type: 'success' })
          this.$emit('getTender')
          this.$emit('closeDialog')
        } else if (res.code === 9997) {
          this.$alert('重复的记录', '警告', { type: 'warning' })
        }
      })
    },
    submitAll() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let files = this.$refs.fileUpload.uploadFiles
          this.$common.uploadFile(files).then(id => {
            this.formData.tempFolderRelativePath = id
            this.$nextTick(() => {
              this.submitForm()
            })
          })
        }
      })
    }
  }
}
</script>
