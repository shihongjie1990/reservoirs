<template>
    <div class="project-overview">
        <!-- <div class="project-schedule">
            <div class="project-reservoir">
                {{ infoData.plantName }}
            </div>
            <div class="project-info">
                <div>
                    <label>上报人：</label>
                    <span>{{ infoData.owner }}</span>
                </div>
                <div>
                    <label>填报时间：</label>
                    <span>{{ infoData.updateTime }}</span>
                </div>
                <div>
                    <label>上报电话：</label>
                    <span>18586878889</span>
                </div>
            </div>
            <div class="project-rate">
                <label>填报进度：</label>
                <el-progress :text-inside="true" :stroke-width="18" :percentage="50"></el-progress>
            </div>
            <div class="projcet-status">
                <label>项目状态：</label>
                <el-tag type="success">审核通过</el-tag>
            </div>
        </div> -->

        <div class="project-schedule-gai">
            <el-row :gutter="20">
                <el-col :lg="6" :md="6" :xs="12">
                    <!-- <i class="fa fa-check-circle"></i> -->
                    <i class="fa fa-times-circle"></i>
                    <!-- <i class="fa fa-minus-circle"></i> -->
                    <div>
                        <span>项目状态</span>
                        <!-- <el-tag type="success">审核通过</el-tag> -->
                        <span>审核通过</span>
                    </div>
                </el-col>
                <el-col :lg="6" :md="6" :xs="12">
                    <i class="fa fa-circle-o-notch" style="color:#3686ec;"></i>
                    <div>
                        <span>填报进度</span>
                        <!-- <el-progress :text-inside="true" :stroke-width="18" :percentage="50"></el-progress> -->
                        <span style="color:#3686ec;">50%</span>
                    </div>
                </el-col>
                <el-col :lg="6" :md="6" :xs="12">
                    <i class="fa fa-user"></i>
                    <div>
                        <span>上报人</span>
                        <span style="color:#2c3e50;">{{ infoData.owner }}</span>
                    </div>
                </el-col>
                <el-col :lg="6" :md="6" :xs="12">
                    <i class="fa fa-calendar" style="color:#256966;"></i>
                    <div>
                        <span>填报时间</span>
                        <span style="color:#256966;">{{ infoData.updateTime }}</span>
                    </div>
                </el-col>
            </el-row>
        </div>

        <el-tabs v-model="activeName" class="project-info">
            <el-tab-pane label="水库信息" name="info">
                <project-info :infoData="infoData" v-if="activeName === 'info'"></project-info>
            </el-tab-pane>
            <el-tab-pane label="附件" name="attachment">
                <project-attachment :attachmentData="attachmentData" v-if="activeName === 'attachment'"></project-attachment>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import projectinfo from './projectOverview/project_info'
import projectattachment from './projectOverview/project_attachment'

export default {
    components: {
        'project-info': projectinfo,
        'project-attachment': projectattachment
    },
    data() {
        return {
            activeName: 'info',
            infoData: {},
            attachmentData: {}
        }
    },
    methods: {
        getBaseInfo() {
            let thisRequest = this.$http.get('/api/baseinfo/getbaseinfo')
            return thisRequest
        }
    },
    mounted() {
        this.getBaseInfo().then(res => {
            this.infoData = res.data
            this.attachmentData = res.data.baseInfoImgVOs
        })
    }
}
</script>
