<template>
    <div>
        <el-tabs v-model="activeName" class="contract-info">
            <el-tab-pane label="合同内容" name="contract">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <label>合同名称：</label>
                        <span>{{ info.name }}</span>
                    </el-col>
                    <el-col :span="12">
                        <label>合同编号：</label>
                        <span>{{ info.number }}</span>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <label>合同类型：</label>
                        <span>{{ info.type }}</span>
                    </el-col>
                    <el-col :span="12">
                        <label>签订时间：</label>
                        <span>{{ info.signDate }}</span>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <label>甲方：</label>
                        <span>{{ info.partyA }}</span>
                    </el-col>
                    <el-col :span="12">
                        <label>乙方：</label>
                        <span>{{ info.partyB }}</span>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <label>合同金额：</label>
                        <span>{{ info.price }}</span>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <div>合同主要内容：</div>
                        <div>{{ info.content }}</div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <div>备注：</div>
                        <div>{{ info.remark }}</div>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="附件" name="attachment">
                <div class="project-attachment">
                    <div v-for="item in attachmentData" :key="item.imgAddr">
                        <div>
                            <img :src="item.url" alt="文件缩略图">
                        </div>
                        <div class="tips-bg"></div>
                        <div>
                            <span>{{ item.fileName }}</span>
                            <span>{{ item.createTime }}</span>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
    props: ['contractId'],
    data() {
        return {
            info: {},
            attachmentData: [],
            activeName: 'contract'
        }
    },
    methods: {
        getContractById() {
            let thisRequest = this.$http.get('/api/contract/own')
            return thisRequest
        }
    },
    mounted() {
        this.getContractById().then(res => {
            this.info = res.data
            let attachments = res.data.contractImgVOs
            let attachmentData = []
            if (attachments && attachments.length > 0) {
                attachments.map((item, index) => {
                    let createTime = item.createTime
                    let imgAddr = item.imgAddr
                    let imgDesc = item.imgDesc
                    let thumbnailAddr = item.thumbnailAddr
                    // let url = location.origin + '/download/baseinfofile?fileId=' + imgAddr
                    let url = 'static/images/wallpaper.jpg'
                    let fileName = thumbnailAddr.substring(thumbnailAddr.lastIndexOf('/') + 1)
                    let attachmentItem = {
                        createTime: createTime,
                        imgAddr: imgAddr,
                        imgDesc: imgDesc,
                        thumbnailAddr: thumbnailAddr,
                        url: url,
                        fileName: fileName
                    }
                    attachmentData.push(attachmentItem)
                })
                this.attachmentData = attachmentData
            }
        })
        /* this.attachmentData.map((item, index) => {
            let createTime = item.createTime
            let imgAddr = item.imgAddr
            let imgDesc = item.imgDesc
            let thumbnailAddr = item.thumbnailAddr
            // let url = location.origin + '/download/baseinfofile?fileId=' + imgAddr
            let url = 'static/images/wallpaper.jpg'
            let fileName = thumbnailAddr.substring(thumbnailAddr.lastIndexOf('/') + 1)
            let attachmentItem = {
                createTime: createTime,
                imgAddr: imgAddr,
                imgDesc: imgDesc,
                thumbnailAddr: thumbnailAddr,
                url: url,
                fileName: fileName
            }
            this.attachment.push(attachmentItem)
        }) */
    }
}
</script>
