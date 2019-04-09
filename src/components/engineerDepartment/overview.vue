<template>
  <div class="one-map">
    <div id='allmap'></div>
    <div class='filter-search'>
      <!-- <el-switch v-model="value4" active-text="按月付费" inactive-text="按年付费">
            </el-switch> -->
      <el-dropdown @command='switchSelect'>
        <span class='el-dropdown-link'>{{selectType}}<i class="el-icon-arrow-down el-icon--right"></i></span>
        <el-dropdown-menu slot='dropdown'>
          <el-dropdown-item command='filter'>筛选</el-dropdown-item>
          <el-dropdown-item command='search'>搜索</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>|</span>
      <div class='filter-block'
           v-if='showFilterBlock'>
        <span>市(州)：</span>
        <!-- 备用 -->
        <div class='el-dropdown'
             v-if='!citys || citys.length === 0'>
          <span class='el-dropdown-link'>(无)</span>
        </div>
        <el-dropdown v-if='citys.length>0'
                     @command='selectCity'>
          <span class='el-dropdown-link'>{{city}}<i class="el-icon-arrow-down el-icon--right"></i></span>
          <el-dropdown-menu slot='dropdown'>
            <el-dropdown-item v-for="item in citys"
                              :command='item.regionId'
                              :key='item.regionCode'>{{item.regionName}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- <el-select v-model="city" size='mini' placeholder="请选择" v-if='citys.length>0'>
                    <el-option v-for="item in citys" :key="item.regionCode" :label="item.regionName" :value="item.regionId">
                    </el-option>
                </el-select> -->
        <span>县(区)：</span>
        <!-- 备用 -->
        <div class='el-dropdown'
             v-if='!countrys || countrys.length === 0'>
          <span class='el-dropdown-link'>(无)</span>
        </div>
        <el-dropdown v-if='countrys.length>0'
                     @command='selectCountry'>
          <span class='el-dropdown-link'>{{country}}<i class="el-icon-arrow-down el-icon--right"></i></span>
          <el-dropdown-menu slot='dropdown'>
            <el-dropdown-item v-for="item in countrys"
                              :command='item.regionId'
                              :key='item.regionCode'>{{item.regionName}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>水库：</span>
        <!-- 备用 -->
        <div class='el-dropdown'
             v-if='!reservoirs || reservoirs.length === 0'>
          <span class='el-dropdown-link'>(无)</span>
        </div>
        <el-dropdown v-if='reservoirs.length>0'
                     @command='selectReservoir'>
          <span class='el-dropdown-link'>{{reservoir}}<i class="el-icon-arrow-down el-icon--right"></i></span>
          <el-dropdown-menu slot='dropdown'>
            <el-dropdown-item v-for="item in reservoirs"
                              :command='item.baseInfoId'
                              :key='item.baseInfoId'>{{item.plantName}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class='search-block'
           v-if='!showFilterBlock'>
        <el-input placeholder='请输入水库名称'
                  v-model='reservoirName'
                  @keyup.native.enter.stop='searchReservoir'></el-input>
        <i class='el-icon-search'
           @click='searchReservoir'></i>
      </div>
    </div>
    <transition name='fade-right'>
      <div class='marker-chart marker-chart1'
           v-if='showReservoirDetail'>
        <div id='rain_fall'
             class='overview-rainfall'></div>
        <!-- <div id='reservoir_chart1' class='reservoir-chart'></div>
                <div class='chart-info info1'>
                    <div>中央累计拨付</div>
                    <div>
                        <span>￥</span>
                        <span>2100000</span>
                    </div>
                    <div>当前累计拨付</div>
                    <div>
                        <span>￥</span>
                        <span>2100000</span>
                    </div>
                </div> -->
        <!-- 三角箭头 -->
        <!-- <div class='chart1 triangle'></div> -->
      </div>
    </transition>
    <transition name='fade-right'>
      <div class='marker-chart marker-chart3'
           v-if='showReservoirDetail'>
        <div id='water_height'
             class='overview-rainfall'></div>
      </div>
    </transition>
    <transition name='fade-right'>
      <!-- <div class='marker-chart chart3'>
            <div id='reservoir_chart3' class='reservoir-chart'></div>
        </div> -->
      <div class='marker-chart marker-chart2'
           v-if='showReservoirDetail'>
        <div id='water_flow'
             class='overview-rainfall'></div>
        <!-- <div id='reservoir_chart2' class='reservoir-chart'></div>
                <div class='chart-info info2'>
                    <div>中央累计拨付</div>
                    <div>
                        <span>￥</span>
                        <span>2100000</span>
                    </div>
                    <div>当前累计拨付</div>
                    <div>
                        <span>￥</span>
                        <span>2100000</span>
                    </div>
                </div> -->
        <!-- 三角箭头 -->
        <!-- <div class='chart2 triangle'></div> -->
      </div>
    </transition>
    <transition name='slide-fade'>
      <div class='marker-info'
           v-if='showReservoirDetail'>
        <!-- 三角箭头 -->
        <!-- <div class='info triangle'></div> -->
        <div class='overview-close'
             @click='showReservoirDetail = false'>x</div>
        <label class='info-header'>{{infoData.plantName}}</label>
        <div>
          <label>水库规模：</label>
          <span>{{infoData.scale}}</span>
        </div>
        <div>
          <label>水库等级：</label>
          <span>{{infoData.level}}</span>
        </div>
        <div>
          <label>所属单位：</label>
          <span>{{infoData.legalRepresentativeName}}</span>
        </div>
        <div>
          <label>所在位置：</label>
          <span>{{infoData.location}}</span>
        </div>
        <div class='overview-word'>
          <label>主要功能：</label>
          <span>{{infoData.projectTask}}</span>
        </div>
        <div class='overview-word'>
          <label>水库概述：</label>
          <span>{{infoData.overview}}</span>
        </div>
        <a @click="skipToDetail(infoData.baseInfoId)">更多详情...</a>
      </div>
    </transition>
  </div>
</template>

<script>
import BMap from 'BMap'
import BMAP_HYBRID_MAP from 'BMAP_HYBRID_MAP'
// import BMapLib from 'BMapLib'
import echarts from 'echarts'

// import * as reservoirlist from '@/mock/reservoirlist'

export default {
  data() {
    return {
      reservoirMap: {},
      showReservoirDetail: false,
      showFilterBlock: false,
      infoData: {},
      selectTypes: {
        'filter': '筛选',
        'search': '搜索'
      },
      selectType: '搜索',
      citys: [],
      countrys: [],
      reservoirs: [],
      city: '请选择',
      country: '请选择',
      reservoir: '请选择',
      reservoirName: '',
      oldPoint: {},
      allReservoirInfo: []
    }
  },
  watch: {
    showReservoirDetail(curValue, oldValue) {
      if (curValue) {
        let _this = this
        _this.$nextTick(() => {
          // chart1
          // var paymentData = [{ value: 1500000, name: '中央累计拨付' }, { value: 2100000, name: '当前累计拨付' }]
          // _this.initPieChart('reservoir_chart1', paymentData)
          // // chart2
          // var investmentData = [{ value: 1500000, name: '省政府投资' }, { value: 2100000, name: '中央投资' }, { value: 3100000, name: '当前投资' }]
          // _this.initPieChart('reservoir_chart2', investmentData)
          _this.getAllRainFallData(_this.infoData.baseInfoId).then(res => {
            let rainData = res.data
            let thisRainData = _this.rainSituationDataFun(rainData, 'tm', 'drp')
            _this.initRainChart(thisRainData, 'rain_fall', '降雨量', '雨量值(mm)')
          })
          _this.getAllWaterLevelData(_this.infoData.baseInfoId).then(res => {
            let waterData = res.data
            let thisWaterData = _this.otherDataFun(waterData)
            _this.initRainChart(thisWaterData.waterHeightData, 'water_height', '水位', '水位(m)')
            _this.initRainChart(thisWaterData.waterFlowData, 'water_flow', '流量', '流量(m3/s)')
          })
        })
      }
    },
    city(curValue, oldValue) {
      this.country = '请选择'
    },
    country(curValue, oldValue) {
      this.reservoir = '请选择'
    }
  },
  methods: {
    switchSelect(command) {
      this.selectType = this.selectTypes[command]
      if (command === 'filter') {
        this.showFilterBlock = true
        this.city = '请选择'
        this.selectFilter(1)
      } else {
        this.showFilterBlock = false
      }
    },
    selectFilter(regionId) {
      let _this = this
      // 获取市(州)级别区域数据
      _this.getRegionInfo(1).then(res => {
        let cities = res.data.children
        _this.citys = cities
      })
    },
    /**
     *  选择市(州)区域
     */
    selectCity(command, vueObj) {
      let _this = this
      _this.city = vueObj.$el.textContent
      _this.getRegionInfo(command).then(res => {
        let countries = res.data.children
        _this.countrys = countries
      })
      _this.getBoundary(_this.city)
    },
    /**
     *  选择县(区)区域
     */
    selectCountry(command, vueObj) {
      let _this = this
      _this.country = vueObj.$el.textContent
      /* _this.getReservoirs(command).then(res => {
          let reservoirs = res.data
          _this.reservoirs = reservoirs
      }) */
      let reservoirs = this.filterReservoir(command)
      _this.reservoirs = reservoirs
      _this.getBoundary(_this.country)
    },
    // 筛选地区水库
    filterReservoir(regionId) {
      let allData = this.allReservoirInfo
      let regionReservoir = []
      allData.map(item => {
        if (item.regionId === regionId) {
          regionReservoir.push(item)
        }
      })
      return regionReservoir
    },
    /**
     *  选择水库
     */
    selectReservoir(command, vueObj) {
      let _this = this
      _this.reservoir = vueObj.$el.textContent
      // _this.getBoundary(_this.reservoir)
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
      rainEchart.setOption(option)
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
            xAxisItem.push(itemData.tm.substring(11).replace(/-/g, ':'))
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
            let thisDataStr = thisDate.toTimeString().substring(0, 8)
            // let thisDataStr = itemData.tm.updateTime.substr(0, itemData.tm.updateTime.indexOf('T'))
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
     *  地图打点
     */
    createMarker(data, icon) {
      if (!data.longitude || !data.latitude || isNaN(data.longitude) || isNaN(data.latitude) || Number.isInteger(parseFloat(data.longitude)) || Number.isInteger(parseFloat(data.latitude))) {
        return false
      }
      let map = this.reservoirMap
      let img = './static/icon/reservoir.png'
      icon && (img = icon)
      let myIcon = new BMap.Icon(img, new BMap.Size(25, 25), {
        imageSize: new BMap.Size(25, 25)
      })
      let point_item = new BMap.Point(data.longitude, data.latitude)
      let marker = new BMap.Marker(point_item, { icon: myIcon })
      marker.disableMassClear()
      map.addOverlay(marker)
      // 定义展示数据
      let str = [
        '<div class="map-tips"><label>水库：</label><span class="plant-name">' + data.plantName + '</span></div>',
        '<div class="map-tips"><label>位置：</label><span>' + data.location + '</span></div>',
        '<div class="map-tips"><label>规模：</label><span>' + data.scale + '</span></div>',
        '<div class="map-tips"><label>等级：</label><span>' + data.level + '</span></div>'
      ]
      let detail = str.join('')
      let _this = this
      // 设置鼠标hover事件
      marker.addEventListener('mouseover', function (e) {
        let label = new BMap.Label(detail, { offset: new BMap.Size(20, 20) })
        label.setStyle({
          width: 'auto',
          color: '#000',
          background: '#fff',
          border: '1px solid "#fff"',
          borderRadius: '3px',
          height: 'auto',
          textAlign: 'left',
          padding: '5px'
        })
        marker.setLabel(label)
        marker.setTop(true, 5000)
      })

      // 设置鼠标离开事件
      marker.addEventListener('mouseout', function (e) {
        let label = this.getLabel()
        label.setContent('')
        label.setStyle({ border: 'none', width: '0px', padding: '0px' })
        marker.setTop(false)
      })

      // 设置点击事件
      marker.addEventListener('click', function () {
        _this.$parent.$refs.header.showOverviewContent = false // 关闭总概览信息
        _this.infoData = data
        map.panTo(point_item) //  移动地图
        if (!Object.is(point_item, _this.oldPoint)) { //  判断与之前点击点是否一致
          _this.showReservoirDetail = false
          setTimeout(() => { //  地图动画
            map.setZoom(13)
          }, 800)
          setTimeout(() => {
            _this.showReservoirDetail = true
          }, 1000)
        } else {
          if (_this.showReservoirDetail) {
            _this.showReservoirDetail = false
          } else {
            _this.showReservoirDetail = true
          }
        }
        _this.oldPoint = point_item
      })
      return point_item
    },
    /**
     *  获取用户信息
     */
    getUserInfo() {
      let thisRequest = this.$http.get('/api/user/getthisuser')
      return thisRequest
    },
    /**
     *  获取所有公告信息
     */
    getAnnouncements() {
      let thisRequest = this.$http.get('/api/announcement/getannouncements', {
        params: {
          page: 1,
          rows: 5,
          total: 1
        }
      })
      return thisRequest
    },
    /**
     *  获取滚动公告信息
     */
    getHotlatests() {
      let thisRequest = this.$http.get('/api/announcement/gethotlatests')
      return thisRequest
    },
    /**
     *  获取基础信息
     */
    getAllBaseInfo() {
      let thisRequest = this.$http.get('/api/baseinfo/all')
      // let thisRequest = this.$http.get('http://192.168.100.205/baseinfo/all')
      /* let thisRequest = new Promise((resolve, reject) => {
          let data = {
              data: reservoirlist.default
          }
          resolve(data)
      }) */
      return thisRequest
    },
    /**
     *  获取区域信息
     */
    getRegionInfo(regionId) {
      let thisRequest = this.$http.get('/api/statistic/region/ri', {
        params: {
          regionId: regionId
        }
      })
      return thisRequest
    },
    /**
     *  获取水库信息
     */
    getReservoirs(regionId) {
      let thisRequest = this.$http.get('/api/manage/getbaseinfobyregion', {
        params: {
          regionId: regionId
        }
      })
      return thisRequest
    },
    /**
     *  获取水雨情信息---降雨量
     */
    getAllRainFallData(baseInfoId) {
      let currentHalfHour = this.getCurrentHalfHour()
      let thisRequest = this.$http.get('/api/communication/getallrainfalldata', {
        params: {
          baseInfoId: baseInfoId,
          startTime: currentHalfHour.startTime,
          endTime: currentHalfHour.endTime
        },
        headers: {
          withoutLoading: true
        }
      })
      return thisRequest
    },
    /**
     *  获取水雨情信息---水位、流量
     */
    getAllWaterLevelData(baseInfoId) {
      let currentHalfHour = this.getCurrentHalfHour()
      let thisRequest = this.$http.get('/api/communication/getallwaterleveldata', {
        params: {
          baseInfoId: baseInfoId,
          startTime: currentHalfHour.startTime,
          endTime: currentHalfHour.endTime
        },
        headers: {
          withoutLoading: true
        }
      })
      return thisRequest
    },
    getCurrentHalfHour() {
      let currentDate = new Date()
      let currentHalfHour = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate() + ' '
      let startTime = currentHalfHour + currentDate.getHours() + ':00:00'
      let endTime = currentHalfHour + (currentDate.getHours() + 2) + ':00:00'
      /* if (currentDate.getMinutes() / 30 < 1) {
          startTime += currentHalfHour + currentDate.getHours() + ':00:00'
          endTime += currentHalfHour + currentDate.getHours() + ':30:00'
      } else {
          startTime += currentHalfHour + currentDate.getHours() + ':30:00'
          endTime += currentHalfHour + (currentDate.getHours() + 1) + ':00:00'
      } */
      return { startTime: startTime, endTime: endTime }
    },
    getBoundary(regionName) {
      let bdary = new BMap.Boundary()
      let map = this.reservoirMap
      bdary.get(regionName, function (rs) { // 获取行政区域
        map.clearOverlays()// 清除地图覆盖物
        let count = rs.boundaries.length// 行政区域的点有多少个
        let path = []
        for (let i = 0; i < count; i++) {
          let ply = new BMap.Polygon(rs.boundaries[i], { strokeWeight: 1, strokeColor: '#1ab394', fillColor: '#fff' })// 建立多边形覆盖物
          map.addOverlay(ply)// 添加覆盖物
          path = path.concat(ply.getPath())
        }
        map.setViewport(path)// 调整视野
      })
    },
    /**
     *  搜索水库
     */
    searchReservoir() {
      let plantName = this.reservoirName
      let allReservoirInfo = this.allReservoirInfo
      let map = this.reservoirMap
      let allOverlays = map.getOverlays()
      allOverlays.map((n, i, allData) => {
        n.enableMassClear()
      })
      map.clearOverlays()
      var points = []
      allReservoirInfo.map((item, i, allData) => {
        if (item['plantName'].indexOf(plantName) > -1) {
          points.push(this.createMarker(item))
        }
      })
      if (points.length === 1) {
        map.setViewport(points, { zoomFactor: -6 })
      } else if (points.length > 1) {
        map.setViewport(points)
      }
    },
    skipToDetail(baseInfoId) {
      this.$router.push({ name: '水库详情', params: { baseInfoId: baseInfoId } })
    }
  },
  mounted() {
    // 百度地图API功能
    let map = new BMap.Map('allmap', { mapType: BMAP_HYBRID_MAP })
    let point = new BMap.Point(106.630905, 26.674511)
    map.centerAndZoom(point, 8) // 初始化地图，设置中心店坐标和地图级别
    /* map.addControl(new BMap.MapTypeControl({
        mapTypes: [
            // BMAP_NORMAL_MAP,
            BMAP_HYBRID_MAP
            // BMAP_SATELLITE_MAP,
            // B_EARTH_MAP
        ]}
    )) */

    //  向地图中添加缩放控件
    /* let ctrl_nav = new BMap.NavigationControl({ anchor: BMAP_ANCHOR_TOP_LEFT, type: BMAP_NAVIGATION_CONTROL_LARGE })
    map.addControl(ctrl_nav) */

    // map.setCurrentCity('贵阳')
    map.enableScrollWheelZoom(true)

    //  控制地图的最大和最小缩放级别
    map.setMinZoom(8)
    // 限定区域--------------------------------------------------------     有点问题
    /* let b = new BMap.Bounds(new BMap.Point(100.971724, 22.841621), new BMap.Point(112.240069, 30.343001))
    try {
        BMapLib.AreaRestriction.setBounds(map, b)
    } catch (e) {
        // 捕获错误异常
        alert(e)
    } */
    this.reservoirMap = map
    this.$nextTick(() => {
      this.getBoundary('贵州省')
    })
    // ------------------地图描点-------------------
    let init = (allData) => {
      this.allReservoirInfo = allData
      this.$store.dispatch('setReservoirList', allData)
      let points = []
      for (let i = 0; i < allData.length; i++) {
        let point = this.createMarker(allData[i])
        if (point) {
          points.push(point)
        }
      }
      map.setViewport(points)
    }
    this.getAllBaseInfo().then(res => {
      let allData = res.data
      init(allData)
    })
  }
}
</script>

<style>
#allmap {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  margin: 0;
  font-size: 14px;
}
#allmap label {
  max-width: none;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.filter-block .el-dropdown-link {
  color: #666;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-dropdown-menu.el-popper > .el-dropdown-menu__item {
  font-size: 12px;
}
</style>
