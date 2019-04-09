import Vue from 'vue'

const common = {
  uploadFile: function (files) {
    return new Promise((resolve, reject) => {
      if (files && files.length > 0) {
        let fd = new FormData()
        files.map((item, index) => {
          let raw = item.raw
          if (item.raw) {
            fd.append('uploadfile', raw)
          }
        })
        Vue.prototype.$http.post('/api/file/uploadtempfiles', fd).then(res => {
          if (res.code === 1002) {
            // this.form.tempFolderRelativePath = res.data
            resolve(res.data)
          } else {
            reject(res.msg || res.content)
          }
        })
      } else {
        resolve('')
      }
    })
  }
}

export default common
