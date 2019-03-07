<template>
    <div class="statistics-page">
        <!-- <div class="statistics-title">地区统计</div> -->
        <el-row :gutter="20" class="region-map">
            <!-- <div class="statistics-title">投资统计</div> -->
            <el-col :lg="24" :md="24" :xs="24">
                <div id="item2_echart" style="width:100%; height:300px;"></div>
                <!-- <div id="region_investment" style="width:100%; height:300px"></div> -->
            </el-col>
            <el-col :lg="24" :md="24" :xs="24" class="chart3d-div">
                <div id="3d_echart" style="width:100%; height:600px;background:#fff;"></div>
                <div class="region-selected">
                    <a @click="initAllTopEchart('')" :class="cityItem?'region-click':''">{{ regionData.name }}</a>
                    <span v-if="cityItem">></span>
                    <a v-if="cityItem">{{ cityItem }}</a>
                </div>
                <div class="right-chart">
                    <div id="region_investment" style="width:250px; height:250px"></div>
                </div>
                <div class="top-investment">
                    <div>{{ allRegionInvsetment.name || ' '}}</div>
                    <div class="investment-tag">
                        <div><span>完成投资：</span><span>{{ allRegionInvsetment.investmentSofar || 0 }}</span></div>
                        <div><span>到位资金：</span><span>{{ allRegionInvsetment.availableInvestmentSofar || 0 }}</span></div>
                        <div><span>总投资：</span><span>{{ allRegionInvsetment.totalInvestment || 0 }}</span></div>
                    </div>
                    <i class="fa fa-rmb"></i>
                </div>
            </el-col>
        </el-row>
        <div class="chart-area"><i class="fa fa-pie-chart"></i> 投资概览</div>
        <el-row :gutter="20" class="investment-area">
            <el-col :lg="24" :md="24" :xs="24">
                <div class="filter-investment">
                    <div>
                        <span>最高总投资</span>
                        <div><span>{{ totalInvestmentTop.name }}</span>：<span>{{ totalInvestmentTop.investmentTop }}</span><span> 万元</span></div>
                    </div>
                    <div>
                        <span>最高投资完成</span>
                        <div><span>{{ investmentSofarTop.name }}</span>：<span>{{ investmentSofarTop.investmentTop }}</span><span> 万元</span></div>
                    </div>
                    <div>
                        <span>最高到位资金</span>
                        <div><span>{{ availableInvestmentSofarTop.name }}</span>：<span>{{ availableInvestmentSofarTop.investmentTop }}</span><span> 万元</span></div>
                    </div>
                </div>
                <div id="item1_echart" style="width:80%; height:300px;"></div>
            </el-col>
            <hr>
            <el-col :lg="24" :md="24" :xs="24" class="investment-item">
                <div id="investment_pie" style="width:100%; height:300px;"></div>
                <div>总投资</div>
                <div>完成投资</div>
                <div>到位资金</div>
            </el-col>
        </el-row>
        <div class="chart-area"><i class="fa fa-line-chart"></i> 项目状态</div>
        <el-row :gutter="20" class="status-area">
            <!-- <el-col :lg="8" :md="8" :xs="8">
                <div id="total_investment" style="width:100%; height:300px"></div>
            </el-col>
            <el-col :lg="8" :md="8" :xs="8">
                <div id="actual_investment" style="width:100%; height:300px"></div>
            </el-col>
            <el-col :lg="8" :md="8" :xs="8">
                <div id="actual_cost" style="width:100%; height:300px"></div>
            </el-col> -->
            <el-col :lg="18" :md="18" :xs="24">
                <div id="project_status" style="width:100%; height:300px"></div>
            </el-col>
            <el-col :lg="6" :md="6" :xs="24">
                <div class="left-status">
                    <div>
                        <span>项目开始：</span>
                        <span>{{ status[0] }}</span>
                    </div>
                    <div>
                        <span>前期工作：</span>
                        <span>{{ status[1] }}</span>
                    </div>
                    <div>
                        <span>施工准备：</span>
                        <span>{{ status[2] }}</span>
                    </div>
                    <div>
                        <span>三通一平：</span>
                        <span>{{ status[3] }}</span>
                    </div>
                    <div>
                        <span>大坝开挖：</span>
                        <span>{{ status[4] }}</span>
                    </div>
                </div>
                <div class="right-status">
                    <div>
                        <span>大坝填筑：</span>
                        <span>{{ status[5] }}</span>
                    </div>
                    <div>
                        <span>蓄水准备：</span>
                        <span>{{ status[6] }}</span>
                    </div>
                    <div>
                        <span>蓄水验收：</span>
                        <span>{{ status[7] }}</span>
                    </div>
                    <div>
                        <span>通水验收：</span>
                        <span>{{ status[8] }}</span>
                    </div>
                    <div>
                        <span>项目完结：</span>
                        <span>{{ status[9] }}</span>
                    </div>
                </div>
                <div class="total-status">
                    <div>
                        <span>总计:</span>
                        <span>{{ totalStatus }}</span>
                    </div>
                </div>
            </el-col>
        </el-row>
        <div class="chart-area"><i class="fa fa-area-chart"></i> 在建水库</div>
        <el-row :gutter="20" class="year-reservoir">
            <el-col :lg="24" :md="24" :xs="24">
                <div class="reservoir-chart">
                    <div id="project_time" style="width:100%; height:100%;"></div>
                </div>
                <div class="reservoir-text">
                    <!-- <span>在建水库数量：</span> -->
                    <div>
                        <div v-for="(value, key, index) in yearReservoirs" :key="index">
                            <span><i class="cicle"></i> {{ key }}</span>年:
                            <span>{{ value.length }}</span>个
                        </div>
                    </div>
                </div>
                <div class="reservoir-time-picker">
                    <el-date-picker v-model="reservoirDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </div>
            </el-col>
        </el-row>
        <div class="chart-area"><i class="fa fa-cloud"></i> 问题词云</div>
        <el-row :gutter="20">
            <el-col :lg="24" :md="24" :xs="24">
                <!-- <div id="reservoir_status" style="width:100%; height:500px;"></div> -->
                <el-button type="text" @click="showWordsCloud = true" v-show="!showWordsCloud">获取词云</el-button>
                <div style="width:100%;" v-if="showWordsCloud">
                    <img src="/api/statistic/pmrdiffwordcloud" alt="词云" style="width:100%;">
                </div>
            </el-col>
        </el-row>
        <div class="chart-area"><i class="fa fa-line-chart"></i> 态度倾向性分析</div>
        <el-row :gutter="20" class="eq-block">
            <el-col :lg="16" :md="16" :xs="24">
                <div id="project_eq" style="width:100%; height:500px;"></div>
            </el-col>
            <el-col :lg="8" :md="8" :xs="24" class="eq-detail">
                <div id="eq_pie" style="width:100%; height:200px;"></div>
                <el-table :data="tableData" border style="width: 100%;" height="300" stripe tooltip-effect="dark" size="mini">
                    <el-table-column prop="text" label="样本" min-width="125" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="confidence" label="置信" min-width="75" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="positive_prob" label="积极" min-width="75" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="negative_prob" label="消极" min-width="75" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="sentiment" label="趋向" width="55" :formatter="formatSentiment">
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Echarts from 'echarts'
import guizhou from './guizhou.json'

import guiyang from './guiyang.json'
import liupanshui from './liupanshui.json'
import zunyi from './zunyi.json'
import anshun from './anshun.json'
import tongren from './tongren.json'
import qianxinan from './qianxinan.json'
import bijie from './bijie'
import qiandongnan from './qiandongnan'
import qiannan from './qiannan.json'

// import * as reservoirlist from '@/mock/reservoirlist'
// import * as regionlist from '@/mock/regionlist'
// import * as reservoirInvestment from '@/mock/regionInvestment'
// import * as duringReservoirs from '@/mock/duringReservoirs'

export default {
    data() {
        let date = new Date()
        let year = date.getFullYear()
        let reservoirDate = [(year - 1) + '-01-01', year + '-12-31']
        return {
            data: [],
            totalPie: {},
            availablePie: {},
            sofarPie: {},
            regionData: [],
            defList: [],
            index: 1,
            statusData: [
                { name: '大坝开挖', value: 25 },
                { name: '大坝填筑', value: 38 },
                { name: '前期工作', value: 174 },
                { name: '三通一平', value: 6 },
                { name: '施工准备', value: 13 },
                { name: '通水验收', value: 1 },
                { name: '项目关闭', value: 0 },
                { name: '蓄水验收', value: 33 },
                { name: '蓄水准备', value: 36 }
            ],
            status: [],
            totalStatus: 0,
            reservoirlist: [],
            regionlist: [],
            regionReservoir: [],
            statusReservoir: [],
            cityItem: '',
            allReservoir: {},
            allRegionInvsetment: {},
            // 图形
            map3D: {},
            mapBlock: {},
            mapLine: {},
            mapPie: {},
            statusChart: {},
            lineScatter: {},
            // 图形
            statusArray: [],
            topRegion: {},
            reservoirDate: reservoirDate,
            totalInvestmentTop: {},
            investmentSofarTop: {},
            availableInvestmentSofarTop: {},
            yearReservoirs: {},
            showWordsCloud: false,
            regionMapLoading: '',
            investmentAreaLoading: '',
            statusAreaLoading: '',
            yearReservoirLoading: '',
            eqChartLoading: '',
            tableData: []
        }
    },
    watch: {
        defList: {
            handler(curValue, oldValue) {
                if (curValue && curValue.length) {
                    Promise.all(curValue).then(res => {
                        let regionData = this.regionData
                        let regionId = regionData.regionId
                        if (regionId === 1 || regionId === '1') {
                            regionData.name = '贵州'
                        } else {
                            regionData.name = regionData.regionName
                        }
                        this.allReservoir.then(res => {
                            this.rebuildData(regionData.children)
                            // 初始化
                            let citys = this.rebuildRegionReservoirs(regionData, res)
                            this.initAllTopEchart(citys)
                            this.regionMapLoading.close()
                            this.investmentAreaLoading.close()
                            this.statusAreaLoading.close()
                        })
                    })
                }
            },
            deep: true
        },
        '$store.state.expandMenu'(curValue, oldValue) {
            setTimeout(() => {
                this.map3D.resize()
                this.mapBlock.resize()
                this.mapLine.resize()
                this.mapPie.resize()
                this.statusChart.resize()
                this.lineScatter.resize()
                this.eqChart.resize()
            }, 800)
        },
        reservoirDate: {
            handler(curValue, oldValue) {
                let flag = []
                curValue.map((value, index) => {
                    flag.push(value === oldValue[index])
                })
                if (flag.indexOf(false) > -1) {
                    this.getDuringReservoirs(curValue[0], curValue[1]).then(res => {
                        let yearReservoirs = this.countReservoirs(res.data)
                        this.yearReservoirs = yearReservoirs
                        this.initLineArea(yearReservoirs)
                    })
                }
            },
            deep: true
        }
    },
    methods: {
        getInvestment(regionId) {
            let thisRequest = this.$http.get('/api/statistic/region/ri', {
                params: {
                    regionId: regionId
                }
            })
            return thisRequest
        },
        getEQData() {
            let thisRequest = this.$http.get('/api/statistic/pmrdiffsentiment')
            return thisRequest
        },
        getAllReservoir() {
            return new Promise((resolve, reject) => {
                let reservoirlist = this.$store.state.reservoirlist
                if (!reservoirlist || reservoirlist.length === 0) {
                    this.$http.get('/api/baseinfo/all').then(res => {
                        let allReservoir = res.data
                        this.reservoirlist = allReservoir
                        resolve(allReservoir)
                    })
                } else {
                    this.reservoirlist = reservoirlist.default
                    resolve(reservoirlist)
                }
                // this.reservoirlist = reservoirlist.default
                // resolve(reservoirlist.default)
            })
        },
        getAllRegion() {
            return new Promise((resolve, reject) => {
                let regionlist = this.$store.state.regionTree
                if (!regionlist || regionlist.length === 0) {
                    this.$http.get('/api/region/all').then(res => {
                        let buildTree = this.$store.state.buildTree
                        let treeData = buildTree(res.data, 'regionId', 'parentId')
                        this.regionlist = treeData
                        resolve(treeData)
                    })
                } else {
                    let buildTree = this.$store.state.buildTree
                    let treeData = buildTree(regionlist.default, 'regionId', 'parentId')
                    this.regionlist = treeData
                    resolve(regionlist)
                }
            })
            /* return new Promise((resolve, reject) => {
                let buildTree = this.$store.state.buildTree
                let treeData = buildTree(regionlist.default, 'regionId', 'parentId')
                this.regionlist = treeData
                resolve(treeData)
            }) */
        },
        initBarLine(x, data) {
            let myChart = Echarts.init(document.getElementById('per_total_actual_investment'))
            let option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data: [ '总投资', '累计投资', '到位资金' ]
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: x || [ '2015', '2016', '2017', '2018', '2019', '2020', '2021' ]
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '总投资',
                        type: 'bar',
                        data: data ? data.totalInvestment : [ 320, 332, 301, 334, 390, 330, 320 ]
                    },
                    {
                        name: '累计投资',
                        type: 'line',
                        data: data ? data.investmentSofar : [ 120, 132, 101, 134, 90, 230, 210 ]
                    },
                    {
                        name: '到位资金',
                        type: 'line',
                        data: data ? data.availableInvestmentSofar : [ 220, 182, 191, 234, 290, 330, 310 ]
                    }
                ]
            }
            myChart.setOption(option, true)
        },
        initRectangle(regionData) {
            let myChart = Echarts.init(document.getElementById('item2_echart'))
            let option = {
                backgroundColor: 'none',
                tooltip: {
                    // trigger: 'item',
                    formatter: this.formatterTooltip
                },
                color: ['#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80', '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa', '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050', '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089'],
                series: [{
                    type: 'treemap',
                    width: '100%',
                    height: '100%',
                    // top: '5%',
                    leafDepth: 1,
                    drillDownIcon: '',
                    roam: false, // 是否开启拖拽漫游（移动和缩放）
                    nodeClick: false, // 点击节点后的行为,false无反应
                    breadcrumb: {
                        show: false
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'insideTopLeft',
                            // width: '100',
                            formatter: this.formatterLabel,
                            rich: {
                                budget: {
                                    fontSize: 16,
                                    lineHeight: 20,
                                    color: 'yellow'
                                },
                                small: {
                                    fontSize: 14,
                                    lineHeight: 20,
                                    color: '#fff'
                                },
                                household: {
                                    fontSize: 12,
                                    color: '#ccc'
                                },
                                label: {
                                    fontSize: 10,
                                    backgroundColor: 'rgba(0,0,0,0.3)',
                                    color: '#fff',
                                    borderRadius: 2,
                                    padding: [2, 4],
                                    lineHeight: 20,
                                    align: 'left',
                                    verticalAlign: 'center'
                                },
                                name: {
                                    fontSize: 16,
                                    color: '#fff',
                                    padding: [5, 10]
                                },
                                hr: {
                                    width: '100%',
                                    borderColor: 'rgba(255,255,255,0.2)',
                                    borderWidth: 0.5,
                                    height: 0,
                                    lineHeight: 10
                                }
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            show: true,
                            textStyle: {
                                color: '#fff',
                                fontSize: 16
                            },
                            borderWidth: 1,
                            borderColor: '#f3f3f3'
                        },
                        emphasis: {
                            label: {
                                show: true
                            }
                        }
                    },
                    data: regionData.children
                }]
            }
            myChart.off('click')
            myChart.on('click', (node) => {
                let itemData = node.data
                console.log(itemData)
            })
            myChart.setOption(option, true)
            this.mapBlock = myChart
        },
        rebuildInvestment(data) {
            // 饼图
            let legend = []
            let totalInvestmentArray = []
            let investmentSofarAray = []
            let availableInvestmentSofarArray = []
            // 柱状图和折线图的混合图
            let totalInvestmentMix = []
            let investmentSofarMix = []
            let availableInvestmentSofarMix = []
            data.map((item, index) => {
                legend.push(item.name)
                totalInvestmentArray.push({name: item.name, value: item.totalInvestment})
                investmentSofarAray.push({name: item.name, value: item.investmentSofar})
                availableInvestmentSofarArray.push({name: item.name, value: item.availableInvestmentSofar})
                totalInvestmentMix.push(item.totalInvestment)
                investmentSofarMix.push(item.investmentSofar)
                availableInvestmentSofarMix.push(item.availableInvestmentSofar)
            })
            let investment = {
                totalInvestment: totalInvestmentMix,
                investmentSofar: investmentSofarMix,
                availableInvestmentSofar: availableInvestmentSofarMix
            }
            return {
                legend: legend,
                totalInvestment: totalInvestmentArray,
                investmentSofar: investmentSofarAray,
                availableInvestmentSofar: availableInvestmentSofarArray,
                investment: investment
            }
        },
        initPie(id, name, legendData, investmentData) {
            let myChart = Echarts.init(document.getElementById(id))
            let option = {
                title: {
                    text: name,
                    subtext: '纯属虚构',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: legendData || ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
                },
                series: [
                    {
                        name: name,
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        label: {
                            show: false
                        },
                        data: investmentData || [
                            {value: 335, name: '直接访问'},
                            {value: 310, name: '邮件营销'},
                            {value: 234, name: '联盟广告'},
                            {value: 135, name: '视频广告'},
                            {value: 1548, name: '搜索引擎'}
                        ],
                        // data: [335, 310, 234, 135, 1548],
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
            myChart.setOption(option, true)
            return myChart
        },
        initRadar(radarData) {
            let data = radarData || this.statusData
            let max = 0
            let dataArray = []
            let indicator = []
            let nameArray = []
            let totalProject = 0
            data.map((item, index) => {
                dataArray.push(item.value)
                nameArray.push(item.name)
                totalProject += item.value
                if (item.value > max) {
                    max = item.value
                }
            })
            this.statusArray = nameArray
            data.map((item, index) => {
                indicator.push({
                    name: item.name + ':' + (item.value / totalProject * 100).toFixed(1) + '%',
                    // name: item.name,
                    max: max + 20
                })
            })
            let option = {
                title: {
                    // text: '项目状态图'
                },
                tooltip: {
                    formatter: this.formatterRadarTip
                },
                legend: {
                    data: ['各阶段状态']
                },
                radar: {
                    // shape: 'circle',
                    name: {
                        textStyle: {
                            color: '#fff',
                            backgroundColor: '#999',
                            borderRadius: 3,
                            padding: [3, 5]
                    }
                    },
                    indicator: indicator
                },
                series: [{
                    name: '项目状态图',
                    type: 'radar',
                    data: [{
                        value: dataArray,
                        name: '项目状态分布'
                    }]
                }]
            }
            let myChart = Echarts.init(document.getElementById('project_status'))
            myChart.setOption(option)
            this.statusChart = myChart
        },
        initMap() {
            Echarts.registerMap('sinan', guizhou)
            let myChart = Echarts.init(document.getElementById('investment_per_year'))
            let option = {
                tooltip: {
                    // formatter: '{a} <br/>{b} : {c} ({d}%)'
                    formatter: this.formatMapLabel
                },
                /* geo: {
                    map: 'sinan',
                    label: {
                        normal: {
                            show: true,
                            formatter: '{b}',
                            position: 'right'
                        }
                    }
                }, */
                series: [{
                    type: 'map',
                    map: 'sinan',
                    label: {
                        normal: {
                            show: true,
                            formatter: '{b}',
                            position: 'right'
                        }
                    },
                    data: [
                        {name: '贵阳市', value: 1008},
                        {name: '遵义', value: 3002},
                        {name: '铜仁', value: 1365},
                        {name: '毕节地区', value: 659}
                    ]
                }]
            }
            myChart.setOption(option)
            myChart.on('click', () => {
                console.log('clickMap')
            })
        },
        conver3DJson(mapJson, colors) {
            let features = mapJson.features
            let regionsStyle = []
            let coordinate = {}
            features.map((item, index) => {
                // 给不同区域块着色
                let properties = item.properties
                let regionStyle = {
                    name: properties.name,
                    itemStyle: {
                            color: colors[index],
                            opacity: 1,
                            borderWidth: 0.4,
                            borderColor: '#5F9EA0'
                    }
                }
                regionsStyle.push(regionStyle)
                // 过滤出各地区的坐标信息
                coordinate[properties.name] = properties.cp
            })
            return {
                geoCoordMap: coordinate,
                regionsStyle: regionsStyle
            }
        },
        init3D(name, regionJson, regionData) {
            // 处理悬浮面板数据
            this.allRegionInvsetment = JSON.parse(JSON.stringify(regionData))
            let colors = ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
            // console.log('所有带投资数据', JSON.stringify(regionData))
            // 地区数据渲染
            let renderData = this.conver3DJson(regionJson, colors)
            let geoCoordMap = renderData.geoCoordMap
            let convertData = function(data) {
                let res = JSON.parse(JSON.stringify(data))
                for (let i = 0; i < res.length; i++) {
                    let geoCoord = geoCoordMap[res[i].name]
                    if (geoCoord) {
                        /* res.push({
                            name: data[i].name,
                            value: geoCoord.concat(data[i].value)
                        }) */
                        res[i].value = geoCoord.concat(res[i].value)
                    }
                }
                return res
            }
            // 图形初始化
            let myChart = Echarts.init(document.getElementById('3d_echart'))
            myChart.showLoading()
            Echarts.registerMap('regionArea', regionJson)
            myChart.hideLoading()
            let option = {
                // backgroundColor: '#fff',
                title: { // 标题
                    top: '5%',
                    text: '区域总投资',
                    subtext: '',
                    x: 'center',
                    textStyle: {
                        color: '#666'
                    }
                },
                tooltip: { // 提示框
                    trigger: 'item',
                    formatter: this.formatter3DLabel
                },
                visualMap: {
                    show: false,
                    min: 0,
                    max: 15,
                    inRange: {
                        color: colors
                        // color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
                        // color: ['#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80', '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa', '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050', '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089']
                    }
                },
                geo3D: {
                    type: 'map3D', // 系列类型
                    name: 'map3D', // 系列名称
                    map: 'regionArea', // 地图类型。echarts-gl 中使用的地图类型同 geo 组件相同(ECharts 中提供了两种格式的地图数据，一种是可以直接 script 标签引入的 js 文件，引入后会自动注册地图名字和数据。还有一种是 JSON 文件，需要通过 AJAX 异步加载后手动注册。)
                    shading: 'realistic',
                    itemStyle: {
                        color: '#1d5e98',
                        opacity: 1,
                        borderWidth: 0.4,
                        borderColor: '#000'
                    },
                    /* regions: [
                        { // 可对单个地图区域进行设置
                        name: '贵阳市', // 所对应的地图区域的名称
                        itemStyle: { // 单个区域的样式设置
                            color: '#313695',
                            opacity: 1,
                            borderWidth: 0.4,
                            borderColor: '#5F9EA0'
                        }
                    }, {
                        name: '遵义市',
                        itemStyle: {
                            color: '#4575b4',
                            opacity: 1,
                            borderWidth: 0.4,
                            borderColor: '#5F9EA0'
                        }
                    }, {
                        name: '铜仁地区',
                        itemStyle: {
                            color: '#74add1',
                            opacity: 1,
                            borderWidth: 0.4,
                            borderColor: '#5F9EA0'
                        }
                    }], */
                    regions: renderData.regionsStyle,
                    realisticMaterial: {
                        textureTiling: 10,
                        roughness: 1,
                        // metalness: 1,
                        roughnessAdjust: 1
                    },
                    label: { // 标签的相关设置
                        show: true, // (地图上的城市名称)是否显示标签 [ default: false ]
                        textStyle: { // 标签的字体样式
                            color: '#fff', // 地图初始化区域字体颜色
                            fontSize: 8, // 字体大小
                            opacity: 1, // 字体透明度
                            backgroundColor: 'rgba(0,23,11,0)' // 字体背景色
                        }
                    },
                    light: {
                        main: {
                            intensity: 1,
                            shadow: true,
                            alpha: 150,
                            beta: 70
                        },
                        ambient: {
                            intensity: 0
                        },
                        ambientCubemap: {
                            diffuseIntensity: 1
                            // texture: '/asset/get/s/data-1497251035660-HkVJTnsMW.hdr'
                        }
                    },
                   /*  groundPlane: {
                        show: true,
                        color: '#fff'
                    }, */
                    postEffect: {
                        enable: true,
                        colorCorrection: {
                            lookupTexture: '/asset/get/s/data-1497261115431-B1XrEJ2f-.jpg'
                        }
                    },
                    data: (regionData && regionData.children.length > 0) ? regionData.children : []
                },
                series: [{
                    name: 'bar3D',
                    type: 'bar3D',
                    coordinateSystem: 'geo3D',
                    barSize: 3, // 柱子粗细
                    shading: 'lambert',
                    opacity: 1,
                    bevelSize: 0.3,
                    label: {
                        show: false,
                        formatter: ''
                    },
                    data: (regionData && regionData.children.length > 0) ? convertData(regionData.children) : []
                }]
            }
            myChart.clear()
            myChart.setOption(option, true)
            let _this = this
            myChart.off('click')
            // 处理点击事件并且跳转到相应的百度搜索页面
            myChart.on('click', function (params) {
                var subSystem = params.name
                let oldName = _this.cityItem
                _this.cityItem = subSystem
                _this.initCityJson(subSystem, params.data, oldName)
                let regionData = params.data
                if (regionData && regionData.children && regionData.children.length > 0) {
                    let items = regionData
                    // 初始化矩形图
                    _this.initRectangle(items)
                    // 初始化混合图
                    let chartData = _this.getMixEchartData(items.children)
                    _this.initMixEchart(chartData)
                    // 初始化项目状态图
                    _this.initRadar(_this.amountStatus(items))
                    // 初始化饼图
                    // let status = _this.getStatusEchartData(items)
                    // _this.initStatusEchart(status)
                }
            })
            this.map3D = myChart
        },
        initGraph(data) {
            let size = 70
            let seriesData = [{
                    'name': '项目开始',
                    x: 290,
                    y: 260,
                    'symbolSize': size,
                    'category': '项目开始',
                    'draggable': 'true',
                    'value': 0
                }, {
                    'name': '前期工作',
                    'value': 0,
                    x: 140,
                    y: 260,
                    'symbolSize': size,
                    'category': '前期工作',
                    'draggable': 'true'
                }, {
                    x: 140,
                    y: 140,
                    'name': '施工准备',
                    'symbolSize': size,
                    'category': '施工准备',
                    'draggable': 'true',
                    'value': 0
                }, {
                    x: 260,
                    y: 140,
                    'name': '三通一平',
                    'symbolSize': size,
                    'category': '三通一平',
                    'draggable': 'true',
                    'value': 0
                }, {
                    x: 260,
                    y: 230,
                    'name': '大坝开挖',
                    'symbolSize': size,
                    'category': '大坝开挖',
                    'draggable': 'true',
                    'value': 0
                }, {
                    x: 170,
                    y: 230,
                    'name': '大坝填筑',
                    'symbolSize': size,
                    'category': '大坝填筑',
                    'draggable': 'true',
                    'value': 0
                }, {
                    x: 170,
                    y: 170,
                    'name': '蓄水准备',
                    'symbolSize': size,
                    'category': '蓄水准备',
                    'draggable': 'true',
                    'value': 0
                }, {
                    x: 230,
                    y: 170,
                    'name': '蓄水验收',
                    'symbolSize': size,
                    'category': '蓄水验收',
                    'draggable': 'true',
                    'value': 0
                }, {
                    x: 230,
                    y: 200,
                    'name': '通水验收',
                    'symbolSize': size,
                    'category': '通水验收',
                    'draggable': 'true',
                    'value': 0
                }, {
                    x: 200,
                    y: 200,
                    'name': '项目完结',
                    'symbolSize': size,
                    'category': '项目完结',
                    'draggable': 'true',
                    'value': 0
                }
            ]
            let lineData = []
            if (data && data.length > 0) {
                seriesData.map((item, index) => {
                    let obj = Object.assign(item, data[index])
                    lineData.push(data[index] ? data[index].value : 0)
                    return obj
                })
            }
            let legend = ['项目开始', '前期工作', '施工准备', '三通一平', '大坝开挖', '大坝填筑', '蓄水准备', '蓄水验收', '通水验收', '项目完结']
            let option = {
                /* backgroundColor: new Echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
                    offset: 0,
                    color: '#f7f8fa'
                }, {
                    offset: 1,
                    color: '#cdd0d5'
                }]), */
                title: {
                    subtext: '各状态数量统计',
                    text: '项目状态',
                    top: 'top',
                    left: 'left',
                    show: false
                },
                tooltip: {},
                legend: [{
                    show: false,
                    tooltip: {
                        show: true
                    },
                    selectedMode: 'false',
                    top: 60,
                    data: legend
                }],
                toolbox: {
                    show: false,
                    feature: {
                        restore: {
                            show: true
                        },
                        saveAsImage: {
                            show: true
                        }
                    }
                },
                grid: [
                    {x: '65%', y: '7%', width: '30%', height: '90%'}
                ],
                xAxis: [
                    {gridIndex: 0, axisTick: {show: false}, axisLabel: {show: false}, splitLine: {show: false}, axisLine: {show: false}}
                ],
                yAxis: [
                    {
                        gridIndex: 0,
                        interval: 0,
                        data: legend.reverse(),
                        axisTick: {show: false},
                        axisLabel: {show: true},
                        splitLine: {show: false},
                        axisLine: {show: true, lineStyle: { color: '#999' }}
                    }
                ],
                series: [{
                    name: '阶段数目',
                    type: 'graph',
                    layout: 'none',
                    /* force: {
                        repulsion: 500,
                        gravity: 0.1,
                        edgeLength: 100,
                        layoutAnimation: true
                    }, */
                    edgeSymbol: ['circle', 'arrow'],
                    edgeSymbolSize: [10, 20],
                    data: seriesData,
                    right: '50%',
                    left: '10%',
                    top: '10%',
                    bottom: '10%',
                    // height: '100%',
                    // width: '50%',
                    links: [{
                        'source': '项目开始',
                        'target': '前期工作'
                    }, {
                        'source': '前期工作',
                        'target': '施工准备'
                    }, {
                        'source': '施工准备',
                        'target': '三通一平'
                    }, {
                        'source': '三通一平',
                        'target': '大坝开挖'
                    }, {
                        'source': '大坝开挖',
                        'target': '大坝填筑'
                    }, {
                        'source': '大坝填筑',
                        'target': '蓄水准备'
                    }, {
                        'source': '蓄水准备',
                        'target': '蓄水验收'
                    }, {
                        'source': '蓄水验收',
                        'target': '通水验收'
                    }, {
                        'source': '通水验收',
                        'target': '项目完结'
                    }],
                    categories: [{
                        'name': '项目开始'
                    }, {
                        'name': '前期工作'
                    }, {
                        'name': '施工准备'
                    }, {
                        'name': '三通一平'
                    }, {
                        'name': '大坝开挖'
                    }, {
                        'name': '大坝填筑'
                    }, {
                        'name': '蓄水准备'
                    }, {
                        'name': '蓄水验收'
                    }, {
                        'name': '通水验收'
                    }, {
                        'name': '项目完结'
                    }],
                    roam: false,
                    label: {
                        normal: {

                            show: true,
                            position: 'inside',
                            formatter: '{b}\n{c}',
                            fontSize: 16,
                            fontStyle: '600'
                        }
                    },
                    lineStyle: {
                        normal: {
                            width: 6,
                            color: 'source',
                            curveness: 0,
                            type: 'solid'
                        }
                    }
                }, {
                    name: '阶段',
                    type: 'bar',
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                    barWidth: '45%',
                    itemStyle: {normal: {color: '#ddb926'}},
                    label: {
                        normal:
                        {show: true, position: 'right', textStyle: {color: '#9EA7C4'}}},
                    data: lineData.reverse()
                }]
            }
            let myChart = Echarts.init(document.getElementById('reservoir_status'))
            myChart.setOption(option)

            myChart.on('click', node => {
                let data = node.data
                console.log(data)
            })
        },
        initLineArea(data) {
            let seriesData = []
            let xdata = []
            for (let key in data) {
                xdata.push(key)
                seriesData.push(data[key].length)
            }
            let option = {
                grid: {
                    left: 30,
                    right: 50,
                    top: 50,
                    bottom: 30,
                    containLabel: true
                },
                tooltip: {
                    formatter: '{a}<br>{b}: {c}'
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: true,
                    data: xdata
                },
                yAxis: {
                    name: '单位（个）',
                    nameGap: 24,
                    nameTextStyle: {
                        color: '#000',
                        fontSize: 14
                    },
                    type: 'value',
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#000',
                            opacity: 0.2
                        }
                    }
                },
                series: [{
                    name: '在建水库数',
                    data: seriesData,
                    type: 'line',
                    // symbol: 'circle',
                    symbolSize: 12,
                    color: '#ccc',
                    lineStyle: {
                        color: '#ffd700'
                    },
                    smooth: true,
                    label: {
                        show: true,
                        position: 'top',
                        textStyle: {
                            color: '#FEC201',
                            fontSize: 18,
                            fontWeight: 'bold'
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: {
                                type: 'linear',
                                colorStops: [{
                                    offset: 0,
                                    color: 'rgba(218,185,7,0.8)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(218,185,7,0.1)'
                                }]
                            }
                        }
                    },
                    markLine: {
                        data: [{
                            type: 'average',
                            name: '平均值'
                        }],
                        precision: 0,
                        label: {
                            normal: {
                                formatter: '平均值: \n {c}'
                            }
                        },
                        lineStyle: {
                            normal: {
                                color: '#ffd700'
                            }
                        }
                    }
                }]
            }
            let myChart = Echarts.init(document.getElementById('project_time'))
            myChart.setOption(option)
            this.lineScatter = myChart
        },
        formatMapLabel() {
        },
        rebuildData(regionData) {
            if (regionData && regionData.length > 0) {
                regionData.map((item, index) => {
                    item.value = item.totalInvestment || index
                    item.name = item.regionName
                    if (item.children && item.children.length > 0) {
                        this.rebuildData(item.children)
                    }
                })
            }
            return regionData
        },
        getAllRegionData(regionId, times) {
            let num = 1
            let regionList = {}
            let promiseItem = (regionId, time, regionMap) => {
               let thisRequest = this.getInvestment(regionId).then(res => {
                    regionMap = Object.assign(regionMap, res.data)
                    this.regionData = regionList
                    let children = res.data.children
                    let amount = time + 1
                    if (children && children.length && amount < times) {
                        children.map((item, index) => {
                            let id = item.regionId
                            if (amount === times - 1) {
                                this.defList.push(new Promise((resolve, reject) => {
                                    promiseItem(id, amount, item).then(result => {
                                        resolve()
                                    })
                                }))
                            } else {
                                promiseItem(id, amount, item)
                            }
                        })
                    }
                })
                return thisRequest
            }
            return promiseItem(regionId, num, regionList)
        },
        searchData(name) {
            let regionData = this.regionData
            let returnData = []
            let search = (name, data) => {
                for (let i = 0; i < data.length; i++) {
                    if (returnData && returnData.length > 0) {
                        break
                    }
                    if (data[i].name === name) {
                        returnData = data[i].children
                        break
                    } else {
                        if (data[i].children) {
                            search(name, data[i].children)
                        }
                    }
                }
            }
            search(name, regionData)
            return returnData
        },
        rebuildStatus(data) {
            let status = []
            for (let i = 0; i < data.length; i++) {
                switch (data[i].stateId) {
                    case 1:
                        status[0] = data[i]
                        break
                    case 2:
                        status[1] = data[i]
                        break
                    case 3:
                        status[2] = data[i]
                        break
                    case 4:
                        status[3] = data[i]
                        break
                    case 5:
                        status[4] = data[i]
                        break
                    case 6:
                        status[5] = data[i]
                        break
                    case 7:
                        status[6] = data[i]
                        break
                    case 8:
                        status[7] = data[i]
                        break
                    case 9:
                        status[8] = data[i]
                        break
                    case 10:
                        status[9] = data[i]
                        break
                    default:
                        break
                }
            }
            return status
        },
        getMixEchartData(data) {
            let regions = []
            // 柱状图
            let totalInvestment = []
            let investmentSofar = []
            let availableInvestmentSofar = []
            let max = 0
            let maxLine = 0
            for (let i = 0; i < data.length; i++) {
                let total = data[i].totalInvestment
                let available = data[i].availableInvestmentSofar
                let investment = data[i].investmentSofar
                regions.push(data[i].regionName)
                totalInvestment.push(total)
                investmentSofar.push(investment)
                availableInvestmentSofar.push(available)
                if (parseFloat(total) > max) {
                    max = parseFloat(total)
                }
                if (parseFloat(investment) > max) {
                    max = parseFloat(investment)
                }
                if (parseFloat(available) > maxLine) {
                    maxLine = parseFloat(available)
                }
            }
            return {
                x: regions,
                totalInvestment: totalInvestment,
                investmentSofar: investmentSofar,
                availableInvestmentSofar: availableInvestmentSofar,
                max: max * 2,
                maxLine: maxLine * 2
            }
        },
        caculateTopValue(chartData) {
            let totalInvestment = JSON.parse(JSON.stringify(chartData.totalInvestment))
            let investmentSofar = JSON.parse(JSON.stringify(chartData.investmentSofar))
            let availableInvestmentSofar = JSON.parse(JSON.stringify(chartData.availableInvestmentSofar))
            let regions = chartData.x
            totalInvestment.sort((a, b) => {
                return a - b
            })
            investmentSofar.sort((a, b) => {
                return a - b
            })
            availableInvestmentSofar.sort((a, b) => {
                return a - b
            })
            // 最大总投资
            let rebuildInvestment = (sortData, data) => {
                let topValue = sortData[sortData.length - 1]
                let index = data.indexOf(topValue)
                let name = regions[index]
                return {
                    name: name,
                    investmentTop: topValue
                }
            }
            this.totalInvestmentTop = rebuildInvestment(totalInvestment, chartData.totalInvestment)
            this.investmentSofarTop = rebuildInvestment(investmentSofar, chartData.investmentSofar)
            this.availableInvestmentSofarTop = rebuildInvestment(availableInvestmentSofar, chartData.availableInvestmentSofar)
        },
        initMixEchart(chartData) {
            if (!chartData || Object.keys(chartData).length === 0) {
                chartData = {
                    x: ['贵阳市', '六盘水市', '遵义市', '安顺市', '毕节地区', '铜仁地区', '黔西南布依族苗族自治州', '黔东南苗族侗族自治州', '黔南布依族苗族自治州'],
                    totalInvestment: ['468522.12', '1808457.64', '1715567.58', '698600.98', '2544666.74', '1148453.13', '1371855.03', '1331477.22', '1170716.94'],
                    investmentSofar: [52921.07, 33538.34, 510555.03, 18624.97, 70750.71, 59460.18, 61688.91, 57967.42, 66741.14],
                    availableInvestmentSofar: [13167.1, 1000, 110148, 14738, 12737, 24395, 2300, 73150.7, 25560],
                    max: 5089333.48,
                    maxLine: 220296
                }
            }
            // 计算其中最大值
            this.caculateTopValue(chartData)
            let option = {
                // backgroundColor: '#FFFFFF',
                title: {
                    /* text: '投资信息',
                    subtext: '各地区投资统计（万元）', */
                    textStyle: {
                        color: '#666',
                        lineHeight: 56
                    },
                    left: '5',
                    top: '5'
                },
                tooltip: {
                    trigger: 'item',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'none' // 默认为直线，可选为：'line' | 'shadow'
                    },
                    formatter: this.mixFormatter
                },
                legend: {
                    data: ['总投资', '完成投资', '到位资金'],
                    // top: '5%',
                    left: 0,
                    top: 0,
                    align: 'right'
                },
                grid: {
                    left: '1%',
                    right: '5%',
                    top: '15%',
                    bottom: '3%',
                    containLabel: true,
                    show: false
                },
                toolbox: {
                    feature: {
                        dataView: {show: false, readOnly: false},
                        saveAsImage: {show: true}
                    },
                    show: false
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: true,
                    splitLine: {
                        show: true
                    },
                    data: chartData.x
                },
                yAxis: [
                {
                    // name: 'Revenue(10k)',
                    type: 'value',
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        formatter: '{value}'
                    }
                    // max: chartData.max
                }, {
                        // name: 'Growing\nRate (%)',
                        splitLine: {
                            show: false
                        },
                        min: 0,
                        // max: 300,
                        type: 'value',
                        inverse: false,
                        axisLine: {
                            lineStyle: {
                                color: '#2f4554'
                            }
                        }
                        // max: chartData.maxLine
                }],
                series: [
                    {
                        name: '总投资',
                        type: 'bar',
                        color: '#00BFFF',
                        barWidth: '22%',
                        barMaxWidth: '50',
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'}
                            ]
                        },
                        data: chartData.totalInvestment
                    },
                    {
                        name: '完成投资',
                        type: 'bar',
                        color: '#FFD700',
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'}
                            ]
                        },
                        data: chartData.investmentSofar
                    },
                    {
                        name: '到位资金',
                        type: 'line',
                        yAxisIndex: 1,
                        color: '#DC143C',
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'}
                            ]
                        },
                        data: chartData.availableInvestmentSofar
                    }
                ]
            }
            let myChart = Echarts.init(document.getElementById('item1_echart'))
            myChart.setOption(option, true)
            this.mapLine = myChart
            this.initInvestmentPie(chartData)
        },
        initInvestmentPie(chartData) {
            let rebuildData = (names, values) => {
                let newData = []
                for (let i = 0; i < values.length; i++) {
                    let item = {
                        name: names[i],
                        value: values[i]
                    }
                    newData.push(item)
                }
                return newData
            }
            let option = {
                // backgroundColor: '#FFFFFF',
                title: {
                    /* text: '地区投资占比',
                    subtext: '投资信息（万元）与占比',
                    textStyle: {
                        color: '#666',
                        lineHeight: 56
                    },
                    left: '5',
                    top: '5' */
                },
                color: ['#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80', '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa', '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050', '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089'],
                tooltip: {
                    trigger: 'item',
                    formatter: this.mixFormatter
                },
                legend: {
                    data: chartData.x,
                    // top: '5%',
                    // orient: 'vertical',
                    bottom: 0
                },
                /* graphic: {
                    elements: [{
                        type: 'text',
                        style: {
                            text: '总投资',
                            width: 80,
                            height: 50,
                            font: 'bolder 14px "Microsoft YaHei", sans-serif',
                            textAlign: 'center'
                        },
                        left: '23%',
                        top: '27%'
                    }, {
                        type: 'text',
                        style: {
                            text: '投资完成',
                            width: 80,
                            height: 50,
                            textAlign: 'center',
                            font: 'bolder 14px "Microsoft YaHei", sans-serif'
                        },
                        left: '25%',
                        top: '5%'
                    }, {
                        type: 'text',
                        style: {
                            text: '到位资金',
                            width: 80,
                            height: 50,
                            textAlign: 'center',
                            font: 'bolder 14px "Microsoft YaHei", sans-serif'
                        },
                        left: '72.5%',
                        top: '27%'
                    }]
                }, */
                toolbox: {
                    feature: {
                        dataView: {show: false, readOnly: false},
                        saveAsImage: {show: true}
                    },
                    show: false
                },
                series: [
                    {
                        name: '总投资情况',
                        type: 'pie',
                        // radius: '25%',
                        center: ['80%', '50%'],
                        radius: ['43%', '58%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '12',
                                    fontWeight: 'bold'
                                },
                                formatter: '{b}\n{c}({d}%)'
                            }
                        },
                        data: rebuildData(chartData.x, chartData.totalInvestment),
                        // data: [335, 310, 234, 135, 1548],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    },
                    {
                        name: '投资完成情况',
                        type: 'pie',
                        // radius: '25%',
                        center: ['20%', '50%'],
                        radius: ['43%', '58%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: true,
                                formatter: '{b}({d}%)'
                                // position: 'center'
                            }
                            /* emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '12',
                                    fontWeight: 'bold'
                                },
                                formatter: '{b}\n{c}({d}%)'
                            } */
                        },
                        data: rebuildData(chartData.x, chartData.investmentSofar) || [
                            {value: 335, name: '直接访问'},
                            {value: 310, name: '邮件营销'},
                            {value: 234, name: '联盟广告'},
                            {value: 135, name: '视频广告'},
                            {value: 1548, name: '搜索引擎'}
                        ],
                        // data: [335, 310, 234, 135, 1548],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    },
                    {
                        name: '资金到位情况',
                        type: 'pie',
                        // radius: '25%',
                        center: ['50%', '50%'],
                        radius: ['43%', '58%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '12',
                                    fontWeight: 'bold'
                                },
                                formatter: '{b}\n{c}({d}%)'
                            }
                        },
                        data: rebuildData(chartData.x, chartData.availableInvestmentSofar),
                        // data: [335, 310, 234, 135, 1548],
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
            let myChart = Echarts.init(document.getElementById('investment_pie'))
            myChart.setOption(option, true)
            this.mapPie = myChart
        },
        getStatusEchartData(data) {
            let stateIds = []
            let status = []
            data.map(item => {
                if (item.reservoirs && item.reservoirs.length > 0) {
                    let reservoirs = item.reservoirs
                    reservoirs.map(reservoir => {
                        let plantStateVO = reservoir.plantStateVO
                        let index = stateIds.indexOf(plantStateVO.stateId)
                        if (index > -1) {
                            status[index].value += 1
                        } else {
                            stateIds.push(plantStateVO.stateId)
                            let obj = {
                                name: plantStateVO.type,
                                value: 1
                            }
                            status.push(obj)
                        }
                    })
                }
            })
            return status
        },
        initStatusEchart(chartData) {
            let option = {
                // backgroundColor: '#FFFFFF',
                /* title: {
                    text: '项目阶段统计',
                    subtext: '各阶段水库数（个）'
                }, */
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    x: 'right',
                    itemWidth: 14,
                    itemHeight: 14,
                    align: 'left',
                    show: false
                },
                series: [
                    {
                        name: '水库数量',
                        type: 'pie',
                        radius: ['0', '45%'],
                        color: ['#0092ff', '#eba954', '#21b6b9', '#60a900', '#01949b', ' #f17677', '#d74e67', '#0092ff', '#eba954', '#21b6b9', '#60a900', '#01949b', '#f17677', '#d74e67'],
                        label: {
                            normal: {
                                formatter: '{b}\n{d}%'
                            }
                        },
                        data: chartData
                    }
                ]
            }
            let myChart = Echarts.init(document.getElementById('region_investment'))
            myChart.setOption(option, true)
        },
        amountStatus(regionData) {
            let citys = regionData.children
            // 统计各地区总投资和各阶段水库数
            let stateIds = []
            let status = []
            let statusValue = []
            let names = ['项目开始', '前期工作', '施工准备', '三通一平', '大坝开挖', '大坝填筑', '蓄水准备', '蓄水验收', '通水验收', '项目完结']
            let filterReservoirs = (item) => {
                let flag = item.reservoirs && item.reservoirs.length > 0
                if (flag) {
                    item.reservoirs.map(reservoir => {
                        // investment += reservoir.totalInvestment
                        let plantStateVO = reservoir.plantStateVO
                        let index = stateIds.indexOf(plantStateVO.stateId)
                        if (index > -1) {
                            status[index].value += 1
                        } else {
                            stateIds.push(plantStateVO.stateId)
                            let obj = {
                                name: plantStateVO.type,
                                value: 1
                            }
                            status.push(obj)
                        }
                    })
                }
                return flag
            }
            citys.map(item => {
                // let investment = 0
                let children = item.children
                let reservoirs = item.reservoirs
                if (reservoirs && reservoirs.length > 0) {
                    filterReservoirs(item)
                } else if (children && children.length > 0) {
                    children.filter(child => {
                       filterReservoirs(child)
                    })
                }
                return item
            })
            let radarData = []
            let amount = 0
            names.map((name, index) => {
                let findData = status.find(item => {
                    return item.name === name
                })
                let value = findData ? findData.value : 0
                statusValue[index] = value
                amount += parseInt(value)
                radarData.push({
                    name: name,
                    value: value
                })
            })
            this.totalStatus = amount
            this.status = statusValue
            return radarData
            // console.log('状态统计', status)
        },
        initCityJson(subSystem, data, oldName) {
            let _this = this
            // 根据点击地图区域的名称,获取对应的3D地图
            if (subSystem === '贵州') {
                _this.init3D('贵州', guizhou, data)
            } else if (subSystem === '贵阳市') {
                _this.init3D('贵阳市', guiyang, data)
            } else if (subSystem === '遵义市') {
                _this.init3D('遵义市', zunyi, data)
            } else if (subSystem === '毕节地区') {
                _this.init3D('毕节地区', bijie, data)
            } else if (subSystem === '六盘水市') {
                let leftData = data.children.find(item => {
                    return (item.name.indexOf('盘州市') > -1)
                })
                let mapData = data.children.filter(item => {
                    return (item.name.indexOf('盘州市') < 0)
                })
                mapData.map(item => {
                    if (item.name === '盘县') {
                        if (!item.reservoirs) {
                            item.reservoirs = []
                        }
                        item.availableInvestmentSofar += leftData.availableInvestmentSofar
                        item.investmentSofar += leftData.investmentSofar
                        item.totalInvestment += leftData.totalInvestment
                        item.value += leftData.value
                        item.reservoirs = item.reservoirs.concat(leftData.reservoirs || [])
                    }
                    return item
                })
                _this.init3D('六盘水市', liupanshui, data)
            } else if (subSystem === '安顺市') {
                _this.init3D('安顺市', anshun, data)
            } else if (subSystem === '铜仁地区') {
                _this.init3D('铜仁地区', tongren, data)
            } else if (subSystem === '黔南布依族苗族自治州') {
                _this.init3D('黔南布依族苗族自治州', qiannan, data)
            } else if (subSystem === '黔东南苗族侗族自治州') {
                _this.init3D('黔东南苗族侗族自治州', qiandongnan, data)
            } else if (subSystem === '黔西南布依族苗族自治州') {
                _this.init3D('黔西南布依族苗族自治州', qianxinan, data)
            } else {
                _this.cityItem = oldName
            }
        },
        initAllTopEchart(data) {
            let citys = data || this.regionReservoir
            this.cityItem = ''
            // 初始化地图
            // this.init3D('贵州', guizhou, citys)
            this.initCityJson(this.regionData.name, citys)
            // 初始化矩形图
            this.initRectangle(citys)
            // 统计折线图数据
            this.initMixEchart(this.getMixEchartData(citys.children))
            // 统计项目状态图
            this.initRadar(this.amountStatus(citys))
            // this.initStatusEchart(status)
        },
        rebuildRegionReservoirs(regionlist, reservoirlist) {
            let regionReservoir = JSON.parse(JSON.stringify(regionlist))
            let filterFun = (data) => {
                data.map(item => {
                    // let investment = 0
                    let itemlist = reservoirlist.filter((reservoir) => {
                        let flag = reservoir.regionId === item.regionId
                        // if (flag) {
                        //     investment += parseFloat(reservoir.totalInvestment)
                        // }
                        return flag
                    })
                    // item.totalInvestment = investment
                    item.reservoirs = itemlist
                    // 迭代
                    if (item.children && item.children.length > 0) {
                        filterFun(item.children)
                    }
                    return item
                })
            }
            filterFun(regionReservoir.children)
            // let citys = JSON.parse(JSON.stringify(regionReservoir))
            regionReservoir.children.map(item => {
                if (item.regionName.indexOf('毕节') > -1) {
                    item.regionName = '毕节地区'
                } else if (item.regionName.indexOf('铜仁') > -1) {
                    item.regionName = '铜仁地区'
                }
                item.name = item.regionName
                return item
            })
            this.regionReservoir = regionReservoir
            return regionReservoir
        },
        mixFormatter(value) {
           if (value.percent) {
               return value.seriesName + '<br>' + '<span>' + value.name + ':' + (value.data.value || value.data) + ' 万元(' + value.percent.toFixed(2) + '%)' + '</span>'
           } else {
               return value.seriesName + '<br>' + '<span>' + value.name + ':' + (value.data.value || value.data) + ' 万元</span>'
           }
        },
        formatterLabel(params) {
            let arr = [
                '{name|' + params.name + '}',
                '{hr|}',
                '{label|总投资} {budget|$ ' + Echarts.format.addCommas(params.data.totalInvestment) + '}',
                '{label|完成投资} {small|$ ' + Echarts.format.addCommas(params.data.investmentSofar) + '}',
                '{label|到位资金} {household|$ ' + Echarts.format.addCommas(params.data.availableInvestmentSofar) + '}'
            ]
            return arr.join('\n')
        },
        formatterTooltip(params) {
            let arr = [
            '<i class="fa fa-map-marker fa-lg" style="color:red"></i> ' + params.name,
                '<span style="color:yellow;">总投资：￥' + params.data.totalInvestment + '</span>',
                '<span style="color:#698fcc;">完成投资：￥' + params.data.investmentSofar + '</span>',
                '<span style="color:#ccc;">到位资金：￥' + params.data.availableInvestmentSofar + '</span>'
            ]
            return arr.join('<br>')
        },
        formatter3DLabel(params) {
            let str = [
                `<span style="font-size:16px;font-weight: 16px;line-height: 25px;">${params.name}</span>`,
                '<br>',
                `总投资：<span style="font-size:16px;font-weight: 16px;line-height: 16px;color: #fffb83">${params.value[2]}</span>`
            ]
            // return `${params.name}\n总投资：${params.value[2]}`
            return str.join('')
        },
        getDuringReservoirs(startDate, endDate) {
            let during = {
                startDate: startDate,
                endDate: endDate
            }
            let thisRequest = this.$http.get('/api/baseinfo/annualconstruction', {
                params: during
            })
            return thisRequest
        },
        countReservoirs(data) {
            let yearReservoirs = {}
            let yearArray = []
            data.map(item => {
                if (item.commenceDate) {
                    let date = new Date(item.commenceDate.replace('-', '/'))
                    // let dateStr = item.commenceDate.substr(0, item.commenceDate.indexOf('T'))
                    // let date = new Date(dateStr.replace('-', '/'))
                    let year = date.getFullYear()
                    let index = yearArray.indexOf(year)
                    if (index > -1) {
                        yearReservoirs[year].push(item)
                    } else {
                        yearArray.push(year)
                        yearReservoirs[year] = [item]
                    }
                }
            })
            return yearReservoirs
        },
        formatterRadarTip(item) {
            let label = []
            let data = item.data.value
            let sum = 0
            data.map(value => {
                sum += value
            })
            let name = this.statusArray
            item.value.map((n, index) => {
                label.push(name[index] + ': ' + n + ' (' + (n / sum * 100).toFixed(2) + '%)')
            })
            return label.join('<br>')
        },
        loading(domStr) {
            let loading = this.$loading({
                lock: true,
                text: '拼命加载中',
                background: '#fff',
                target: domStr
            })
            return loading
        },
        regroupEQData(data) {
            let regroupData = {}
            let sentimentLsit = []
            data.map((item, index) => {
                if (item) {
                    let detail = item.items
                    if (detail && detail.length > 0) {
                        let sentiment = detail[0].sentiment
                        let index = sentimentLsit.indexOf(sentiment)
                        if (index > -1) {
                            regroupData[sentiment].push(item)
                        } else {
                            sentimentLsit.push(sentiment)
                            regroupData[sentiment] = [item]
                        }
                    }
                }
            })
            return regroupData
        },
        get3DScatterData(data) {
            let chartData = []
            data.map(item => {
                if (item) {
                    let itemData = item.items[0]
                    let chartItem = [itemData.confidence, itemData.positive_prob, itemData.negative_prob, item.text]
                    chartData.push(chartItem)
                }
            })
            return chartData
        },
        formatScatter(item) {
            let arr = [
                '<span style="float:left">置信：' + item.value[0] + '</span>',
                '<span style="float:left">积极：' + item.value[1] + '</span>',
                '<span style="float:left">消极：' + item.value[2] + '</span>'
            ]
            return arr.join('<br>')
        },
        init3DScatter(data) {
            let text = ['置信', '积极', '消极', '样本']
            data.splice(0, 0, text)
            let symbolSize = 5
            let option = {
                grid3D: {},
                tooltip: {
                    formatter: this.formatScatter,
                    textStyle: {
                        textAlign: 'center'
                    }
                },
                xAxis3D: {
                    name: '置信',
                    type: 'category',
                    nameTextStyle: {
                        color: '#8d98b3'
                    }
                },
                yAxis3D: {
                    name: '积极',
                    nameTextStyle: {
                        color: '#5ab1ef'
                    }
                },
                zAxis3D: {
                    name: '消极',
                    nameTextStyle: {
                        color: '#f3c172'
                    }
                },
                dataset: {
                    dimensions: text,
                    source: text.concat(data)
                },
                visualMap: [{
                    show: false,
                    inRange: {
                        color: ['#1710c0', '#0b9df0', '#00fea8', '#00ff0d', '#f5f811', '#f09a09', '#fe0300']
                    }
                }],
                series: [
                    {
                        type: 'scatter3D',
                        symbolSize: symbolSize,
                        encode: {
                            x: '置信',
                            y: '积极',
                            z: '消极',
                            tooltip: [0, 1, 2, 4, 5]
                        }
                    }
                ]
            }
            let myChart = Echarts.init(document.getElementById('project_eq'))
            myChart.setOption(option)
            this.eqChart = myChart
        },
        initEQPie(data) {
            let option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    top: '5%',
                    right: '5%',
                    data: ['正向', '中性', '负向']
                },
                color: ['#5ab1ef', '#8d98b3', '#f3c172'],
                series: [
                    {
                        name: '情感趋向',
                        type: 'pie',
                        radius: '80%',
                        center: ['40%', '50%'],
                        data: data,
                        roseType: 'radius',
                        label: {
                            normal: {
                                formatter: '{b}:{c}'
                            }
                        }
                    }
                ]
            }
            let myChart = Echarts.init(document.getElementById('eq_pie'))
            myChart.setOption(option)

            myChart.on('click', (node) => {
                let data = node.data
                let itemData = data.item
                this.tableData = itemData
                let eqChartData = this.get3DScatterData(itemData)
                this.init3DScatter(eqChartData)
            })
        },
        getEQPieData(data) {
            let chartData = []
            for (let key in data) {
                let name = ''
                if (key === 0 || key === '0') {
                    name = '正向'
                } else if (key === 1 || key === '1') {
                    name = '中性'
                } else {
                    name = '负向'
                }
                let item = {
                    name: name,
                    value: data[key].length,
                    item: data[key]
                }
                chartData.push(item)
            }
            return chartData
        },
        formatSentiment(rowData, option, value) {
            let str = ''
            if (value === 0 || value === '0') {
                str = '正向'
            } else if (value === 1 || value === '1') {
                str = '中性'
            } else {
                str = '负向'
            }
            return str
        }
    },
    mounted() {
        this.regionMapLoading = this.loading('.region-map')
        this.investmentAreaLoading = this.loading('.investment-area ')
        this.statusAreaLoading = this.loading('.status-area')
        this.yearReservoirLoading = this.loading('.year-reservoir')
        this.eqChartLoading = this.loading('.eq-block')
        // -----------------------运行内容---------------------------
        let user = this.$store.getters.getUser
        if (user) {
            let regionId = user.regionId
            // let regionId = 4
            if (regionId && regionId !== 1 && regionId !== '1') {
                this.defList.push(this.getAllRegionData(regionId, 2))
            } else {
                this.getAllRegionData(1, 3)
            }
        } else {
            this.getAllRegionData(1, 3)
        }

        let allReservoir = this.getAllReservoir()
        this.allReservoir = allReservoir
        // 获取阶段水库详细信息
        allReservoir.then(res => {
            let statusReservoir = []
            let statusIds = []
            for (let i = 0; i < res.length; i++) {
                let reservoir = res[i]
                if (reservoir.plantStateVO && reservoir.plantStateVO.stateId) {
                    let stateId = reservoir.plantStateVO.stateId
                    let index = statusIds.indexOf(stateId)
                    if (index > -1) {
                        statusReservoir[index].reservoirs.push(reservoir)
                        statusReservoir[index].value += 1
                    } else {
                        let statusItem = JSON.parse(JSON.stringify(reservoir.plantStateVO))
                        statusItem.value = 1
                        statusItem.reservoirs = [reservoir]
                        statusReservoir.push(statusItem)

                        statusIds.push(stateId)
                    }
                }
            }
            // let data = this.rebuildStatus(statusReservoir)
            // this.initGraph(data)
            // 右侧图形
            // this.initMixEchart()
            // this.initStatusEchart()
        })
        // 获取时间段内的水库数据
        let reservoirDate = this.reservoirDate
        this.getDuringReservoirs(reservoirDate[0], reservoirDate[1]).then(res => {
            // let yearReservoirs = this.countReservoirs(duringReservoirs.default)
            let yearReservoirs = this.countReservoirs(res.data)
            this.yearReservoirs = yearReservoirs
            this.initLineArea(yearReservoirs)
            this.yearReservoirLoading.close()
        })
        // 获取情感数据
        this.getEQData().then(res => {
            if (res.code === 1002) {
                let data = res.data
                let allEQData = []
                data.map(item => {
                    if (item) {
                        let items = item.items[0]
                        let newIitem = Object.assign({}, item, items)
                        allEQData.push(newIitem)
                    }
                })
                this.tableData = allEQData
                let eqData = this.regroupEQData(allEQData)
                let eqPieData = this.getEQPieData(eqData)
                this.initEQPie(eqPieData)
                let eqChartData = this.get3DScatterData(allEQData)
                this.init3DScatter(eqChartData)
                this.eqChartLoading.close()
            }
        })
        let _this = this
        // 监听窗口
         window.onresize = () => {
            return (() => {
                _this.map3D.resize()
                _this.mapBlock.resize()
                _this.mapLine.resize()
                _this.mapPie.resize()
                _this.statusChart.resize()
                _this.lineScatter.resize()
                _this.eqChart.resize()
            })()
        }
        /* let citys = reservoirInvestment.default
        this.initAllTopEchart(citys)
        this.initRadar() */
    }
}
</script>
