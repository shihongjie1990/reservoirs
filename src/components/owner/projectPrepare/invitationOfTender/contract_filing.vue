<template>
    <div class="tender-manager">
        <div class="contract-operation">
            <el-button type="primary" size="mini" @click="dialogaddVisible = true"><i class="fa fa-plus-square-o fa-lg"></i> 新增合同</el-button>
            <el-button type="warning" size="mini" @click="modifyContract"><i class="fa fa-edit fa-lg"></i> 修改合同</el-button>
            <el-button type="info" size="mini" @click="deleteContract"><i class="fa fa-trash-o fa-lg"></i> 删除合同</el-button>
        </div>
        <!-- <el-tabs type="border-card" v-model="activeName" class="tender-manager">
            <el-tab-pane name="pass">
                <span slot="label"><i class="el-icon-date"></i> 已审批</span>
                <pass @getTender="getTender" :tableData="passData" v-if="activeName === 'pass'" @showDialog="showDialog"></pass>
            </el-tab-pane>
            <el-tab-pane name="standing">
                <span slot="label"><i class="el-icon-date"></i> 未审批</span>
                <standing @getTender="getTender" :tableData="standingData" v-if="activeName === 'standing'" @showDialog="showDialog"></standing>
            </el-tab-pane>
            <el-tab-pane name="fail">
                <span slot="label"><i class="el-icon-date"></i> 未通过</span>
                <fail @getTender="getTender" :tableData="failData" v-if="activeName === 'fail'" @showDialog="showDialog"></fail>
            </el-tab-pane>
        </el-tabs> -->
        <el-table :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center">
            </el-table-column>
            <el-table-column type="index" width="55" align="center">
            </el-table-column>
            <el-table-column prop="name" label="合同名称" align="center">
            </el-table-column>
            <el-table-column prop="number" label="合同编号" align="center">
            </el-table-column>
            <el-table-column prop="type" label="合同类型" align="center">
            </el-table-column>
            <el-table-column prop="signDate" label="签订时间" align="center">
            </el-table-column>
            <el-table-column prop="partya" label="甲方" align="center">
            </el-table-column>
            <el-table-column prop="partya" label="乙方" align="center">
            </el-table-column>
            <el-table-column prop="price" label="金额（万元）" align="center">
            </el-table-column>
            <el-table-column prop="label" label="合同形式" :formatter="formatterLabel" align="center">
            </el-table-column>
            <el-table-column label="附件" align="center">
                <template slot-scope="scope">
                    <el-button size="small" @click="viewFiles(scope.row.contractFiles)" type="text" v-if="scope.row.contractFiles.length > 0">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="附件" :visible.sync="dialogFilesVisible">
            <attachment-files v-if="dialogFilesVisible" :files="files"></attachment-files>
        </el-dialog>
        <el-dialog title="新增合同" :visible.sync="dialogaddVisible">
            <add-contract @closeDialog="closeDialog" @getTender="getTender" v-if="dialogaddVisible"></add-contract>
        </el-dialog>
        <el-dialog title="修改合同" :visible.sync="dialogmodifyVisible">
            <modify-contract @closeDialog="closeDialog" @getTender="getTender" :modifyData="modifyData" v-if="dialogmodifyVisible"></modify-contract>
        </el-dialog>
    </div>
</template>

<script>
import pass from './contractFiling/pass'
import standing from './contractFiling/standing'
import fail from './contractFiling/fail'
import attachmentfiles from './contract/attachmentFiles'
import addcontract from './contract/add'
import modifycontract from './contract/modify'

export default {
    components: {
        pass,
        standing,
        fail,
        'attachment-files': attachmentfiles,
        'add-contract': addcontract,
        'modify-contract': modifycontract
    },
    data() {
        return {
            activeName: 'pass',
            passData: [],
            standingData: [],
            failData: [],
            dialogFilesVisible: false,
            contractId: '',
            dialogaddVisible: false,
            dialogmodifyVisible: false,
            tableData: [],
            modifyData: {},
            rowData: [],
            files: []
        }
    },
    methods: {
        getTender(param) {
            let thisRequest = this.$http.get('/api/contract/own').then(res => {
                this.tableData = res.data
            })
            return thisRequest
        },
        closeDialog() {
            this.dialogaddVisible = false
            this.dialogmodifyVisible = false
        },
        handleSelectionChange(value) {
            this.rowData = value
        },
        modifyContract() {
            if (this.rowData.length === 1) {
                this.modifyData = this.rowData[0]
                this.$nextTick(() => {
                    this.dialogmodifyVisible = true
                })
            } else if (this.rowData.length === 0) {
                this.$alert('请选择合同！', '提示', {type: 'info'})
            } else {
                this.$alert('每次只能修改一条合同！', '警告', {type: 'warning'})
            }
        },
        deleteContract() {
            if (this.rowData.length === 1) {
                this.$confirm('记录删除后无法恢复，是否继续删除？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then((flag) => {
                    let id = this.rowData[0].contractId
                    this.$http.delete(`/api/contract/${id}`).then(res => {
                        if (res.code === 1002) {
                            this.$message({message: '删除成功!', type: 'error'})
                            this.getTender()
                        }
                    })
                })
            } else if (this.rowData.length === 0) {
                this.$alert('请选择合同！', '提示', {type: 'info'})
            } else {
                this.$alert('每次只能删除一条合同！', '警告', {type: 'warning'})
            }
        },
        viewFiles(files) {
            if (files) {
                this.files = files
                this.$nextTick(() => {
                    this.dialogFilesVisible = true
                })
            }
        },
        formatterLabel(row, option, value, index) {
            let str = ''
            if (value === 1 || value === '1') {
                str = '合同内'
            } else {
                str = '合同外'
            }
            return str
        },
        getAllPrice() {
            this.$http.get('/api/contract/calc').then(res => {
                console.log('计算总价', res)
            })
        }
    },
    mounted() {
        this.getTender()
        this.getAllPrice()
    }
}
</script>
