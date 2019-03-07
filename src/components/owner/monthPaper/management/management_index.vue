<template>
    <el-tabs v-model="activeName" v-if="projectMonthlyReportId">
        <el-tab-pane name="mywork">
            <span slot="label"><i class="el-icon-date"></i> 详情</span>
            <reservoir-detail :projectMonthlyReportId="projectMonthlyReportId"></reservoir-detail>
        </el-tab-pane>
        <el-tab-pane name="second">
            <span slot="label"><i class="el-icon-date"></i> 月报</span>
            <month-paper :monthPaper="monthPaper"></month-paper>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
import detail from './detail'
import paper from './paper'

export default {
    components: {
        'reservoir-detail': detail,
        'month-paper': paper
    },
    data() {
        return {
            activeName: 'mywork',
            monthPaper: this.$route.params.monthPaper,
            projectMonthlyReportId: ''
        }
    },
    created() {
        let monthPaper = this.$route.params.monthPaper
        if (!monthPaper) {
            this.$router.push({name: '月报管理'})
        } else {
            this.projectMonthlyReportId = monthPaper.projectMonthlyReportId
        }
    }
}
</script>
