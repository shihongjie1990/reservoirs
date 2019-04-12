<template>
  <div class="tender-manager">
    <div class="title page-title"><span>招标管理</span></div>
    <div class="contract-operation">
      <el-button type="primary"
                 size="mini"
                 @click="dialogaddVisible = true"><i class="fa fa-plus-square-o fa-lg"></i> 新增标书</el-button>
      <el-button type="warning"
                 size="mini"
                 @click="modifyContract"><i class="fa fa-edit fa-lg"></i> 修改标书</el-button>
      <el-button type="info"
                 size="mini"
                 @click="deleteContract"><i class="fa fa-trash-o fa-lg"></i> 删除标书</el-button>
    </div>
    <el-table :data="tableData"
              border
              style="width: 100%"
              @selection-change="handleSelectionChange"
              id="tenderTable">
      <el-table-column type="selection"
                       width="55"
                       align="center">
      </el-table-column>
      <el-table-column type="index"
                       width="55"
                       align="center">
      </el-table-column>
      <el-table-column prop="tenderFilingUnit"
                       label="招标备案单位"
                       align="center">
      </el-table-column>
      <el-table-column prop="nameOfLots"
                       label="标段名称"
                       align="center">
      </el-table-column>
      <el-table-column prop="bidPlanDate"
                       label="招标计划时间"
                       :formatter="formatterDate"
                       align="center">
      </el-table-column>
      <el-table-column prop="bidCompleteDate"
                       label="已招标完成时间"
                       :formatter="formatterDate"
                       align="center">
      </el-table-column>
      <el-table-column prop="bidAgent"
                       label="招标代理机构"
                       align="center">
      </el-table-column>
      <el-table-column prop="tenderAgent"
                       label="中标单位"
                       align="center">
      </el-table-column>
      <el-table-column prop="submitter"
                       label="更新人"
                       align="center">
      </el-table-column>
      <el-table-column label="附件"
                       align="center">
        <template slot-scope="scope">
          <el-button size="small"
                     @click="viewFiles(scope.row.tenderFiles)"
                     type="text"
                     v-if="scope.row.tenderFiles.length > 0">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="附件"
               :visible.sync="dialogFilesVisible">
      <attachment-files v-if="dialogFilesVisible"
                        :files="files"></attachment-files>
    </el-dialog>
    <el-dialog title="新增标书"
               :visible.sync="dialogaddVisible">
      <add-tender @closeDialog="closeDialog"
                  @getTender="getTender"
                  v-if="dialogaddVisible"></add-tender>
    </el-dialog>
    <el-dialog title="修改标书"
               :visible.sync="dialogmodifyVisible">
      <modify-tender @closeDialog="closeDialog"
                     @getTender="getTender"
                     :modifyData="modifyData"
                     v-if="dialogmodifyVisible"></modify-tender>
    </el-dialog>
  </div>
</template>

<script>
// import attachmentfiles from './tender/attachmentFiles'
import attachmentfiles from '@/components/widget/list-picture'
import addtender from './tender/add'
import modifytender from './tender/modify'

export default {
  components: {
    'attachment-files': attachmentfiles,
    'add-tender': addtender,
    'modify-tender': modifytender
  },
  data() {
    return {
      dialogFilesVisible: false,
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
      let thisRequest = this.$http.get('/api/tender/own', { loading: { target: '#tenderTable' } }).then(res => {
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
        this.$alert('请选择招标信息！', '提示', { type: 'info' })
      } else {
        this.$alert('每次只能修改一条招标信息！', '警告', { type: 'warning' })
      }
    },
    deleteContract() {
      if (this.rowData.length === 1) {
        this.$confirm('记录删除后无法恢复，是否继续删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then((flag) => {
          let id = this.rowData[0].tenderId
          this.$http.delete(`/api/tender/${id}`, { loading: { operation: true } }).then(res => {
            if (res.code === 1002) {
              this.$message({ message: '删除成功!', type: 'success' })
              this.getTender()
            }
          })
        })
      } else if (this.rowData.length === 0) {
        this.$alert('请选择招标信息！', '提示', { type: 'info' })
      } else {
        this.$alert('每次只能删除一条招标信息！', '警告', { type: 'warning' })
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
    formatterDate(row, option, value, index) {
      let date = new Date(value.replace(/-/g, '/'))
      // let date = value.substr(0, value.indexOf('T'))
      return date.toISOString().substr(0, 10)
      // return value
    }
  },
  mounted() {
    this.getTender()
  }
}
</script>
