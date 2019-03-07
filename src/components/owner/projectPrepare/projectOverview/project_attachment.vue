<template>
    <div class="project-attachment">
        <div v-for="item in attachment" :key="item.imgAddr">
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
</template>

<script>
export default {
    props: ['attachmentData'],
    data() {
        return {
            attachment: []
        }
    },
    mounted() {
        this.attachmentData.map((item, index) => {
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
        })
    }
 }
</script>
