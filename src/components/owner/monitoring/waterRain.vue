<template>
  <div class="water-rain">
    <div class="title page-title"><span>水雨情</span></div>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-date-picker v-model="selectedDate"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        @change="dateChange"
                        ref="datePicker">
        </el-date-picker>
      </el-col>
      <el-col :span="24"
              id="chart1">
        <div id="rain_fall"
             style="width:100%;height:300px;"></div>
      </el-col>
      <el-col :span="24"
              id="chart2">
        <div id="water_height"
             style="width:100%;height:300px;"></div>
      </el-col>
      <el-col :span="24"
              id="chart3">
        <div id="water_flow"
             style="width:100%;height:300px;"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  data() {
    let today = new Date()
    let todayStr = today.toISOString().substring(0, 10) + ' ' + today.toTimeString().substring(0, 8)
    let yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)
    let yesterdayStr = yesterday.toISOString().substring(0, 10) + ' ' + yesterday.toTimeString().substring(0, 8)
    return {
      rainFall: '',
      waterLevel: '',
      selectedDate: [yesterdayStr, todayStr],
      baseInfoId: ''
    }
  },
  /*  watch: {
     '$store.state.AXIOS_NUMBER'(curValue, oldValue) {
       curValue === 0 && this.initAllChart()
     }
   }, */
  methods: {
    dateChange(dateList) {
      this.getAllRainFallData(this.baseInfoId).then(res => {
        let rainData = res.data
        let thisRainData = this.rainSituationDataFun(rainData, 'tm', 'drp')
        this.initRainChart(thisRainData, 'rain_fall', '降雨量', '雨量值(mm)')
      })
      this.getAllWaterLevelData(this.baseInfoId).then(res => {
        let waterData = res.data
        let thisWaterData = this.otherDataFun(waterData)
        this.initRainChart(thisWaterData.waterHeightData, 'water_height', '水位', '水位(m)')
        this.initRainChart(thisWaterData.waterFlowData, 'water_flow', '流量', '流量(m3/s)')
      })
    },
    /**
     *  获取水雨情信息---降雨量
     */
    getAllRainFallData() {
      let dateRange = this.selectedDate
      let thisRequest = this.$http.get('/api/communication/getallrainfalldata', {
        params: {
          baseInfoId: this.baseInfoId,
          startTime: dateRange[0],
          endTime: dateRange[1]
        },
        loading: { target: '#chart1' }
      })
      return thisRequest
    },
    /**
     *  获取水雨情信息---水位、流量
     */
    getAllWaterLevelData() {
      let dateRange = this.selectedDate
      let thisRequest = this.$http.get('/api/communication/getallwaterleveldata', {
        params: {
          baseInfoId: this.baseInfoId,
          startTime: dateRange[0],
          endTime: dateRange[1]
        },
        loading: { target: '#chart2, #chart3' }
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
      rainEchart.setOption(option, true)
    },
    initAllChart() {
      this.rainFall.then(res => {
        let rainData = res.data
        let thisRainData = this.rainSituationDataFun(rainData, 'tm', 'drp')
        this.initRainChart(thisRainData, 'rain_fall', '降雨量', '雨量值(mm)')
      })
      this.waterLevel.then(res => {
        let waterData = res.data
        let thisWaterData = this.otherDataFun(waterData)
        this.initRainChart(thisWaterData.waterHeightData, 'water_height', '水位', '水位(m)')
        this.initRainChart(thisWaterData.waterFlowData, 'water_flow', '流量', '流量(m3/s)')
      })
    }
  },
  mounted() {
    // 获取localStorage中水库信息
    let Base64 = require('js-base64').Base64
    let reservoirCode = window.localStorage.RESERVOIR
    // this.getMyBaseInfo()
    // let baseInfoId = '8A808281-6458-AB31-0164-58AB4EF70143'
    if (reservoirCode) {
      let reservoirStr = Base64.decode(reservoirCode)
      let reservoir = JSON.parse(reservoirStr)
      let baseInfoId = reservoir.baseInfoId
      this.baseInfoId = baseInfoId
      this.rainFall = this.getAllRainFallData()
      this.waterLevel = this.getAllWaterLevelData()
      this.initAllChart()
    }
  }
}
</script>
