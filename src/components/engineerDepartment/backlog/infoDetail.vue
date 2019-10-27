<template>
  <div>
    <el-form ref="form_backlog"
             :model="form"
             :rules="rules"
             id="backlog_form"
             label-width="150px">
      <el-row :gutter="20">
        <el-col :lg="24"
                :md="24"
                :xs="24">
          <el-form-item label="来文编号：">
            <span>{{ form.applicationDocId }}</span>
          </el-form-item>
        </el-col>
        <el-col :lg="12"
                :md="12"
                :xs="12">
          <el-form-item label="资金筹措情况：">
            <span>{{ form.countyFinancing }}万元</span>
          </el-form-item>
        </el-col>
        <el-col :lg="12"
                :md="12"
                :xs="12">
          <el-form-item label="资金累计拨付：">
            <span>{{ form.countyFinancing }}万元</span>
          </el-form-item>
        </el-col>
        <el-col :lg="12"
                :md="12"
                :xs="12">
          <el-form-item label="至今累计完成投资：">
            <span>{{ form.countyFinancing }}万元</span>
          </el-form-item>
        </el-col>
        <el-col :lg="12"
                :md="12"
                :xs="12">
          <el-form-item label="本年累计完成投资：">
            <span>{{ form.completedInvestmentCurrentYear }}万元</span>
          </el-form-item>
        </el-col>
        <el-col :lg="24"
                :md="24"
                :xs="24">
          <el-form-item label="主要依据："
                        prop="basis">
            <span>{{ form.basis }}</span>
          </el-form-item>
        </el-col>
        <el-col :lg="12"
                :md="12"
                :xs="24">
          <el-form-item label="申请拨付金额：">
            <span>{{ form.applicationAmount }}万元</span>
          </el-form-item>
        </el-col>
        <el-col :lg="12"
                :md="12"
                :xs="24">
          <el-form-item label="大写:">
            <span>{{ form.applicationAmountChn }}</span>
          </el-form-item>
        </el-col>
        <el-col :lg="12"
                :md="12"
                :xs="24">
          <el-form-item label="大写:">
            <span>{{ form.applicationAmountChn }}</span>
          </el-form-item>
        </el-col>
        <el-col :lg="12"
                :md="12"
                :xs="24">
          <el-form-item label="档期:">
            <span>{{ form.peirod }}</span>
          </el-form-item>
        </el-col>
        <el-col :lg="12"
                :md="12"
                :xs="24">
          <el-form-item label="当前状态:">
            <span>{{ form.statusChn }}</span>
          </el-form-item>
        </el-col>
        <el-col :lg="24"
                :md="24"
                :xs="24">
          <el-form-item label="附件:">
            <attachment-files :files="files"
                              v-if="files.length > 0"></attachment-files>
          </el-form-item>
        </el-col>
        <el-col :lg="12"
                :md="12"
                :xs="12"
                :offset="10"
                v-if="isDeal"
                class="fill-item">
          <el-form-item label="批准拨付金额："
                        prop="approvedAmount">
            <el-input v-model="form.approvedAmount"></el-input><span class="last-unit">（万元）</span>
          </el-form-item>
        </el-col>
        <el-col :lg="24"
                :md="24"
                :xs="24">
          <div style="text-align:center;">
            <el-button type="primary"
                       size="small"
                       @click="submitAll(true)" v-if="isDeal">批准</el-button>
            <el-button type="primary"
                       size="small"
                       @click="submitAll(false)" v-if="isDeal">拒绝</el-button>
            <el-button type="primary"
                       size="small"
                       @click="$emit('closeDialog')">取消</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import attachmentFiles from '@/components/owner/investmentFinancing/attachmentFiles'

export default {
  props: {
    applicationId: {
      type: String,
      required: true
    },
    isDeal: {
        type: Boolean,
        required: true
    }
  },
  components: {
    attachmentFiles
  },
  data() {
    return {
      form: {
        approvedAmount: ''
      },
      files: [],
      rules: {
        approvedAmount: [
          { required: true, validator: this.validAmount, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    validAmount(rule, value, callback) {
      if (!value || isNaN(value)) {
        if (!value) {
          callback(new Error('若批准该申请，则必填！'))
        }
        if (isNaN(value)) {
          callback(new Error('请输入数字！'))
        }
      } else {
        callback()
      }
    },
    commonBehavior() {
      this.$message.success('操作成功！')
      this.$emit('closeDialog')
      this.$emit('getAllNodes')
    },
    submitAll(flag) {
      let _this = this
      if (flag) {
        this.$refs['form_backlog'].validate((valid) => {
          if (valid) {
            this.$http.get(`/api/fund/approve/${this.form.applicationId}/31642/${this.form.approvedAmount}`, {loading: { target: '#backlog_form' }}).then(res => {
              if (res.code === 1002) {
                _this.commonBehavior()
              } else {
                _this.$message.error(res.msg)
              }
            })
          }
        })
      } else {
        this.$http.get(`/api/fund/approve/${this.form.applicationId}/30880`, {loading: { target: '#backlog_form' }}).then(res => {
          if (res.code === 1002) {
            _this.commonBehavior()
          } else {
            _this.$message.error(res.msg)
          }
        })
      }
    }
  },
  created() {
    this.$http.get(`/api/fund/detail/${this.applicationId}`).then(res => {
      if (res.code === 1002) {
        this.form = res.data
        this.files = res.data.fundApplicationFiles
      }
    })
  }
}
</script>

<style>
</style>
