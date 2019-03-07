<template>
    <div class="reservoir-detail centerline-panel panel-mini-font">
        <el-tabs v-model="activeNames" v-if="baseInfoId">
            <el-tab-pane name="1">
                <span slot="label"><i class="fa fa-bank"></i> 水库概况</span>
                <detail v-if="activeNames.indexOf('1') > -1 && baseInfoId" :baseInfoId="baseInfoId" :score="score"></detail>
            </el-tab-pane>
            <el-tab-pane name="2">
                <span slot="label"><i class="fa fa-file-excel-o"></i> 项目月报</span>
                <month-paper v-if="activeNames.indexOf('2') > -1 && baseInfoId" :baseInfoId="baseInfoId" :monthPaperScore="monthPaperScore"></month-paper>
            </el-tab-pane>
            <el-tab-pane name="3">
                <span slot="label"><i class="fa fa-line-chart"></i> 当天水雨情</span>
                <water-rain v-if="activeNames.indexOf('3') > -1 && baseInfoId" :baseInfoId="baseInfoId"></water-rain>
            </el-tab-pane>
            <el-tab-pane name="4">
                <span slot="label"><i class="fa fa-video-camera"></i> 视频监控</span>
                <reservoir-video ref="reservoirVideo"></reservoir-video>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import detail from './reservoirItem/detail'
import monthpaper from './reservoirItem/month_paper'
import waterrain from './reservoirItem/water_rain'
import video from './reservoirItem/video'

export default {
    components: {
        detail,
        'month-paper': monthpaper,
        'water-rain': waterrain,
        'reservoir-video': video
    },
    data() {
      return {
        // activeNames: [],
        activeNames: '1',
        baseInfoId: '',
        score: {},
        monthPaperScore: 0
      }
    },
    watch: {
        baseInfoId(curValue, oldValue) {
            if (curValue) {
                this.lifeCircle(curValue).then(res => {
                    console.log(res)
                })
            }
        },
        activeNames(curValue, oldValue) {
            if (curValue === '4') {
                this.$nextTick(() => {
                    this.$refs.reservoirVideo.initVideoPlayer()
                })
            }
        }
    },
    methods: {
      handleChange(val) {
        console.log(val)
      },
      // 获取生命周期信息
        lifeCircle(baseInfoId) {
            let thisRequest = this.$http.get('/api/baseinfo/lifecircle', {
                params: {baseInfoId: baseInfoId}
            })
            return thisRequest
        }
    },
    mounted() {
        let params = this.$route.params
        if (Object.keys(params).length > 0 && params.baseInfoId) {
            this.baseInfoId = params.baseInfoId
            this.score = params.score
            this.monthPaperScore = params.monthPaperScore
        } else {
            this.$router.push({path: '/reservoirs'})
        }
    }
}
</script>
