import Vue from 'vue'
import store from '../vuex/store'

const common = {
  /**
   *  上传文件通用方法
   * @param {fileObj} files
   *
   */
  uploadFile: function (files) {
    /* let fileUpload = (files) => {
      return Vue.prototype.$http.post('/api/file/uploadtempfiles', files).then(res => {
        debugger
        if (res.code === 1002) {
          // this.form.tempFolderRelativePath = res.data
          resolve(res.data)
        } else {
          reject(res.msg || res.content)
        }
      })
    } */
    return new Promise((resolve, reject) => {
      if (files && files.length > 0) {
        // 定义上传
        let fileUpload = (files) => {
          Vue.prototype.$http.post('/api/file/uploadtempfiles', files, {
            loading: {
              operation: true
            }
          }).then(res => {
            if (res.code === 1002) {
              // this.form.tempFolderRelativePath = res.data
              resolve(res.data)
            } else {
              reject(res.msg || res.content)
            }
          })
        }
        // 处理数据
        let fd = new FormData()
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
          fileUpload(fd)
        } else {
          Promise.all(defList).then(fileList => {
            fileUpload(fd)
          })
        }
      } else {
        resolve('')
      }
    })
  },
  getImageFileFromUrl: function (url, imageName) {
    // imageName一定要带上后缀
    let p = new Promise((resolve, reject) => {
      var blob = null
      var xhr = new XMLHttpRequest()
      xhr.open('GET', url)
      xhr.setRequestHeader('Accept', 'image/jpeg')
      xhr.responseType = 'blob'
      xhr.onload = () => {
        blob = xhr.response
        let imgFile = new File([blob], imageName, {
          type: 'image/jpeg'
        })
        resolve(imgFile)
      }
      xhr.send()
    })
    return p
  },
  /**
   * 获取文件内容信息
   * @param {*} data 文件数据
   */
  pushAttachment(data) {
    let files = []
    data.map(item => {
      let url = item.fileAddr
      let file = {
        name: url.replace(/\S+\d{10,}-/g, ''),
        url: location.origin + '/api/files/' + url
      }
      files.push(file)
    })
    return files
  },
  /**
   * 组装树结构数据
   * @param {*} data  组装的源数据
   * @param {*} childId 子节点key
   * @param {*} parentId 父节点key
   *
   */
  buildTree: function (data, childId, parentId) {
    let orignData = JSON.parse(JSON.stringify(data))
    orignData.map((item, i) => {
      // 筛选子节点
      let children = []
      orignData.map((n, k) => {
        if (item[childId] === n[parentId]) {
          children.push(n)
          n.isChild = true
        }
      })
      if (children && children.length > 0) {
        item.children = children
      }
    })
    let parentList = []
    orignData.map((item, index) => {
      if (!item.isChild) {
        parentList.push(item)
      }
    })
    return parentList
  },

  /**
   * 该功能正在开发中
   */
  inDevelop: function () {
    Vue.prototype.$notify.info({
      title: '该功能正在开发中',
      dangerouslyUseHTMLString: true,
      // message: '该功能正在开发中！'
      offset: 50
    })
  },

  /**
   * 查看全屏大图
   * @param {*} file 文件对象fileObj
   */
  showFullScreenPic: function (file) {
    let param = {
      flag: true,
      url: file.url
    }
    store.dispatch('setShowImg', param)
  },

  allLoad: {},
  /**
   * 针对axios创建和关闭单个loading遮罩层
   */
  buildLoading: function (options) {
    let ids = []
    if (!options.operation) {
      // 单个或多个axios的局部加载loading
      if (Array.isArray(options)) {
        options.map(item => {
          ids.push(item.target)
          this.initLoading(item)
        })
      } else {
        let targets = options.target.split(',')
        targets.map(target => {
          let param = Object.assign({}, options, {
            target: target
          })
          this.initLoading(param)
        })
        ids = targets
      }
    } else {
      // 提交、删除、修改功能全屏loading
      ids = ['fullScreen']
      this.initLoading()
    }
    return ids.join(',')
  },
  initLoading(option) {
    let key = option ? option.target : 'fullScreen'
    if (this.allLoad[key]) {
      // 如果多个后台接口控制同一个loading
      this.allLoad[key].num++
    } else {
      // 创建单个loading窗口
      let submitLoading = {
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      }
      let param = Object.assign({
        lock: true,
        text: option ? '数据加载中' : '数据处理中，请稍等'
      }, (option || submitLoading))
      let loading = Vue.prototype.$loading(param)
      this.allLoad[key] = {
        num: 1,
        obj: loading
      }
    }
  },
  closeLoading: function (ids) {
    let targets = ids.split(',')
    targets.map(target => {
      let load = this.allLoad[target]
      load.num--
      if (load.num === 0) {
        this.allLoad[target].obj.close()
        delete this.allLoad[target]
      }
    })
  }
}

export default common
