<template>
  <div>
    <!-- 背景 -->
    <div class='background-block'></div>
    <div class='headers'>
      <div class='header-logo'>
        <img src='static/images/waterlogo.png'
             alt='用户头像' />
        <span>中小型骨干水源工程监管云</span>
      </div>
      <div class='header-info'>
        <div :class='showOverviewContent?"active":""'
             @click='toggleOverviewContent'>
          <a>总概览</a>
        </div>
        <div :class='showCommissionContent?"active":""'
             @click='toggleCommissionContent'>
          <a>菜单</a>
        </div>
        <!-- <img src='static/images/profile_small.jpg' alt='user' /> -->
        <div class="backlog-top"
             style="float:left!important;">
          <el-badge :value="backlogNum"
                    class="item"
                    @click.native="pageTobacklog">
            <span class="fa fa-bell-o"></span>
          </el-badge>
        </div>
        <el-dropdown @command="handleCommand">
          <img src="static/images/profile_small.jpg"
               alt="user">
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">注销登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <transition name="slide-fade">
      <div class='overview-details'
           v-if='showOverviewContent'>
        <div class='overview-background'></div>
        <div class='overview-content transverse-version'>
          <div class='overview-total'>
            <div>
              <div>工程总投资（概算）</div>
              <div class='cost-detail'>
                <span class='font-num'>{{ investment.totalInvestment }}</span>
                <span>(万元)</span>
              </div>
            </div>
            <div>
              <div>工程投资累计完成量</div>
              <div class='cost-detail'>
                <span class='font-num'>{{ investment.accumulativeInvestment }}</span>
                <span>(万元)</span>
              </div>
            </div>
            <div>
              <div>本年度工程投资完成量</div>
              <div class='cost-detail'>
                <span class='font-num'>{{ investment.curAccumulativeInvestment }}</span>
                <span>(万元)</span>
              </div>
            </div>
            <div>
              <div>工程总投资（合同）</div>
              <div class='cost-detail'>
                <span class='font-num'>{{ investment.tractTotalInvesetment }}</span>
                <span>(万元)</span>
              </div>
            </div>
            <!-- <div>
                            <div>本年度计划投资完成量</div>
                            <div class='cost-detail'>
                                <span class='font-num'>800</span>
                                <span>(万元)</span>
                            </div>
                        </div> -->
          </div>
          <div class='chart-block'>
            <div class='map-title'>
              <span>优秀项目（评分前五）</span>
              <hr />
            </div>
            <div id='region_pie'></div>
          </div>
          <div class='chart-block'>
            <div class='map-title'>
              <span>其他投资分布图</span>
              <hr />
            </div>
            <div id="program_funnel_parent">
              <div id='program_funnel'
                   style="width:100%;height:230px;margin-top:30px;"></div>
            </div>
          </div>
          <div class='chart-block'>
            <div class='map-title'>
              <span>项目状态统计图</span>
              <hr />
            </div>
            <div id='program_status'></div>
          </div>
          <div class='chart-block'>
            <div class='map-title'>
              <span>各地区概览图</span>
              <hr />
            </div>
            <div id='program_investment'></div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="slide-fade">
      <!-- <div class='overview-commission'> -->
      <div class='overview-commission'
           v-if='showCommissionContent'>
        <div class='commission-background'></div>
        <div class='commission-content'>
          <!-- <el-table :data="tableData" style="width: 100%" stripe max-height="800" :header-cell-style="{height:'50px',padding:0}">
                    <el-table-column prop="date" label="日期" width="100">
                    </el-table-column>
                    <el-table-column prop="name" label="姓名" width="100">
                    </el-table-column>
                    <el-table-column prop="address" label="地址">
                    </el-table-column>
                </el-table> -->
          <!-- <ul>
                    <li>
                        <a>首页</a>
                    </li>
                    <li>
                        <span>公告</span>
                        <ul>
                            <li>发布公告</li>
                            <li>公告管理</li>
                        </ul>
                    </li>
                    <li>
                        <span>水库字典</span>
                    </li>
                    <li>
                        <span>账号管理</span>
                    </li>
                </ul> -->
          <el-menu :default-active="activeNode"
                   class="el-menu-demo"
                   mode="horizontal"
                   background-color="#080808"
                   text-color="#fff"
                   active-text-color="#ffd04b"
                   :router="routeFlag">
            <!-- <el-menu-item index="home">首页</el-menu-item>
                        <el-submenu index="2">
                            <template slot="title">公告</template>
                            <el-menu-item index="notice/publishnotice">发布公告</el-menu-item>
                            <el-menu-item index="notice/management">公告管理</el-menu-item>
                        </el-submenu>
                        <el-submenu index="3">
                            <template slot="title">招投标信息</template>
                            <el-menu-item index="tenderMsg/invitation">招标信息</el-menu-item>
                            <el-menu-item index="/tenderMsg/tenders">中标信息</el-menu-item>
                        </el-submenu>
                        <el-menu-item index="reservoirs">水库字典</el-menu-item>
                        <el-menu-item index="statistics">统计分析</el-menu-item>
                        <el-menu-item index="users">用户管理</el-menu-item>
                        <el-submenu></el-submenu> -->
            <div v-for="(item, index) in menuData"
                 :key="index">
              <el-submenu :index="item.name"
                          v-if="item.children && item.children.length > 0">
                <template slot="title">{{ item.name }}</template>
                <el-menu-item v-for="(node, i) in item.children"
                              :key="i"
                              :index="node.path">{{ node.name }}</el-menu-item>
              </el-submenu>
              <el-menu-item v-else
                            :index="item.path">{{ item.name }}</el-menu-item>
            </div>
          </el-menu>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import echarts from 'echarts'

// import * as regionlist from '@/mock/regionlist'

export default {
  data() {
    return {
      showOverviewContent: false,
      showCommissionContent: false,
      routeFlag: true,
      investment: {
        accumulativeInvestment: 0,
        curAccumulativeInvestment: 0,
        totalInvestment: 0,
        curPlanInvestment: 0,
        tractTotalInvesetment: 0
      },
      regions: [],
      regionNum: 0,
      regionsInvestment: [],
      statusData: [],
      activeNode: '',
      regionPieLoading: '',
      programFunnelLoading: '',
      programStatusLoading: '',
      programInvestmentLoading: '',
      backlogNum: 0
    }
  },
  watch: {
    showOverviewContent(curValue, oldValue) {
      if (curValue) {
        let _this = this
        // 关闭地图info信息
        this.$parent.$refs.overview.showReservoirDetail = false
        this.$nextTick(() => {
          this.regionPieLoading = this.loading('#region_pie')
          this.programFunnelLoading = this.loading('#program_funnel_parent')
          this.programStatusLoading = this.loading('#program_status')
          this.programInvestmentLoading = this.loading('#program_investment')
          // 投资分布图
          // _this.initRegionPie('region_pie', [], 'total', '投资', 'horizontal')
          // 明星工程
          /* let programStarData = [
              { value: 50, name: '镇远县狗鱼塘水库', children: [{ time: '2017-01-01', actual: 225969, total: 698600.98 }, { time: '2017-01-02', actual: 213930, total: 2543666.74 }, { time: '2017-01-03', actual: 195615, total: 435870.32 }, { time: '2017-01-04', actual: 504616, total: 1808457.64 }, { time: '2017-01-05', actual: 843085, total: 1243110.22 }, { time: '2017-01-06', actual: 227307, total: 1259083.94 }, { time: '2017-01-07', actual: 468491, total: 1371855.03 }, { time: '2017-01-08', actual: 344755, total: 1148453.13 }, { time: '2017-01-09', actual: 827124, total: 1715567.5803 }] },
              { value: 60, name: '思南县枹木寨水利灌溉工程', children: [{ time: '2017-01-01', actual: 225239, total: 698600.98 }, { time: '2017-01-02', actual: 2121930, total: 2543666.74 }, { time: '2017-01-03', actual: 635615, total: 435870.32 }, { time: '2017-01-04', actual: 534616, total: 1808457.64 }, { time: '2017-01-05', actual: 837085, total: 1243110.22 }, { time: '2017-01-06', actual: 221207, total: 1259083.94 }, { time: '2017-01-07', actual: 484491, total: 1371855.03 }, { time: '2017-01-08', actual: 348755, total: 1148453.13 }, { time: '2017-01-09', actual: 884124, total: 1715567.5803 }] },
              { value: 70, name: '播州区苟江水库', children: [{ time: '2017-01-01', actual: 223739, total: 698600.98 }, { time: '2017-01-02', actual: 212120, total: 2543666.74 }, { time: '2017-01-03', actual: 694615, total: 435870.32 }, { time: '2017-01-04', actual: 53716, total: 1808457.64 }, { time: '2017-01-05', actual: 873085, total: 1243110.22 }, { time: '2017-01-06', actual: 223207, total: 1259083.94 }, { time: '2017-01-07', actual: 484491, total: 1371855.03 }, { time: '2017-01-08', actual: 348235, total: 1148453.13 }, { time: '2017-01-09', actual: 884834, total: 1715567.5803 }] },
              { value: 90, name: '黔西县附廓水库加高扩建工程', children: [{ time: '2017-01-01', actual: 278739, total: 698600.98 }, { time: '2017-01-02', actual: 2121340, total: 2543666.74 }, { time: '2017-01-03', actual: 699315, total: 435870.32 }, { time: '2017-01-04', actual: 523516, total: 1808457.64 }, { time: '2017-01-05', actual: 879485, total: 1243110.22 }, { time: '2017-01-06', actual: 223297, total: 1259083.94 }, { time: '2017-01-07', actual: 423491, total: 1371855.03 }, { time: '2017-01-08', actual: 349435, total: 1148453.13 }, { time: '2017-01-09', actual: 8884534, total: 1715567.5803 }] },
              { value: 80, name: '七星关区双河口水库', children: [{ time: '2017-01-01', actual: 278349, total: 698600.98 }, { time: '2017-01-02', actual: 2154340, total: 2543666.74 }, { time: '2017-01-03', actual: 635315, total: 435870.32 }, { time: '2017-01-04', actual: 523226, total: 1808457.64 }, { time: '2017-01-05', actual: 884485, total: 1243110.22 }, { time: '2017-01-06', actual: 242297, total: 1259083.94 }, { time: '2017-01-07', actual: 428391, total: 1371855.03 }, { time: '2017-01-08', actual: 3459435, total: 1148453.13 }, { time: '2017-01-09', actual: 8354534, total: 1715567.5803 }] }
          ] */
          _this.getAllScore().then(res => {
            let data = res.data
            data.sort((param1, param2) => {
              return param2.score - param1.score
            })
            let programStarData = this.getScoreChartData(data)
            _this.initProgramFunnel('region_pie', programStarData, '工程进度')
            this.regionPieLoading.close()
          })
          // 项目状态
          /* let statusData = [
              { name: '大坝开挖', value: 25 },
              { name: '大坝填筑', value: 38 },
              { name: '前期工作', value: 174 },
              { name: '三通一平', value: 6 },
              { name: '施工准备', value: 13 },
              { name: '通水验收', value: 1 },
              { name: '项目关闭', value: 0 },
              { name: '蓄水验收', value: 33 },
              { name: '蓄水准备', value: 36 }
          ] */
          /* let statusData = [
              {name: '项目开始', value: 336, stateId: 1},
              {name: '项目建设', value: 1, stateId: 2}
          ]
          _this.initRegionPie('program_status', statusData, 'value', '阶段数量(占比)') */
          // 工程累计投资完成量
          this.overAllInvestmentCompletion('', 1).then(res => {
            this.investment.accumulativeInvestment = res.data
          })
          // 年度投资完成量
          let date = new Date()
          let startDate = date.getFullYear() + '-01-01'
          let endDate = date.toISOString().substr(0, 10)
          let during = {
            startDate: startDate,
            endDate: endDate
          }
          this.overAllInvestmentCompletion(during).then(res => {
            this.investment.curAccumulativeInvestment = res.data
          })
          // 投资分布
          let userStr = window.localStorage.USER
          if (userStr) {
            let Base64 = require('js-base64').Base64
            let user = JSON.parse(Base64.decode(userStr))
            let authorities = user.roles
            if (authorities.indexOf('ROLE_PROVINCE') > -1) {
              // 总投资与实际投资占比 --- 水利厅
              _this.$http.get('/api/statistic/region/ri', {
                params: {
                  regionId: 1
                },
                headers: {
                  withoutLoading: true
                }
              }).then(res => {
                _this.initProgramInvestment('program_investment', res.data.children, ['实际投资', '总投资'])
                _this.programInvestmentLoading.close()
              })
              _this.getAllRegionInvestment()
            } else {
              _this.getAllReservoirs()
            }
          } else {
            _this.getAllReservoirs()
          }
          // 工程总投资（合同）
          this.getTractTotalInvestment().then(res => {
            this.investment.tractTotalInvesetment = res.data
          })
        })
      }
    },
    '$store.state.reservoirlist': {
      handler(curValue, oldValue) {
        // 工程总投资（概算）
        this.investment.totalInvestment = this.getInvestment(curValue).toFixed(2)
        // 项目状态图
        let statusData = this.getStatusData(curValue)
        this.statusData = statusData
      },
      deep: true
    },
    regionsInvestment: {
      handler(curArray, oldArray) {
        if (curArray.length === this.regionNum) {
          // 处理投资分布图
          // this.initRegionPie('region_pie', curArray, 'totalInvestment', '投资', 'horizontal')
          // this.regionPieLoading.close()
          this.initRadar('program_funnel', curArray)
          this.programFunnelLoading.close()
        }
      },
      deep: true
    },
    showStateEchart(curData, oldValue) {
      if (curData) {
        this.$nextTick(() => {
          this.initRegionPie('program_status', this.statusData, 'value', '阶段数量(占比)')
          this.programStatusLoading.close()
        })
      }
    }
  },
  computed: {
    showStateEchart() {
      let flag = this.showOverviewContent && this.statusData && this.statusData.length > 0
      return flag
    }
  },
  methods: {
    loading(domStr) {
      let loading = this.$loading({
        lock: true,
        text: '拼命加载中',
        spinner: 'el-icon-loading',
        // background: 'rgba(204, 204, 204, 0.3);',
        background: 'rgba(107, 125, 120, 0.3)',
        target: domStr,
        customClass: 'loading-font'
      })
      return loading
    },
    pageTobacklog() {
      this.$router.push('/backlog/manager')
    },
    toggleOverviewContent() {
      this.showOverviewContent = !this.showOverviewContent
      this.showCommissionContent = false
    },
    toggleCommissionContent() {
      this.showCommissionContent = !this.showCommissionContent
      this.showOverviewContent = false
    },
    handleCommand(value) {
      if (value === 'logout') {
        // this.$router.push('/login')
        location.href = location.origin + '/api/logout'
        window.localStorage.clear()
      }
    },
    /**
     *  合同总投资
     */
    getTractTotalInvestment() {
      let thisRequest = this.$http.get('/api/annualinvestment/calc', {
        params: {
          type: 'apply'
        },
        headers: {
          withoutLoading: true
        }
      })
      return thisRequest
    },
    /****
     * 投资分布图
     */
    initRegionPie(id, data, seriesKey, name, orient) {
      let myChart = echarts.init(document.getElementById(id))
      let chartData = this.getData(data, seriesKey)
      let option = {
        tooltip: {
          trigger: 'item',
          position: [10, 10],
          textStyle: {
            fontFamily: 'Microsoft YaHei'
          },
          formatter: '{a} <br/>{b} :<span class="map-num"> {c} ({d}%)</span>'
        },
        legend: {
          type: 'scroll',
          // orient: orient ? 'vertical' : 'horizontal',
          orient: orient ? 'horizontal' : 'vertical',
          right: 10,
          top: 5,
          bottom: 20,
          pageIconColor: '#fff',
          textStyle: {
            color: '#fff'
          },
          pageButtonItemGap: 1,
          pageTextStyle: {
            color: '#fff'
          },
          pageIconSize: 10,
          itemWidth: 20,
          itemHeight: 10,
          data: chartData.legendData
        },
        series: [
          {
            name: name,
            type: 'pie',
            radius: '55%',
            center: ['40%', '50%'],
            label: {
              show: false
            },
            data: chartData.seriesData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      // 设置参数并初始化
      myChart.setOption(option)
      /* myChart.on('click', function (params) {
          if (params.componentType === 'series' && params.data.children && params.data.children.length > 0) {
              slideDetail('grid', params.data.children, params.data.name)
          } else {
              closeDetail()
          }
      }) */
    },
    /*****
     * 明星工程图
     */
    initProgramFunnel(id, data, name, hasChild, orient) {
      var myChart = echarts.init(document.getElementById(id))
      // var chartData = this.getData(data, 'value')
      let chartData = data
      var option = {
        /*  title: {
             text: '漏斗图',
             subtext: '纯属虚构'
         }, */
        tooltip: {
          trigger: 'item',
          textStyle: {
            fontFamily: 'Microsoft YaHei',
            align: 'left'
          },
          formatter: '{a} <br/>{b} : <span class="map-num">{c}%</span>'
        },
        legend: {
          type: 'scroll',
          orient: orient ? 'vertical' : 'horizontal',
          // orient: orient ? 'horizontal' : 'vertical',
          right: 10,
          top: 5,
          bottom: 20,
          pageIconColor: '#fff',
          textStyle: {
            color: '#fff'
          },
          pageButtonItemGap: 1,
          pageTextStyle: {
            color: '#fff'
          },
          pageIconSize: 10,
          itemWidth: 20,
          itemHeight: 10,
          data: chartData.legendData
        },
        series: [
          {
            name: '水库总分',
            type: 'funnel',
            left: '10%',
            width: '80%',
            maxSize: '80%',
            label: {
              normal: {
                // show: false,
                position: 'inside',
                formatter: '{b}',
                textStyle: {
                  color: '#fff'
                }
              },
              emphasis: {
                position: 'inside',
                formatter: '{a}: {c}',
                textStyle: {
                  color: '#fff',
                  fontFamily: 'Lccd'
                }
              }
            },
            itemStyle: {
              normal: {
                // opacity: 0.5,
                borderColor: '#fff',
                borderWidth: 1
              }
            },
            data: chartData.seriesData
          }
        ]
      }
      // 设置参数并初始化
      myChart.setOption(option)
      // 点击事件
      /* myChart.on('click', function (params) {
          if (params.componentType === 'series' && params.data.children && Object.keys(params.data.children).length > 0) {
              $('#item_title').text(params.name)
              $.when(slideDetail('chart')).done(function () {
                  setTimeout(function () {
                      initProgramInvestment('chart_detail', params.data.children, ['申请拨付', '实际拨付'])
                  }, 500)
              })
          } else {
              closeDetail()
          }
      }) */
    },
    /**
     *  所有投资数据处理
     */
    handlerAllInvestment(data) {
      let totalInvestment = []
      let investmentSofar = []
      let availableInvestmentSofar = []
      let indicator = []
      data.map(item => {
        totalInvestment.push(item.totalInvestment)
        investmentSofar.push(item.investmentSofar)
        availableInvestmentSofar.push(item.availableInvestmentSofar)
        /* let arr = [item.totalInvestment, item.investmentSofar, item.availableInvestmentSofar]
        arr.sort((param1, param2) => {
            return param2 - param1
        }) */
        let max = 0
        if (item.investmentSofar > item.availableInvestmentSofar) {
          max = item.investmentSofar
        } else {
          max = item.availableInvestmentSofar
        }
        indicator.push({ name: item.name, max: max })
      })
      return {
        totalInvestment: totalInvestment,
        investmentSofar: investmentSofar,
        availableInvestmentSofar: availableInvestmentSofar,
        indicator: indicator
      }
    },
    /**
     *  所有投资信息
     */
    initRadar(id, radarData) {
      // let data = radarData || this.statusData
      let data = this.handlerAllInvestment(radarData)
      let option = {
        title: {
          // text: '项目状态图'
        },
        tooltip: {
          // formatter: this.formatterRadarTip
          textStyle: {
            align: 'left'
          }
        },
        legend: {
          data: ['投资完成', '到位资金'],
          show: true,
          orient: 'vertical',
          left: 0,
          // top: 5,
          bottom: 5,
          textStyle: {
            color: '#fff'
          }
        },
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: '#fff',
              // backgroundColor: '#999',
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          indicator: data.indicator
        },
        series: [{
          name: '项目状态图',
          type: 'radar',
          top: '50%',
          data: [{
            value: data.investmentSofar,
            name: '投资完成'
          }, {
            value: data.availableInvestmentSofar,
            name: '到位资金'
          }]
        }]
      }
      let myChart = echarts.init(document.getElementById(id))
      myChart.setOption(option)
      this.statusChart = myChart
    },
    /**
     *  initProgramInvestment 各项目进度图
     */
    initProgramInvestment(id, data, legendData) {
      var myChart = echarts.init(document.getElementById(id))
      var chartData = this.getBarData(data)
      var option = {
        tooltip: {
          trigger: 'axis',
          position: [10, 10],
          axisPointer: {
            type: 'shadow'
          },
          textStyle: {
            fontFamily: 'Microsoft YaHei'
          },
          formatter: '<span style="color:#f0ab58">{b}</span> <br/>{a0} : <span class="map-num">{c0}</span>(万元)<br/>{a1} : <span class="map-num">{c1}</span>(万元)'
        },
        legend: {
          orient: 'horizontal',
          top: 5,
          textStyle: {
            color: '#fff'
          },
          itemWidth: 20,
          itemHeight: 10,
          data: legendData
        },
        grid: {
          left: '2px',
          containLabel: true
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                // 使用深浅的间隔色
                color: '#565656'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#fff',
                fontFamily: 'Microsoft YaHei'
              }
            },
            data: chartData.xAxisData
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisTick: {
              show: false
            },
            // y 轴线
            axisLine: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                // 使用深浅的间隔色
                color: '#565656',
                type: 'dotted'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#f0ab58',
                fontFamily: 'Lccd'
              }
            }
          }
        ],
        series: [
          {
            name: legendData[0],
            type: 'bar',
            color: '#1ab394 ',
            data: chartData.actualSeries
          },
          {
            name: legendData[1],
            type: 'bar',
            color: '#f0ab58',
            data: chartData.totalSeries
          }
        ]
      }
      myChart.setOption(option)
      // 点击事件
      /* myChart.on('click', function (params) {
          if (params.componentType === 'series' && params.data.children && Object.keys(params.data.children).length > 0) {
              $.when(slideDetail('chart')).done(function () {
                  $('#item_title').text(params.name)
                  setTimeout(function () {
                      initProgramInvestment('chart_detail', params.data.children, ['实际投资', '总投资'])
                  }, 500)
              })
          } else {
              closeDetail()
          }
      }) */
    },
    getData(data, seriesKey) {
      let legendData = []
      let seriesData = []
      for (let i = 0; i < data.length; i++) {
        legendData.push(data[i].name)
        data[i].value = data[i][seriesKey]
        seriesData.push(data[i])
      }
      let chartData = {
        legendData: legendData,
        seriesData: seriesData
      }
      return chartData
    },
    getBarData(data) {
      let xAxisData = []
      let totalSeries = []
      let actualSeries = []
      for (let i = 0; i < data.length; i++) {
        xAxisData.push(data[i].regionName || data[i].regionName)
        totalSeries.push({ value: data[i].totalInvestment, children: data[i].children })
        actualSeries.push({ value: data[i].investmentSofar, children: data[i].children })
      }
      var chartData = {
        xAxisData: xAxisData,
        totalSeries: totalSeries,
        actualSeries: actualSeries
      }
      return chartData
    },
    overAllInvestmentCompletion(during, regionId) {
      let params = {}
      // during 2018-10-23
      if (during) {
        params = {
          startDate: during.startDate,
          endDate: during.endDate,
          by: 'region'
        }
      } else if (regionId) {
        params = {
          regionId: regionId,
          by: 'region'
        }
      }
      let thisRequest = this.$http.get('/api/pmr/overallinvestmentcompletion', {
        params: params,
        headers: {
          withoutLoading: true
        }
      })
      return thisRequest
    },
    getAllInvestment(regionId) {
      let thisRequest = {}
      if (regionId || regionId === 0) {
        thisRequest = this.$http.get('/api/statistic/region/ri', {
          params: { regionId: regionId },
          headers: {
            withoutLoading: true
          }
        })
      } else {
        thisRequest = this.$http.get('/api/statistic/region/ri', {
          headers: {
            withoutLoading: true
          }
        })
      }
      return thisRequest
    },
    /**
     *  工程总投资
     */
    getInvestment(data) {
      let totalInvestment = 0
      data.map((item, index) => {
        totalInvestment += parseFloat(item.totalInvestment)
      })
      return totalInvestment
    },
    /**
     *  获取所有管辖区域
     */
    getAllRegion() {
      let thisRequest = this.$http.get('/api/region/all', {
        headers: {
          withoutLoading: true
        }
      }).then(res => {
        this.regions = res.data
      })
      /* let thisRequest = new Promise((resolve, reject) => {
          this.regions = regionlist.default
          resolve()
      }) */
      return thisRequest
    },
    /**
     *  获取投资分布数据
     */
    getAllRegionInvestment() {
      this.getAllRegion().then(() => {
        let regionDatas = this.regions
        if (regionDatas && regionDatas.length > 0) {
          let treeData = this.$store.state.buildTree(this.regions, 'regionId', 'parentId')
          this.$store.dispatch('setRegionTree', treeData)
          this.regionNum = treeData[0].children.length
          let regions = treeData[0].children
          let regionsInvestment = []
          regions.map((item, index) => {
            // this.overAllInvestmentCompletion('', item.regionId).then(res => {
            this.getAllInvestment(item.regionId).then(res => {
              let regionInvestment = {
                name: item.regionName,
                regionId: item.regionId,
                // investment: res.data
                totalInvestment: res.data.totalInvestment,
                investmentSofar: res.data.investmentSofar,
                availableInvestmentSofar: res.data.availableInvestmentSofar
              }
              regionsInvestment.push(regionInvestment)
            })
          })
          this.regionsInvestment = regionsInvestment
        }
      })
    },
    getAllReservoirs() {
      this.getAllInvestment().then(res => {
        let data = res.data
        let regions = data.children
        regions.map(item => {
          item.name = item.regionName
          return item
        })
        // 工程投资累计完成量
        this.regionNum = regions.length
        this.regionsInvestment = regions
        // 工程累计投资完成量
        this.investment.accumulativeInvestment = res.data.investmentSofar
        // 各地区该蓝图
        this.initProgramInvestment('program_investment', regions, ['实际投资', '总投资'])
      })
    },
    /**
     *  项目状态重组数据
     */
    getStatusData(data) {
      let statusDatas = []
      let stateList = []
      data.map((item, index) => {
        let name = item.plantStateVO.type
        let stateId = item.plantStateVO.stateId
        let state_index = stateList.indexOf(stateId)
        if (state_index > -1) {
          statusDatas[state_index].value += 1
        } else {
          let status = {
            name: name,
            stateId: stateId,
            value: 1
          }
          stateList.push(stateId)
          statusDatas.push(status)
        }
      })
      return statusDatas
    },
    // 获取所有项目得分
    getAllScore() {
      let thisRequest = this.$http.get('/api/statistic/dataCompletion', {
        headers: {
          withoutLoading: true
        }
      })
      return thisRequest
    },
    /**
     *  重组漏斗图得分信息
     */
    getScoreChartData(data) {
      let legendData = []
      let seriesData = []
      for (let i = 0; i < 5; i++) {
        legendData.push(data[i].plantName)
        let series = {
          name: data[i].plantName,
          value: data[i].score
        }
        seriesData.push(series)
      }
      return {
        legendData: legendData,
        seriesData: seriesData
      }
    }
  },
  mounted() {
    /**
     *  加载菜单信息
     */
    let Base64 = require('js-base64').Base64
    let menuList = this.$store.state.menuList
    let storageMenu = window.localStorage.MENU_NODE
    let menuData = (menuList && menuList.length > 0) ? menuList : JSON.parse(Base64.decode(storageMenu))
    // let menuData = this.$store.state.managerMenu.default
    // let menuData = this.$store.state.guestMenu.default
    // let menuData = this.$store.state.citymanagerMenu.default
    this.menuData = menuData

    // 加载待办信息
    this.$http.get('/api/fund/unhandled').then(res => {
      if (res.code === 1002) {
        this.backlogNum = res.data
      }
    })
  }
}
</script>

<style>
.headers {
  overflow: hidden;
}
.backlog-top {
  float: left !important;
  height: 50px;
  width: 50px!important;
}
.backlog-top:hover {
  cursor: pointer;
  background: #000;
}
.backlog-top > .item {
  padding: 3px;
  display: inline;
}
.backlog-top > .item > .fa {
  font-size: 18px;
}
</style>
