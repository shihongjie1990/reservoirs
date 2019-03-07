<template>
    <div>
        <div id="3d_echart" style="width:100%;height:600px;background:#000;"></div>
        <!-- <el-button type="primary" @click="downloadFile">下载</el-button> -->
        <!-- <div id="graph" style="width:100%;height:500px;"></div> -->
    </div>
</template>

<script>
import echarts from 'echarts'
import guizhou from './guizhou.json'
import china from './china.json'

import * as reservoirlist from '@/mock/reservoirlist'

require('echarts-gl')

export default {
    data() {
        return {}
    },
    methods: {
        init3D() {
            let myChart = echarts.init(document.getElementById('3d_echart'))
            myChart.showLoading()
            echarts.registerMap('guizhou', guizhou)
            myChart.hideLoading()
            let option = {
                title: { // 标题
                    top: '5%',
                    text: '铜仁市3D地图',
                    subtext: '',
                    x: 'center',
                    textStyle: {
                        color: '#ccc'
                    }
                },
                tooltip: { // 提示框
                    trigger: 'item',
                    formatter: function(params) {
                        return params.name
                    }
                },
                series: [{
                    type: 'map3D', // 系列类型
                    name: 'map3D', // 系列名称
                    map: 'guizhou', // 地图类型。echarts-gl 中使用的地图类型同 geo 组件相同(ECharts 中提供了两种格式的地图数据，一种是可以直接 script 标签引入的 js 文件，引入后会自动注册地图名字和数据。还有一种是 JSON 文件，需要通过 AJAX 异步加载后手动注册。)
                    environment: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ // 配置为垂直渐变的背景
                        offset: 0, color: '#00aaff' // 天空颜色
                    }, {
                        offset: 0.7, color: '#998866' // 地面颜色
                    }, {
                        offset: 1, color: '#998866' // 地面颜色
                    }], false),
                    shading: 'realistic',
                    label: { // 标签的相关设置
                        show: true, // (地图上的城市名称)是否显示标签 [ default: false ]
                        textStyle: { // 标签的字体样式
                            color: '#000', // 地图初始化区域字体颜色
                            fontSize: 8, // 字体大小
                            opacity: 1, // 字体透明度
                            backgroundColor: 'rgba(0,23,11,0)' // 字体背景色
                        }
                    },
                    itemStyle: { // 三维地理坐标系组件 中三维图形的视觉属性，包括颜色，透明度，描边等。
                        // color: 'rgba(95,158,160,0.5)', // 地图板块的颜色
                        color: '#547494',
                        // color: '#2d4470',
                        opacity: 1, // 图形的不透明度 [ default: 1 ]
                        borderWidth: 0.3, // (地图板块间的分隔线)图形描边的宽度。加上描边后可以更清晰的区分每个区域   [ default: 0 ]
                        borderColor: '#000' // 图形描边的颜色。[ default: #333 ]
                    },
                    emphasis: { // 鼠标 hover 高亮时图形和标签的样式 (当鼠标放上去时  label和itemStyle 的样式)
                        label: { // label高亮时的配置
                            show: true,
                            textStyle: {
                                color: '#fff', // 高亮时标签颜色变为 白色
                                    fontSize: 15 // 高亮时标签字体 变大
                                }
                            },
                            itemStyle: { // itemStyle高亮时的配置
                                areaColor: '#66ffff' // 高亮时地图板块颜色改变
                            }
                        },
                        groundPlane: { // 地面可以让整个组件有个“摆放”的地方，从而使整个场景看起来更真实，更有模型感。
                            show: false, // 是否显示地面。[ default: false ]
                            color: '#aaa' // 地面颜色。[ default: '#aaa' ]
                        },
                        regions: [{ // 可对单个地图区域进行设置
                            name: '贵阳市', // 所对应的地图区域的名称
                            itemStyle: { // 单个区域的样式设置
                                color: '#00FF00',
                                opacity: 1,
                                borderWidth: 0.4,
                                borderColor: '#5F9EA0'
                            }
                        }, {
                            name: '遵义市',
                            itemStyle: {
                                color: '#EEEE00',
                                opacity: 1,
                                borderWidth: 0.4,
                                borderColor: '#5F9EA0'
                            }
                        }],
                        light: { // 光照相关的设置。在 shading 为 'color' 的时候无效。  光照的设置会影响到组件以及组件所在坐标系上的所有图表。合理的光照设置能够让整个场景的明暗变得更丰富，更有层次。
                            main: { // 场景主光源的设置，在 globe 组件中就是太阳光。
                                color: '#fff', // 主光源的颜色。[ default: #fff ]
                                intensity: 1.2, // 主光源的强度。[ default: 1 ]
                                shadow: true, // 主光源是否投射阴影。默认关闭。    开启阴影可以给场景带来更真实和有层次的光照效果。但是同时也会增加程序的运行开销。
                                alpha: 55, // 主光源绕 x 轴，即上下旋转的角度。配合 beta 控制光源的方向。[ default: 40 ]
                                beta: 10 // 主光源绕 y 轴，即左右旋转的角度。[ default: 40 ]
                            },
                            ambient: { // 全局的环境光设置。
                                color: '#fff', // 环境光的颜色。[ default: #fff ]
                                intensity: 0.5 // 环境光的强度。[ default: 0.2 ]
                            },
                            ambientCubemap: {
                                // texture: 'Milkyway.hdr',
                                // 解析 hdr 时使用的曝光值
                                exposure: 1,
                                diffuseIntensity: 0.5,
                                specularIntensity: 0.5
                            }
                        },
                        postEffect: {
                            enable: true,
                            bloom: {
                                enable: true,
                                bloomIntensity: 0.5
                            }
                        },
                        viewControl: { // 用于鼠标的旋转，缩放等视角控制。
                            projection: 'perspective', // 投影方式，默认为透视投影'perspective'，也支持设置为正交投影'orthographic'。
                            autoRotate: false, // 是否开启视角绕物体的自动旋转查看。[ default: false ]
                            autoRotateDirection: 'cw', // 物体自传的方向。默认是 'cw' 也就是从上往下看是顺时针方向，也可以取 'ccw'，既从上往下看为逆时针方向。
                            autoRotateSpeed: 10, // 物体自传的速度。单位为角度 / 秒，默认为10 ，也就是36秒转一圈。
                            autoRotateAfterStill: 3, // 在鼠标静止操作后恢复自动旋转的时间间隔。在开启 autoRotate 后有效。[ default: 3 ]
                            damping: 0, // 鼠标进行旋转，缩放等操作时的迟滞因子，在大于等于 1 的时候鼠标在停止操作后，视角仍会因为一定的惯性继续运动（旋转和缩放）。[ default: 0.8 ]
                            rotateSensitivity: 1,
                            zoomSensitivity: 1, // 缩放操作的灵敏度，值越大越灵敏。默认为1,设置为0后无法缩放。
                            panSensitivity: 1, // 平移操作的灵敏度，值越大越灵敏。默认为1,设置为0后无法平移。支持使用数组分别设置横向和纵向的平移灵敏度
                            panMouseButton: 'left', // 平移操作使用的鼠标按键，支持：'left' 鼠标左键（默认）;'middle' 鼠标中键 ;'right' 鼠标右键(注意：如果设置为鼠标右键则会阻止默认的右键菜单。)
                            rotateMouseButton: 'left', // 旋转操作使用的鼠标按键，支持：'left' 鼠标左键;'middle' 鼠标中键（默认）;'right' 鼠标右键(注意：如果设置为鼠标右键则会阻止默认的右键菜单。)
                            distance: 200, // [ default: 100 ] 默认视角距离主体的距离，对于 grid3D 和 geo3D 等其它组件来说是距离中心原点的距离,对于 globe 来说是距离地球表面的距离。在 projection 为'perspective'的时候有效。
                            minDistance: 40, // [ default: 40 ] 视角通过鼠标控制能拉近到主体的最小距离。在 projection 为'perspective'的时候有效。
                            maxDistance: 400, // [ default: 400 ] 视角通过鼠标控制能拉远到主体的最大距离。在 projection 为'perspective'的时候有效。
                            alpha: 40, // 视角绕 x 轴，即上下旋转的角度。配合 beta 可以控制视角的方向。[ default: 40 ]
                            beta: 15, // 视角绕 y 轴，即左右旋转的角度。[ default: 0 ]
                            minAlpha: -360, // 上下旋转的最小 alpha 值。即视角能旋转到达最上面的角度。[ default: 5 ]
                            maxAlpha: 360, // 上下旋转的最大 alpha 值。即视角能旋转到达最下面的角度。[ default: 90 ]
                            minBeta: -360, // 左右旋转的最小 beta 值。即视角能旋转到达最左的角度。[ default: -80 ]
                            maxBeta: 360, // 左右旋转的最大 beta 值。即视角能旋转到达最右的角度。[ default: 80 ]
                            center: [0, 0, 0], // 视角中心点，旋转也会围绕这个中心点旋转，默认为[0,0,0]。
                            animation: true, // 是否开启动画。[ default: true ]
                            animationDurationUpdate: 1000, // 过渡动画的时长。[ default: 1000 ]
                            animationEasingUpdate: 'cubicInOut' // 过渡动画的缓动效果。[ default: cubicInOut ]
                        },
                        data: [{ // 可对单个地图区域进行设置
                            name: '贵阳市', // 所对应的地图区域的名称
                            itemStyle: { // 单个区域的样式设置
                                color: '#00FF00',
                                opacity: 1,
                                borderWidth: 0.4,
                                borderColor: '#5F9EA0'
                            }
                        }, {
                            name: '遵义市',
                            itemStyle: {
                                color: '#EEEE00',
                                opacity: 1,
                                borderWidth: 0.4,
                                borderColor: '#5F9EA0'
                            }
                        }]
                    }]
            }
            myChart.setOption(option)
            // 处理点击事件并且跳转到相应的百度搜索页面
            myChart.on('click', function (params) {
                var subSystem = params.name
                var url = 'https://www.baidu.com/s?ie=UTF-8&wd='
                // 根据点击地图区域的名称,跳转到对应页面
                if (subSystem === '贵阳市') {
                    window.open(url.concat(subSystem))
                } else if (subSystem === '遵义市') {
                    window.open(url.concat(subSystem))
                } else if (subSystem === '毕节地区') {
                    window.open(url.concat(subSystem))
                } else if (subSystem === '六盘水') {
                    window.open(url.concat(subSystem))
                } else if (subSystem === '安顺市') {
                    window.open(url.concat(subSystem))
                } else if (subSystem === '铜仁地区') {
                    window.open(url.concat(subSystem))
                } else if (subSystem === '黔南布衣苗族自治州') {
                    window.open(url.concat(subSystem))
                } else if (subSystem === '黔东南苗族侗族自治州') {
                    window.open(url.concat(subSystem))
                } else if (subSystem === '黔西南布依族苗族自治州') {
                    window.open(url.concat(subSystem))
                }
            })
        },
        downloadFile() {
            let Base64 = require('js-base64').Base64
            let str = 'upload\\announcement\\热烈祝贺智慧水利公司自主研发平台入选2018年贵州省政府大数据应用典型示范项目\\1542936717243-p4.jpg'
            let strBase = Base64.encode(Base64.encode(str))
            window.open(location.host + '/api/download/' + strBase)
        },
        initGraph(data) {
            let size = 80
            let seriesData = [{
                    'name': '项目开始',
                    x: 50,
                    y: 50,
                    'symbolSize': size,
                    'category': '项目开始',
                    'draggable': 'true',
                    'value': 0
                }, {
                    'name': '前期工作',
                    'value': 0,
                    x: 170,
                    y: 50,
                    'symbolSize': size,
                    'category': '前期工作',
                    'draggable': 'true'
                }, {
                    x: 290,
                    y: 50,
                    'name': '施工准备',
                    'symbolSize': size,
                    'category': '施工准备',
                    'draggable': 'true',
                    'value': 0
                }, {
                    x: 290,
                    y: 100,
                    'name': '三通一平',
                    'symbolSize': size,
                    'category': '三通一平',
                    'draggable': 'true',
                    'value': 0
                }, {
                    x: 170,
                    y: 100,
                    'name': '大坝开挖',
                    'symbolSize': size,
                    'category': '大坝开挖',
                    'draggable': 'true',
                    'value': 0
                }, {
                    x: 50,
                    y: 100,
                    'name': '大坝填筑',
                    'symbolSize': size,
                    'category': '大坝填筑',
                    'draggable': 'true',
                    'value': 0
                }, {
                    x: 50,
                    y: 150,
                    'name': '蓄水准备',
                    'symbolSize': size,
                    'category': '蓄水准备',
                    'draggable': 'true',
                    'value': 0
                }, {
                    x: 170,
                    y: 150,
                    'name': '蓄水验收',
                    'symbolSize': size,
                    'category': '蓄水验收',
                    'draggable': 'true',
                    'value': 0
                }, {
                    x: 290,
                    y: 150,
                    'name': '通水验收',
                    'symbolSize': size,
                    'category': '通水验收',
                    'draggable': 'true',
                    'value': 0
                }, {
                    x: 170,
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
                backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
                    offset: 0,
                    color: '#f7f8fa'
                }, {
                    offset: 1,
                    color: '#cdd0d5'
                }]),
                title: {
                    subtext: '各状态数量统计',
                    text: '项目状态',
                    top: 'top',
                    left: 'left'
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
                    show: true,
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
                    name: '投诉原因TOP10',
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
            let myChart = echarts.init(document.getElementById('graph'))
            myChart.setOption(option)

            myChart.on('click', node => {
                let data = node.data
                console.log(data)
            })
        },
        getRegionReservoirs() {
            let res = reservoirlist.default
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
            return statusReservoir
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
        initMixEchart() {
            let option = [{
                backgroundColor: '#FFFFFF',
                title: {
                    text: 'Sales Revenue of CAN-LAX 2016-2017',
                    textStyle: {
                        fontSize: 14
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data: ['2016', '2017', 'Growing Rate'],
                    top: '18'
                },
                grid: {
                    left: '3%',
                    right: '5%',
                    bottom: '3%',
                    containLabel: true,
                    show: false
                },
                toolbox: {
                    feature: {
                        dataView: {show: false, readOnly: false},
                        saveAsImage: {show: true}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: true,
                    splitLine: {
                        show: false
                    },
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                },
                yAxis: [
                    {
                    name: 'Revenue(10k)',
                    type: 'value',
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        formatter: '{value}'
                    }
                },
                    {
                        name: 'Growing\nRate (%)',
                        splitLine: {
                            show: false
                        },
                        min: 0,
                        max: 300,
                        type: 'value',
                        inverse: false,
                        axisLine: {
                            lineStyle: {
                                color: '#2f4554'
                            }
                    }
                }],
                series: [
                    {
                        name: '2016',
                        type: 'bar',
                        color: '#00BFFF',
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
                        data: [1741.9, 977, 1742.2, 1431.1, 1636.2, 1447, 1711.7, 1921.2, 2609.6, 3332.6, 3647.3, 2498.1]
                    },
                    {
                        name: '2017',
                        type: 'bar',
                        color: '#DC143C',
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
                        data: [2609, 1162.9, 2942.9, 5174.6, 5114.4, 5065.8, 3956.1, 3691.1, 4637.6, 4603.8, 6401.1, 4988.4]
                    },
                    {
                        name: 'Growing Rate',
                        type: 'line',
                        yAxisIndex: 1,
                        color: '#FFD700',
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'}
                            ]
                        },
                        data: [49.8, 19, 68.9, 261.6, 212.6, 250.1, 131.1, 92.1, 77.7, 38.1, 75.5, 99.7]
                    }
                ]
            }, {
                backgroundColor: '#FFFFFF',
                title: {
                    text: '各市违法违规比例',
                    subtext: '2017年'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    x: 'right',
                itemWidth: 14,
                    itemHeight: 14,
                    align: 'left'
                },
                series: [
                {
                        name: '各市违法违规比例',
                        type: 'pie',
                        radius: ['35%', '65%'],
                        color: ['#d74e67', '#0092ff', '#eba954', '#21b6b9', '#60a900', '#01949b', ' #f17677', '#d74e67', '#0092ff', '#eba954', '#21b6b9', '#60a900', '#01949b', '#f17677'],
                        label: {
                            normal: {
                                formatter: '{b}\n{d}%'
                            }
                        },
                        data: [
                            {value: 3533, name: '南宁市'},
                            {value: 3233, name: '柳州市'},
                            {value: 3433, name: '桂林市'},
                            {value: 3333, name: '梧州市'},
                            {value: 3233, name: '北海市'},
                            {value: 3333, name: '防城港市'},
                            {value: 3133, name: '钦州市'},
                            {value: 2933, name: '贵港市'},
                            {value: 3033, name: '玉林市'},
                            {value: 2630, name: '百色市'},
                            {value: 2430, name: '贺州市'},
                            {value: 2313, name: '河池市'},
                            {value: 2713, name: '来宾市'},
                            {value: 2513, name: '崇左市'}]
                    }
                ]
            }]
            let myChart = echarts.init(document.getElementById('graph'))
            myChart.setOption(option)
        },
        initMapBar() {
            echarts.registerMap('china', china)
            let geoCoordMap = {
                '海门': [121.15, 31.89],
                '鄂尔多斯': [109.781327, 39.608266],
                '招远': [120.38, 37.35],
                '舟山': [122.207216, 29.985295],
                '齐齐哈尔': [123.97, 47.33],
                '盐城': [120.13, 33.38],
                '赤峰': [118.87, 42.28],
                '青岛': [120.33, 36.07],
                '乳山': [121.52, 36.89],
                '金昌': [102.188043, 38.520089],
                '泉州': [118.58, 24.93],
                '莱西': [120.53, 36.86],
                '日照': [119.46, 35.42],
                '胶南': [119.97, 35.88],
                '南通': [121.05, 32.08],
                '拉萨': [91.11, 29.97],
                '云浮': [112.02, 22.93],
                '梅州': [116.1, 24.55],
                '文登': [122.05, 37.2],
                '上海': [121.48, 31.22],
                '攀枝花': [101.718637, 26.582347],
                '威海': [122.1, 37.5],
                '承德': [117.93, 40.97],
                '厦门': [118.1, 24.46],
                '汕尾': [115.375279, 22.786211],
                '潮州': [116.63, 23.68],
                '丹东': [124.37, 40.13],
                '太仓': [121.1, 31.45],
                '曲靖': [103.79, 25.51],
                '烟台': [121.39, 37.52],
                '福州': [119.3, 26.08],
                '瓦房店': [121.979603, 39.627114],
                '即墨': [120.45, 36.38],
                '抚顺': [123.97, 41.97],
                '玉溪': [102.52, 24.35],
                '张家口': [114.87, 40.82],
                '阳泉': [113.57, 37.85],
                '莱州': [119.942327, 37.177017],
                '湖州': [120.1, 30.86],
                '汕头': [116.69, 23.39],
                '昆山': [120.95, 31.39],
                '宁波': [121.56, 29.86],
                '湛江': [110.359377, 21.270708],
                '揭阳': [116.35, 23.55],
                '荣成': [122.41, 37.16],
                '连云港': [119.16, 34.59],
                '葫芦岛': [120.836932, 40.711052],
                '常熟': [120.74, 31.64],
                '东莞': [113.75, 23.04],
                '河源': [114.68, 23.73],
                '淮安': [119.15, 33.5],
                '泰州': [119.9, 32.49],
                '南宁': [108.33, 22.84],
                '营口': [122.18, 40.65],
                '惠州': [114.4, 23.09],
                '江阴': [120.26, 31.91],
                '蓬莱': [120.75, 37.8],
                '韶关': [113.62, 24.84],
                '嘉峪关': [98.289152, 39.77313],
                '广州': [113.23, 23.16],
                '延安': [109.47, 36.6],
                '太原': [112.53, 37.87],
                '清远': [113.01, 23.7],
                '中山': [113.38, 22.52],
                '昆明': [102.73, 25.04],
                '寿光': [118.73, 36.86],
                '盘锦': [122.070714, 41.119997],
                '长治': [113.08, 36.18],
                '深圳': [114.07, 22.62],
                '珠海': [113.52, 22.3],
                '宿迁': [118.3, 33.96],
                '咸阳': [108.72, 34.36],
                '铜川': [109.11, 35.09],
                '平度': [119.97, 36.77],
                '佛山': [113.11, 23.05],
                '海口': [110.35, 20.02],
                '江门': [113.06, 22.61],
                '章丘': [117.53, 36.72],
                '肇庆': [112.44, 23.05],
                '大连': [121.62, 38.92],
                '临汾': [111.5, 36.08],
                '吴江': [120.63, 31.16],
                '石嘴山': [106.39, 39.04],
                '沈阳': [123.38, 41.8],
                '苏州': [120.62, 31.32],
                '茂名': [110.88, 21.68],
                '嘉兴': [120.76, 30.77],
                '长春': [125.35, 43.88],
                '胶州': [120.03336, 36.264622],
                '银川': [106.27, 38.47],
                '张家港': [120.555821, 31.875428],
                '三门峡': [111.19, 34.76],
                '锦州': [121.15, 41.13],
                '南昌': [115.89, 28.68],
                '柳州': [109.4, 24.33],
                '三亚': [109.511909, 18.252847],
                '自贡': [104.778442, 29.33903],
                '吉林': [126.57, 43.87],
                '阳江': [111.95, 21.85],
                '泸州': [105.39, 28.91],
                '西宁': [101.74, 36.56],
                '宜宾': [104.56, 29.77],
                '呼和浩特': [111.65, 40.82],
                '成都': [104.06, 30.67],
                '大同': [113.3, 40.12],
                '镇江': [119.44, 32.2],
                '桂林': [110.28, 25.29],
                '张家界': [110.479191, 29.117096],
                '宜兴': [119.82, 31.36],
                '北海': [109.12, 21.49],
                '西安': [108.95, 34.27],
                '金坛': [119.56, 31.74],
                '东营': [118.49, 37.46],
                '牡丹江': [129.58, 44.6],
                '遵义': [106.9, 27.7],
                '绍兴': [120.58, 30.01],
                '扬州': [119.42, 32.39],
                '常州': [119.95, 31.79],
                '潍坊': [119.1, 36.62],
                '重庆': [106.54, 29.59],
                '台州': [121.420757, 28.656386],
                '南京': [118.78, 32.04],
                '滨州': [118.03, 37.36],
                '贵阳': [106.71, 26.57],
                '无锡': [120.29, 31.59],
                '本溪': [123.73, 41.3],
                '克拉玛依': [84.77, 45.59],
                '渭南': [109.5, 34.52],
                '马鞍山': [118.48, 31.56],
                '宝鸡': [107.15, 34.38],
                '焦作': [113.21, 35.24],
                '句容': [119.16, 31.95],
                '北京': [116.46, 39.92],
                '徐州': [117.2, 34.26],
                '衡水': [115.72, 37.72],
                '包头': [110, 40.58],
                '绵阳': [104.73, 31.48],
                '乌鲁木齐': [87.68, 43.77],
                '枣庄': [117.57, 34.86],
                '杭州': [120.19, 30.26],
                '淄博': [118.05, 36.78],
                '鞍山': [122.85, 41.12],
                '溧阳': [119.48, 31.43],
                '库尔勒': [86.06, 41.68],
                '安阳': [114.35, 36.1],
                '开封': [114.35, 34.79],
                '济南': [117, 36.65],
                '德阳': [104.37, 31.13],
                '温州': [120.65, 28.01],
                '九江': [115.97, 29.71],
                '邯郸': [114.47, 36.6],
                '临安': [119.72, 30.23],
                '兰州': [103.73, 36.03],
                '沧州': [116.83, 38.33],
                '临沂': [118.35, 35.05],
                '南充': [106.110698, 30.837793],
                '天津': [117.2, 39.13],
                '富阳': [119.95, 30.07],
                '泰安': [117.13, 36.18],
                '诸暨': [120.23, 29.71],
                '郑州': [113.65, 34.76],
                '哈尔滨': [126.63, 45.75],
                '聊城': [115.97, 36.45],
                '芜湖': [118.38, 31.33],
                '唐山': [118.02, 39.63],
                '平顶山': [113.29, 33.75],
                '邢台': [114.48, 37.05],
                '德州': [116.29, 37.45],
                '济宁': [116.59, 35.38],
                '荆州': [112.239741, 30.335165],
                '宜昌': [111.3, 30.7],
                '义乌': [120.06, 29.32],
                '丽水': [119.92, 28.45],
                '洛阳': [112.44, 34.7],
                '秦皇岛': [119.57, 39.95],
                '株洲': [113.16, 27.83],
                '石家庄': [114.48, 38.03],
                '莱芜': [117.67, 36.19],
                '常德': [111.69, 29.05],
                '保定': [115.48, 38.85],
                '湘潭': [112.91, 27.87],
                '金华': [119.64, 29.12],
                '岳阳': [113.09, 29.37],
                '长沙': [113, 28.21],
                '衢州': [118.88, 28.97],
                '廊坊': [116.7, 39.53],
                '菏泽': [115.480656, 35.23375],
                '合肥': [117.27, 31.86],
                '武汉': [114.31, 30.52],
                '大庆': [125.03, 46.58]
            }
            let convertData = function(data) {
                let res = []
                for (let i = 0; i < data.length; i++) {
                    let geoCoord = geoCoordMap[data[i].name]
                    if (geoCoord) {
                        res.push({
                            name: data[i].name,
                            value: geoCoord.concat(data[i].value)
                        })
                    }
                }
                console.log(res)
                return res
            }
            let option = {
                title: {
                    text: '测试bar3D、scatter3D、geo3D',
                    x: 'left',
                    top: '10',
                    textStyle: {
                        color: '#000',
                        fontSize: 14
                    }
                },
                tooltip: {
                    show: true
                // formatter:(params)=>{
                //   let data = '测试1:'+params.name + '<br/>'+'值:'+ params.value[2]+'<br/>'+'地理坐标:[' + params.value[0]+','+params.value[1] +']';
                //   return data;
                // },
                },
                visualMap: [{
                    type: 'continuous',
                    seriesIndex: 0,
                    text: ['bar3D'],
                    calculable: true,
                    max: 300,
                    inRange: {
                        color: ['#87aa66', '#eba438', '#d94d4c']
                    }
                }, {
                    type: 'continuous',
                    seriesIndex: 1,
                    text: ['scatter3D'],
                    left: 'right',
                    max: 100,
                    calculable: true,
                    inRange: {
                        color: ['#000', 'blue', 'purple']
                    }
                }],
                geo3D: {
                    map: 'china',
                    roam: true,
                    itemStyle: {
                        color: '#1d5e98',
                        opacity: 1,
                        borderWidth: 0.4,
                        borderColor: '#000'
                    },
                    label: {
                        show: true,
                        textStyle: {
                            color: '#f00', // 地图初始化区域字体颜色
                            fontSize: 8,
                            opacity: 1,
                            backgroundColor: 'rgba(0,23,11,0)'
                        }
                    },
                    emphasis: { // 当鼠标放上去  地区区域是否显示名称
                        label: {
                            show: true,
                            textStyle: {
                                color: '#fff',
                                fontSize: 3,
                                backgroundColor: 'rgba(0,23,11,0)'
                            }
                        }
                    },
                    // shading: 'lambert',
                    light: { // 光照阴影
                        main: {
                            color: '#fff', // 光照颜色
                            intensity: 1.2, // 光照强度
                            // shadowQuality: 'high', //阴影亮度
                            shadow: false, // 是否显示阴影
                            alpha: 55,
                            beta: 10
                        },
                        ambient: {
                            intensity: 0.3
                        }
                    }
                },
                series: [{
                    name: 'bar3D',
                    type: 'bar3D',
                    coordinateSystem: 'geo3D',
                    barSize: 1, // 柱子粗细
                    shading: 'lambert',
                    opacity: 1,
                    bevelSize: 0.3,
                    label: {
                        show: false,
                        formatter: '{b}'
                    },
                    data: convertData([{
                            name: '海门',
                            value: (Math.random() * 300).toFixed(2)
                        }, {
                            name: '鄂尔多斯',
                            value: (Math.random() * 300).toFixed(2)
                        }, {
                            name: '招远',
                            value: (Math.random() * 300).toFixed(2)
                        }, {
                            name: '舟山',
                            value: (Math.random() * 300).toFixed(2)
                        }, {
                            name: '齐齐哈尔',
                            value: (Math.random() * 300).toFixed(2)
                        }, {
                            name: '盐城',
                            value: (Math.random() * 300).toFixed(2)
                        }, {
                            name: '赤峰',
                            value: (Math.random() * 300).toFixed(2)
                        }, {
                            name: '青岛',
                            value: (Math.random() * 300).toFixed(2)
                        }, {
                            name: '乳山',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '金昌',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '泉州',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '莱西',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '日照',
                            value: (Math.random() * 300).toFixed(2)
                        }, {
                            name: '胶南',
                            value: (Math.random() * 300).toFixed(2)
                        }, {
                            name: '南通',
                            value: (Math.random() * 300).toFixed(2)
                        }, {
                            name: '拉萨',
                            value: (Math.random() * 300).toFixed(2)
                        }, {
                            name: '云浮',
                            value: (Math.random() * 300).toFixed(2)
                        }, {
                            name: '梅州',
                            value: (Math.random() * 300).toFixed(2)
                        }, {
                            name: '文登',
                            value: (Math.random() * 300).toFixed(2)
                        }, {
                            name: '上海',
                            value: (Math.random() * 300).toFixed(2)
                        }, {
                            name: '攀枝花',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '威海',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '承德',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '厦门',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '汕尾',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '潮州',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '丹东',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '太仓',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '曲靖',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '烟台',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '福州',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '瓦房店',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '即墨',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '抚顺',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '玉溪',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '宁波',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '湛江',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '揭阳',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '荣成',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '连云港',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '葫芦岛',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '常熟',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '东莞',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '河源',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '淮安',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '泰州',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '南宁',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '营口',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '惠州',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '江阴',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '蓬莱',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '韶关',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '嘉峪关',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '广州',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '延安',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '太原',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '清远',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '中山',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '昆明',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '寿光',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '盘锦',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '长治',
                            value: (Math.random() * 300).toFixed(2)
                        }, {
                            name: '深圳',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '珠海',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '宿迁',
                            value: (Math.random() * 300).toFixed(2)
                        }, {
                            name: '咸阳',
                            value: (Math.random() * 300).toFixed(2)
                        }, {
                            name: '铜川',
                            value: (Math.random() * 300).toFixed(2)
                        }, {
                            name: '平度',
                            value: (Math.random() * 300).toFixed(2)
                        }, {
                            name: '佛山',
                            value: (Math.random() * 300).toFixed(2)
                        }, {
                            name: '海口',
                            value: (Math.random() * 300).toFixed(2)
                        }, {
                            name: '江门',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '章丘',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '肇庆',
                            value: (Math.random() * 300).toFixed(2)
                        }, {
                            name: '大连',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '临汾',
                            value: (Math.random() * 300).toFixed(2)
                        }, {
                            name: '吴江',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '石嘴山',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '沈阳',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '苏州',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '茂名',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '嘉兴',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '长春',
                            value: (Math.random() * 300).toFixed(2)
                        }, {
                            name: '胶州',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '银川',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '张家港',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '三门峡',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '锦州',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '南昌',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '柳州',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '三亚',
                            value: (Math.random() * 300).toFixed(2)
                        }, {
                            name: '自贡',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '吉林',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '阳江',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '泸州',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '西宁',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '宜宾',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '呼和浩特',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '成都',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '大同',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '镇江',
                            value: (Math.random() * 100).toFixed(2)
                        }, {
                            name: '桂林',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '张家界',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '宜兴',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '北海',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '西安',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '金坛',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '包头',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '绵阳',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '乌鲁木齐',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '枣庄',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '杭州',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '淄博',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '鞍山',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '溧阳',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '库尔勒',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '安阳',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '开封',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '济南',
                            value: (Math.random() * 100).toFixed(2)
                        }, {
                            name: '德阳',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '温州',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '九江',
                            value: (Math.random() * 100).toFixed(2)
                        }, {
                            name: '邯郸',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '临安',
                            value: (Math.random() * 100).toFixed(2)
                        }, {
                            name: '兰州',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '沧州',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '秦皇岛',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '株洲',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '石家庄',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '莱芜',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '常德',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '保定',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '湘潭',
                            value: (Math.random() * 100).toFixed(2)
                        }, {
                            name: '金华',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '岳阳',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '长沙',
                            value: (Math.random() * 100).toFixed(2)
                        }, {
                            name: '衢州',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '廊坊',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '菏泽',
                            value: (Math.random() * 100).toFixed(2)
                        }, {
                            name: '合肥',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '武汉',
                            value: (Math.random() * 200).toFixed(2)
                        }, {
                            name: '大庆',
                            value: (Math.random() * 200).toFixed(2)
                        }
                    ])
                }, {
                    name: 'scatter3D',
                    type: 'scatter3D',
                    coordinateSystem: 'geo3D',
                    symbol: 'pin',
                    symbolSize: 30,
                    opacity: 1,
                    label: {
                        show: false,
                        formatter: '{b}'
                    },
                    itemStyle: {
                        borderWidth: 0.5,
                        borderColor: '#fff'
                    },
                    data: convertData([{
                        name: '阳泉',
                        value: ((Math.random() * 100) + 50).toFixed(2)
                    }, {
                        name: '莱州',
                        value: ((Math.random() * 100) + 50).toFixed(2)
                    }, {
                        name: '湖州',
                        value: ((Math.random() * 100) + 50).toFixed(2)
                    }, {
                        name: '汕头',
                        value: ((Math.random() * 100) + 50).toFixed(2)
                    }, {
                        name: '昆山',
                        value: ((Math.random() * 100) + 50).toFixed(2)
                    }, {
                        name: '张家口',
                        value: ((Math.random() * 100) + 50).toFixed(2)
                    }])
                }]
            }
            let myChart = echarts.init(document.getElementById('3d_echart'))
            myChart.setOption(option)
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
                    let chartItem = [itemData.confidence, itemData.positive_prob, itemData.negative_prob]
                    chartData.push(chartItem)
                }
            })
            return chartData
        },
        formatScatter(item) {
            let arr = [
                '<span style="float:left">自信：' + item.value[0] + '</span>',
                '<span style="float:left">积极：' + item.value[1] + '</span>',
                '<span style="float:left">消极：' + item.value[2] + '</span>'
            ]
            return arr.join('<br>')
        },
        init3DScatter(data) {
            let text = ['自信', '积极', '消极']
            data.splice(0, 0, text)
            let symbolSize = 2.5
            let option = {
                grid3D: {},
                tooltip: {
                    formatter: this.formatScatter,
                    textStyle: {
                        textAlign: 'center'
                    }
                },
                xAxis3D: {
                    type: 'category'
                },
                yAxis3D: {},
                zAxis3D: {},
                dataset: {
                    dimensions: text,
                    source: text.concat(data)
                },
                series: [
                    {
                        type: 'scatter3D',
                        symbolSize: symbolSize,
                        encode: {
                            x: '自信',
                            y: '积极',
                            z: '消极',
                            tooltip: [0, 1, 2, 4, 5]
                        }
                    }
                ]
            }
            let myChart = echarts.init(document.getElementById('3d_echart'))
            myChart.setOption(option)
        },
        getTest() {
            this.$http.get('/api/ha/haha')
        },
        initShuiliyun() {
            var centerOption = {
                tooltip: {
                    show: false
                },
                animationDurationUpdate: 1500,
                animationEasingUpdate: 'quinticInOut',
                series: [{
                    type: 'graph',
                    layout: 'none',
                    symbolSize: 60,
                    roam: false, // 禁止用鼠标滚轮缩小放大效果
                    edgeSymbol: ['circle', 'circle'],
                    edgeSymbolSize: 1,
                    // 连接线上的文字
                    edgeLabel: {
                        normal: {
                            show: false,
                            textStyle: {
                                fontSize: 20
                            }
                        }
                    },
                    lineStyle: {
                        normal: {
                            type: 'dotted',
                            opacity: 1,
                            width: 2,
                            curveness: 0.1
                        }
                    },
                    // 圆圈内的文字
                    label: {
                        normal: {
                            show: true
                        }
                    },
                    data: [{
                        name: '水利云',
                        x: 550,
                        y: 250,
                        symbolSize: 140,
                        itemStyle: {
                            normal: {
                                color: 'rgba(128, 128, 128, 0)',
                                borderColor: '#ffa83e',
                                borderWidth: 3,
                                shadowColor: 'rgba(128, 128, 128, 0.5)',
                                shadowBlur: 10
                            }
                        },
                        label: {
                            normal: {
                                show: false
                            }
                        }
                    }, {
                        name: '水资源',
                        x: 530,
                        y: 140,
                        symbolSize: 100,
                        itemStyle: {
                            normal: {
                                color: 'rgba(128, 128, 128, 0)',
                                borderColor: '#3fff41',
                                borderWidth: 3
                            }
                        }
                    }, {
                        name: '农村水电',
                        x: 550,
                        y: 180,
                        symbolSize: 80,
                        itemStyle: {
                            normal: {
                                color: 'rgba(128, 128, 128, 0)',
                                borderColor: '#e9ee37',
                                borderWidth: 3
                            }
                        }
                    }, {
                        name: '智慧防汛',
                        x: 660,
                        y: 180,
                        symbolSize: 100,
                        itemStyle: {
                            normal: {
                                color: 'rgba(128, 128, 128, 0)',
                                borderColor: '#3fff41',
                                borderWidth: 3
                            }
                        }
                    }, {
                        name: '河长制',
                        x: 450,
                        y: 170,
                        symbolSize: 100,
                        itemStyle: {
                            normal: {
                                color: 'rgba(128, 128, 128, 0)',
                                borderColor: '#3fff41',
                                borderWidth: 3
                            }
                        }
                    }, {
                        name: '智慧水库',
                        x: 430,
                        y: 260,
                        symbolSize: 100,
                        itemStyle: {
                            normal: {
                                color: 'rgba(128, 128, 128, 0)',
                                borderColor: '#3fff41',
                                borderWidth: 3
                            }
                        }
                    }, {
                        name: '水土保持',
                        x: 450,
                        y: 350,
                        symbolSize: 100,
                        itemStyle: {
                            normal: {
                                color: 'rgba(128, 128, 128, 0)',
                                borderColor: '#3fff41',
                                borderWidth: 3
                            }
                        }
                    }, {
                        name: '饮水安全',
                        x: 630,
                        y: 350,
                        symbolSize: 100,
                        itemStyle: {
                            normal: {
                                color: 'rgba(128, 128, 128, 0)',
                                borderColor: '#3fff41',
                                borderWidth: 3
                            }
                        }
                    }, {
                        name: '党政',
                        x: 500,
                        y: 180,
                        symbolSize: 80,
                        itemStyle: {
                            normal: {
                                color: 'rgba(128, 128, 128, 0)',
                                borderColor: '#e9ee37',
                                borderWidth: 3
                            }
                        }
                    }, {
                        name: '纪检',
                        x: 590,
                        y: 180,
                        symbolSize: 80,
                        itemStyle: {
                            normal: {
                                color: 'rgba(128, 128, 128, 0)',
                                borderColor: '#e9ee37',
                                borderWidth: 3
                            }
                        }
                    }, {
                        name: '人事',
                        x: 620,
                        y: 220,
                        symbolSize: 80,
                        itemStyle: {
                            normal: {
                                color: 'rgba(128, 128, 128, 0)',
                                borderColor: '#e9ee37',
                                borderWidth: 3
                            }
                        }
                    }, {
                        name: '规划计划',
                        x: 470,
                        y: 230,
                        symbolSize: 80,
                        itemStyle: {
                            normal: {
                                color: 'rgba(128, 128, 128, 0)',
                                borderColor: '#e9ee37',
                                borderWidth: 3
                            }
                        }
                    }, {
                        name: '政策法规',
                        x: 480,
                        y: 285,
                        symbolSize: 80,
                        itemStyle: {
                            normal: {
                                color: 'rgba(128, 128, 128, 0)',
                                borderColor: '#e9ee37',
                                borderWidth: 3
                            }
                        }
                    }, {
                        name: '安全监督',
                        x: 530,
                        y: 320,
                        symbolSize: 80,
                        itemStyle: {
                            normal: {
                                color: 'rgba(128, 128, 128, 0)',
                                borderColor: '#e9ee37',
                                borderWidth: 3
                            }
                        }
                    }, {
                        name: '灌溉工程',
                        x: 580,
                        y: 320,
                        symbolSize: 80,
                        itemStyle: {
                            normal: {
                                color: 'rgba(128, 128, 128, 0)',
                                borderColor: '#e9ee37',
                                borderWidth: 3
                            }
                        }
                    }, {
                        name: '烟水',
                        x: 620,
                        y: 270,
                        symbolSize: 80,
                        itemStyle: {
                            normal: {
                                color: 'rgba(128, 128, 128, 0)',
                                borderColor: '#e9ee37',
                                borderWidth: 3
                            }
                        }
                    }, {
                        name: '运行管理',
                        x: 650,
                        y: 250,
                        symbolSize: 80,
                        itemStyle: {
                            normal: {
                                color: 'rgba(128, 128, 128, 0)',
                                borderColor: '#e9ee37',
                                borderWidth: 3
                            }
                        }
                    }],
                    // links: [],
                    links: [{
                        source: '水利云',
                        target: '农村水电'
                    }, {
                        source: '水利云',
                        target: '智慧防汛',
                        lineStyle: {
                            normal: {
                                width: 3,
                                color: '#FFF',
                                curveness: 0.2 // 线的弯曲度 0-1之间 越大则歪曲度更大
                            }
                        }
                    }, {
                        source: '水利云',
                        target: '河长制',
                        lineStyle: {
                            normal: {
                                width: 3,
                                color: '#FFF',
                                curveness: 0.2 // 线的弯曲度 0-1之间 越大则歪曲度更大
                            }
                        }
                    }, {
                        source: '水利云',
                        target: '建管',
                        lineStyle: {
                            normal: {
                                width: 3,
                                color: '#FFF',
                                curveness: 0.2 // 线的弯曲度 0-1之间 越大则歪曲度更大
                            }
                        }
                    }, {
                        source: '水利云',
                        target: '运行管理'
                    }, {
                        source: '水利云',
                        target: '水土保持',
                        lineStyle: {
                            normal: {
                                width: 3,
                                color: '#FFF',
                                curveness: 0.2 // 线的弯曲度 0-1之间 越大则歪曲度更大
                            }
                        }
                    }, {
                        source: '水利云',
                        target: '饮水安全',
                        lineStyle: {
                            normal: {
                                width: 3,
                                color: '#FFF',
                                curveness: 0.2 // 线的弯曲度 0-1之间 越大则歪曲度更大
                            }
                        }
                    }, {
                        source: '水利云',
                        target: '党政'
                    }, {
                        source: '水利云',
                        target: '纪检'
                    }, {
                        source: '水利云',
                        target: '人事'
                    }, {
                        source: '水利云',
                        target: '规划计划'
                    }, {
                        source: '水利云',
                        target: '政策法规'
                    }, {
                        source: '水利云',
                        target: '安全监督'
                    }, {
                        source: '水利云',
                        target: '灌溉工程'
                    }, {
                        source: '水利云',
                        target: '烟水'
                    }, {
                        source: '水利云',
                        target: '智慧水库'
                    }, {
                        source: '水利云',
                        target: '水资源',
                        lineStyle: {
                            normal: {
                                width: 3,
                                color: '#FFF',
                                curveness: 0.2 // 线的弯曲度 0-1之间 越大则歪曲度更大
                            }
                        }
                    }]
                }]
            }
            let myChart = echarts.init(document.getElementById('3d_echart'))
            myChart.setOption(centerOption)
            let _this = this
            myChart.on('click', function (params) {
                _this.toUrl(params.name)
            })
        },
        toUrl(name) {
            let url
            switch (name) {
                case '河长制':
                    url = 'http://47.92.26.144:8003/hezhangChart/index.html'
                    break
                case '农村水电':
                    url = 'http://202.98.194.42:8085/nd/'
                    break
                case '农村水电上报':
                    url = 'http://202.98.194.42:8083'
                    break
                case '农村水电展示':
                    url = 'http://202.98.194.42:8085'
                    break
                case '智慧防汛':
                    // openPage('http://gywfc.dfsjcloud.com:8081/login',[{paramName:'username',paramValue:'xiangjg'},{paramName:'password',paramValue:'123456'}])
                    url = 'http://gywfc.dfsjcloud.com:8081/'
                    break
                case '智慧水库':
                    url = 'http://222.85.230.196:8090/DataView/demo.html'
                    break
                case '运行管理':
                    url = 'http://sk.ygwjg.com'
                    break
                case '水土保持':
                    url = 'http://222.85.224.95:6444/ConserDemo/index.html'
                    break
                /* case '水利云':
                    let path = 'E:\\贵阳水利云\\GZFCApplication.exe'
                    let Ws = new ActiveXObject('wscript.shell')
                    Ws.exec(path)
                    break */
                case '饮水安全':
                    url = 'http://202.98.194.230:9106'
                    break
                default:
                    break
            }
            if (url && url.length > 0) {
                window.open(url, '', 'width=' + window.screen.availWidth + ',height=' + window.screen.availHeight + ',top=0,left=0,' +
                    'toolbar=yes,menubar=yes,scrollbars=yes,resizable=yes,location=yes,status=yes')
            }
        }
    },
    mounted() {
        // this.init3D()
        // let regionReservoir = this.getRegionReservoirs()
        // console.log(regionReservoir)
        // 初始化关系图
        // let data = this.rebuildStatus(regionReservoir)
        // this.initGraph(data)
        // 混合统计图
        // this.initMapBar()
        /* this.$http.get('/api/statistic/pmrdiffsentiment').then(res => {
            if (res.code === 1002) {
                let allEQData = res.data
                // let eqData = this.regroupEQData(allEQData)
                let chartData = this.get3DScatterData(allEQData)
                this.init3DScatter([chartData[0], chartData[1], chartData[2]])
            }
        }) */
        // this.getTest()
        this.initShuiliyun()
    }
}
</script>
