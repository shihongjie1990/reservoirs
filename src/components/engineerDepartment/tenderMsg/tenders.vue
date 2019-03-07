<template>
    <div class='notice-manager'>
        <div class='notice-operation'>
            <div class='notice-block'>
                <el-input placeholder="请输入标题" suffix-icon="el-icon-search" v-model="searchCondition" @keyup.native.enter="searchNotice">
                </el-input>
            </div>
        </div>
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%; font-size:13px" border :header-cell-style="{background:'#e0e0e0',fontSize:'14px'}">
            <el-table-column type="index" width="55" align="center">
            </el-table-column>
            <el-table-column label="标题" align="center" show-overflow-tooltip width='800'>
                <template slot-scope='scope'><a class='notice-a' @click="skipTo(scope.row)">{{scope.row.title}}</a></template>
            </el-table-column>
            <el-table-column prop="date" label="日期" align="center" show-overflow-tooltip>
                <!-- <template slot-scope="scope">{{ scope.row.updateTime }}</template> -->
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagerOp.pageNum" :page-sizes="pageSizes" :page-size="pagerOp.pageSize" layout="total, sizes, prev, pager, next, jumper" background :total="totalElements">
        </el-pagination>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [],
            selectDatas: [],
            pagerOp: {
                pageNum: 1,
                pageSize: 10
            },
            totalElements: 0,
            pageSizes: [10, 20, 50, 100],
            searchCondition: '',
            bringCondition: ''
        }
    },
    /* watch: {
        pagerOp: {
            handler(curValue, oldValue) {
                this.$nextTick(() => {
                    this.pagerChange(curValue)
                })
            },
            deep: true
        }
    }, */
    methods: {
        handleSizeChange(val) {
            this.pagerOp.pageSize = val
            this.$nextTick(() => {
                this.pagerChange(this.pagerOp)
            })
        },
        handleCurrentChange(val) {
            this.pagerOp.pageNum = val
            this.$nextTick(() => {
                this.pagerChange(this.pagerOp)
            })
        },
        getAnnouncements(pagerOp) {
            let thisRequest = this.$http.post(`/api/tenderbid/page?type=bid&pageNum=${pagerOp.pageNum}&pageSize=${pagerOp.pageSize}`)
            return thisRequest
        },
        skipTo(rowData) {
            window.open(rowData.url)
        },
        searchNotice() {
            let condition = this.searchCondition
            this.bringCondition = condition
            let params = this.pagerOp
            params.page = 1
            this.pagerChange(params)
        },
        getSearchData(param) {
            let thisRequest = this.$http.get('/api/tenderbid/search', {
                params: param
            })
            return thisRequest
        },
        /**
         *  翻页
         */
        pagerChange(pagerOp) {
            let title = this.bringCondition
            let params = JSON.parse(JSON.stringify(pagerOp))
            if (title) {
                params.text = title
                params.type = 'bid'
                this.getSearchData(params).then(res => {
                    this.tableData = res.data.list
                    this.pagerOp.pageNum = res.data.pageNum
                    // this.pagerOp.pageSize = res.data.pageSize
                    this.totalElements = res.data.total
                })
            } else {
                this.getAnnouncements(params).then(res => {
                    this.tableData = res.data.list
                    this.pagerOp.pageNum = res.data.pageNum
                    // this.pagerOp.pageSize = res.data.pageSize
                    this.totalElements = res.data.total
                })
            }
        }
    },
    mounted() {
        this.pagerChange(this.pagerOp)
    }
}
</script>
