<template>
    <div class="user-manager">
        <div class="title page-title"><span>用户管理</span></div>
        <div class="tool-bar">
            <el-button type="primary" icon="el-icon-circle-plus-outline" size="mini" @click="addUser">新增用户</el-button>
            <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateUser">修改用户</el-button>
            <el-button type="info" icon="el-icon-remove-outline" size="mini" @click="deleteUser">删除用户</el-button>
            <el-button type="primary" icon="el-icon-edit" size="mini" style="float:right" @click="dialogVisible = true">角色配置</el-button>
        </div>
        <user-list :users="users" v-if="users && users.length>0" ref="listuser" :headerFlag="true"></user-list>
        <el-dialog title="添加用户" :visible.sync="dialogaddVisible">
            <add-user @closeDialog="closeDialog" @refactoringUsers="refactoringUsers" @refactoringTree="refactoringTree" :users="users" v-if="dialogaddVisible"></add-user>
        </el-dialog>
        <el-dialog title="更新用户" :visible.sync="dialogUpdateVisible">
            <add-user @closeDialog="closeDialog" @refactoringUsers="refactoringUsers" :user="user" @refactoringTree="refactoringTree" :users="users" v-if="dialogUpdateVisible"></add-user>
        </el-dialog>
        <el-dialog title="权限配置" :visible.sync="dialogVisible" width="50%">
            <user-limit :users="users" @closeRolePanel="closeRolePanel" @refactoringUsers="refactoringUsers"></user-limit>
        </el-dialog>
    </div>
</template>

<script>
import userlist from './user_list'
import adduser from './add_user'
import userlimit from './user_limit'

export default {
    components: {
        'user-list': userlist,
        'add-user': adduser,
        'user-limit': userlimit
    },
    data() {
        return {
            users: [],
            user: {},
            dialogaddVisible: false,
            dialogUpdateVisible: false,
            dialogVisible: false,
            rows: [],
            tableData: [
                {
                    name: 'F',
                    username: '萨芬F',
                    role: 'a',
                    updateTime: '0',
                    createTime: '0',
                    parentId: 'B555',
                    userId: 'a2245'
                },
                {
                    name: 'A',
                    username: '萨芬A',
                    role: 'a',
                    updateTime: '0',
                    createTime: '0',
                    parentId: 'a1245',
                    userId: '6sag559'
                },
                {
                    name: 'B',
                    username: '萨芬B',
                    role: 'a',
                    updateTime: '0',
                    createTime: '0',
                    parentId: 'a1245',
                    userId: 'egads68'
                },
                {
                    name: 'G',
                    username: '萨芬G',
                    role: 'a',
                    updateTime: '0',
                    createTime: '0',
                    parentId: 'ASF51',
                    userId: 'B555'
                },
                {
                    name: 'C',
                    username: '萨芬C',
                    role: 'a',
                    updateTime: '0',
                    createTime: '0',
                    parentId: 'a2245',
                    userId: 'egads68'
                },
                {
                    name: 'D',
                    username: '萨芬D',
                    role: 'a',
                    updateTime: '0',
                    createTime: '0',
                    parentId: 'a2245',
                    userId: 'egads68'
                },
                {
                    name: 'E',
                    username: '萨芬E',
                    role: 'a',
                    updateTime: '0',
                    createTime: '0',
                    parentId: 'B555',
                    userId: 'a1245'
                }
            ]
        }
    },
    methods: {
        getUsers() {
            let thisRequest = this.$http.get('/api/user/all').catch(thisErr => {
            })
            return thisRequest
        },
        refactoringTree(data, childId, parentId) {
            let orignData = JSON.parse(JSON.stringify(data))
            orignData.map((item, i) => {
                // 合并角色信息
                if (item.roleVOs && item.roleVOs.length > 0) {
                    let roleNames = []
                    item.roleVOs.map((role, index) => {
                        roleNames.push(role.description)
                    })
                    item.role = roleNames.join(',')
                }
                // 筛选子节点
                let children = []
                orignData.map((n, k) => {
                    if (item[childId] === n[parentId]) {
                        children.push(n)
                        n.isChild = true
                    }
                })
                if (children && children.length > 0) {
                    item.children = children
                }
            })
            let parentList = []
            orignData.map((item, index) => {
                if (!item.isChild) {
                    parentList.push(item)
                }
            })
            return parentList
        },
        refactoringUsers() {
            this.getUsers().then(res => {
                let data = res.data
                let users = this.refactoringTree(data, 'userId', 'parentId')
                this.users = users
            })
        },
        addUser() {
            this.dialogaddVisible = true
        },
        closeDialog() {
            this.dialogaddVisible = false
            this.dialogUpdateVisible = false
        },
        closeRolePanel() {
            this.dialogVisible = false
        },
        updateUser() {
            // let rows = this.$refs.listuser.selectedRow
            let rows = this.$refs.listuser.getAllSelectedRow()
            // let rows = this.$store.state.roleData
            if (rows.length === 1) {
                this.user = rows[0]
                this.dialogUpdateVisible = true
            } else if (rows.length === 0) {
                this.$alert('请选择用户！', '提示', {type: 'warning'})
            } else {
                this.$alert('只能同时修改一个用户！', '提示', {type: 'warning'})
            }
        },
        deleteUser() {
            // let rows = this.$refs.listuser.selectedRow
            let rows = this.$refs.listuser.getAllSelectedRow()
            if (rows.length === 1) {
                let user = rows[0]
                this.$confirm('用户信息删除后无法恢复，继续删除？', '警告', {
                            confirmButtonText: '确认',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.$http.delete(`/api/user/${user.userId}`).then(res => {
                                if (res.code === 1002) {
                                    this.$message({message: '删除成功！', type: 'success'})
                                    this.refactoringUsers()
                                }
                            })
                        }).catch(() => {
                            console.log('取消删除！')
                        })
            } else if (rows.length === 0) {
                this.$alert('请选择用户！', '提示', {type: 'warning'})
            } else {
                this.$alert('只能同时修改一个用户！', '提示', {type: 'warning'})
            }
        }
    },
    mounted() {
        this.refactoringUsers()
        // let users = this.refactoringTree(this.tableData, 'userId', 'parentId')
        // this.users = users
    }
}
</script>
