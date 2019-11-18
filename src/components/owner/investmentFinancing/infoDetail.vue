<template>
  <div>
    <el-form ref="form"
             :model="form"
             label-width="150px"
             id="info_detail">
      <el-row :gutter="20">
        <el-col :lg="24"
                :md="24"
                :xs="24">
          <el-form-item label="来文编号："
                        prop="applicationDocId">
            <span>{{ form.applicationDocId }}</span>
          </el-form-item>
        </el-col>
        <el-col :lg="12"
                :md="12"
                :xs="12">
          <el-form-item label="资金筹措情况："
                        prop="countyFinancing">
            <span>{{ form.countyFinancing }}万元</span>
          </el-form-item>
        </el-col>
        <el-col :lg="12"
                :md="12"
                :xs="12">
          <el-form-item label="资金累计拨付："
                        prop="countyAccumulatedAllocation">
            <span>{{ form.countyFinancing }}万元</span>
          </el-form-item>
        </el-col>
        <el-col :lg="12"
                :md="12"
                :xs="12">
          <el-form-item label="至今累计完成投资："
                        prop="completedInvestmentSofar">
            <span>{{ form.countyFinancing }}万元</span>
          </el-form-item>
        </el-col>
        <el-col :lg="12"
                :md="12"
                :xs="12">
          <el-form-item label="本年累计完成投资："
                        prop="completedInvestmentCurrentYear">
            <span>{{ form.completedInvestmentCurrentYear }}万元</span>
          </el-form-item>
        </el-col>
        <el-col :lg="24"
                :md="24"
                :xs="24">
          <el-form-item label="主要依据："
                        prop="basis">
            <span>{{ form.basis }}</span>
            <!-- <el-input v-model="form.basis"
                      type="textarea"
                      :rows="4"
                      placeholder="请输入内容"></el-input> -->
          </el-form-item>
        </el-col>
        <el-col :lg="12"
                :md="12"
                :xs="24">
          <el-form-item label="申请拨付金额："
                        prop="applicationAmount">
            <span>{{ form.applicationAmount }}万元</span>
          </el-form-item>
        </el-col>
        <el-col :lg="12"
                :md="12"
                :xs="24">
          <el-form-item label="大写:"
                        prop="applicationAmountChn">
            <span>{{ form.applicationAmountChn }}</span>
          </el-form-item>
        </el-col>
        <el-col :lg="12"
                :md="12"
                :xs="24">
          <el-form-item label="大写:"
                        prop="applicationAmountChn">
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
            <span>{{ form.fundApplicationPayDetail | filterStatus }}</span>
          </el-form-item>
        </el-col>
        <el-col :lg="24"
                :md="12"
                :xs="24">
          <el-form-item label="明细:"
                        v-if="adjustStatus(form.fundApplicationPayDetail)">
            <div class="pay-detail">
              当前批复总额：<span>{{ form.fundApplicationPayDetail.Actual_amount }}</span>（{{ form.fundApplicationPayDetail.Money_unit }}）
            </div>
            <el-table :data="form.fundApplicationPayDetail.Amount_details"
                      border
                      style="width: 100%">
              <el-table-column prop="Amount_money"
                               label="实际拨付"
                               align="center">
              </el-table-column>
              <el-table-column prop="Center_amount_money"
                               align="center"
                               label="中央资金">
              </el-table-column>
              <el-table-column prop="Loan_amount_money"
                               align="center"
                               label="贷款资金">
              </el-table-column>
              <el-table-column prop="Finance_amount_money"
                               align="center"
                               label="省级财政资金">
              </el-table-column>
              <el-table-column prop="Amount_date"
                               align="center"
                               width="180"
                               label="拨付日期">
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
        <!-- <el-col :lg="24"
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
            </el-upload>
          </el-form-item>
        </el-col> -->
        <el-col :lg="24"
                :md="24"
                :xs="24">
          <el-form-item label="附件:">
            <attachment-files :files="files"
                              v-if="files.length > 0"></attachment-files>
          </el-form-item>
        </el-col>
        <el-col :lg="24"
                :md="24"
                :xs="24">
          <div style="text-align:center;">
            <!-- <el-button type="primary"
                       size="small"
                       @click="submitAll">提交</el-button> -->
            <el-button type="primary"
                       size="small"
                       @click="$emit('closeDialog')">关闭</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import attachmentFiles from './attachmentFiles'

export default {
  props: {
    applicationId: {
      type: String,
      required: true
    },
    fundApplicationPayDetail: {
      type: Object,
      required: true
    }
  },
  components: {
    attachmentFiles
  },
  filters: {
    filterStatus (data) {
      if (data && Object.keys(data).length > 0) {
        return '已批复'
      } else {
        return '待审批'
      }
    }
  },
  data () {
    return {
      form: {},
      files: []
    }
  },
  methods: {
    adjustStatus (data) {
      if (data && Object.keys(data).length > 0) {
        return true
      } else {
        return false
      }
    }
  },
  created () {
    this.$http.get(`/api/fund/detail/${this.applicationId}`, { loading: { target: '#info_detail' } }).then(res => {
      if (res.code === 1002) {
        this.form = res.data
        this.form.fundApplicationPayDetail = this.fundApplicationPayDetail
        this.files = res.data.fundApplicationFiles
      }
    })
  }
}
</script>

<style scoped>
#info_detail .pay-detail {
  margin-bottom: 16px;
}

#info_detail .pay-detail > span {
  font-size: 28px;
  font-style: italic;
  color: #ffad1b;
  font-weight: 600;
  margin: 0 6px;
  vertical-align: bottom;
}
</style>
