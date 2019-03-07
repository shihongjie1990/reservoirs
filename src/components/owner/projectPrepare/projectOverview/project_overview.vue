<template>
    <div class="detail-block">
        <div class="project-progress">
            <div class="date-progress">
                <div>
                    <div>{{ dateRate }}%</div>
                    <el-progress :stroke-width="25" :percentage="dateRate ? parseFloat(dateRate) : 0" :text-inside="true"></el-progress>
                </div>
                <div class="progress-item">
                    <div>
                        <span>建设时长(天)：</span>
                        <span>{{ projectLife.timeSofar || 0 }}</span>
                    </div>
                    <hr />
                    <div>
                        <span>工期(天)：</span>
                        <span>{{ projectLife.timeLimit || 0 }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="detail-top" v-if="baseInfo && Object.keys(baseInfo).length>0">
            <h2>{{ baseInfo.plantName }}<span>({{ baseInfo.scale }}、 {{ baseInfo.level }})</span></h2>
            <div class="detail-overview">
                {{ baseInfo.overview}}
            </div>
            <div class="attachment-bottom" v-if="baseInfo.baseInfoFiles && baseInfo.baseInfoFiles.length > 0">
                <span>附件：</span>
                <div>
                    <i v-for="(img, index) in baseInfo.baseInfoFiles" :key="index" :title="img.name" :class="'fa ' + img.icon + ' fa-lg'" @click="downloadFiles(img.fileAddr)"></i>
                    <!-- <i class="fa fa-file-pdf-o fa-lg"></i> -->
                </div>
            </div>
        </div>
        <div class="detail-map">
            <div id="my_location" style="width:100%; height:380px;">地图所在区域</div>
        </div>
        <div class="project-progress">
            <div class="investment-progress">
                <el-row :guter="20">
                    <el-col :lg="6" :md="12" :xs="24">
                        <el-progress type="circle" :percentage="investmentRate ? parseFloat(investmentRate) : 0" color="#efd766"></el-progress>
                        <div class="progress-desc">
                            <div>
                                <span>投资完成：</span>
                                <span>{{ projectLife.investmentSofar || 0 }}</span>
                            </div>
                            <hr />
                            <div>
                                <span>计划总投资：</span>
                                <span>{{ projectLife.totalInvestment || 0 }}</span>
                            </div>
                        </div>
                    </el-col>
                    <el-col :lg="6" :md="12" :xs="24">
                        <el-progress type="circle" :percentage="costRate ? parseFloat(costRate) : 0" color="#efd766"></el-progress>
                        <div class="progress-desc">
                            <div>
                                <span>到位资金：</span>
                                <span>{{ projectLife.availableInvestmentSofar || 0 }}</span>
                            </div>
                            <hr />
                            <div>
                                <span>投资完成：</span>
                                <span>{{ projectLife.investmentSofar || 0 }}</span>
                            </div>
                        </div>
                    </el-col>
                    <el-col :lg="6" :md="12" :xs="24">
                        <el-progress type="circle" :percentage="curInvestmentRate ? parseFloat(curInvestmentRate) : 0" color="#efd766"></el-progress>
                        <div class="progress-desc">
                            <div>
                                <span>本年投资到位：</span>
                                <span>{{ curInvestment || 0 }}</span>
                            </div>
                            <hr />
                            <div>
                                <span>计划总投资：</span>
                                <span>{{ projectLife.totalInvestment || 0 }}</span>
                            </div>
                        </div>
                    </el-col>
                    <el-col :lg="6" :md="12" :xs="24">
                        <el-progress type="circle" :percentage="curCostRate ? parseFloat(curCostRate) : 0" color="#efd766"></el-progress>
                        <div class="progress-desc">
                            <div>
                                <span>本年投资到位：</span>
                                <span>{{ curInvestment || 0 }}</span>
                            </div>
                            <hr />
                            <div>
                                <span>到位资金：</span>
                                <span>{{ projectLife.availableInvestmentSofar || 0 }}</span>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="detail-item">
            <el-collapse v-model="activeName" class="panel centerline-panel panel-mini-font">
                <el-collapse-item title="基础信息" name="1">
                    <div class="base-info info">
                        <table>
                            <tr>
                                <td colspan="4">
                                    <label>坝型：</label>
                                    <span>{{ baseInfo.damType }}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>最大坝高(m)：</label>
                                    <span>{{ baseInfo.maxDamHeight }}</span>
                                </td>
                                <td>
                                    <label>泄洪道(m)：</label>
                                    <span>{{ baseInfo.spillway }}</span>
                                </td>
                                <td>
                                    <label>度汛高程：</label>
                                    <span>{{ baseInfo.floodControlElevation }}</span>
                                </td>
                                <td>
                                    <label>积水面积(km2)：</label>
                                    <span>{{ baseInfo.catchmentArea }}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>库容(m3)：</label>
                                    <span>{{ baseInfo.storage }}</span>
                                </td>
                                <td>
                                    <label>兴利库容(m3)：</label>
                                    <span>{{ baseInfo.utilizablCapacity }}</span>
                                </td>
                                <td>
                                    <label>装机容量(Kw)：</label>
                                    <span>{{ baseInfo.installedCapacity }}</span>
                                </td>
                                <td>
                                    <label>灌溉面积：</label>
                                    <span>{{ baseInfo.irrigatedArea }}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>城镇供水人口(万人)：</label>
                                    <span>{{ baseInfo.waterSupplyPopulation }}</span>
                                </td>
                                <td>
                                    <label>农村人饮(万人)：</label>
                                    <span>{{ baseInfo.ruralHumanWater }}</span>
                                </td>
                                <td>
                                    <label>大牲畜(万头)：</label>
                                    <span>{{ baseInfo.livestock }}</span>
                                </td>
                                <td>
                                    <label>供水量：</label>
                                    <span>{{ baseInfo.watersupply }}</span>
                                </td>
                            </tr>
                        </table>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="注册信息" name="2">
                    <div class="register-info info">
                        <table>
                            <tr>
                                <td colspan="4">
                                    <label>法人：</label>
                                    <span>{{ baseInfo.legalRepresentativeName }}</span>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="4">
                                    <label>上报人：</label>
                                    <span>{{ baseInfo.legalPersonName }}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>所在县：</label>
                                    <span>{{ baseInfo.county }}</span>
                                </td>
                                <td>
                                    <label>位置：</label>
                                    <span>{{ baseInfo.location }}</span>
                                </td>
                                <td>
                                    <label>纬度：</label>
                                    <span>{{ baseInfo.latitude }}</span>
                                </td>
                                <td>
                                    <label>经度：</label>
                                    <span>{{ baseInfo.longitude }}</span>
                                </td>
                            </tr>
                        </table>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="工程信息" name="3">
                    <div class="engineering-info info">
                        <table>
                            <tr>
                                <td colspan="4">
                                    <label>项目来源：</label>
                                    <span>{{ baseInfo.projectSource }}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>是否签订枢纽工程施工承包合同：</label>
                                    <span>{{ baseInfo.hasSignedConstructionContract }}</span>
                                </td>
                                <td>
                                    <label>枢纽工程是否完工：</label>
                                    <span>{{ baseInfo.hasProjectCompleted }}</span>
                                </td>
                                <td>
                                    <label>是否竣工验收：</label>
                                    <span>{{ baseInfo.hasAcceptCompletion }}</span>
                                </td>
                                <td>
                                    <label>工程占地(亩)：</label>
                                    <span>{{ baseInfo.areaCoverage }}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>单位工程数：</label>
                                    <span>{{ baseInfo.cellProjectAmount }}</span>
                                </td>
                                <td>
                                    <label>单元工程数：</label>
                                    <span>{{ baseInfo.unitProjectAmount }}</span>
                                </td>
                                <td>
                                    <label>分部工程数：</label>
                                    <span>{{ baseInfo.branchProjectAmount }}</span>
                                </td>
                                <td>
                                    <label>工期：</label>
                                    <span>{{ baseInfo.timeLimit }}</span>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="4">
                                    <label>单位工程概况：</label>
                                    <span>{{ baseInfo.cellProjectOverview }}</span>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="4">
                                    <label>单元工程概况：</label>
                                    <span>{{ baseInfo.unitProjectOverview }}</span>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="4">
                                    <label>分部工程概况：</label>
                                    <span>{{ baseInfo.branchProjectOverview }}</span>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="4">
                                    <label>工程任务及主要建筑物：</label>
                                    <span>{{ baseInfo.projectTask }}</span>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="4">
                                    <label>建设用地：</label>
                                    <span>{{ baseInfo.constructionLand }}</span>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="4">
                                    <label>土地复垦方案：</label>
                                    <span>{{ baseInfo.landReclamationPlan }}</span>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="4">
                                    <label>监理、施工招标情况：</label>
                                    <span>{{ baseInfo.supervisorBid }}</span>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="4">
                                    <label>备注：</label>
                                    <span>{{ baseInfo.remark }}</span>
                                </td>
                            </tr>
                        </table>
                    </div>
                </el-collapse-item>
                <!-- <el-collapse-item title="投资信息" name="4">
                    <div class="investment-info"></div>
                </el-collapse-item -->
            </el-collapse>
        </div>
    </div>
</template>

<script>
import BMap from 'BMap'
import BMAP_HYBRID_MAP from 'BMAP_HYBRID_MAP'
// import BMapLib from 'BMapLib'
// import echarts from 'echarts'

export default {
    props: ['baseInfoId'],
    data() {
        return {
            baseInfo: '',
            activeName: ['1'],
            projectLife: {},
            curInvestment: 0
        }
    },
    computed: {
        dateRate() {
            let rate = 0
            let timeSofar = this.projectLife.timeSofar || 0
            let timeLimit = this.projectLife.timeLimit || 1
            if (timeSofar && timeLimit) {
                rate = (timeSofar / timeLimit * 100).toFixed(1)
            }
            return rate
        },
        investmentRate() {
            let rate = 0
            let investmentSofar = this.projectLife.investmentSofar || 0
            let totalInvestment = this.projectLife.totalInvestment || 1
            if (investmentSofar && totalInvestment) {
                rate = (investmentSofar / totalInvestment * 100).toFixed(1)
            }
            return parseFloat(rate)
        },
        costRate() {
            let rate = 0
            let investmentSofar = this.projectLife.investmentSofar || 0
            let availableInvestmentSofar = this.projectLife.availableInvestmentSofar || 1
            if (investmentSofar && availableInvestmentSofar) {
                rate = (availableInvestmentSofar / investmentSofar * 100).toFixed(1)
            }
            return parseFloat(rate)
        },
        curInvestmentRate() {
            let rate = 0
            let totalInvestment = this.projectLife.totalInvestment
            let curInvestment = this.curInvestment
            if (totalInvestment && curInvestment && curInvestment > 0) {
                rate = (curInvestment / totalInvestment).toFixed(1)
            }
            return rate
        },
        curCostRate() {
            let rate = 0
            let availableInvestmentSofar = this.projectLife.availableInvestmentSofar
            let curInvestment = this.curInvestment
            if (availableInvestmentSofar && curInvestment && curInvestment > 0) {
                rate = (curInvestment / availableInvestmentSofar).toFixed(1)
            }
            return rate
        }
    },
    methods: {
        getBaseInfoById(baseInfoId) {
            let thisRequest = this.$http.get(`/api/baseinfo/mybaseinfo`)
            return thisRequest
        },
        // 获取生命周期信息
        lifeCircle(baseInfoId) {
            let thisRequest = this.$http.get('/api/baseinfo/lifecircle')
            return thisRequest
        },
        overallinvestmentcompletion(baseInfoId) {
            let date = new Date()
            let startDate = date.getFullYear() + '-01-01'
            let endDate = date.toISOString().substr(0, 10)
            let thisRequest = this.$http.get('/api/pmr/overallinvestmentcompletion', {
                params: {
                    by: 'baseInfo',
                    startDate: startDate,
                    endDate: endDate
                }
            })
            return thisRequest
        },
        downloadFiles(addr) {
            // let url = location.origin + '/files/' + addr
            let Base64 = require('js-base64').Base64
            let strBase = Base64.encode(Base64.encode(addr))
            let url = location.origin + '/api/download/' + strBase
            window.open(url, '_self')
        }
    },
    mounted() {
        // let baseInfoId = this.$route.params.baseInfoId
        let baseInfoId = this.baseInfoId
        this.getBaseInfoById(baseInfoId).then(res => {
            let data = res.data
            let files = data.baseInfoFiles
            if (files && files.length > 0) {
                files.map(item => {
                    let addr = item.fileAddr
                    let type = addr.substr(addr.lastIndexOf('.') + 1)
                    if (type === 'xls' || type === 'xlsx') {
                        item.icon = 'fa-file-excel-o'
                    } else if (type === 'pdf') {
                        item.icon = 'fa-file-pdf-o'
                    } else {
                        item.icon = 'fa-file-image-o'
                    }
                    item.name = addr.replace(/\S+\d{10,}-/g, '')
                    return item
                })
            }
            this.baseInfo = data

            // 创建地图
            let longitude = res.data.longitude
            let latitude = res.data.latitude
            // 百度地图API功能
            let map = new BMap.Map('my_location', {mapType: BMAP_HYBRID_MAP})
            let point = new BMap.Point(longitude, latitude)
            map.centerAndZoom(point, 8) // 初始化地图，设置中心店坐标和地图级别
            map.enableScrollWheelZoom(true)
            //  控制地图的最大和最小缩放级别
            map.setMinZoom(8)

            // 增加位置图标
            let myIcon = new BMap.Icon('./static/icon/reservoir.png', new BMap.Size(25, 25), {
                imageSize: new BMap.Size(25, 25)
            })
            let marker = new BMap.Marker(point, { icon: myIcon })
            marker.disableMassClear()
            map.addOverlay(marker)
        })

        // 获取生命周期数据
        this.lifeCircle(baseInfoId).then(res => {
            this.projectLife = res.data
        })

        // 获取单个水库的投资信息
        this.overallinvestmentcompletion(baseInfoId).then(res => {
            this.curInvestment = res.data
        })
    }
}
</script>

<style>
.detail-item>.panel {
    width: 100%!important;
}
</style>
