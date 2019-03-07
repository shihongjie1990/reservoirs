<template>
    <div class="management-pass">
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="tenderFilingUnit" label="招标备案单位">
            </el-table-column>
            <el-table-column prop="nameOfLots" label="标段名称">
            </el-table-column>
            <el-table-column prop="bidPlanDate" label="招标计划时间">
            </el-table-column>
            <el-table-column prop="bidCompleteDate" label="已招标完成时间">
            </el-table-column>
            <el-table-column prop="bidAgent" label="招标代理机构">
            </el-table-column>
            <el-table-column prop="tenderAgent" label="中标单位">
            </el-table-column>
            <el-table-column label="附件">
                <template slot-scope="scope">
                    <el-button type="text" @click="downloadAttachement(scope.$index, scope.row)">附件</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    props: ['tableData'],
    data() {
        return {
            tableDatas: []
        }
    },
    methods: {
        downloadAttachement(index, row) {
            console.log(index, row)
        },
        pagerChange(pagerOp) {
            let param = {
                    pageSize: 15,
                    startIndex: 0,
                    pageIndex: 0,
                    state: 1
                }
            this.$emit('getTender', param)
        }
    },
    mounted() {
        this.pagerChange()
    }
}
</script>
