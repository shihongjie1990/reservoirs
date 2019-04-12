<template>
  <div class="manager-page">
    <div class="title page-title"><span>形象进度</span></div>
    <div class="operation-area">
      <el-button type="primary"
                 size="mini"
                 @click="dialogaddVisible = true"><i class="fa fa-plus-square-o fa-lg"></i> 新增进度</el-button>
      <el-button type="warning"
                 size="mini"
                 @click="$common.inDevelop"><i class="fa fa-edit fa-lg"></i> 修改进度</el-button>
      <!-- <el-button type="info"
                 size="mini"><i class="fa fa-trash-o fa-lg"></i> 删除进度</el-button> -->
    </div>
    <el-table :data="tableData"
              border
              style="width: 100%"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection"
                       width="55"
                       align="center">
      </el-table-column>
      <el-table-column type="index"
                       width="50"
                       label="序号"
                       align="center">
      </el-table-column>
      <el-table-column prop="title"
                       label="形象进度名称"
                       align="center">
      </el-table-column>
      <el-table-column prop="desc"
                       label="详情说明"
                       align="center">
      </el-table-column>
      <el-table-column label="图片"
                       align="center">
        <template slot-scope="scope">
          <el-button size="small"
                     @click="viewFiles(scope.row.visualProgressImgVOs)"
                     type="text"
                     v-if="scope.row.visualProgressImgVOs && scope.row.visualProgressImgVOs.length > 0">{{ scope.row.visualProgressImgVOs.length }}张</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="updateTime"
                       label="修改时间"
                       align="center">
      </el-table-column>
      <el-table-column prop="createTime"
                       label="创建时间"
                       align="center">
      </el-table-column>
    </el-table>
    <el-dialog title="添加进度"
               :visible.sync="dialogaddVisible">
      <add-process @closeDialog="closeDialog"
                   @getAllProcess="getAllProcess"
                   v-if="dialogaddVisible"></add-process>
    </el-dialog>
    <el-dialog title="修改进度"
               :visible.sync="dialogmodifyVisible">
      <add-process :modifyData="modifyData"
                   @closeDialog="closeDialog"
                   @getAllProcess="getAllProcess"
                   v-if="dialogmodifyVisible"></add-process>
    </el-dialog>
    <el-dialog title="附件"
               :visible.sync="dialogFilesVisible">
      <show-image v-if="dialogFilesVisible"
                  :files="images"></show-image>
    </el-dialog>
  </div>
</template>

<script>
import add from './add'
import showImage from '@/components/widget/list-picture'

export default {
  components: {
    'add-process': add,
    'show-image': showImage
  },
  data() {
    return {
      dialogaddVisible: false,
      dialogmodifyVisible: false,
      dialogFilesVisible: false,
      tableData: [],
      images: []
    }
  },
  methods: {
    viewFiles(images) {
      let param = JSON.parse(JSON.stringify(images))
      param.map(item => {
        item.url = location.origin + '/api/files/' + item.fileAddr
        return item
      })
      this.images = param
      this.$nextTick(() => {
        this.dialogFilesVisible = true
      })
    },
    closeDialog() {
      this.dialogaddVisible = false
      this.dialogmodifyVisible = false
    },
    getAllProcess() {
      this.$http.get('/api/visualProgress').then(res => {
        if (res.code === 1002) {
          this.tableData = res.data
        } else {
          this.$message.error(res.msg || res.content)
        }
      })
    },
    handleSelectionChange() {

    }
  },
  mounted() {
    this.getAllProcess()
  }
}
</script>
