<template>
  <div class="investment-financing">
    <div class="title page-title"><span>资金申报</span></div>
    <div class="tool-operation">
      <el-button type="primary"
                 size="mini"
                 v-if="isOperation"
                 @click="dialogaddVisible = true"><i class="fa fa-plus-square-o fa-lg"></i> 新增资金申报</el-button>
      <div v-else
           class="apply-tips">提醒：只能在每个月的1-10号申报资金和撤销申报</div>
      <!-- <el-button type="warning"
                 size="mini"
                 @click="modifyPlan"><i class="fa fa-edit fa-lg"></i> 修改资金申报</el-button> -->
      <!-- <el-button type="info"
                 size="mini"
                 @click="deletePlan"><i class="fa fa-edit fa-lg"></i> 删除投资计划</el-button> -->
    </div>
    <el-table :data="tableData"
              border
              tooltip-effect="dark"
              style="width: 100%; font-size:13px"
              :header-cell-style="{background:'#e0e0e0',fontSize:'14px'}"
              @selection-change="handleSelectionChange"
              id="apply_money">
      <!-- <el-table-column type="selection"
                       width="55"
                       align="center">
      </el-table-column> -->
      <el-table-column type="index"
                       width="50"
                       label="序号"
                       align="center">
      </el-table-column>
      <el-table-column prop="applicationDocId"
                       label="来文编号"
                       align="center">
      </el-table-column>
      <el-table-column prop="applicationAmount"
                       label="申请拨付金额（万元）"
                       align="center"
                       width="180">
      </el-table-column>
      <el-table-column prop="peirod"
                       label="档期"
                       align="center">
      </el-table-column>
      <el-table-column prop="createTime"
                       label="申报时间"
                       align="center">
      </el-table-column>
      <el-table-column prop="statusChn"
                       label="当前状态"
                       align="center">
      </el-table-column>
      <el-table-column label="操作"
                       align="center">
        <template slot-scope="scope">
          <el-button size="small"
                     @click="viewInfo(scope.row.applicationId)"
                     type="text">查看</el-button>
          <el-button size="small"
                     @click="cancleApply(scope.row.applicationId)"
                     type="text"
                     v-if="scope.row.statusChn === '未处理'" :class="!isOperation ? 'warnBtn' : ''">撤销</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="pageOp.page"
                   :page-sizes="[10, 20, 50, 100]"
                   :page-size="pageOp.pageVolume"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="totalPage">
    </el-pagination>
    <el-dialog title="新增资金申报"
               :visible.sync="dialogaddVisible">
      <add-task @closeDialog="closeDialog"
                @getAllNodes="getAllNodes"
                v-if="dialogaddVisible"></add-task>
    </el-dialog>
    <el-dialog title="修改资金申报"
               :visible.sync="dialogmodifyVisible">
      <modify-task :modifyData="modifyData"
                   @closeDialog="closeDialog"
                   @getAllNodes="getAllNodes"
                   v-if="dialogmodifyVisible"></modify-task>
    </el-dialog>
    <el-dialog title="详情"
               :visible.sync="infoVisible">
      <info-detail v-if="infoVisible"
                   @closeDialog="closeDialog"
                   :applicationId="applicationId"></info-detail>
    </el-dialog>
  </div>
</template>

<script>
import addtask from './add'
import modifytask from './modify'
// import attachmentfiles from '@/components/widget/list-picture'
import infoDetail from './infoDetail'

export default {
  components: {
    'add-task': addtask,
    'modify-task': modifytask,
    'info-detail': infoDetail
  },
  data() {
    return {
      dialogaddVisible: false,
      dialogmodifyVisible: false,
      dialogFilesVisible: false,
      infoVisible: false,
      tableData: [],
      rowDatas: [],
      modifyData: {},
      applicationId: '',
      pageOp: {
        page: 1,
        pageVolume: 10
      },
      totalPage: 0
    }
  },
  computed: {
    isOperation() {
      let time = new Date()
      let day = time.getDate()
      if (day > 0 && day < 11) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    getAllNodes() {
      let param = {loading: {target: '#apply_money'}}
      Object.assign(param, this.pageOp)
      this.$http.post('/api/fund/my-application-list', param).then(res => {
        if (res.code === 1002) {
          this.tableData = res.data.list
          this.pageOp.page = res.data.pageNum
          this.pageOp.pageVolume = res.data.pageSize
          this.totalPage = res.data.total
        }
      })
    },
    handleSelectionChange(rows) {
      this.rowDatas = rows
    },
    handleSizeChange(value) {
      this.pageOp.pageVolume = value
      this.getAllNodes()
    },
    handleCurrentChange(value) {
      this.pageOp.page = value
      this.getAllNodes()
    },
    viewInfo(id) {
      this.applicationId = id
      this.$nextTick(() => {
        this.infoVisible = true
      })
    },
    cancleApply(id) {
      this.$http.delete(`/api/fund/${id}`, {loading: {target: '#apply_money'}}).then(res => {
        if (res.code === 1002) {
          this.getAllNodes()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    modifyPlan() {
      let selectedRows = this.rowDatas
      if (selectedRows.length === 1) {
        this.modifyData = selectedRows[0]
        this.$nextTick(() => {
          this.dialogmodifyVisible = true
        })
      } else if (selectedRows.length === 0) {
        this.$alert('请选择投融资计划！', '提示', { type: 'info' })
      } else {
        this.$alert('只能修改一条投融资计划！', '警告', { type: 'warning' })
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
          this.$http.delete(`/api/annualinvestment/${id}`, { loading: { operation: true } }).then(res => {
            if (res.code === 1002) {
              this.$message({ message: '删除成功!', type: 'success' })
              this.getAllNodes()
            }
          })
        })
      } else if (selectedRows.length === 0) {
        this.$alert('请选择合同！', '提示', { type: 'info' })
      } else {
        this.$alert('每次只能删除一条合同！', '警告', { type: 'warning' })
      }
    },
    closeDialog() {
      this.dialogaddVisible = false
      this.dialogmodifyVisible = false
      this.infoVisible = false
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

<style>
.apply-tips {
  color: #ff5555;
  font-size: 16px;
}
.warnBtn {
  color: #999!important;
}
.warnBtn:hover {
  cursor: auto!important;
}
</style>
