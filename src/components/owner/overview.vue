<template>
  <div class="owner-overview">
    <el-row :gutter="20">
      <el-col :lg="6"
              :md="6"
              :xs="24"
              class="reservoir-info">
        <div class="reservoir-desc">
          <div class="title">
            <span>{{ reservoir.plantName }}</span>
            <span v-if="showLabel">
              当前阶段：{{ stateType }}
              <i class="el-icon-edit"
                 @click="changeState"></i>
            </span>
            <span v-else>
              <el-select v-model="stateId"
                         placeholder="请选择"
                         ref="stateSelection">
                <el-option v-for="item in options"
                           :key="item.stateId"
                           :label="item.type"
                           :value="item.stateId">
                </el-option>
              </el-select>
              <i class="el-icon-back"
                 @click="cancleChangeState"></i>
            </span>
          </div>
          <div>
            <!-- <img src="static/images/wallpaper.jpg"
                 alt=""
                 style="width:100%;"
                 @click.stop.prevent="showFullImg('static/images/wallpaper.jpg')"> -->
            <el-carousel trigger="click"
                         height="200px">
              <el-carousel-item v-for="(item, index) in imgs"
                                :key="index">
                <div class="slide-show">
                  <img :src="item.url"
                       alt=""
                       @click.stop.prevent="showFullImg(item.url)">
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="desc-detail">
            <div>
              <label>法人：</label>
              <span :title="reservoir.legalRepresentativeName">{{ reservoir.legalRepresentativeName }}</span>
            </div>
            <div>
              <label>坝型：</label>
              <span :title="reservoir.damType">{{ reservoir.damType }}</span>
            </div>
            <div>
              <label>规模：</label>
              <span>{{ reservoir.scale || '（无）' }}</span>
            </div>
            <div>
              <label>项目状态：</label>
              <span>{{ reservoir.state || '（无）' }}</span>
            </div>
            <div>
              <label>工程任务：</label>
              <span>{{ reservoir.projectTask || '（无）' }}</span>
            </div>
            <div>
              <label>水库概要：</label>
              <span>{{ reservoir.overview || '（无）' }}</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :lg="12"
              :md="12"
              :xs="24">
        <el-row :gutter="20"
                class="notice-block">
          <div class="overview-notice">
            <div class="notice-title">
              <span>公告</span>
              <hr>
            </div>
            <div class="notice-content"
                 v-if="noticeList.length > 0">
              <div v-for="item in noticeList"
                   :key="item.announcementId">
                <a @click="skipTo(item)">{{ item.title }}</a>
                <div>
                  <span>{{ item.keyword }}</span>
                  <span><i class="el-icon-time"></i>{{ item.updateTime }}</span>
                </div>
              </div>
            </div>
          </div>
        </el-row>
        <el-row :gutter="20"
                class="chart-row">
          <div class="overview-title">实时监测</div>
          <el-col :lg="8"
                  :md="8"
                  :xs="24">
            <div id='rain_fall'
                 style="height:200px; width:100%"></div>
          </el-col>
          <el-col :lg="8"
                  :md="8"
                  :xs="24">
            <div id='water_height'
                 style="height:200px; width:100%"></div>
          </el-col>
          <el-col :lg="8"
                  :md="8"
                  :xs="24">
            <div id='water_flow'
                 style="height:200px; width:100%"></div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :lg="6"
              :md="6"
              :xs="24">
        <calendar @clickMonth="clickMonth"
                  :yearMonth="projectPaperDate"></calendar>
      </el-col>
      <el-col :lg="6"
              :md="6"
              :xs="24"
              class="reservoir-info">
        <div class="conveniency-access">
          <div><i class="fa fa-sign-in"></i> 便捷入口</div>
          <el-button type="primary"
                     icon="fa fa-database fa-3x"
                     @click="$router.push({path: '/projectprepare/projectoverview'})"> 基础信息</el-button>
          <!-- <router-link to='/projectprepare/projectoverview'><button>点我到第二个页面</button></router-link> -->
          <!-- <el-button type="info"
                     icon="fa fa-folder-open-o fa-3x"
                     @click="$router.push({path: '/projectprepare/preparetask'})">资金申请</el-button> -->
          <el-button type="success"
                     icon="fa fa-jpy fa-3x"
                     @click="$router.push({path: '/investmentfinancing'})"> 资金申请</el-button>
          <el-button type="warning"
                     icon="fa fa-pencil-square-o fa-3x"
                     @click="$router.push({path: '/monthpaper/add'})"> 月报填写</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from 'echarts'
import calendar from '../widget/calendar'

export default {
  components: {
    calendar
  },
  watch: {
    '$store.state.AXIOS_NUMBER' (curValue, oldValue) {
      if (curValue === 0) {
        this.loadWaterRainInfo()
      }
    },
    stateId (curValue, oldValue) {
      if (curValue > oldValue) {
        this.$confirm('此操作不可逆，请谨慎操作。 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get(`/api/baseinfo/updatePlantState?stateId=${curValue}`, { headers: { withoutLoading: true } }).then(res => {
            if (res.code === 1002) {
              this.stateType = this.$refs.stateSelection.selectedLabel
              this.showLabel = true
            } else {
              this.$message.error(res.msg)
            }
          })
        }).catch(() => {
          this.stateId = oldValue
        })
      }
    }
  },
  data () {
    return {
      noticeList: [],
      pagerOp: {
        pageNum: 1,
        pageSize: 10
      },
      reservoir: '',
      imgs: [{
        url: 'static/images/wallpaper.jpg'
      }, {
        url: 'static/images/4.png'
      }],
      projectPaperDate: {},
      projectPaper: {},
      rainFall: '',
      waterLevel: '',
      showLabel: true,
      options: [],
      stateId: '',
      stateType: ''
    }
  },
  methods: {
    changeState () {
      this.showLabel = false
      this.$http.get('/api/baseinfo/getAvailablePlantStates', { headers: { withoutLoading: true } }).then(res => {
        if (res.code === 1002) {
          this.options = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    cancleChangeState () {
      this.showLabel = true
      this.stateId = ''
    },
    // 全屏图片
    showFullImg (url) {
      let param = {
        flag: true,
        url: url
      }
      this.$store.dispatch('setShowImg', param)
    },
    getAnnouncements (pagerOp) {
      let thisRequest = this.$http.post('/api/announcement/page', pagerOp)
      return thisRequest
    },
    getCurrentDate () {
      let date = new Date()
      let fullDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
      let startTime = fullDate + ' 00:00:00'
      let endTime = fullDate + ' 23:59:59'
      return {
        startTime: startTime,
        endTime: endTime
      }
    },
    skipTo (item) {
      this.$router.push({ name: '公告展示', params: { announcementId: item.announcementId } })
    },
    getMyBaseInfo (Base64) {
      this.$http.get('/api/user/mybaseinfo').then(res => {
        if (res.code === 1002) {
          let reservoir = res.data
          this.reservoir = reservoir
          window.localStorage.RESERVOIR = Base64.encode(JSON.stringify(reservoir))
          let plantStateVO = reservoir.plantStateVO
          this.stateType = plantStateVO.type
          // this.stateId = plantStateVO.type
        } else {
          window.localStorage.RESERVOIR = ''
        }
      })
    },
    /**
     *  获取水雨情信息---降雨量
     */
    getAllRainFallData (baseInfoId) {
      let currentHalfHour = this.getCurrentDate()
      let thisRequest = this.$http.get('/api/communication/getallrainfalldata', {
        params: {
          baseInfoId: baseInfoId,
          startTime: currentHalfHour.startTime,
          endTime: currentHalfHour.endTime
        }
      })
      return thisRequest
    },
    /**
     *  获取水雨情信息---水位、流量
     */
    getAllWaterLevelData (baseInfoId) {
      let currentHalfHour = this.getCurrentDate()
      let thisRequest = this.$http.get('/api/communication/getallwaterleveldata', {
        params: {
          baseInfoId: baseInfoId,
          startTime: currentHalfHour.startTime,
          endTime: currentHalfHour.endTime
        }
      })
      return thisRequest
    },
    /**
     *  水位、流量数据处理
     */
    otherDataFun (data) {
      let xAxisData = []
      let seriesHeightData = []
      let serierFlowData = []
      let legendData = []
      data.map((n, i) => {
        if (n.data && n.data.length > 0) {
          legendData.push(n.name)
          let seriesHeightItem = []
          let serierFlowItem = []
          let xAxisItem = []
          n.data.map((itemData, index) => {
            seriesHeightItem.push(itemData.z)
            serierFlowItem.push(itemData.q)
            let thisDate = new Date(parseInt(itemData.tm))
            // let thisDataStr = thisDate.toISOString().substring(0, 10) + ' ' + thisDate.toTimeString().substring(0, 8)
            let thisDataStr = thisDate.toTimeString().substring(0, 5)
            // let thisDataStr = itemData.tm
            xAxisItem.push(thisDataStr)
          })
          seriesHeightData.push({
            name: n.name,
            type: 'line',
            smooth: true,
            showSymbol: false,
            data: seriesHeightItem
          })
          serierFlowData.push({
            name: n.name,
            type: 'line',
            smooth: true,
            showSymbol: false,
            data: serierFlowItem
          })
          if (xAxisData.length === 0) {
            xAxisData = xAxisItem
          }
        }
      })
      let waterHeightData = { legendData: legendData, xAxisData: xAxisData, seriesData: seriesHeightData }
      let waterFlowData = { legendData: legendData, xAxisData: xAxisData, seriesData: serierFlowData }
      return { waterHeightData: waterHeightData, waterFlowData: waterFlowData }
    },
    /**
     *  降雨量数据处理
     */
    rainSituationDataFun (data, xAxisKey, seriesKey) {
      let xAxisData = []
      let seriesData = []
      let legendData = []
      data.map((n, i) => {
        if (n.data && n.data.length > 0) {
          legendData.push(n.name)
          let seriesItem = []
          let xAxisItem = []
          n.data.map((itemData, index) => {
            seriesItem.push(itemData.drp)
            xAxisItem.push(itemData.tm.substring(11, 16).replace(/-/g, ':'))
          })
          seriesData.push({
            name: n.name,
            type: 'line',
            smooth: true,
            showSymbol: false,
            data: seriesItem
          })
          if (xAxisData.length === 0) {
            xAxisData = xAxisItem
          }
        }
      })
      return { legendData: legendData, xAxisData: xAxisData, seriesData: seriesData }
    },
    initRainChart (data, id, chartName, yName) {
      let rainEchart = echarts.init(document.getElementById(id))
      let option = {
        title: {
          text: chartName,
          textStyle: {
            color: '#666',
            fontSize: 12,
            align: 'center'
          }
        },
        legend: {
          data: data.legendData,
          show: false
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '4%',
          right: '5%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          // name: '时段',
          type: 'category',
          boundaryGap: false,
          data: data.xAxisData
        },
        yAxis: {
          type: 'value',
          name: yName,
          min: function (value) {
            return (value.min - 10 > 0) ? value.min - 10 : 0
          },
          axisLabel: {
            formatter: function (value, index) {
              return value.toFixed(2)
            }
          }
        },
        series: data.seriesData
      }
      rainEchart.setOption(option)
    },
    // 获取所有月报信息
    getAllMonthPaper () {
      this.$http.get('/api/pmr/perall').then(res => {
        if (res.code === 1002) {
          let papers = res.data
          let year = []
          let year_month = {}
          let month_paper = {}
          papers.map(item => {
            let date = new Date(item.submitDate.replace(/-/g, '/'))
            let _year = date.getFullYear()
            let index = year.indexOf(_year)
            if (index > -1) {
              year_month[_year].push(date.getMonth() + 1)
              month_paper[_year].push(item)
            } else {
              year.push(_year)
              year_month[_year] = [date.getMonth() + 1]
              month_paper[_year] = [item]
            }
          })
          this.projectPaperDate = year_month
          this.projectPaper = month_paper
        } else {
          this.$message.error(res.msg || res.content)
        }
      })
    },
    // 点击日历月份跳转到月报信息
    clickMonth (data) {
      if (!data.flag) {
        this.$router.push({ name: '月报填写', params: { createDate: data.date } })
      } else {
        let date = new Date(data.date.replace(/-/g, '/'))
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let param = this.projectPaper[year][this.projectPaperDate[year].indexOf(month)]
        this.$router.push({ name: '月报详情', params: { monthPaper: param } }) //  monthPaper为月报信息对象含projectMonthlyReportId
      }
      // this.$router.push({ name: '月报详情', params: { monthPaper: {} } }) //  monthPaper为月报信息对象含projectMonthlyReportId
    },
    // 加载水雨情信息
    loadWaterRainInfo () {
      this.rainFall.then(res => {
        let rainData = res.data
        let thisRainData = this.rainSituationDataFun(rainData, 'tm', 'drp')
        this.rainData = thisRainData
        this.initRainChart(thisRainData, 'rain_fall', '降雨量', '雨量值(mm)')
      })
      this.waterLevel.then(res => {
        let waterData = res.data
        let thisWaterData = this.otherDataFun(waterData)
        this.waterData = thisWaterData
        this.initRainChart(thisWaterData.waterHeightData, 'water_height', '水位', '水位(m)')
        this.initRainChart(thisWaterData.waterFlowData, 'water_flow', '流量', '流量(m3/s)')
      })
    }
  },
  mounted () {
    // 获取月报信息
    this.getAllMonthPaper()
    // 获取公告信息
    this.getAnnouncements(this.pagerOp).then(res => {
      this.noticeList = res.data.list
    })
    this.getMyBaseInfo(this.Base64)
    // 获取localStorage中水库信息
    let reservoirCode = window.localStorage.RESERVOIR
    // this.getMyBaseInfo()
    // let baseInfoId = '8A808281-6458-AB31-0164-58AB4EF70143'
    if (reservoirCode) {
      let reservoirStr = this.Base64.decode(reservoirCode)
      let reservoir = JSON.parse(reservoirStr)
      let baseInfoId = reservoir.baseInfoId
      this.rainFall = this.getAllRainFallData(baseInfoId)
      this.waterLevel = this.getAllWaterLevelData(baseInfoId)
    }
  }
}
</script>

<style scoped>
.reservoir-desc > .title {
  position: relative;
}
.reservoir-desc > .title > span:last-child {
  font-size: 12px;
  display: block;
  font-weight: normal;
  position: absolute;
  top: 18px;
  right: 10px;
}
.reservoir-desc > .title > span:last-child > i {
  border-radius: 10px;
  padding: 3px;
  background: #4d7b8f;
  color: #fff;
}
.reservoir-desc > .title > span:last-child > i:hover {
  cursor: pointer;
  background: #0fb6ff;
}
</style>

<style>
.reservoir-desc > .title > span:last-child > .el-select {
  width: 120px !important;
  height: 20px !important;
}
.reservoir-desc > .title > span:last-child > .el-select input {
  height: 20px !important;
  font-size: 12px !important;
}
</style>
