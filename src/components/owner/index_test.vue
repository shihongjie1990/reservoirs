<template>
  <div class="owner-overview">
    <el-row :gutter="20">
      <el-col :lg="6"
              :md="6"
              :xs="24"
              class="reservoir-info">
        <div class="reservoir-desc">
          <div class="title">冉渡滩水库</div>
          <div>
            <img src="static/images/wallpaper.jpg"
                 alt=""
                 style="width:100%;">
          </div>
          <div class="desc-detail">
            <div>
              <label>法人：</label>
              <span>XXX</span>
            </div>
            <div>
              <label>规模：</label>
              <span>中II型</span>
            </div>
            <div>
              <label>项目状态：</label>
              <span>在建</span>
            </div>
            <div>
              <label>水库性质：</label>
              <span>灌溉水资源但是骄傲烦恼沙发算积分东岸价格哦啊单机构的四季风共商大计佛山等级佛is阿金沟is阿基德狗ID撒结构sgo附件扫金佛山圣诞节哦啊国剧盛典奇偶发郭劲松阿萨德解耦股搜到积分</span>
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
        <calendar @clickMonth="clickMonth"></calendar>
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
      this.$http.get('/api/baseinfo/mybaseinfo').then(res => {
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
    },
    // 点击日历月份跳转到月报信息
    clickMonth(value) {
      this.$router.push({ name: '月报填写', params: { createDate: value } })
      // this.$router.push({ name: '月报详情', params: { monthPaper: {} } }) //  monthPaper为月报信息对象含projectMonthlyReportId
    }
  },
  mounted() {

  }
}
</script>
