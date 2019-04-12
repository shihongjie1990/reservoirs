<template>
  <div class="prepare-task">
    <div class="title page-title"><span>前期工作</span></div>
    <div class="prepare-operation">
      <el-button type="primary"
                 size="mini"
                 @click="dialogaddVisible = true"><i class="fa fa-plus-square-o fa-lg"></i> 新增计划</el-button>
      <el-button type="warning"
                 size="mini"
                 @click="modifyPlan"><i class="fa fa-edit fa-lg"></i> 修改计划</el-button>
    </div>
    <el-table :data="tableData"
              border
              style="width: 100%"
              @selection-change="handleSelectionChange"
              id="taskTable">
      <el-table-column type="selection"
                       width="55"
                       align="center">
      </el-table-column>
      <el-table-column type="index"
                       width="50"
                       label="编号"
                       align="center">
      </el-table-column>
      <el-table-column prop="planProject"
                       label="计划项目"
                       align="center">
      </el-table-column>
      <el-table-column prop="compileUnit"
                       label="编制单位"
                       align="center">
      </el-table-column>
      <el-table-column prop="referenceNumber"
                       label="文号"
                       align="center">
      </el-table-column>
      <el-table-column prop="approvalUnit"
                       label="批复单位"
                       align="center">
      </el-table-column>
      <el-table-column prop="approvalDate"
                       label="批复时间"
                       align="center"
                       :formatter="formatterDate">
      </el-table-column>
      <el-table-column label="附件"
                       align="center"
                       :formatter="formatterFiles">
        <template slot-scope="scope">
          <el-button size="small"
                     @click="viewFiles(scope.row.preProgressEntryFiles)"
                     type="text"
                     v-if="scope.row.preProgressEntryFiles.length > 0">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column label="批复状态"
                       align="center">
        <template slot-scope="scope">
          <el-tag size="medium"
                  v-if="parseInt(scope.row.approvalStatus) === 0"
                  type="info">办理中</el-tag>
          <el-tag size="medium"
                  v-if="parseInt(scope.row.approvalStatus) === 1"
                  type="success">通过</el-tag>
          <el-tag size="medium"
                  v-else-if="parseInt(scope.row.approvalStatus) === 2"
                  type="danger">驳回</el-tag>
          <!-- <div v-else class="status-operation">
                        <el-button size="small" @click="handleStatus(1, scope.row)" type="text">通过</el-button>
                        <el-button size="small" @click="handleStatus(2, scope.row)" type="text">驳回</el-button>
                    </div> -->
        </template>
      </el-table-column>
      <el-table-column prop="submitter"
                       label="更新人"
                       align="center">
      </el-table-column>
    </el-table>
    <el-dialog title="添加计划"
               :visible.sync="dialogaddVisible">
      <add-task @closeDialog="closeDialog"
                @getAllNodes="getAllNodes"
                v-if="dialogaddVisible"></add-task>
    </el-dialog>
    <el-dialog title="修改计划"
               :visible.sync="dialogmodifyVisible">
      <modify-task :modifyData="modifyData"
                   @closeDialog="closeDialog"
                   @getAllNodes="getAllNodes"
                   v-if="dialogmodifyVisible"></modify-task>
    </el-dialog>
    <el-dialog title="附件"
               :visible.sync="dialogFilesVisible">
      <attachment-files v-if="dialogFilesVisible"
                        :files="files"></attachment-files>
    </el-dialog>
  </div>
</template>

<script>
import addtask from './addTask'
import modifytask from './modifyTask'
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
      this.$http.get('/api/preprogress/possessed', { loading: { target: '#taskTable' } }).then(res => {
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
        this.dialogmodifyVisible = true
      } else if (selectedRows.length === 0) {
        this.$alert('请选择计划！', '提示', { type: 'info' })
      } else {
        this.$alert('只能修改一条计划！', '警告', { type: 'warning' })
      }
    },
    closeDialog() {
      this.dialogaddVisible = false
      this.dialogmodifyVisible = false
    },
    formatterFiles() {
      console.log('附件')
    },
    formatterDate(row, option, value, index) {
      let date = new Date(value.replace(/-/g, '/'))
      // let date = value.substr(0, value.indexOf('T'))
      return date.toISOString().substr(0, 10)
      // return value
    },
    handleStatus(value, rowData) {
      rowData.approvalStatus = value
      this.$http.put('/api/preprogress', rowData).then(res => {
        if (res.code === 1002) {
          this.$message({ type: 'success', message: '批复成功！' })
          this.getAllNodes()
        } else {
          this.$alert(res.msg, '警告', {
            type: 'error'
          })
        }
      })
    },
    viewFiles(files) {
      if (files) {
        this.files = files
        this.$nextTick(() => {
          this.dialogFilesVisible = true
        })
      }
    }
    /* formatterStatus(row, option, value, index) {
        let num = parseInt(value)
        if (num === 0) {
        }
    } */
  },
  mounted() {
    this.getAllNodes()
  }
}
</script>
