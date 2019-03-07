<template>
    <div class="paper-management">
        <el-collapse v-model="activeNames" class="centerline-panel">
            <el-collapse-item v-for="(itemData, key, index) in showData" :key="index" :title="key" :name="index">
                <div class="content">
                    <el-row :gutter="15" v-if="itemData && itemData.length > 0" class="self-icon-positon">
                        <el-col :sm="8" :md="6" :lg="4" :xl="4" :xs="8" v-for="child in itemData" :key="child.projectMonthlyReportId">
                            <el-card :body-style="{ padding: '0px' }" shadow="hover">
                                <div class="card-img" @click="$router.push({name:'月报详情', params:{monthPaper:child}})">
                                    <img :src="child.url" class="image">
                                </div>
                                <div class="month-flag">
                                    <i class="fa fa-bookmark fa-3x"></i>
                                    <span>{{ child.month }}</span>
                                </div>
                                <!-- <div class="paper-del">
                                    <i class="fa fa-trash-o fa-2px"></i>
                                </div> -->
                                <div v-if="child.state === 1">
                                    <el-tag type="success" class="state-position">{{ child.stateText }}</el-tag>
                                </div>
                                <div v-if="child.state === 0">
                                    <el-tag type="warning" class="state-position">{{ child.stateText }}</el-tag>
                                </div>
                                <div v-if="child.state === -1">
                                    <el-tag type="info" class="state-position">{{ child.stateText }}</el-tag>
                                </div>
                                <div class="card-info">
                                    <label>填报人：</label>
                                    <span>{{ child.submitter }}</span>
                                    <i class="fa fa-trash-o" @click="paperDelete(child.projectMonthlyReportId)"></i>
                                    <!-- <div class="bottom clearfix">
                                        <time class="time">{{ currentDate }}</time>
                                        <el-button type="text" class="button">操作按钮</el-button>
                                    </div> -->
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        currentDate: new Date(),
        activeNames: 0,
        resData: [],
        showData: []
      }
    },
    methods: {
        getMonthlyReports() {
            let thisRequest = this.$http.get('/api/pmr/perall', {
                year: ''
            })
            return thisRequest
        },
        regroupData(data) {
            if (data && data.length > 0) {
                // let showData = {}
                // let yearList = []
                let paperList = {}
                data.map(item => {
                    let date = new Date(item.submitDate.replace(/-/g, '/'))
                    // let dateStr = item.submitDate.substr(0, item.submitDate.indexOf('T'))
                    // let date = new Date(dateStr.replace(/-/g, '/'))
                    let month = date.getMonth() + 1
                    item.month = month
                    let year = date.getFullYear()
                    let keyList = Object.keys(paperList)
                    let url = 'static/images/wallpaper.jpg'
                    let itemData = {
                        month: item.month,
                        url: url,
                        submitter: item.submitter,
                        projectMonthlyReportId: item.projectMonthlyReportId
                    }
                    if (keyList.indexOf(year + '') < 0) {
                        paperList[year] = []
                    }
                    paperList[year].push(itemData)
                })
                this.showData = paperList
            }
        },
        paperDelete(projectMonthlyReportId) {
            this.$confirm('月报删除后无法恢复，继续删除？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then((flag) => {
                this.$http.delete(`/api/pmr/${projectMonthlyReportId}`).then(res => {
                    if (res.code === 1002) {
                        this.$message({type: 'success', message: '删除成功！'})
                        this.getMonthlyReports().then(res => {
                            let data = res.data
                            this.resData = data
                            this.regroupData(data)
                        })
                    } else {
                        this.$alert(res.msg, '警告', {type: 'error'})
                    }
                })
            })
        }
    },
    mounted() {
        this.getMonthlyReports().then(res => {
            let data = res.data
            this.resData = data
            this.regroupData(data)
        }, thisErr => {
            console.log('错误信息', thisErr)
        })
    }
  }
</script>
