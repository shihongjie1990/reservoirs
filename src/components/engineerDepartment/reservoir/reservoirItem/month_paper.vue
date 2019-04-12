<template>
  <div class="month-paper">
    <div class="monthpaper-score">
      <span>月报总分</span>
      <div>
        <span>{{ monthPaperScore || '00' }}</span>
      </div>
      <span>分</span>
    </div>
    <div class="operation-block">
      <label>年份：</label>
      <el-date-picker v-model="year"
                      type="year"
                      placeholder="选择年份"
                      :picker-options="pickerOptions"
                      @change="changeDate"
                      value-format="yyyy">
      </el-date-picker>
    </div>
    <div class="month-block"
         v-if="monthList && monthList.length>0">
      <label>月份：</label>
      <el-button type="info"
                 size="small"
                 plain
                 v-for="(item, index) in monthList"
                 :class="{active: focus == index}"
                 :key="index"
                 @click="selectMonth(item, index)">{{item.month}}月</el-button>
      <!-- <a v-for="(item, index) in monthList" :key="index" @click="selectMonth(item)">{{item.month}}月</a> -->
    </div>
    <el-tabs type="border-card"
             v-if="projectMonthlyReportId && monthList && monthList.length>0"
             style="margin-top:20px;">
      <el-tab-pane label="详情">
        <month-paper-detail :projectMonthlyReportId="projectMonthlyReportId"></month-paper-detail>
      </el-tab-pane>
      <el-tab-pane label="Excel">
        <div id="out-table"
             v-if="tableData.length > 0">
          <div class="month-paper-operation">
            <el-button type="primary"
                       size="mini"
                       @click="onExport">导出Excel</el-button>
          </div>
          <table class="paper-table">
            <tr>
              <td>I.代 码</td>
              <td>II．指 标 名 称</td>
              <td>III．计 量 单 位</td>
              <td>IV．本 月</td>
              <td>V．本 年 累 计</td>
              <td>VI．开 工 累 计</td>
            </tr>
            <tr v-for="(row, index) in tableData"
                :key="index">
              <td v-for="(ceil, i) in row"
                  :key="i">{{ceil}}</td>
            </tr>
          </table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import monthpaperdetail from './monthpaper_detail'

export default {
  props: ['baseInfoId', 'monthPaperScore'],
  components: {
    'month-paper-detail': monthpaperdetail
  },
  data() {
    return {
      year: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getFullYear() < 2018
        }
      },
      focus: null,
      tableData: [],
      monthList: [],
      attachmentData: [],
      activeNames: ['1'],
      projectMonthlyReportId: ''
    }
  },
  methods: {
    /**
     *  获取月报数据
     */
    getMonthlyReportExcelByProjectId(monthData) {
      /* let month = monthData.month
      if (month / 10 < 1) {
          month = 0 + '' + month
      } */
      let projectMonthlyReportId = monthData.projectMonthlyReportId
      let thisRequest = this.$http.get('/api/pmr/excel', {
        params: {
          id: projectMonthlyReportId
        }
      })
      return thisRequest
    },
    /**
     *  获取月报详情数据
     */
    getProjectMonthlyReportByProjectMonthlyReportid(projectMonthlyReportId) {
      let thisRequest = this.$http.get(`/api/pmr/management/${projectMonthlyReportId}`)
      return thisRequest
    },
    /**
     *  获取月份数据
     */
    getMonthlyReports(year) {
      let thisRequest = this.$http.get('/api/pmr/perall', {
        params: {
          baseInfoId: this.baseInfoId,
          startDate: year + '-01-01',
          endDate: year + '-12-31'
        }
      })
      return thisRequest
    },
    changeDate(value) {
      this.getMonthlyReports(value).then(res => {
        let monthData = res.data || []
        if (monthData && monthData.length > 0) {
          monthData.map(item => {
            let date = new Date(item.submitDate.replace(/-/g, '/'))
            /* let dateStr = item.submitDate.substr(0, item.submitDate.indexOf('T'))
            let date = new Date(dateStr.replace('-', '/')) */
            let month = date.getMonth() + 1
            let year = date.getFullYear()
            item.month = month
            item.year = year
          })
          monthData.sort((exp1, exp2) => {
            return exp1.month - exp2.month
          })
        } else {
          this.tableData = []
        }
        /* if (monthData && monthData.length > 0) {
            monthData.map((item, index) => {
                monthList.push({projectMonthlyReportId: item.projectMonthlyReportId, month: parseInt(item.month)})
            })
            monthList.sort((exp1, exp2) => {
                return exp1.month - exp2.month
            })
        } else {
            monthData = []
        } */
        this.monthList = monthData
      })
    },
    /**
     *  月份切换
     */
    selectMonth(monthData, index) {
      this.projectMonthlyReportId = monthData.projectMonthlyReportId
      this.getMonthlyReportExcelByProjectId(monthData).then(res => {
        // 附件信息
        let projectMonthlyReportImgs = monthData.projectMonthlyReportImgs
        if (projectMonthlyReportImgs && projectMonthlyReportImgs.length > 0) {
          projectMonthlyReportImgs.map(item => {
            let url = item.imgAddr
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
          this.attachmentData = projectMonthlyReportImgs
        } else {
          this.attachmentData = []
        }
        // 月报内容
        this.tableData = res.data
        this.focus = index
      })
      // this.tableData = monthData
    },
    /**
     *  附件下载
     */
    downloadFile(addr) {
      let url = location.origin + '/files/' + addr
      window.open(url, '_self')
    },
    /**
     *  excel导出
     */
    /* eslint-disable */
    onExport() {
      let wb = XLSX.utils.table_to_book(document.getElementById('out-table'))
      let wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' })
      saveAs(
        new Blob([this.s2ab(wbout)], { type: 'application/octet-stream' }),
        'sheetjs.xlsx'
      )
    },
    s2ab(str) {
      if (typeof ArrayBuffer !== 'undefined') {
        let buf = new ArrayBuffer(str.length)
        let view = new Uint8Array(buf)
        for (let i = 0; i !== str.length; i++) {
          view[i] = str.charCodeAt(i) & 0xff
        }
        return buf
      } else {
        let buf = new Array(str.length)
        for (let i = 0; i !== str.length; i++) {
          buf[i] = str.charCodeAt(i) & 0xff
        }
        return buf
      }
    },
    /* eslint-disable */
    getMonthPaperScore() {
      let thisRequest = this.$http.get('/api/statistic/pmrCompletion')
      return thisRequest
    }
  },
  mounted() {
    // this.changeDate()
    // this.selectMonth()
    let baseInfoId = this.baseInfoId
    let monthPaperScore = this.monthPaperScore
    if (!monthPaperScore) {
      this.getMonthPaperScore().then(res => {
        let scores = res.data
        let score = scores.find(item => {
          return item.baseInfoId === baseInfoId
        })
        this.monthPaperScore = score.score
      })
    }
  }
}
</script>
