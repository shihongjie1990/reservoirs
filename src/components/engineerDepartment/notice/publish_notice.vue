<template>
    <div class='publish-notice'>
        <div>
            <span>发布公告</span>
        </div>
        <el-form ref="form" :model="form" label-width="120px" :rules="rules">
            <el-form-item label="公告类型" prop="type">
                <el-select v-model="form.type" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="置顶">
                <el-switch v-model="form.hot"></el-switch>
            </el-form-item>
            <el-form-item label="标题" prop="title">
                <el-input v-model="form.title" class="form-item"></el-input>
            </el-form-item>
            <el-form-item label="关键字">
                <el-input v-model="form.keyword" class="form-item"></el-input>
            </el-form-item>
            <el-form-item label="内容" prop="content">
                <!-- <el-input type="textarea" :rows='10' v-model="form.content"></el-input> -->
                <div id='editor_content' class="form-item"></div>
            </el-form-item>
            <el-form-item label="上传附件">
                <el-upload class="upload-demo" action="" ref="fileUpload" multiple :auto-upload="false" :file-list="fileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitAll">{{ old?'修改':'发布' }}</el-button>
                <el-button type='success' @click='preview'>预览</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  import E from 'wangeditor'

  export default {
    data() {
      return {
        form: {
          type: '',
          hot: false,
          title: '',
          keyword: '',
          content: ''
        },
        editor: '',
        fileList: [],
        old: false,
        loadHtml: '',
        rules: {
            type: [
                { required: true, message: '必填', trigger: 'blur' }
            ],
            title: [
                { required: true, message: '必填', trigger: 'blur' }
            ],
            content: [
                { required: true, message: '必填', trigger: 'blur' }
            ]
        }
      }
    },
    methods: {
      getFormData() {
          let formData = this.form
          let curDate = new Date()
          formData.time = curDate.toISOString().substring(0, 10) + ' ' + curDate.toTimeString().substring(0, 8)
          return formData
      },
      submitAll() {
        this.$refs['form'].validate((valid) => {
            if (valid) {
                // 上传
                let files = this.$refs.fileUpload.uploadFiles
                if (files && files.length > 0) {
                    let fd = new FormData()
                    let fileUpload = () => {
                        this.$http.post('/api/file/uploadtempfiles', fd).then(res => {
                            if (res.code === 1002) {
                                this.form.tempFolderRelativePath = res.data
                                this.$nextTick(() => {
                                    if (this.old) {
                                        this.modify()
                                    } else {
                                        this.publish()
                                    }
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
                    if (this.old) {
                        this.modify()
                    } else {
                        this.publish()
                    }
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
      publish() {
        // 提交
        this.$http.post('/api/announcement', this.form).then(res => {
            if (res.code === 1002) {
                this.$message({
                    type: 'success',
                    message: '发布成功！'
                })
                this.form = {} // 清空数据
                this.editor.txt.html('') // 清空富文本
                this.$refs.fileUpload.clearFiles() // 清空上传组件
                this.$router.push({name: '公告管理'})
            }
        })
      },
      modify() {
           this.$http.put('/api/announcement', this.form).then(res => {
                if (res.code === 1002) {
                    this.$message({
                        type: 'success',
                        message: '修改成功'
                    })
                    this.form = {} // 清空数据
                    this.editor.txt.html('') // 清空富文本
                    this.$refs.fileUpload.clearFiles() // 清空上传组件
                    this.$router.push({name: '公告管理'})
                }
            })
      },
      preview() {
          this.$refs['form'].validate((valid) => {
              if (valid) {
                let files = this.$refs.fileUpload.uploadFiles
                let formData = this.getFormData()
                formData.fileList = files
                this.$router.push({name: '公告详情', params: {'formData': formData}})
              }
          })
      },
      newImport (data) {
        let thisRequest = this.$http.post('http://localhost:8080/api/file/uploadtempfiles', data).then((res) => { // 成功后回调
            if (res.code === 1002) {
                this.form.attachment = res.data
            }
        }, (thisErr) => {
            console.log(thisErr.msg)
        })
        return thisRequest
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
        // 富文本编辑器初始化
        let editor = new E('#editor_content')
        editor.customConfig.onchange = (html) => {
            this.form.content = html
        }
        editor.create()
        this.editor = editor

        // 判断是否是修改公告
        let params = this.$route.params
        if (Object.keys(params).length > 0) {
            let formData = params.formData
            if (formData && Object.keys(formData).length > 0) {
                this.form = formData
                this.$refs.fileUpload.uploadFiles = formData.fileList
                // 填充富文本
                this.editor.txt.html(formData.content)
            } else {
                let announcementId = params.announcementId
                this.old = true
                this.$http.get(`/api/announcement/${announcementId}`).then(res => {
                    // 填充数据
                    this.form = res.data
                    // 填充富文本
                    this.editor.txt.html(res.data.content)
                    // 填充附件
                    this.fileList = this.pushAttachment(res.data.files)
                })
            }
        }
    }
  }
</script>
