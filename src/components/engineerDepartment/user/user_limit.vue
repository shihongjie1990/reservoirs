<template>
    <div class="user-limit">
        <el-row :gutter="20">
            <el-col :lg="12" :md="12" :xs="12">
                <div class="tips">角色</div>
                <el-radio-group v-model="selectedRole" class="col-checkbox-group">
                    <el-radio v-for="role in roles" :label="role.roleId" :key="role.role">{{role.description}}</el-radio>
                </el-radio-group>
            </el-col>
            <el-col :lg="12" :md="12" :xs="12">
                <div class="tips">用户</div>
                <el-tree :data="users" show-checkbox node-key="userId" :props="defaultProps" @check="selectNode" check-strictly="true">
                </el-tree>
            </el-col>
            <el-col :lg="24" :md="24" :xs="24">
                <div class="tool-bar">
                    <el-button type="primary" @click="confirmRole">确定</el-button>
                    <el-button type="info" @click="cancle">取消</el-button>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    props: ['users', 'dialogVisible'],
    data() {
        return {
            roles: [],
            selectedRole: [],
            selectedTreeNode: '',
            data2: [{
                id: 1,
                label: '一级 1',
                children: [{
                    id: 4,
                    label: '二级 1-1',
                    children: [{
                    id: 9,
                    label: '三级 1-1-1'
                    }, {
                    id: 10,
                    label: '三级 1-1-2'
                    }]
                }]
                }, {
                id: 2,
                label: '一级 2',
                children: [{
                    id: 5,
                    label: '二级 2-1'
                }, {
                    id: 6,
                    label: '二级 2-2'
                }]
                }, {
                id: 3,
                label: '一级 3',
                children: [{
                    id: 7,
                    label: '二级 3-1'
                }, {
                    id: 8,
                    label: '二级 3-2'
                }]
                }
            ],
            defaultProps: {
                children: 'children',
                label: 'name'
            }
        }
    },
    methods: {
        selectNode(curNode, selectedNode) {
            this.selectedTreeNode = selectedNode.checkedNodes
        },
        getAllRoles() {
            this.$http.get('/api/user/management/allroles').then(res => {
                this.roles = res.data
            })
        },
        confirmRole() {
            let selectedTreeNode = this.selectedTreeNode
            let userIds = []
            selectedTreeNode.map((item, index) => {
                userIds.push(item.userId)
            })
            this.$http.post('/api/user/management/batchsetroles', {
                roleIds: [this.selectedRole],
                userIds: userIds
            }).then(res => {
                if (res.code === 1002) {
                    this.$message({message: '配置成功!', type: 'success'})
                    this.cancle()
                    this.$emit('refactoringUsers')
                } else {
                    this.$message({message: res.msg, type: 'error'})
                }
            }).catch(thisErr => {
                this.$message({message: '配置失败!', type: 'error'})
            })
        },
        cancle() {
            this.$emit('closeRolePanel')
        }
    },
    mounted() {
        this.getAllRoles()
    }
}
</script>
