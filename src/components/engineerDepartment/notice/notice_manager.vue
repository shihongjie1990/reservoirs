<template>
    <div class='notice-manager'>
        <div class='notice-operation'>
            <el-button type="primary" icon="el-icon-edit-outline" size="small" @click="publishNotice">发布公告</el-button>
            <el-button type="warning" icon="el-icon-edit" size="small" @click="modifyNotice">修改公告</el-button>
            <el-button type="info" icon="el-icon-delete" size="small" @click="deleteNotice">删除公告</el-button>
            <div class='notice-block'>
                <el-input placeholder="请输入标题" suffix-icon="el-icon-search" v-model="searchCondition" @keyup.native.enter="searchNotice">
                </el-input>
            </div>
        </div>
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%; font-size:13px" border :header-cell-style="{background:'#e0e0e0',fontSize:'14px'}" @selection-change="handleSelectionChange">
            <el-table-column type="index" width="55" align="center">
            </el-table-column>
            <el-table-column type="selection" width="55" align="center">
            </el-table-column>
            <el-table-column label="标题" align="center" show-overflow-tooltip width='500'>
                <template slot-scope='scope'><a class='notice-a' @click="skipTo(scope.row)">{{scope.row.title}}</a></template>
            </el-table-column>
            <el-table-column prop="type" label="公告类型" show-overflow-tooltip align="center" :formatter="formatType">
            </el-table-column>
            <el-table-column prop="keyword" label="关键字" show-overflow-tooltip align="center">
            </el-table-column>
            <el-table-column prop="hot" label="置顶" show-overflow-tooltip align="center" :formatter="formatHot">
            </el-table-column>
            <el-table-column prop="updateTime" label="日期" align="center" width="200" show-overflow-tooltip :formatter="formatTime">
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
            /* let thisRequest = this.$http.get('/announcement/getannouncements', {
                params: pagerOp
            }) */
            let thisRequest = this.$http.post('/api/announcement/page', pagerOp)
            return thisRequest
        },
        handleSelectionChange(rowDatas) {
            this.selectDatas = rowDatas
        },
        formatHot(rowData, option, value, index) {
            return value ? '是' : '否'
        },
        formatType(rowData, option, value, index) {
            return value
        },
        formatTime(rowData, option, value, index) {
            let date = new Date(rowData.updateTime.replace(/-/g, '/'))
            return date.toISOString().substr(0, 10) + ' ' + date.toTimeString().substr(0, 8)
            // return rowData.updateTime.substr(0, rowData.updateTime.indexOf('T'))
        },
        skipTo(rowData) {
            rowData.time = rowData.updateTime
            this.$router.push({name: '公告详情', params: {announcementId: rowData.announcementId}})
        },
        publishNotice() {
            this.$router.push({name: '发布公告'})
        },
        modifyNotice() {
            let selectDatas = this.selectDatas
            if (selectDatas && selectDatas.length === 1) {
                this.$router.push({name: '发布公告', params: {announcementId: selectDatas[0].announcementId}})
            } else {
                this.$alert('每次只能修改一条公告！')
            }
        },
        deleteNotice() {
            let selectDatas = this.selectDatas
            let idList = []
            for (let i = 0; i < selectDatas.length; i++) {
                idList.push(selectDatas[i].announcementId)
            }
            this.$confirm('公告信息删除后无法恢复, 继续删除？', '警告', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.delete('/api/announcement', {data: idList}).then(res => {
                    if (res.code === 1002) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                    }
                    this.pagerChange(this.pagerOp)
                })
            })
        },
        searchNotice() {
            let condition = this.searchCondition
            this.bringCondition = condition
            let params = this.pagerOp
            params.page = 1
            this.pagerChange(params)
        },
        /**
         *  翻页
         */
        pagerChange(pagerOp) {
            let title = this.bringCondition
            let params = JSON.parse(JSON.stringify(pagerOp))
            if (title) {
                params.title = title
            }
            this.getAnnouncements(params).then(res => {
                this.tableData = res.data.list
                this.pagerOp.pageNum = res.data.pageNum
                // this.pagerOp.pageSize = res.data.pageSize
                this.totalElements = res.data.total
            })
        }
    },
    mounted() {
        this.pagerChange(this.pagerOp)
    }
}
</script>
