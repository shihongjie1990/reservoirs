<template>
    <div class="management-pass">
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="name" label="合同名称">
            </el-table-column>
            <el-table-column prop="number" label="合同编号">
            </el-table-column>
            <el-table-column prop="type" label="合同类型">
            </el-table-column>
            <el-table-column prop="signDate" label="签订时间">
            </el-table-column>
            <el-table-column prop="partyA" label="甲方">
            </el-table-column>
            <el-table-column prop="partyB" label="乙方">
            </el-table-column>
            <el-table-column prop="price" label="金额">
            </el-table-column>
            <el-table-column prop="state" label="归类">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="showContract(scope.$index, scope.row)">查看</el-button>
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
        showContract(index, row) {
            this.$emit('showDialog', row)
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
