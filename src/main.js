// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueCookies from 'vue-cookies'
import store from './vuex/store'
import 'babel-polyfill'
import base64 from 'js-base64'
// 自定义公用方法
import common from './common/common'
// import echarts from 'echarts'
// import 'echarts-liquidfill'

// Vue.prototype.$echarts = echarts

// const baseUrl = 'http://192.168.100.205:80/'
Vue.use(Element)

Vue.use(VueCookies)
axios.defaults.withCredentials = true
// axios.defaults.baseURL = process.env.API_ROOT

/**
 *  axios拦截器
 */
axios.interceptors.request.use(config => {
  // 设置全局loading
  let loadObj = config.loading
  if (loadObj && Object.keys(loadObj).length > 0) {
    config.loadmask = base64.Base64.encode(common.buildLoading(loadObj))
  } else {
    let withoutLoading = config.headers.withoutLoading
    if (!withoutLoading) {
      config.loadingMark = base64.Base64.encode(new Date())
      store.dispatch('plusAxiosNum', true)
    }
  }
  return config
}, err => {
  return Promise.reject(err)
})
axios.interceptors.response.use(res => {
  // 关闭全局loading
  let config = res.config
  if (config) {
    if (config.loadmask) {
      let loadmask = base64.Base64.decode(config.loadmask)
      common.closeLoading(loadmask)
    } else if (config.loadingMark) {
      store.dispatch('plusAxiosNum', false)
    }
  }
  let data = res.data
  if (data.code === 0) {
    Vue.prototype.$message.warning(data.msg)
    store.dispatch('setIsRegister', null)
    return null
  } else {
    return res.data
  }
}, err => {
  // 关闭全局loading
  let config = err.config
  if (config) {
    if (config.loadmask) {
      let loadmask = base64.Base64.decode(config.loadmask)
      common.closeLoading(loadmask)
    } else if (config.loadingMark) {
      store.dispatch('plusAxiosNum', false)
    }
  }
  if (err && err.response) {
    let status = err.response.status
    if (status === 401 || status === '401' || status === 403 || status === '403') {
      let data = err.response.data
      Vue.prototype.$alert(data.content || data.message + ', 即将跳转到水利云登录页', '提示', {
        confirmButtonText: '确定',
        type: 'warning',
        callback: action => {
          // location.href = 'http://10.233.31.177:31732/logout'
          location.href = location.origin + '/api/logout'
        }
      })
      // router.push('/login')
    }
  }
  /* else {
     Vue.prototype.$alert('登录超时, 即将跳转到水利云登录页', '提示', {
       confirmButtonText: '确定',
       type: 'warning',
       callback: action => {
         // location.href = 'http://10.233.31.177:31732/logout'
         location.href = location.origin + '/api/logout'
       }
     })
   } */
  // return Promise.reject(err)
  return Promise.reject(err.response)
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.prototype.Base64 = base64.Base64
Vue.prototype.$common = common

// 获取用户信息
let roleStr = window.localStorage.RESERVOIR_ROLE
if (roleStr) {
  let role = base64.Base64.decode(roleStr)
  store.dispatch('setRole', role)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
