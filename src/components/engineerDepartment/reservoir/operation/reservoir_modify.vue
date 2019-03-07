<template>
    <el-form ref="form" :model="form" label-width="80px" class="project-form">
        <div>
            <el-radio-group v-model="form.affiliatedTo">
                <el-radio label="govern">水利厅直管</el-radio>
                <el-radio label="corp">水投直管</el-radio>
            </el-radio-group>
        </div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="project-panel-title"><i class="fa fa-info-circle"></i> 基础信息</span>
            </div>
            <el-row :gutter="20">
                <el-col :lg="24" :md="24" :xs="24">
                    <el-form-item label="项目名称">
                        <el-input v-model="form.plantName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :lg="12" :md="12" :xs="12">
                    <el-form-item label="项目法人">
                        <el-input v-model="form.legalPersonName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :lg="12" :md="12" :xs="12">
                    <el-form-item label="法人代表">
                        <el-input v-model="form.legalRepresentativeName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :lg="12" :md="12" :xs="12">
                    <el-form-item label="所在县">
                        <!-- <el-input v-model="form.county"></el-input> -->
                        <el-cascader :options="options" :show-all-levels="false" v-model="county" ref="regionSelector" @change="selectedRegion"></el-cascader>
                    </el-form-item>
                </el-col>
                <el-col :lg="12" :md="12" :xs="12">
                    <el-form-item label="所在地">
                        <el-input v-model="form.location"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :lg="12" :md="12" :xs="12">
                    <el-form-item label="经度">
                        <el-input v-model="form.longitude"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :lg="12" :md="12" :xs="12">
                    <el-form-item label="纬度">
                        <el-input v-model="form.latitude"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="project-panel-title"><i class="fa fa-book"></i> 水库资料</span>
            </div>
            <el-row :gutter="20">
                <el-col :lg="6" :md="12" :xs="12">
                    <el-form-item label="项目类型">
                        <el-input v-model="form.projectType"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="12" :xs="12">
                    <el-form-item label="工程级别">
                        <el-input v-model="form.level"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="12" :xs="12">
                    <el-form-item label="规模">
                        <el-input v-model="form.scale"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="12" :xs="12">
                    <el-form-item label="坝型">
                        <el-input v-model="form.damType"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :lg="8" :md="8" :xs="12">
                    <el-form-item label="最大坝高（m）">
                        <el-input v-model="form.maxDamHeight"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :lg="8" :md="8" :xs="12">
                    <el-form-item label="溢洪道（m）">
                        <el-input v-model="form.spillway"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :lg="8" :md="8" :xs="12">
                    <el-form-item label="度汛高程">
                        <el-input v-model="form.floodControlElevation"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :lg="12" :md="12" :xs="12">
                    <el-form-item label="灌溉面积(万亩）">
                        <el-input v-model="form.irrigatedArea"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :lg="12" :md="12" :xs="12">
                    <el-form-item label="积水面积（m）">
                        <el-input v-model="form.catchmentArea"></el-input>
                    </el-form-item>
                </el-col>

            </el-row>
            <el-row :gutter="20">
                <el-col :lg="8" :md="8" :xs="12">
                    <el-form-item label="总库容">
                        <el-input v-model="form.storage"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :lg="8" :md="8" :xs="12">
                    <el-form-item label="兴利库容">
                        <el-input v-model="form.utilizablCapacity"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :lg="8" :md="8" :xs="12">
                    <el-form-item label="装机容积（Kw）">
                        <el-input v-model="form.installedCapacity"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :lg="6" :md="12" :xs="12">
                    <el-form-item label="城镇供水人口（万人)    ">
                        <el-input v-model="form.waterSupplyPopulation"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="12" :xs="12">
                    <el-form-item label="农村人饮（万人）">
                        <el-input v-model="form.ruralHumanWater"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="12" :xs="12">
                    <el-form-item label="大牲畜（万头）">
                        <el-input v-model="form.livestock"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :lg="6" :md="12" :xs="12">
                    <el-form-item label="供水量（万m³/年)">
                        <el-input v-model="form.watersupply"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="project-panel-title"><i class="fa fa-bank"></i> 工程信息</span>
            </div>
            <el-row :gutter="20">
                <el-col :lg="24" :md="24" :xs="24">
                    <el-form-item label="项目来源">
                        <el-input v-model="form.projectSource"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :lg="8" :md="12" :xs="12">
                    <el-form-item label="工期（月）">
                        <el-input v-model="form.timeLimit"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :lg="8" :md="12" :xs="12">
                    <el-form-item label="总投资">
                        <el-input v-model="form.totalInvestment"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :lg="8" :md="12" :xs="12">
                    <el-form-item label="工程占地（亩）">
                        <el-input v-model="form.areaCoverage"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :lg="8" :md="12" :xs="12">
                    <el-form-item label="">
                        <!-- <el-input v-model="form.hasSignedConstructionContract"></el-input> -->
                        <el-checkbox v-model="form.hasSignedConstructionContract">是否签订枢纽工程施工承包合同</el-checkbox>
                    </el-form-item>
                </el-col>
                <el-col :lg="8" :md="12" :xs="12">
                    <el-form-item label="">
                        <!-- <el-input v-model="form.hasAcceptCompletion"></el-input> -->
                        <el-checkbox v-model="form.hasAcceptCompletion">枢纽工程是否完工</el-checkbox>
                    </el-form-item>
                </el-col>
                <el-col :lg="8" :md="12" :xs="12">
                    <el-form-item label="">
                        <!-- <el-input v-model="form.hasProjectCompleted"></el-input> -->
                        <el-checkbox v-model="form.hasProjectCompleted">是否竣工验收</el-checkbox>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :lg="6" :md="12" :xs="12">
                    <el-form-item label="监理、施工招标情况">
                        <el-input v-model="form.supervisorBid"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :lg="8" :md="8" :xs="12">
                    <el-form-item label="单位工程数">
                        <el-input v-model="form.unitProjectAmount"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :lg="8" :md="8" :xs="12">
                    <el-form-item label="单元工程数">
                        <el-input v-model="form.cellProjectAmount"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :lg="8" :md="8" :xs="12">
                    <el-form-item label="分布工程数">
                        <el-input v-model="form.branchProjectAmount"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :lg="24" :md="24" :xs="24">
                    <el-form-item label="项目概况">
                        <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="form.overview">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :lg="24" :md="24" :xs="24">
                    <el-form-item label="工程任务及主要建筑物">
                        <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="form.projectTask">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :lg="24" :md="24" :xs="24">
                    <el-form-item label="建设用地">
                        <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="form.constructionLand">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :lg="24" :md="24" :xs="24">
                    <el-form-item label="土地复垦方案">
                        <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="form.landReclamationPlan">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :lg="24" :md="24" :xs="24">
                    <el-form-item label="单位工程概况">
                        <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="form.unitProjectOverview">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :lg="24" :md="24" :xs="24">
                    <el-form-item label="单元工程概况">
                        <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="form.cellProjectOverview">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :lg="24" :md="24" :xs="24">
                    <el-form-item label="分布工程概况">
                        <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="form.branchProjectOverview">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :lg="24" :md="24" :xs="24">
                    <el-form-item label="备注">
                        <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="form.remark">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>附件</span>
            </div>
            <el-upload class="upload-demo" list-type="picture-card" action="" ref="fileUpload" multiple :auto-upload="false" :file-list="fileList">
                <!-- <el-button size="small" type="primary">点击上传</el-button> -->
                <i class="el-icon-plus"></i>
            </el-upload>
        </el-card>
        <div>
            <el-button type="primary" @click="detailSubmit">提交修改</el-button>
        </div>
    </el-form>
</template>

<script>
export default {
    data() {
        return {
            /* form: {
                affiliatedTo: 'govern',
                hasSignedConstructionContract: false,
                hasAcceptCompletion: false,
                hasProjectCompleted: false
            }, */
            form: {},
            fileList: [],
            options: [],
            county: []
        }
    },
    methods: {
        detailSubmit() {
            let files = this.$refs.fileUpload.uploadFiles
            if (files && files.length > 0) {
                let fd = new FormData()
                let fileUpload = () => {
                    this.$http.post('/api/file/uploadtempfiles', fd).then(res => {
                        if (res.code === 1002) {
                            this.form.tempFolderRelativePath = res.data
                            this.$nextTick(() => {
                                // 提交修改信息
                                this.$http.put(`/api/baseinfo/${this.form.baseInfoId}`, this.form).then(result => {
                                    if (result.code === 1002) {
                                        this.$message({type: 'success', message: `${this.form.plantName}修改成功`})
                                        this.$router.push({path: '/reservoirs'})
                                    } else {
                                        this.$alert(result.data, '错误', {type: 'warning'})
                                    }
                                }, resultErr => {
                                    this.$alert('修改失败', '错误', {type: 'warning'})
                                })
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
            }
        },
        getAllRegion(county) {
            this.$http.get('/api/region/all').then(res => {
                let data = res.data
                if (data && data.length > 0) {
                    data.map(item => {
                        item.label = item.regionName
                        item.value = item.regionId
                        return item
                    })
                }
                let treeData = this.$store.state.buildTree(data, 'regionId', 'parentId')
                this.options = treeData
                // this.county = county
                let regionId = this.form.regionId
                if (parseInt(regionId) > 100) {
                    regionId = '100'
                }
                this.county = this.getAllParentRegion(data, regionId).reverse()
            })
        },
        getAllParentRegion(data, regionId) {
            let filterParentId = (filterData, id, array) => {
                let county = array
                let result = filterData.find(item => {
                    let flag = parseInt(item.regionId) === parseInt(id)
                    if (flag) {
                        county.push(parseInt(id))
                    }
                    return flag
                })
                if (result && result.parentId) {
                    filterParentId(filterData, result.parentId, county)
                }
                return county
            }
            let county = filterParentId(data, regionId, [])
            return county
        },
        selectedRegion(value) {
            let widget = this.$refs.regionSelector
            this.form.regionId = value[value.length - 1]
            this.form.county = widget.currentLabels[value.length - 1]
        },
        /**
         *  填充附件
         */
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
      },
      /**
       *    已有附件上传
       */
      getImageFileFromUrl(url, imageName) {
        // imageName一定要带上后缀
        let p = new Promise((resolve, reject) => {
            var blob = null
            var xhr = new XMLHttpRequest()
            xhr.open('GET', url)
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
      /**
       *    获取单条水库信息
       */
      getMyBaseInfo(baseInfoId) {
          this.$http.get(`/api/baseinfo/management/${baseInfoId}`).then(res => {
                let data = res.data
                this.form = data
                this.getAllRegion(data.county)
                if (data.baseInfoFiles && data.baseInfoFiles.length > 0) {
                    this.fileList = this.pushAttachment(data.baseInfoFiles)
                }
                this.form.hasAcceptCompletion = this.form.hasAcceptCompletion === '是'
                this.form.hasProjectCompleted = this.form.hasProjectCompleted === '是'
                this.form.hasSignedConstructionContract = this.form.hasSignedConstructionContract === '是'
          })
      }
    },
    mounted() {
        let params = this.$route.params
        if (params && Object.keys(params).length > 0) {
            this.getMyBaseInfo(params.baseInfoId)
        } else {
            this.$router.push({path: '/reservoirs'})
        }
    }
}
</script>

<style>
    .project-panel-title {
        font-size: 16px;
    }
    .project-panel-title>i {
        font-size: 18px;
    }
</style>
