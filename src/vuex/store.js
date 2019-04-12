import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'
import * as ManagerMenuJson from './../menu-json/manager'
import * as GuestMenuJson from './../menu-json/guest'
import * as CityManagerMenu from './../menu-json/citymanager'

Vue.use(Vuex)

const buildTree = (data, childId, parentId) => {
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
}

const getImageFileFromUrl = (url, imageName) => {
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
}

let Base64 = require('js-base64').Base64

const store = new Vuex.Store({
  // 定义状态
  state: {
    currentUser: null,
    isLogin: false,
    token: '',
    roleData: [],
    managerMenu: ManagerMenuJson,
    guestMenu: GuestMenuJson,
    citymanagerMenu: CityManagerMenu,
    reservoirlist: [],
    buildTree: buildTree,
    regionTree: [],
    getImageFileFromUrl: getImageFileFromUrl,
    MenuNodes: [],
    reservoir: window.localStorage.RESERVOIR ? JSON.parse(Base64.decode(window.localStorage.RESERVOIR)) : {},
    menuList: [],
    expandMenu: true,
    user: '',
    step: '',
    SHOW_IMG: {
      flag: false,
      url: ''
    },
    isRegistered: true,
    role: '',
    // 全局loading
    AXIOS_NUMBER: 0
  },
  getters,
  mutations,
  actions
})

export default store
