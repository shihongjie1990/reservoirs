<template>
    <div>
        <div class="title page-title"><span>新增招标</span></div>
        <el-form ref="form" :model="form" label-width="120px" class="tender-add" :rules="rules">
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="招标备案单位">
                        <el-input v-model="form.tenderFilingUnit"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="标段名称">
                        <el-input v-model="form.nameOfLots"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="招标计划时间">
                        <el-date-picker v-model="form.bidPlanDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="已招标完成时间">
                        <el-date-picker v-model="form.bidCompleteDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="招标代理机构">
                        <el-input v-model="form.bidAgent"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="中标单位">
                        <el-input v-model="form.tenderAgent"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="24">
                    <el-form-item label="文件上传" class="upload-item">
                        <el-upload class="upload-demo" ref="upload" action="" multiple :on-preview="handlePreview" :on-remove="handleRemove" list-type="picture-card" :auto-upload="false">
                            <i class="el-icon-plus"></i>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="24">
                    <el-form-item class="tool-bar">
                        <el-button type="primary" @click="submitForm">提交</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                tenderFilingUnit: '',
                nameOfLots: '',
                bidPlanDate: '',
                bidCompleteDate: '',
                bidAgent: '',
                tenderAgent: '',
                bidFiles: []
            },
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
                ]
            }
        }
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList)
        },
        handlePreview(file) {
            console.log(file)
        },
        submitForm() {
            this.bidFiles = this.$refs.upload.uploadFiles
        }
    }
}
</script>
