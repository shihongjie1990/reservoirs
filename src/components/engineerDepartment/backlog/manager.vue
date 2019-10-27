<template>
  <div class="investment-financing">
    <div class="title page-title"><span>待办</span></div>
    <div class="tool-operation">
      <div class="search-tool">
        <el-input placeholder="请输入来文编号"
                  v-model="condition.applicationDocId"
                  @keyup.native.enter="searchForCondition">
          <i slot="suffix"
             class="el-input__icon el-icon-search"
             @click="searchForCondition"></i>
        </el-input>
      </div>
    </div>
    <el-table :data="tableData"
              border
              style="width: 100%; font-size:13px"
              :header-cell-style="{background:'#e0e0e0',fontSize:'14px'}"
              id="investmentTable" class="operation-header-table">
      <!-- <el-table-column type="selection"
                       width="55"
                       align="center">
      </el-table-column> -->
      <el-table-column type="index"
                       width="50"
                       label="序号"
                       align="center">
      </el-table-column>
      <el-table-column prop="baseInfoName"
                       label="工程名称"
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
        <template slot="header"
                  slot-scope="scope">
          <el-date-picker v-model="condition.peirod"
                          class="select-header"
                          type="month"
                          value-format="yyyy-M"
                          @change="handlerPeirod"
                          placeholder="全部档期">
          </el-date-picker>
        </template>
      </el-table-column>
      <el-table-column prop="createTime"
                       label="申报时间"
                       align="center">
      </el-table-column>
      <el-table-column prop="statusChn"
                       label="当前状态"
                       align="center">
        <template slot="header"
                  slot-scope="scope">
          <el-select v-model="condition.status"
                     placeholder="当前状态"
                     class="select-header"
                     @change="changeStatus">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       align="center">
        <template slot-scope="scope">
          <el-button size="small"
                     @click="viewInfo(scope.row.applicationId, true)"
                     type="text"
                     v-if="scope.row.statusChn === '未处理'">处理</el-button>
          <el-button size="small"
                     @click="viewInfo(scope.row.applicationId, false)"
                     type="text"
                     v-else>查看</el-button>
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
    <el-dialog title="详情"
               :visible.sync="infoVisible">
      <info-detail v-if="infoVisible"
                   @closeDialog="closeDialog"
                   @getAllNodes="getAllNodes"
                   :isDeal="isDeal"
                   :applicationId="applicationId"></info-detail>
    </el-dialog>
  </div>
</template>

<script>
import infoDetail from './infoDetail'

export default {
  components: {
    'info-detail': infoDetail
  },
  data() {
    return {
      infoVisible: false,
      tableData: [],
      rowDatas: [],
      modifyData: {},
      applicationId: '',
      pageOp: {
        page: 1,
        pageVolume: 10
      },
      totalPage: 0,
      options: [{
        value: '',
        label: '所有状态'
      }, {
        value: '30550',
        label: '未处理'
      }, {
        value: '31642',
        label: '已审核'
      }, {
        value: '30880',
        label: '已拒绝'
      }],
      condition: {
        status: '',
        applicationDocId: '',
        peirod: ''
      },
      isDeal: false
    }
  },
  filters: {
    filterStatus(value) {
      if (value === '未处理') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    getAllNodes() {
      let loadMask = { loading: { target: '#investmentTable' } }
      let condition = this.condition
      //   let loadMask = {}
      let param = Object.assign(loadMask, this.pageOp)
      condition.status && (param.status = condition.status)
      condition.applicationDocId && (param.applicationDocId = condition.applicationDocId)
      condition.peirod && (param.peirod = condition.peirod)
      this.$http.post('/api/fund/application-list', param).then(res => {
        if (res.code === 1002) {
          this.tableData = res.data.list
          this.pageOp.page = res.data.pageNum
          this.pageOp.pageVolume = res.data.pageSize
          this.totalPage = res.data.total
        }
      })
    },
    handleSizeChange(value) {
      this.pageOp.pageVolume = value
      this.getAllNodes()
    },
    handleCurrentChange(value) {
      this.pageOp.page = value
      this.getAllNodes()
    },
    viewInfo(id, flag) {
      this.applicationId = id
      this.isDeal = flag
      this.$nextTick(() => {
        this.infoVisible = true
      })
    },
    closeDialog() {
      this.infoVisible = false
    },
    changeStatus(value) {
      this.getAllNodes()
    },
    searchForCondition() {
      this.getAllNodes()
    },
    handlerPeirod(value) {
      this.getAllNodes()
    }
  },
  mounted() {
    this.getAllNodes()
  }
}
</script>

<style>
.select-header.el-select,
.el-date-editor.select-header {
  width: 100%;
  padding: 0;
}
.select-header.el-select > .el-input {
  padding: 0;
}
.tool-operation::after {
  content: '';
  clear: both;
  display: block;
  visibility: hidden;
  height: 0;
}
.search-tool {
  float: right;
  width: 300px;
}
.search-tool .el-icon-search:hover {
  cursor: pointer;
}
.operation-header-table thead th {
  padding: 0!important;
}
</style>
