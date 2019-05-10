<template>
  <div class="water-rain">
    <div class="operation-block">
      <div>
        <label>时间段：</label>
        <el-date-picker v-model="time"
                        type="datetimerange"
                        :picker-options="pickerOptions"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd HH:mm:ss">
        </el-date-picker>
      </div>
      <div class="water-rain-info">
        <span>总降雨量：</span>
        <span>50mm</span>
      </div>
    </div>
    <div class="rain-fall">
      <div id="rain_fall"
           style="width: 100%; height: 300px;"></div>
    </div>
    <div class="water-stage">
      <div id="water_stage"
           style="width: 100%; height: 300px;"></div>
    </div>
    <div class="flow-rate">
      <div id="flow_rate"
           style="width: 100%; height: 300px;"></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  props: ['baseInfoId'],
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      time: [],
      rain_fall: '',
      water_stage: '',
      flow_rate: ''
    }
  },
  watch: {
    time: {
      handler(curTime, oldTime) {
        this.$nextTick(() => {
          this.timeChange()
        })
      },
      deep: true
    },
    '$store.state.expandMenu'(curValue, oldValue) {
      setTimeout(() => {
        this.rain_fall.resize()
        this.water_stage.resize()
        this.flow_rate.resize()
      }, 800)
    }
  },
  methods: {
    timeChange() {
      let date = this.time
      let _this = this
      let baseInfoId = this.baseInfoId
      let def1 = this.getAllRainFallData(baseInfoId, date)
      let def2 = this.getAllWaterLevelData(baseInfoId, date)
      Promise.all([def1, def2]).then(res => {
        let rainData = res[0].data
        let thisRainData = _this.rainSituationDataFun(rainData, 'tm', 'drp')
        _this.initRainChart(thisRainData, 'rain_fall', '降雨量', '雨量值(mm)')

        let waterData = res[1].data
        let thisWaterData = _this.otherDataFun(waterData)
        _this.$nextTick(() => {
          _this.initRainChart(thisWaterData.waterHeightData, 'water_stage', '水位', '水位(m)')
          _this.initRainChart(thisWaterData.waterFlowData, 'flow_rate', '流量', '流量(m3/s)')
        })
      })
    },
    getAllRainFallData(baseInfoId, date) {
      let seleteDate = this.time
      let thisRequest = this.$http.get('/api/communication/getallrainfalldata', {
        params: {
          baseInfoId: baseInfoId,
          startTime: seleteDate[0],
          endTime: seleteDate[1]
        }
      })
      return thisRequest
    },
    getAllWaterLevelData(baseInfoId, date) {
      let seleteDate = this.time
      let thisRequest = this.$http.get('/api/communication/getallwaterleveldata', {
        params: {
          baseInfoId: baseInfoId,
          startTime: seleteDate[0],
          endTime: seleteDate[1]
        }
      })
      return thisRequest
    },
    initRainChart(data, id, chartName, yName) {
      let rainEchart = echarts.init(document.getElementById(id))
      let option = {
        title: {
          text: chartName
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
      this[id] = rainEchart
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
            xAxisItem.push(itemData.tm)
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
            let thisDate = new Date(parseInt(itemData.tm))
            let thisDataStr = thisDate.toISOString().substring(1, 10) + ' ' + thisDate.toTimeString().substring(0, 8)
            // let thisDataStr = itemData.tm.substr(0, itemData.tm.indexOf('T'))
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
    }
  },
  created() {
    let nowTime = new Date()
    let startTime = nowTime.toISOString().substring(0, 10) + ' 00:00:00'
    let endTime = nowTime.toISOString().substring(0, 10) + ' ' + nowTime.toTimeString().substring(0, 8)
    this.time = [startTime, endTime]
  }
}
</script>
