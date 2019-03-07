<template>
    <div class='notice notice-preview'>
        <div class='title-block'>
            <div>{{form.title}}</div>
            <div class='time-block'>
                <span>发布时间：</span>
                <span class='notice-time'>{{ timeString || form.time}}</span>
            </div>
        </div>
        <hr>
        <div class='content-block' v-html='form.content'>
        </div>
        <div class="notice-attachment">
            <span>附件：</span>
            <div>
                <!-- <a>飞洒及撒娇佛按实际个三国杀</a>
                <a>飞洒及撒娇佛按实际个三国杀</a>
                <a>飞洒及撒娇佛按实际个三国杀</a>
                <a>飞洒及撒娇佛按实际个三国杀</a> -->
                <!-- <a v-for="(item, index) in fileList" :key="index" @click="downloadFiles(item.fileAddr || '')">{{item.name}}</a> -->
                <a v-for="(item, index) in fileList" :key="index" :href="item.fileAddr ? '/api/download/' + item.fileAddr:'#'">{{item.name}}</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                title: 'XXXXXXXXXXXXXX',
                time: '2018-10-11 11:02',
                content: '书法家哦啊截稿时间告诉结果偶是的感觉哦啊是贡萨的结构ii啊宏大飞机扫附件开票我看培根爱神的箭破桑普收集卡片管家婆微积分拍摄平方根沙盘更加迫切渴望反贫困判决书对方桑普看WOPFJSDJGIODJSPGJKWPJ建瓯市的结构i就受到攻击到国家殴打'
            },
            timeString: '',
            fileList: [],
            preview: false
        }
    },
    methods: {
        pushAttachment(data) {
          let files = []
          data.map(item => {
              let url = item.fileAddr
              let Base64 = require('js-base64').Base64
              let file = {
                  name: url.replace(/\S+\d{10,}-/g, ''),
                  fileAddr: Base64.encode(Base64.encode(url))
                //   fileAddr: url
              }
              files.push(file)
          })
          return files
      },
      downloadFiles(url) {
          if (url) {
              let Base64 = require('js-base64').Base64
            // let str = 'upload\\announcement\\2018-10\\1540968483980-timg4.jpg'
            let strBase = Base64.encode(Base64.encode(url))
            let urlStr = location.host + '/api/download/' + strBase
            window.open(urlStr, '_self')
            // window.location.href = urlStr
          }
      }
    },
    mounted() {
        let announcementId = this.$route.params.announcementId
        if (announcementId) {
            this.$http.get(`/api/announcement/${announcementId}`).then(res => {
                // 填充数据
                this.form = res.data
                let files = res.data.files
                if (files && files.length > 0) {
                    this.fileList = this.pushAttachment(files)
                }
                if (res.data.updateTime) {
                    // this.timeString = res.data.updateTime.substr(0, res.data.updateTime.indexOf('T'))
                    this.timeString = res.data.updateTime
                }
            })
        }
        /* let date = new Date(data.updateTime)
        this.timeString = date.toISOString().substr(0, 10) + ' ' + date.toTimeString().substr(0, 8) */
    }
}
</script>
