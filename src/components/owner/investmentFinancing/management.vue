<template>
    <div class="investment-financing">
        <div class="tool-operation">
            <el-button type="primary" size="mini" @click="dialogaddVisible = true"><i class="fa fa-plus-square-o fa-lg"></i> 新增投资计划</el-button>
            <el-button type="warning" size="mini" @click="modifyPlan"><i class="fa fa-edit fa-lg"></i> 修改投资计划</el-button>
            <el-button type="info" size="mini" @click="deletePlan"><i class="fa fa-edit fa-lg"></i> 删除投资计划</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center">
            </el-table-column>
            <el-table-column type="index" width="50" label="序号" align="center">
            </el-table-column>
            <el-table-column prop="applyFigure" label="申报额（万元）" align="center">
            </el-table-column>
            <el-table-column prop="approvedFigure" label="核准额（万元）" align="center">
            </el-table-column>
            <el-table-column prop="submitter" label="更新人" align="center">
            </el-table-column>
            <el-table-column prop="year" label="申报时间" :formatter="formatterDate" align="center">
            </el-table-column>
            <el-table-column label="附件" align="center">
                <template slot-scope="scope">
                    <el-button size="small" @click="viewFiles(scope.row.annualInvestmentFiles)" type="text" v-if="scope.row.annualInvestmentFiles.length > 0">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="新增投资计划" :visible.sync="dialogaddVisible">
            <add-task @closeDialog="closeDialog" @getAllNodes="getAllNodes" v-if="dialogaddVisible"></add-task>
        </el-dialog>
        <el-dialog title="修改投资计划" :visible.sync="dialogmodifyVisible">
            <modify-task :modifyData="modifyData" @closeDialog="closeDialog" @getAllNodes="getAllNodes" v-if="dialogmodifyVisible"></modify-task>
        </el-dialog>
        <el-dialog title="附件" :visible.sync="dialogFilesVisible">
            <attachment-files v-if="dialogFilesVisible" :files="files"></attachment-files>
        </el-dialog>
    </div>
</template>

<script>
import addtask from './add'
import modifytask from './modify'
import attachmentfiles from './attachmentFiles'

export default {
    components: {
        'add-task': addtask,
        'modify-task': modifytask,
        'attachment-files': attachmentfiles
    },
    data() {
        return {
            dialogaddVisible: false,
            dialogmodifyVisible: false,
            dialogFilesVisible: false,
            tableData: [],
            rowDatas: [],
            modifyData: {},
            files: []
        }
    },
    methods: {
        getAllNodes() {
            this.$http.get('/api/annualinvestment/own').then(res => {
                if (res.code === 1002) {
                    this.tableData = res.data
                }
            })
        },
        handleSelectionChange(rows) {
            this.rowDatas = rows
        },
        modifyPlan() {
            let selectedRows = this.rowDatas
            if (selectedRows.length === 1) {
                this.modifyData = selectedRows[0]
                this.$nextTick(() => {
                    this.dialogmodifyVisible = true
                })
            } else if (selectedRows.length === 0) {
                this.$alert('请选择投融资计划！', '提示', {type: 'info'})
            } else {
                this.$alert('只能修改一条投融资计划！', '警告', {type: 'warning'})
            }
        },
        deletePlan() {
            let selectedRows = this.rowDatas
            if (selectedRows.length === 1) {
                this.$confirm('记录删除后无法恢复，继续删除？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then((flag) => {
                    let id = selectedRows[0].annualInvestmentId
                    this.$http.delete(`/api/annualinvestment/${id}`).then(res => {
                        if (res.code === 1002) {
                            this.$message({message: '删除成功!', type: 'error'})
                            this.getAllNodes()
                        }
                    })
                })
            } else if (selectedRows.length === 0) {
                this.$alert('请选择合同！', '提示', {type: 'info'})
            } else {
                this.$alert('每次只能删除一条合同！', '警告', {type: 'warning'})
            }
        },
        closeDialog() {
            this.dialogaddVisible = false
            this.dialogmodifyVisible = false
        },
        formatterDate(row, option, value, index) {
            let date = new Date(value)
            /* let dateStr = value.substr(0, value.indexOf('T'))
            let date = new Date(dateStr.replace('-', '/')) */
            return date.getFullYear() + '年'
        },
        viewFiles(files) {
            if (files) {
                this.files = files
                this.$nextTick(() => {
                    this.dialogFilesVisible = true
                })
            }
        }
    },
    mounted() {
        this.getAllNodes()
    }
}
</script>
