<template>
    <div class="contract-add">
        <!-- <div class="title"><span>新增合同</span></div> -->
        <el-form ref="form" :model="form" label-width="135px" :rules="rules">
            <el-row :gutter="20">
                <el-col :lg="12" :md="12" :xs="12">
                    <el-form-item label="招标备案单位：" prop="tenderFilingUnit">
                        <el-input v-model="form.tenderFilingUnit"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :lg="12" :md="12" :xs="12">
                    <el-form-item label="标段名称：" prop="nameOfLots">
                        <el-input v-model="form.nameOfLots"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :lg="12" :md="12" :xs="12">
                    <el-form-item label="招标计划时间：" prop="bidPlanDate">
                        <el-date-picker v-model="form.bidPlanDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :lg="12" :md="12" :xs="12">
                    <el-form-item label="已招标完成时间：" prop="bidCompleteDate">
                        <el-date-picker v-model="form.bidCompleteDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :lg="12" :md="12" :xs="12">
                    <el-form-item label="招标代理机构：" prop="bidAgent">
                        <el-input v-model="form.bidAgent"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :lg="12" :md="12" :xs="12">
                    <el-form-item label="中标单位：" prop="tenderAgent">
                        <el-input v-model="form.tenderAgent"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :lg="12" :md="12" :xs="12">
                    <el-form-item label="更新人：" prop="submitter">
                        <el-input v-model="form.submitter"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :lg="24" :md="24" :xs="24">
                    <el-form-item label="上传附件">
                        <el-upload action="" :auto-upload="false" multiple ref="fileUpload" :file-list="fileList">
                            <el-button size="mini" type="success"><i class="fa fa-upload"></i> 点击上传</el-button>
                            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                        </el-upload>
                    </el-form-item>
                </el-col>
                <el-col :lg="24" :md="24" :xs="24">
                    <div class="tool-bar">
                        <el-button type="primary" size="small" @click="submitAll">修改</el-button>
                        <el-button type="info" size="small" @click="$emit('closeDialog')">取消</el-button>
                    </div>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
export default {
    props: ['modifyData'],
    data() {
        let form = this.modifyData
        let pickerOptions = {}
        pickerOptions.disabledDate = (time) => {
            // return time < new Date(form.bidPlanDate) - 24 * 60 * 60 * 1000
            return time < new Date()
        }
        return {
            form: form,
            pickerOptions: pickerOptions,
            fileList: [],
            rules: {
                tenderFilingUnit: [
                    { required: true, message: '必填', trigger: 'blur' }
                ],
                nameOfLots: [
                    { required: true, message: '必填', trigger: 'blur' }
                ],
                bidPlanDate: [
                    { required: true, message: '必填', trigger: 'blur' }
                ],
                bidCompleteDate: [
                    { required: true, message: '必填', trigger: 'blur' }
                ],
                bidAgent: [
                    { required: true, message: '必填', trigger: 'blur' }
                ],
                tenderAgent: [
                    { required: true, message: '必填', trigger: 'blur' }
                ],
                submitter: [
                    { required: true, message: '必填', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        submitForm() {
            delete this.form.tenderFiles
            this.$http.put('/api/tender', this.form).then(res => {
                if (res.code === 1002) {
                    this.$message({message: '标书修改成功', type: 'warning'})
                    this.$emit('getTender')
                    this.$emit('closeDialog')
                } else if (res.code === 9997) {
                    this.$alert('重复的记录', '警告', {type: 'warning'})
                }
            })
        },
        submitAll() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    let files = this.$refs.fileUpload.uploadFiles
                    if (files && files.length > 0) {
                        let fd = new FormData()
                        let fileUpload = () => {
                            this.$http.post('/api/file/uploadtempfiles', fd).then(res => {
                                if (res.code === 1002) {
                                    this.form.tempFolderRelativePath = res.data
                                    this.$nextTick(() => {
                                        this.submitForm()
                                    })
                                }
                            })
                        }
                        let defList = []
                        files.map((item, index) => {
                            let raw = item.raw
                            if (item.raw) {
                                fd.append('uploadfile', raw)
                            } else {
                                let defItem = new Promise((resolve, reject) => {
                                    this.getImageFileFromUrl(item.url, item.name).then(file => {
                                        fd.append('uploadfile', file)
                                        resolve()
                                    })
                                })
                                defList.push(defItem)
                            }
                        })
                        if (defList.length === 0) {
                            fileUpload()
                        } else {
                            Promise.all(defList).then(fileList => {
                                fileUpload()
                            })
                        }
                    } else {
                        this.submitForm()
                    }
                }
            })
        },
        getImageFileFromUrl(url, imageName) {
        // imageName一定要带上后缀
            let p = new Promise((resolve, reject) => {
                var blob = null
                var xhr = new XMLHttpRequest()
                xhr.open('GET', '/api' + url)
                xhr.setRequestHeader('Accept', 'image/jpeg')
                xhr.responseType = 'blob'
                xhr.onload = () => {
                blob = xhr.response
                let imgFile = new File([blob], imageName, {type: 'image/jpeg'})
                resolve(imgFile)
                }
                xhr.send()
            })
            return p
        },
        pushAttachment(data) {
            let files = []
            data.map(item => {
                let url = item.fileAddr
                let file = {
                    name: url.replace(/\S+\d{10,}-/g, ''),
                    url: location.origin + '/files/' + url
                }
                files.push(file)
            })
            return files
        }
    },
    mounted() {
        this.fileList = this.pushAttachment(this.form.tenderFiles)
    }
}
</script>
