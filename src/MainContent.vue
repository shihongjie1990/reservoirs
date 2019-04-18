<template>
  <div>
    <nav id="_header">
      <!-- 顶部导航 -->
      <v-header></v-header>
    </nav>
    <!-- 左侧菜单 -->
    <v-aside ref="aside"></v-aside>
    <!-- 主要内容Main -->
    <div id="_main"
         :class="expand ? 'expand' : ''">
      <el-breadcrumb separator=" "
                     class="main-tips">
        <el-breadcrumb-item v-for="(node, index) in menuNode"
                            :key="index"
                            :to="{ path: node.path }">{{ node.name }}</el-breadcrumb-item>
      </el-breadcrumb>
      <transition name="main-fade"
                  v-show="$store.state.isRegistered">
        <div v-loading="pageLoading"
             element-loading-text="拼命加载中"
             class="loading-mask">
          <router-view v-show="!pageLoading && $store.state.isRegistered" />
        </div>
      </transition>
    </div>
    <!-- 页面底部 -->
    <v-footer id="_footer"
              :class="expand ? 'expand' : ''"></v-footer>
    <div :class="shadeClass + ' ' + step"
         v-if="step">
      <div class="mask"></div>
      <div class="shade-operation"></div>
      <div class="shade-tips">
        <div class="text-tips">
          {{ text[index - 1] }}
        </div>
        <div>
          <el-button type="info"
                     @click="stepTo(false)"
                     v-if="preBtn">上一步</el-button>
          <el-button type="primary"
                     @click="stepTo(true)"
                     v-if="nextBtn">下一步</el-button>
          <el-button type="success"
                     @click="closeStep">退出</el-button>
        </div>
      </div>
    </div>
    <el-dialog title="项目资料填写"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :show-close="false"
               :visible="!$store.state.isRegistered"
               width="80%">
      <add-project></add-project>
    </el-dialog>
  </div>
</template>

<script>
import header from './Header'
import aside from './Aside'
import footer from './Footer'
import addProject from './components/owner/projectPrepare/projectOverview/add_project'

export default {
  components: {
    'v-header': header,
    'v-aside': aside,
    'v-footer': footer,
    'add-project': addProject
  },
  data() {
    return {
      pageLoading: false,
      isRegister: false,
      expand: false,
      menuNode: this.$store.state.MenuNodes,
      step: '',
      shadeClass: '',
      preBtn: false,
      nextBtn: true,
      text: [
        '第一步：填写项目概况',
        '第二步：补充前期工作内容',
        '第三步：补充招标信息',
        '第四步：补充合同信息',
        '第五步：完善每月月报信息',
        '第六步：填写投融资信息'
      ],
      index: 1
    }
  },
  watch: {
    '$store.state.MenuNodes'(curValue, oldValue) {
      this.menuNode = curValue
    },
    '$store.state.expandMenu'(curValue, oldValue) {
      this.expand = !curValue
    },
    '$store.state.step'(curValue, oldValue) {
      if (curValue) {
        this.shadeClass = 'shade'
      }
      this.step = curValue
    },
    '$store.state.AXIOS_NUMBER'(curValue, oldValue) {
      this.pageLoading = curValue !== 0
    }
  },
  methods: {
    stepTo(flag) {
      let index = this.$refs.aside.handleStep(flag)
      this.index = index
      if (index === 1) {
        this.preBtn = false
      } else if (index === this.text.length) {
        this.nextBtn = false
      } else {
        this.preBtn = true
        this.nextBtn = true
      }
    },
    closeStep() {
      this.shadeClass = ''
      this.step = ''
      this.preBtn = false
      this.nextBtn = true
      this.index = 1
      this.$refs.aside.closeStep()
    },
    getMyBaseInfo() {
      this.$http.get('/api/baseinfo/mybaseinfo').then(res => {
        if (res.code === 1002) {
          let reservoir = res.data
          this.$store.dispatch('setReservoir', reservoir)
          window.localStorage.RESERVOIR = this.Base64.encode(JSON.stringify(reservoir))
        }
      })
    }
  },
  mounted() {
    let role = this.$store.state.role
    if (role === 'guest') {
      this.getMyBaseInfo()
      this.$http.get('/api/pre/hasRegistered').then(res => {
        /* if (!res) {
          this.dialogVisible = true
        } */
        this.$store.dispatch('setIsRegister', res)
      })
    } else {
      this.$store.dispatch('setIsRegister', true)
    }
  }
}
</script>
