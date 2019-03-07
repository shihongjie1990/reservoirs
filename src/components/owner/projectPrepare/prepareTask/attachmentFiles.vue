<template>
    <div class="attachment-view">
        <el-row :gutter="20">
            <el-col :lg="6" :md="8" :xs="12" v-for="(file, index) in allFiles" :key="index">
                <div class="img-block" @click="downloadFile(file.fileAddr)" :title="file.name">
                    <div class="image-div">
                        <img :src="file.url" alt="文件">
                    </div>
                    <div class="name-background"></div>
                    <div class="name-block">{{ file.name }}</div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    props: ['files'],
    data() {
        return {
            allFiles: []
        }
    },
    methods: {
        downloadFile(addr) {
            let Base64 = require('js-base64').Base64
            let strBase = Base64.encode(Base64.encode(addr))
            let url = location.origin + '/api/download/' + strBase
            window.open(url, '_self')
        },
        dealFiles(files) {
            let imgExt = ['.png', '.jpg', '.jpeg', '.bmp', '.gif']
            files.map(item => {
                let addr = item.fileAddr
                item.name = addr.replace(/\S+\d{10,}-/g, '')
                let type = addr.substr(addr.lastIndexOf('.'))
                if (imgExt.indexOf(type) > -1) {
                    item.url = '/api/files/' + addr
                } else {
                    item.url = 'static/images/wallpaper.jpg'
                }
            })
            return files
        }
    },
    mounted() {
        let files = this.files
        this.allFiles = this.dealFiles(files)
    }
}
</script>

<style>
    .attachment-view .img-block {
        position: relative;
    }
    .attachment-view .img-block>.image-div {
        width: 100%;
        height: 100px;
        cursor: pointer;
    }
    .img-block>.image-div>img {
        width: 100%;
        height: 100%;
    }
    .attachment-view .img-block>.name-block, .attachment-view .img-block>.name-background {
        position: absolute;
        bottom: 0;
        text-align: center;
        width: 100%;
        padding: 8px 0;
        color: #fff;
    }
    .attachment-view .img-block>.name-background {
        height: 16px;
        background: #fff;
        opacity: 0.4;
    }
</style>
