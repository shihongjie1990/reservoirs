<template>
  <div class="paper-detail">
    <div class="detail-base">
      <table class="content">
        <tr>
          <td><label>月份：</label><span><i class="fa fa-calendar"></i> {{ month }}月</span></td>
          <td><label>填报时间：</label><span><i class="fa fa-clock-o"></i> {{ submitDate }}</span></td>
          <td><label>上报人：</label><span><i class="fa fa-user-circle"></i> {{ monthPaperForm.submitter }}</span></td>
          <td><label>统计负责人：</label><span><i class="fa fa-user"></i> {{ monthPaperForm.statisticalLeader }}</span></td>
        </tr>
      </table>
      <div
        class="attachment-files"
        v-if="attachmentData"
      >
        <label>附件：</label>
        <div class="attachment-block">
          <i
            v-for="(item, index) in attachmentData"
            :key="index"
            :class="'fa ' + item.icon"
            :title="item.name"
            @click="downloadFile(item.fileAddr)"
          ></i>
        </div>
      </div>
    </div>
    <div class="detail-content centerline-panel panel-mini-font">
      <el-collapse v-model="activeNames">
        <el-collapse-item
          title="投资情况"
          name="1"
        >
          <div class="detail-investment info-item">
            <div>
              <div>工程部份投资</div>
              <table class="detail-info-desc">
                <tr>
                  <td><label>建筑工程：</label><span>{{ monthPaperForm.civilEngineering }}</span></td>
                  <td><label>机电设备及安装工程：</label><span>{{ monthPaperForm.electromechanicalEquipment }}</span></td>
                  <td><label>金属机构设备及安装工程：</label><span>{{ monthPaperForm.metalMechanism }}</span></td>
                  <td><label>施工临时工程：</label><span>{{ monthPaperForm.temporaryWork }}</span></td>
                </tr>
                <tr>
                  <td><label>独立费用：</label><span>{{ monthPaperForm.independentCost }}</span></td>
                  <td><label>基本预备费：</label><span>{{ monthPaperForm.reserveFunds }}</span></td>
                </tr>
              </table>
            </div>
            <div>
              <div>移民、环境投资</div>
              <table class="detail-info-desc">
                <tr>
                  <td><label>建设征地移民安置补偿费：</label><span>{{ monthPaperForm.resettlementArrangement }}</span></td>
                  <td><label>水土保持工程投资：</label><span>{{ monthPaperForm.waterConservation }}</span></td>
                  <td><label>环境保护工程投资：</label><span>{{ monthPaperForm.environmentalProtection }}</span></td>
                  <td><label>其他：</label><span>{{ monthPaperForm.otherCost }}</span></td>
                </tr>
              </table>
            </div>
            <div>
              <div>资金来源</div>
              <table class="detail-info-desc">
                <tr>
                  <td><label>中央投资：</label><span>{{ monthPaperForm.sourceCentralInvestment }}</span></td>
                  <td><label>省级投资：</label><span>{{ monthPaperForm.availableProvincialInvestment }}</span></td>
                  <td><label>市县投资：</label><span>{{ monthPaperForm.availableLocalInvestment }}</span></td>
                  <td></td>
                </tr>
              </table>
            </div>
            <div>
              <div>到位资金</div>
              <table class="detail-info-desc">
                <tr>
                  <td><label>中央投资：</label><span>{{ monthPaperForm.availableCentralInvestment }}</span></td>
                  <td><label>省级投资：</label><span>{{ monthPaperForm.availableProvincialInvestment }}</span></td>
                  <td><label>市县投资：</label><span>{{ monthPaperForm.availableLocalInvestment }}</span></td>
                  <td></td>
                </tr>
              </table>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item
          title="工程量情况"
          name="2"
          class=""
        >
          <div class="detail-investment info-item">
            <div>
              <table class="detail-info-desc">
                <tr>
                  <td><label>土石方明挖：</label><span>{{ monthPaperForm.openDug }}</span></td>
                  <td><label>土石方洞挖：</label><span>{{ monthPaperForm.holeDug }}</span></td>
                  <td><label>土石方回填：</label><span>{{ monthPaperForm.backfill }}</span></td>
                  <td><label>灌浆：</label><span>{{ monthPaperForm.grout }}</span></td>
                </tr>
                <tr>
                  <td><label>砌石：</label><span>{{ monthPaperForm.masonry }}</span></td>
                  <td><label>混泥土：</label><span>{{ monthPaperForm.concrete }}</span></td>
                  <td><label>钢筋：</label><span>{{ monthPaperForm.rebar }}</span></td>
                </tr>
              </table>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item
          title="项目情况"
          name="3"
        >
          <div class="detail-investment info-item">
            <div>
              <table class="detail-info-desc management">
                <tr>
                  <td><label>劳动力投入（万工日）：</label></td>
                  <td colspan="4"><span>{{ monthPaperForm.labourForce }}</span></td>
                </tr>
                <tr>
                  <td><label>主要建设内容：</label></td>
                  <td colspan="4"><span>{{ monthPaperForm.constructionContent }}</span></td>
                </tr>
                <tr>
                  <td><label>工程形象进度及节点工期：</label></td>
                  <td><span>{{ monthPaperForm.visualProgress }}</span></td>
                </tr>
                <tr>
                  <td><label>存在困难及问题：</label></td>
                  <td><span>{{ monthPaperForm.difficulty }}</span></td>
                </tr>
                <tr>
                  <td><label>采取的主要措施：</label></td>
                  <td><span>{{ monthPaperForm.measure }}</span></td>
                </tr>
                <tr>
                  <td><label>下一步建议：</label></td>
                  <td><span>{{ monthPaperForm.suggestion }}</span></td>
                </tr>
                <tr>
                  <td><label>其他：</label></td>
                  <td><span>{{ monthPaperForm.remark }}</span></td>
                </tr>
              </table>
            </div>
          </div>
        </el-collapse-item>
        <!--  <el-collapse-item title="附件" name="4">
                    <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
                    <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
                </el-collapse-item> -->
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
    props: ['projectMonthlyReportId'],
    data() {
        return {
            activeNames: ['1'],
            monthPaperForm: {
                civilEngineering: '', // 建筑工程
                electromechanicalEquipment: '', // 机电设备及安装工程
                metalMechanism: '', // 金属机构设备及安装工程
                temporaryWork: '', // 施工临时工程
                independentCost: '', // 独立费用
                resettlementArrangement: '', // 建设征地移民安置补偿费
                waterConservation: '', // 水土保持工程投资
                environmentalProtection: '', // 环境保护工程投资
                otherCost: '', // 其他
                sourceCentralInvestment: '', // 资金来源--中央投资
                sourceProvincialInvestment: '', // 资金来源--省级投资
                sourceLocalInvestment: '', // 资金来源--市县投资
                availableCentralInvestment: '', // 资金到位--中央投资
                availableProvincialInvestment: '', // 资金到位--省级投资
                availableLocalInvestment: '', // 资金到位--市县投资
                openDug: '', // 土石方明挖
                holeDug: '', // 土石方洞挖
                backfill: '', // 土石方回填
                masonry: '', // 砌石
                concrete: '', // 混凝土
                rebar: '', // 钢筋
                grout: '', // 灌浆
                labourForce: '' // 劳动力
            },
            month: '',
            submitDate: '',
            reservoir: this.$store.state.reservoir
        }
    },
    watch: {
        projectMonthlyReportId(curValue, oldValue) {
            if (curValue) {
                let projectMonthlyReportId = curValue
                this.getProjectMonthlyReportByProjectMonthlyReportid(projectMonthlyReportId).then(res => {
                    let date = new Date(res.data.submitDate.replace(/-/g, '/'))
                    this.month = date.getMonth() + 1
                    this.submitDate = res.data.submitDate
                    this.monthPaperForm = res.data
                    this.attachmentData = this.getFiles(res.data.projectMonthlyReportFiles)
                })
            }
        }
    },
    methods: {
        getProjectMonthlyReportByProjectMonthlyReportid(projectMonthlyReportId) {
            let thisRequest = this.$http.get(`/api/pmr/management/${projectMonthlyReportId}`)
            return thisRequest
        },
        /**
         *  附件下载
         */
        downloadFile(addr) {
            let Base64 = require('js-base64').Base64
            let strBase = Base64.encode(Base64.encode(addr))
            let url = location.origin + '/api/download/' + strBase
            window.open(url, '_self')
        },
        getFiles(files) {
            files.map(item => {
                let url = item.fileAddr
                let type = url.substr(url.lastIndexOf('.') + 1)
                if (type === 'xls' || type === 'xlsx') {
                    item.icon = 'fa-file-excel-o'
                } else if (type === 'pdf') {
                    item.icon = 'fa-file-pdf-o'
                } else {
                    item.icon = 'fa-file-archive-o'
                }
                item.name = url.substr(url.lastIndexOf('/') + 1)
                return item
            })
            return files
        }
    },
    mounted() {
        let projectMonthlyReportId = this.projectMonthlyReportId
        this.getProjectMonthlyReportByProjectMonthlyReportid(projectMonthlyReportId).then(res => {
            let date = new Date(res.data.submitDate.replace(/-/g, '/'))
            /* let dateStr = res.data.submitDate.substr(0, res.data.submitDate.indexOf('T'))
            let date = new Date(dateStr.replace('-', '/')) */
            this.month = date.getMonth() + 1
            // this.submitDate = date.toISOString().substr(0, 10) + ' ' + date.toTimeString().substr(0, 8)
            this.submitDate = res.data.submitDate
            this.monthPaperForm = res.data
            this.attachmentData = this.getFiles(res.data.projectMonthlyReportFiles)
        })
    }
}
</script>
