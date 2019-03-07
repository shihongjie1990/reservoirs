<template>
    <div class="table-user">
        <el-table :data="users" style="width: 100%" border :show-header="headerFlag" @selection-change="selectRow">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <own-table :users="props.row.children" name="tableown" ref="selftTable" :headerFlag="showHeader"></own-table>
                </template>
            </el-table-column>
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="55">
            </el-table-column>
            <el-table-column label="水库名" prop="name" width="220">
            </el-table-column>
            <el-table-column label="账号" prop="username" show-overflow-tooltip align="center">
            </el-table-column>
            <el-table-column label="角色" prop="role" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="更新时间" prop="updateTime" :formatter="formatUpdateTime">
            </el-table-column>
            <el-table-column label="创建时间" prop="createTime" :formatter="formatCreateTime">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'ownTable',
    props: ['users', 'childSelectedRow', 'headerFlag'],
    data() {
        return {
            selectedRow: [],
            showHeader: false
        }
    },
    methods: {
        formatTime(row, key) {
            let formatDate = ''
            if (row[key]) {
                /* let date = new Date(row[key])
                formatDate = date.toISOString().substr(0, 10) + ' ' + date.toTimeString().substring(0, 8) */
                return row[key]
            }
            return formatDate
        },
        formatUpdateTime(row, column) {
            return this.formatTime(row, 'updateTime')
        },
        formatCreateTime(row, column) {
            return this.formatTime(row, 'createTime')
        },
        selectRow(rows) {
            // this.$store.dispatch('setRoleData', rows)
            this.selectedRow = rows
        },
        getAllSelectedRow() {
            let selectedRow = this.selectedRow
            let childSelectRows = this.$refs.selftTable ? this.$refs.selftTable.getAllSelectedRow() : []
            let allSelectedRows = selectedRow.concat(childSelectRows)
            return allSelectedRows
        }
    }
}
</script>
