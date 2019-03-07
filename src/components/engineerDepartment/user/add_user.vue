<template>
    <div class="add-user">
        <el-form ref="form" :model="formData" label-width="100px" :rules="rules">
            <el-row :gutter="20">
                <el-col :lg="20" :md="20" :xs="20">
                    <el-form-item label="角色：">
                        <el-select v-model="role" placeholder="请选择用户所属角色">
                            <el-option label="管理员" value="0"></el-option>
                            <el-option label="业主" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :lg="10" :md="10" :xs="20">
                    <el-form-item label="账号：" prop="username">
                        <el-input v-model="formData.username" :disabled="user && Object.keys(user).length>0 ? true : false"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :lg="10" :md="10" :xs="20">
                    <el-form-item label="水库名：" prop="name">
                        <el-input v-model="formData.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :lg="10" :md="10" :xs="20" v-if="!user">
                    <el-form-item label="密码：" prop="password">
                        <el-input v-model="formData.password" type="password"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :lg="10" :md="10" :xs="20" v-if="!user">
                    <el-form-item label="确认密码：" prop="rePassword">
                        <el-input v-model="formData.rePassword" type="password"></el-input>
                    </el-form-item>
                </el-col>
                <!-- <el-col :lg="20" :md="20" :xs="20">
                    <el-form-item label="角色：">
                        <el-select v-model="formData.role" placeholder="请选择角色">
                            <el-option label="省水利厅" value="province"></el-option>
                            <el-option label="市县一级" value="city"></el-option>
                            <el-option label="工程管理部" value="gcglb"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col> -->
                <el-col :lg="20" :md="20" :xs="20" v-if="role === '0' ? true : false">
                    <el-form-item label="管辖区域：" prop="regionId">
                        <!-- <el-select v-model="formData.regionId" placeholder="请选择管辖区域">
                            <el-option v-for="(region, index) in regions" :key="index" :label="region.regionName" :value="region.regionId"></el-option>
                        </el-select> -->
                        <select-tree v-model="formData.regionId" :options="options" :props="defaultProps" />
                    </el-form-item>
                </el-col>
                <el-col :lg="20" :md="20" :xs="20">
                    <el-form-item label="上级单位：" prop="parentId">
                        <!-- <el-select v-model="formData.parentId" placeholder="请选择所属单位">
                            <el-option label="省水利厅" value="0"></el-option>
                            <el-option label="市县一级" value="1"></el-option>
                            <el-option label="工程管理部" value="2"></el-option>
                        </el-select> -->
                        <select-tree v-model="formData.parentId" :options="allUsers" :props="defaultPropsUnit" />
                    </el-form-item>
                </el-col>
                <el-col :lg="24" :md="24" :xs="24">
                    <div class="tool-bar">
                        <el-button type="primary" @click="addUser">确认</el-button>
                        <el-button type="info" @click="closeDialog">取消</el-button>
                    </div>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
import SelectTree from '@/components/widget/SelectTree.vue'

export default {
    props: ['user', 'users'],
    components: {
        SelectTree
    },
    data() {
        return {
            formData: {},
            role: '1',
            regions: [],
            defaultProps: {
                parent: 'parentId', // 父级唯一标识
                value: 'regionId', // 唯一标识
                label: 'regionName', // 标签显示
                children: 'children' // 子级
            },
            options: [],
            defaultPropsUnit: {
                parent: 'parentId', // 父级唯一标识
                value: 'userId', // 唯一标识
                label: 'name', // 标签显示
                children: 'children' // 子级
            },
            selected: '',
            allUsers: [],
            rules: {
                username: [
                    { required: true, message: '必填', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '必填', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '必填', trigger: 'blur' }
                ],
                rePassword: [
                    { required: true, validator: this.validPassword, trigger: 'blur' }
                ],
                regionId: [
                    { required: true, message: '必填', trigger: 'blur' }
                ],
                parentId: [
                    { required: true, message: '必填', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        validPassword(rule, value, callback) {
            if (value !== this.formData.password) {
                callback(new Error('两次密码不一致！'))
            } else {
                callback()
            }
        },
        closeDialog() {
            this.$emit('closeDialog')
        },
        addUser() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    if (this.user && this.user && Object.keys(this.user).length > 0) {
                    this.formData.isManager = this.role === '0'
                    let params = JSON.parse(JSON.stringify(this.formData))
                    delete params.password
                    this.$http.put(`/api/user/${this.formData.userId}`, params).then(res => {
                        if (res.code === 1002) {
                            this.$message({message: '修改成功！', type: 'success'})
                            this.closeDialog()
                            this.$emit('refactoringUsers')
                        } else {
                            this.$message({message: res.msg, type: 'error'})
                        }
                    })
                } else {
                    this.formData.isManager = this.role === '0'
                    this.$http.post('/api/user', this.formData).then(res => {
                        if (res.code === 1002) {
                            this.$message({
                                message: '添加成功！',
                                type: 'success'
                            })
                            this.closeDialog()
                            this.$emit('refactoringUsers')
                        } else {
                            this.$message({message: res.msg, type: 'error'})
                        }
                    })
                }
                }
            })
        },
        /**
         *  获取所有管辖区域
         */
        getAllRegion() {
            this.$http.get('/api/region/all').then(res => {
                let treeData = this.refactoringTree(res.data, 'regionId', 'parentId')
                this.options = treeData
            })
        },
        /**
         *  获取所有上级单位
         */
        getAllSuperiorDepartment() {
            this.$http.get('/api/user/allsuperior').then(res => {
                let treeData = this.refactoringTree(res.data, 'userId', 'parentId')
                this.allUsers = treeData
            })
        },
        // 树形结构
        refactoringTree(data, childId, parentId) {
            let orignData = JSON.parse(JSON.stringify(data))
            orignData.map((item, i) => {
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
            // 返回最长数据------第一条数据
            let parentList = []
            orignData.map((item, index) => {
                if (!item.isChild) {
                    parentList.push(item)
                }
            })
            return parentList
        }
    },
    mounted() {
        let user = this.user
        if (user && Object.keys(user).length > 0) {
            if (user.regionVO && user.regionVO.regionId) {
                this.role = '0'
                user.regionId = user.regionVO.regionId
            }
            this.formData = JSON.parse(JSON.stringify(user))
        }
        this.getAllRegion()
        this.getAllSuperiorDepartment()
    }
}
</script>
