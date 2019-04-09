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

// 定义全局loading
const loadHtml = () => {
  let loading = Vue.prototype.$loading({
    target: '#app',
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  return loading
}

let loadAll = {}

Vue.prototype.$loadHtml = loadHtml

let random = () => {
  let timeNum = new Date().getTime()
  let randomNum = Math.floor(Math.random() * (1000 - 1))
  return timeNum + '' + randomNum
}

/**
 *  axios拦截器
 */
axios.interceptors.request.use(config => {
  /* let url = config.url
  let fullUrl = url.replace('/api/', baseUrl)
  config.url = fullUrl */
  // 设置全局loading
  let withoutLoading = config.headers.withoutLoading
  if (!withoutLoading) {
    let mark = random()
    config.timeMark = mark
    loadAll[mark] = loadHtml()
  }
  return config
}, err => {
  return Promise.reject(err)
})
axios.interceptors.response.use(res => {
  // 关闭全局loading
  let config = res.config
  if (config.timeMark) {
    loadAll[config.timeMark].close()
  }
  return res.data
}, err => {
  // 关闭全局loading
  let config = err.config
  if (config.timeMark) {
    loadAll[config.timeMark].close()
  }
  if (err && err.response) {
    let status = err.response.status
    if (status === 401 || status === '401') {
      let data = err.response.data
      Vue.prototype.$alert(data.content + ', 即将跳转到水利云登录页', '提示', {
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
  // return Promise.reject(err)
  return Promise.reject(err.response)
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.prototype.$common = common

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
