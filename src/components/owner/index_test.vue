<template>
  <div class="owner-overview">
    <el-row :gutter="20">
      <!-- <el-col :lg="18" :md="18" :xs="24">
                <div class="overview-operation">
                    <el-button type="primary" icon="fa fa-pencil-square-o fa-3x" @click="$router.push({path: '/projectprepare/add'})">项目填报</el-button>
                    <el-button type="info" icon="fa fa-folder-open-o fa-3x" @click="$router.push({path: '/projectprepare/preparetask'})">项目管理</el-button>
                    <el-button type="success" icon="fa fa-folder-open-o fa-3x" @click="$router.push({path: '/tenders'})">招标管理</el-button>
                    <el-button type="warning" icon="el-icon-edit-outline fa-3x" @click="$router.push({path: '/investmentfinancing'})">投资管理</el-button>
                </div>
            </el-col> -->
      <el-col :lg="18"
              :md="18"
              :xs="24"
              class="notice-block">
        <div class="overview-notice">
          <div class="notice-title">公告</div>
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
      </el-col>
      <el-col :lg="6"
              :md="6"
              :xs="24"
              class="reservoir-info">
        <div class="reservoir-simple-detail">
          <span>库</span>
          <div class="overview-detail">
            <div :title="reservoir.plantName">{{ reservoir.plantName }}</div>
            <div>
              <span>法人：</span>
              <span :title="reservoir.legalRepresentativeName"
                    class="owner-person">{{ reservoir.legalRepresentativeName }}</span>
            </div>
            <div>
              <span>规模：</span>
              <span>{{ reservoir.scale || '（无）' }}</span>
            </div>
            <!-- <div>
                            <span>等级：</span>
                            <span>Ⅳ</span>
                        </div> -->
            <div>
              <span>项目状态：</span>
              <span>{{ reservoir.state || '（无）' }}</span>
            </div>
          </div>
        </div>
        <div class="conveniency-access">
          <div><i class="fa fa-sign-in"></i> 便捷入口</div>
          <el-button type="primary"
                     icon="fa fa-pencil-square-o fa-3x"
                     @click="adjustProjectInfo">项目填报</el-button>
          <el-button type="info"
                     icon="fa fa-folder-open-o fa-3x"
                     @click="$router.push({path: '/projectprepare/preparetask'})">项目管理</el-button>
          <el-button type="success"
                     icon="fa fa-folder-o fa-3x"
                     @click="$router.push({path: '/tenders'})">招标管理</el-button>
          <el-button type="warning"
                     icon="fa  fa-files-o fa-3x"
                     @click="$router.push({path: '/investmentfinancing'})">投资管理</el-button>
        </div>
      </el-col>
      <!-- <el-col :lg="6" :md="6" :xs="24" class="chart-col">
                <div id='rain_fall'></div>
                <div id='water_height'></div>
                <div id='water_flow'></div>
            </el-col> -->
    </el-row>
    <el-row :gutter="20"
            class="chart-row">
      <div class="overview-title">水雨情</div>
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
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  data() {
    return {
      noticeList: [],
      pagerOp: {
        pageNum: 1,
        pageSize: 10
      },
      reservoir: ''
    }
  },
  methods: {
    getAnnouncements(pagerOp) {
      let thisRequest = this.$http.post('/api/announcement/page', pagerOp)
      return thisRequest
    },
    getCurrentDate() {
      let date = new Date()
      let fullDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
      let startTime = fullDate + ' 00:00:00'
      let endTime = fullDate + ' 23:59:59'
      return {
        startTime: startTime,
        endTime: endTime
      }
    },
    skipTo(item) {
      this.$router.push({ name: '公告展示', params: { announcementId: item.announcementId } })
    },
    getMyBaseInfo(Base64) {
      this.$http.get('/api/user/mybaseinfo').then(res => {
        if (res.code === 1002) {
          let reservoir = res.data
          this.reservoir = reservoir
          window.localStorage.RESERVOIR = Base64.encode(JSON.stringify(reservoir))
        } else {
          window.localStorage.RESERVOIR = ''
        }
      })
    },
    /**
     *  获取水雨情信息---降雨量
     */
    getAllRainFallData(baseInfoId) {
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
    getAllWaterLevelData(baseInfoId) {
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
    otherDataFun(data) {
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
            // let thisDate = new Date(parseInt(itemData.tm))
            // let thisDataStr = thisDate.toTimeString().substring(0, 8)
            let thisDataStr = itemData.tm
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
    rainSituationDataFun(data, xAxisKey, seriesKey) {
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
            xAxisItem.push(itemData.tm.substring(11))
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
    initRainChart(data, id, chartName, yName) {
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
    adjustProjectInfo() {
      let reservoir = this.reservoir
      if (reservoir) {
        this.$alert('基本资料已填报，请勿重复填报！', '提示', { type: 'info' })
      } else {
        this.$router.push('/projectprepare/add')
      }
    }
  },
  mounted() {
    let Base64 = require('js-base64').Base64
    let reservoirCode = window.localStorage.RESERVOIR
    // this.getMyBaseInfo()
    // let baseInfoId = '8A808281-6458-AB31-0164-58AB4EF70143'
    if (reservoirCode) {
      let reservoirStr = Base64.decode(reservoirCode)
      let reservoir = JSON.parse(reservoirStr)
      let baseInfoId = reservoir.baseInfoId
      this.getAllRainFallData(baseInfoId).then(res => {
        let rainData = res.data
        let thisRainData = this.rainSituationDataFun(rainData, 'tm', 'drp')
        this.initRainChart(thisRainData, 'rain_fall', '降雨量', '雨量值(mm)')
      })
      this.getAllWaterLevelData(baseInfoId).then(res => {
        let waterData = res.data
        let thisWaterData = this.otherDataFun(waterData)
        this.initRainChart(thisWaterData.waterHeightData, 'water_height', '水位', '水位(m)')
        this.initRainChart(thisWaterData.waterFlowData, 'water_flow', '流量', '流量(m3/s)')
      })
    }
    this.getAnnouncements(this.pagerOp).then(res => {
      this.noticeList = res.data.list
    })
    this.getMyBaseInfo(Base64)
  }
}
</script>
