<template>
  <div class="reservoir-list">
    <div class="title page-title"><span>水库字典</span></div>
    <div class="reservoir-operation">
      <el-button type="warning"
                 size="small"
                 @click="modifyReservoir"><i class="fa fa-edit"></i> 信息修改</el-button>
      <el-button type="info"
                 size="small"
                 @click="deleteReservoir"><i class="fa fa-trash-o"></i> 水库删除</el-button>
    </div>
    <div class="reservoir-search">
      <el-input placeholder="请输入水库名称"
                suffix-icon="el-icon-search"
                v-model="plantName"
                @keyup.native.enter="searchReservoir">
      </el-input>
    </div>
    <el-table ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%; font-size:13px"
              border
              :header-cell-style="{background:'#e0e0e0',fontSize:'14px'}"
              @selection-change="handleSelectionChange">
      <el-table-column type="index"
                       width="40"
                       align="center">
      </el-table-column>
      <el-table-column type="selection"
                       width="40"
                       align="center">
      </el-table-column>
      <el-table-column label="水库名"
                       align="center"
                       show-overflow-tooltip
                       width='140'>
        <template slot-scope='scope'><a class='reservoir-a'
             @click="skipTo(scope.row)">{{scope.row.plantName}}</a></template>
      </el-table-column>
      <el-table-column prop="scale"
                       label="水库规模"
                       show-overflow-tooltip
                       align="center">
      </el-table-column>
      <el-table-column prop="level"
                       label="等级"
                       show-overflow-tooltip
                       align="center"
                       width="50">
      </el-table-column>
      <el-table-column prop="damType"
                       label="坝型"
                       show-overflow-tooltip
                       align="center">
      </el-table-column>
      <el-table-column prop="floodControlElevation"
                       label="防洪标高"
                       show-overflow-tooltip
                       align="center">
      </el-table-column>
      <el-table-column prop="legalPersonName"
                       label="法人"
                       show-overflow-tooltip
                       align="center"
                       width='70'>
      </el-table-column>
      <el-table-column prop="legalRepresentativeName"
                       label="上报人"
                       show-overflow-tooltip
                       align="center"
                       width='80'>
      </el-table-column>
      <el-table-column prop="county"
                       label="所在县"
                       show-overflow-tooltip
                       align="center">
      </el-table-column>
      <el-table-column prop="location"
                       label="地理位置"
                       show-overflow-tooltip
                       align="center"
                       width='100'>
      </el-table-column>
      <el-table-column prop="projectSource"
                       label="项目来源"
                       show-overflow-tooltip
                       align="center">
      </el-table-column>
      <el-table-column prop="createTime"
                       label="创建时间"
                       show-overflow-tooltip
                       align="center"
                       width="100"
                       :formatter="formatDate">
      </el-table-column>
      <el-table-column label="总分"
                       prop="score"
                       show-overflow-tooltip
                       align="center"
                       width="80">
        <template slot="header">
          <!-- <el-input v-model="search" size="mini" placeholder="输入关键字搜索" /> -->
          <span class="cell-render">总分</span>
          <div class="cell-icon">
            <i class="el-icon-arrow-up"
               @click="totalUp"></i>
            <i class="el-icon-arrow-down"
               @click="totalDown"></i>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="monthPaperScore"
                       label="月报总分"
                       show-overflow-tooltip
                       align="center"
                       width="105">
        <template slot="header">
          <!-- <el-input v-model="search" size="mini" placeholder="输入关键字搜索" /> -->
          <span class="cell-render">月报总分</span>
          <div class="cell-icon">
            <i class="el-icon-arrow-up"
               @click="monthPaperUp"></i>
            <i class="el-icon-arrow-down"
               @click="monthPaperDown"></i>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="pagerOp.page"
                   :page-sizes="pageSize"
                   :page-size="pagerOp.rows"
                   layout="total, sizes, prev, pager, next, jumper"
                   background
                   :total="totalElements">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      infoData: [],
      conditionData: [],
      pagerOp: {
        rows: 10,
        page: 1
      },
      totalElements: 0,
      pageSize: [10, 20, 50, 100],
      plantName: '',
      condition: '',
      selectedRows: [],
      scores: {}
    }
  },
  watch: {
    pagerOp: {
      handler(curVal, oldVal) {
        this.pagination(curVal)
      },
      deep: true
    }
  },
  methods: {
    getAllBaseInfo() {
      let thisRequest = this.$http.get('/api/baseinfo/all')
      return thisRequest
      /*  return new Promise((resolve, reject) => {
           this.$http.get('/api/baseinfo/all').then(res => {
               resolve(res.data)
           })
       }) */
    },
    /**
     *  获取评分信息
     */
    getScore() {
      let thisRequest = this.$http.get('/api/statistic/dataCompletion')
      return thisRequest
      /* return new Promise((resolve, reject) => {
          this.$http.get('/api/statistic/dataCompletion').then(res => {
              resolve(res.data)
          })
      }) */
    },
    searchReservoir() {
      let infoData = this.infoData
      let plantName = this.plantName
      let conditionData = []
      infoData.map((item, index) => {
        if (item.plantName.indexOf(plantName) > -1) {
          conditionData.push(item)
        }
      })
      this.pagerOp.page = 1
      this.conditionData = conditionData
      this.pagination(this.pagerOp)
    },
    handleSizeChange(val) {
      this.pagerOp.rows = val
    },
    handleCurrentChange(val) {
      this.pagerOp.page = val
    },
    pagination(pagerOp) {
      let infoData = []
      if (this.plantName) {
        infoData = this.conditionData
      } else {
        infoData = this.infoData
      }
      let totalElements = infoData.length
      // let totalPages = Math.ceil(totalElements / pagerOp.rows)
      let page = pagerOp.page
      let rows = pagerOp.rows
      let rowIndex = (page - 1) * rows
      let tableData = infoData.slice(rowIndex, rowIndex + rows)
      // 表格和分页组件赋值
      this.tableData = tableData
      this.totalElements = totalElements
    },
    /**
     *  页面跳转
     */
    skipTo(rowData) {
      let baseInfoId = rowData.baseInfoId
      this.scores.then(res => {
        let scores = res.data
        let score = scores.find(item => {
          return item.baseInfoId === baseInfoId
        })
        this.$router.push({ name: '水库详情', params: { baseInfoId: baseInfoId, score: score, monthPaperScore: rowData.monthPaperScore } })
      })
      /* let score = {}
      this.$router.push({name: '水库详情', params: {baseInfoId: baseInfoId, score: score}}) */
    },
    formatDate(row, column) {
      // let timeStr = row.createTime.substr(0, row.createTime.indexOf('T'))
      let timeStr = row.createTime
      return timeStr
    },
    handleSelectionChange(selectedRows) {
      this.selectedRows = selectedRows
    },
    modifyReservoir() {
      let rows = this.selectedRows
      if (rows.length > 1) {
        this.$alert('每次只能修改一条数据！')
      } else {
        this.$router.push({ name: '修改水库信息', params: { baseInfoId: rows[0].baseInfoId } })
      }
    },
    deleteReservoir() {
      let rows = this.selectedRows
      if (rows.length > 1) {
        this.$alert('每次只能删除一条数据！')
      } else {
        this.$confirm('水库信息删除后无法恢复, 继续删除？', '警告', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          this.$http.delete(`/api/baseinfo/${rows[0].baseInfoId}`).then(res => {
            if (res.code === 1002) {
              this.$message({ type: 'success', message: `${rows[0].plantName}删除成功！` })
              this.getAllBaseInfo().then(res => {
                this.infoData = res.data
                this.plantName = ''
                this.pagination({
                  rows: 10,
                  page: 1
                })
              })
            } else {
              this.$alert(res.msg, '警告', { type: 'error' })
            }
          }, resultErr => {
            this.$alert(`${rows[0].baseInfoId}删除失败！`, '警告', { type: 'error' })
          })
        }).catch(() => {
          console.log('取消删除！')
        })
      }
    },
    getMonthPaperScore() {
      let thisRequest = this.$http.get('/api/statistic/pmrCompletion')
      return thisRequest
    },
    totalUp() {
      this.infoData.sort((item1, item2) => {
        return item2.score - item1.score
      })
      this.pagination(this.pagerOp)
    },
    totalDown() {
      this.infoData.sort((item1, item2) => {
        return item1.score - item2.score
      })
      this.pagination(this.pagerOp)
    },
    monthPaperDown() {
      this.infoData.sort((item1, item2) => {
        item1 = item1 || 0
        item2 = item2 || 0
        return parseFloat(item1.monthPaperScore) - parseFloat(item2.monthPaperScore)
      })
      this.pagination(this.pagerOp)
    },
    monthPaperUp() {
      this.infoData.sort((item1, item2) => {
        item1 = item1 || 0
        item2 = item2 || 0
        return parseFloat(item2.monthPaperScore) - parseFloat(item1.monthPaperScore)
      })
      this.pagination(this.pagerOp)
    }
  },
  mounted() {
    this.getAllBaseInfo().then(res => {
      this.infoData = res.data
      this.pagination(this.pagerOp)
    })
    // this.scores = this.getScore()
    let allBaseInfo = this.getAllBaseInfo()
    let allScore = this.getScore()
    let allMonthPaperScore = this.getMonthPaperScore()
    this.scores = allScore
    Promise.all([allBaseInfo, allScore, allMonthPaperScore]).then(list => {
      let infoData = list[0].data
      let scores = list[1].data
      let monthPaperScores = list[2].data
      infoData.map(item => {
        let score = scores.find(scoreItem => {
          return scoreItem.baseInfoId === item.baseInfoId
        })
        let monthPaperScore = monthPaperScores.find(monthPaperScoreItem => {
          return monthPaperScoreItem.baseInfoId === item.baseInfoId
        })
        if (monthPaperScore) {
          monthPaperScore.monthPaperScore = monthPaperScore.score.toFixed(2)
          Object.assign(item, monthPaperScore, score)
        } else {
          Object.assign(item, score)
        }
      })
      this.infoData = infoData
      this.pagination(this.pagerOp)
    })
  }
}
</script>
