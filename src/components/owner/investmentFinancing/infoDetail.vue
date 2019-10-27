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
            <span>{{ form.statusChn }}</span>
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
            <attachment-files :files="files" v-if="files.length > 0"></attachment-files>
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
    }
  },
  components: {
    attachmentFiles
  },
  data() {
    return {
      form: {},
      files: []
    }
  },
  created() {
    this.$http.get(`/api/fund/detail/${this.applicationId}`, { loading: { target: '#info_detail' } }).then(res => {
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
