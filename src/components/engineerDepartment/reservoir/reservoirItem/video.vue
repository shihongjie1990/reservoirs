<template>
  <div>
    <el-row :gutter="20">
      <el-col :lg="8"
              :md="8"
              :xs="24"
              class="video-operation">
        <div v-for="(item, index) in allChannels"
             :key="index"
             class="video-item">
          <div>{{ item.name }}</div>
          <el-button type="primary"
                     plain
                     size="mini"
                     v-for="(channel, i) in item.channel"
                     :key="i"
                     @click="playVideo(channel)"><i class="fa fa-video-camera"></i> {{ "视频" + (i+1) }}</el-button>
        </div>
      </el-col>
      <el-col :lg="16"
              :md="16"
              :xs="24">
        <object id="DPSDK_OCX"
                classid="CLSID:D3E383B6-765D-448D-9476-DFD8B499926D"
                style="width: 100%; height: 600px"
                codebase="DpsdkOcx.cab#version=1.0.0.0"></object>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  data() {
    return {
      gWndIdAll: '',
      allChannels: [],
      video: {}
    }
  },
  methods: {
    initVideo() {
      var obj = document.getElementById('DPSDK_OCX')
      // 初始化
      var gWndId = obj.DPSDK_CreateSmartWnd(0, 0, 100, 100)
      obj.DPSDK_SetWndCount(gWndId, 1)
      obj.DPSDK_SetSelWnd(gWndId, 0)
      for (var i = 1; i <= 4; i++) {
        obj.DPSDK_SetToolBtnVisible(i, false)
      }
      obj.DPSDK_SetToolBtnVisible(7, false)
      obj.DPSDK_SetToolBtnVisible(9, false)
      obj.DPSDK_SetControlButtonShowMode(1, 0)
      obj.DPSDK_SetControlButtonShowMode(2, 0)

      // 登录
      // var nRet1 = obj.DPSDK_Login('58.16.188.145', '9000', '向敬光', '123456')
      var nRet1 = obj.DPSDK_Login('111.85.91.84', '9000', 'system', 'admin123')
      console.log('登录', nRet1)

      // 加载组织结构
      obj.DPSDK_LoadDGroupInfo()
      // 获取组织结构
      var videoXML = obj.DPSDK_GetDGroupStr()
      document.getElementById('xml').innerText = videoXML
      // 根据通道ID连接DMS
      var nRet2 = obj.DPSDK_ConnectDmsByChnlId('1000063$1$0$1')
      console.log('根据通道ID连接DMS', nRet2)
      // 播放视频
      var szCameraId = '1000063$1$0$1' // 视频通道
      var nStreamType = '1' // 主码流
      var nMediaType = '1' // 视频
      var nTransType = '1' // 视频

      var nWndNo = obj.DPSDK_GetSelWnd(gWndId)
      var nRet = obj.DPSDK_StartRealplayByWndNo(gWndId, nWndNo, szCameraId, nStreamType, nMediaType, nTransType)
      if (nRet === 0) {
        obj.DPSDK_SetIvsShowFlagByWndNo(gWndId, nWndNo, 1, 1)
        obj.DPSDK_SetIvsShowFlagByWndNo(gWndId, nWndNo, 2, 1)
        obj.DPSDK_SetIvsShowFlagByWndNo(gWndId, nWndNo, 3, 1)
      }
    },
    initVideoPlayer() {
      let obj = document.getElementById('DPSDK_OCX')
      // 初始化
      let gWndId = obj.DPSDK_CreateSmartWnd(0, 0, 100, 100)
      this.gWndIdAll = gWndId
      obj.DPSDK_SetWndCount(gWndId, 1)
      obj.DPSDK_SetSelWnd(gWndId, 0)
      for (let i = 1; i <= 4; i++) {
        obj.DPSDK_SetToolBtnVisible(i, false)
      }
      obj.DPSDK_SetToolBtnVisible(7, false)
      obj.DPSDK_SetToolBtnVisible(9, false)
      obj.DPSDK_SetControlButtonShowMode(1, 0)
      obj.DPSDK_SetControlButtonShowMode(2, 0)

      // 登录
      // let nRet1 = obj.DPSDK_Login('58.16.188.145', '9000', '向敬光', '123456')
      let nRet1 = obj.DPSDK_Login('111.85.91.84', '9000', 'system', 'admin123')
      console.log('登录', nRet1)

      // 加载组织结构
      obj.DPSDK_LoadDGroupInfo()
      // 获取组织结构
      let videoXML = obj.DPSDK_GetDGroupStr()
      console.log('videoXML', videoXML)
      let videoList = this.releaseXML(videoXML)
      this.allChannels = videoList
      // initVideoOperation(videoList)
      // document.getElementById('xml').innerText = videoXML
      this.video = obj
    },
    /* releaseXML(xmlString) {
        let xmlDoc = null
        // 判断浏览器的类型
        // 支持IE浏览器
        if (!window.DOMParser && window.ActiveXObject) { // window.DOMParser 判断是否是非ie浏览器
            let xmlDomVersions = ['MSXML.2.DOMDocument.6.0','MSXML.2.DOMDocument.3.0','Microsoft.XMLDOM']
            for (let i = 0; i < xmlDomVersions.length; i++) {
                try {
                    xmlDoc = new ActiveXObject(xmlDomVersions[i])
                    xmlDoc.async = false
                    xmlDoc.loadXML(xmlString) // loadXML方法载入xml字符串
                    break
                } catch (e) {
                }
            }
        } else if (window.DOMParser && document.implementation && document.implementation.createDocument) {
            try {
                let domParser = new DOMParser()
                xmlDoc = domParser.parseFromString(xmlString, 'text/xml')
            } catch (e) {
            }
        } else {
            return null
        }
        return xmlDoc
    }, */
    releaseXML(xmlFile, plantName) {
      let loadXML = function (xmlFile) {
        let xmlDoc = null
        let agent = navigator.userAgent.toLowerCase()

        // 判断浏览器的类型
        // 支持IE浏览器
        if (agent.indexOf('msie') > 0) {
          // xmlDoc = new ActiveXObject('Microsoft.XMLDOM')//IE浏览器
          let xmlDomVersions = ['MSXML.2.DOMDocument.6.0', 'MSXML.2.DOMDocument.3.0', 'Microsoft.XMLDOM']
          for (let i = 0; i < xmlDomVersions.length; i++) {
            try {
              xmlDoc = new ActiveXObject(xmlDomVersions[i]) // eslint-disable-line
              break
            } catch (e) {
            }
          }
          xmlDoc.async = false
          xmlDoc.load(xmlFile)
        } else {
          xmlDoc = jQuery.parseXML(xmlFile) // eslint-disable-line
        }
        return xmlDoc
      }

      let xmlDoc = loadXML(xmlFile)
      if (xmlDoc == null) {
        alert('没有数据!')
      }
      // 处理数据
      let childList = []
      $(xmlDoc).find('Department>Department').each(function (index, itemDom) {
        let itemData = {
          name: $(itemDom).attr('name'),
          coding: $(itemDom).attr('coding')
        }
        let channel = []
        $(itemDom).find('Channel').each(function (i, childDom) {
          channel.push($(childDom).attr('id'))
        })
        itemData.channel = channel
        childList.push(itemData)
      })
      return childList
    },
    playVideo(channelId) {
      let obj = this.video
      // 根据通道ID连接DMS
      let nRet2 = obj.DPSDK_ConnectDmsByChnlId(channelId)
      console.log('根据通道ID连接DMS', nRet2)
      // 播放视频
      let szCameraId = channelId // 视频通道
      let nStreamType = '1' // 主码流
      let nMediaType = '1' // 视频
      let nTransType = '1' // 视频
      let gWndId = this.gWndIdAll
      let nWndNo = obj.DPSDK_GetSelWnd(gWndId)
      let nRet = obj.DPSDK_StartRealplayByWndNo(gWndId, nWndNo, szCameraId, nStreamType, nMediaType, nTransType)
      if (nRet === 0) {
        obj.DPSDK_SetIvsShowFlagByWndNo(gWndId, nWndNo, 1, 1)
        obj.DPSDK_SetIvsShowFlagByWndNo(gWndId, nWndNo, 2, 1)
        obj.DPSDK_SetIvsShowFlagByWndNo(gWndId, nWndNo, 3, 1)
      }
    }
  },
  mounted() {
    // this.initVideo()
    // this.initVideoPlayer()
    this.$nextTick(() => {
      this.initVideoPlayer()
    })
  }
}
</script>
