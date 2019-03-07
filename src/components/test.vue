<template>
  <!-- <div class="shade">
        <div id="pie" style="width:80%;height:500px;"></div>
        <img alt="" style="width:100%;height:100%" id="picture" />
        <div id="testBall" style="width:100px;height:100px;"></div>
    </div> -->
  <div>
    <el-button type="info"><i class="iconfont icon-renjijiaohu"></i></el-button>
  </div>
</template>

<script>
import echarts from 'echarts'
// import echartsLiquidfill from 'echarts-liquidfill'

export default {
    data() {
        return {
            data: [
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
            datalist: [
                {
                    offset: [0, 50],
                    symbolSize: 25,
                    opacity: 0.95,
                    color: '#000'
                }, {
                    offset: [12.5, 50],
                    symbolSize: 38,
                    opacity: 0.88,
                    color: '#7aabe2'
                }, {
                    offset: [25, 50],
                    symbolSize: 174,
                    opacity: 0.84,
                    color: '#ff7123'
                }, {
                    offset: [37.5, 50],
                    symbolSize: 6,
                    opacity: 0.8,
                    color: '#ffc400'
                }, {
                    offset: [50, 50],
                    symbolSize: 13,
                    opacity: 0.75,
                    color: '#5e333f'
                }, {
                    offset: [62.5, 50],
                    symbolSize: 1,
                    opacity: 0.7,
                    color: '#6b3442'
                }, {
                    offset: [75, 50],
                    symbolSize: 0,
                    opacity: 0.68,
                    color: '#8a3647'
                }, {
                    offset: [87.5, 50],
                    symbolSize: 33,
                    opacity: 0.6,
                    color: '#68333f'
                },
                {
                    offset: [100, 50],
                    symbolSize: 36,
                    opacity: 0.6,
                    color: '#68333f'
                }
            ]
        }
    },
    methods: {
        initCustomized() {
            let myChart = echarts.init(document.getElementById('pie'))
            let option = {
                backgroundColor: '#2c343c',
                title: {
                    text: 'Customized Pie',
                    left: 'center',
                    top: 20,
                    textStyle: {
                        color: '#ccc'
                    }
                },

                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },

                visualMap: {
                    show: false,
                    min: 80,
                    max: 600,
                    inRange: {
                        colorLightness: [0, 1]
                    }
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '50%'],
                        /* data: [
                            {value: 335, name: '直接访问'},
                            {value: 310, name: '邮件营销'},
                            {value: 274, name: '联盟广告'},
                            {value: 235, name: '视频广告'},
                            {value: 400, name: '搜索引擎'}
                        ].sort(function (a, b) { return a.value - b.value }), */
                        data: this.data.sort(function (a, b) { return a.value - b.value }),
                        roseType: 'radius',
                        label: {
                            normal: {
                                textStyle: {
                                    color: 'rgba(255, 255, 255, 0.3)'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                lineStyle: {
                                    color: 'rgba(255, 255, 255, 0.3)'
                                },
                                smooth: 0.2,
                                length: 10,
                                length2: 20
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#c23531',
                                shadowBlur: 200,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },

                        animationType: 'scale',
                        animationEasing: 'elasticOut',
                        animationDelay: function (idx) {
                            return Math.random() * 200
                        }
                    }
                ]
            }
            myChart.setOption(option)
        },
        initScatter() {
            let plantCap = this.data
            let datalist = this.datalist
            let datas = []
            for (var i = 0; i < plantCap.length; i++) {
                var item = plantCap[i]
                var itemToStyle = datalist[i]
                datas.push({
                    name: item.value + '\n' + item.name,
                    value: itemToStyle.offset,
                    symbolSize: itemToStyle.symbolSize,
                    label: {
                        normal: {
                            textStyle: {
                                fontSize: 11
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: itemToStyle.color,
                            opacity: itemToStyle.opacity
                        }
                    }
                })
            }
            let option = {
                grid: {
                    show: false,
                    top: 10,
                    bottom: 10
                },
                xAxis: [{
                    gridIndex: 0,
                    type: 'value',
                    show: false,
                    min: 0,
                    max: 100,
                    nameLocation: 'middle',
                    nameGap: 5
                }],
                yAxis: [{
                    gridIndex: 0,
                    min: 0,
                    show: false,
                    max: 100,
                    // nameLocation: 'middle',
                    nameGap: 30
                }],
                series: [{
                    type: 'scatter',
                    symbol: 'circle',
                    symbolSize: 120,
                    label: {
                        normal: {
                            show: true,
                            formatter: '{b}',
                            color: '#fff',
                            textStyle: {
                                fontSize: '20'
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#00acea'
                        }
                    },
                    data: datas
                }]
            }
            let myChart = echarts.init(document.getElementById('pie'))
            myChart.setOption(option)
        },
        initLeida() {
            let data = this.data
            let max = 0
            let dataArray = []
            let indicator = []
            data.map((item, index) => {
                dataArray.push(item.value)
                if (item.value > max) {
                    max = item.value
                }
            })
            data.map((item, index) => {
                indicator.push({
                    name: item.name,
                    max: max + 20
                })
            })
            let option = {
                title: {
                    text: '基础雷达图'
                },
                tooltip: {},
                legend: {
                    data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
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
                    /* indicator: [
                        {name: '销售（sales）', max: 6500},
                        {name: '管理（Administration）', max: 16000},
                        {name: '信息技术（Information Techology）', max: 30000},
                        {name: '客服（Customer Support）', max: 38000},
                        {name: '研发（Development）', max: 52000},
                        {name: '市场（Marketing）', max: 25000}
                    ] */
                    indicator: indicator
                },
                series: [{
                    name: '预算 vs 开销（Budget vs spending）',
                    type: 'radar',
                    // areaStyle: {normal: {}},
                    /* data: [
                        {
                            value: [4300, 10000, 28000, 35000, 50000, 19000],
                            name: '预算分配（Allocated Budget）'
                        },
                        {
                            value: [5000, 14000, 28000, 31000, 42000, 21000],
                            name: '实际开销（Actual Spending）'
                        }
                    ] */
                    data: [{
                        value: dataArray,
                        name: '项目状态分布'
                    }]
                }]
            }
            let myChart = echarts.init(document.getElementById('pie'))
            myChart.setOption(option)
        },
        getPic() {
            this.$http.get('/api/statistic/pmrdiffwordcloud').then(res => {
                document.getElementById('picture').setAttribute('src', res)
            })
        },
        initLiquidBall() {
            let myChart = echarts.init(document.getElementById('testBall'))
            let option = {
                series: [{
                    type: 'liquidFill',
                    data: [0.6],
                    radius: '80%',
                    waveAnimation: true,
                    animationDuration: 0,
                    animationDurationUpdate: 0,
                    label: {
                        normal: {
                            formatter: function() {
                                return '60'
                            },
                            textStyle: {
                                fontSize: 35
                                // color: '#44c078'
                            }
                            // position: 'center'
                        }
                    },
                    outline: {
                        borderDistance: 0,
                        itemStyle: {
                            borderWidth: 2,
                            borderColor: '#156ACF',
                            shadowBlur: 20,
                            shadowColor: 'rgba(255, 0, 0, 1)'
                        }
                    }
                }]
            }
            myChart.setOption(option)
        }
    },
    mounted() {
        // this.initCustomized()
        // this.initScatter()
        // this.initLeida()
        // this.getPic()
        // this.initLiquidBall()
    }
}
</script>
