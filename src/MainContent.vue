<template>
  <div>
    <nav id="_header">
      <!-- 顶部导航 -->
      <v-header></v-header>
    </nav>
    <!-- 左侧菜单 -->
    <v-aside ref="aside"></v-aside>
    <!-- 主要内容Main -->
    <div
      id="_main"
      :class="expand ? 'expand' : ''"
    >
      <el-breadcrumb
        separator=" "
        class="main-tips"
      >
        <el-breadcrumb-item
          v-for="(node, index) in menuNode"
          :key="index"
          :to="{ path: node.path }"
        >{{ node.name }}</el-breadcrumb-item>
      </el-breadcrumb>
      <transition name="main-fade">
        <router-view />
      </transition>
    </div>
    <!-- 页面底部 -->
    <v-footer
      id="_footer"
      :class="expand ? 'expand' : ''"
    ></v-footer>
    <div
      :class="shadeClass + ' ' + step"
      v-if="step"
    >
      <div class="mask"></div>
      <div class="shade-operation"></div>
      <div class="shade-tips">
        <div class="text-tips">
          {{ text[index - 1] }}
        </div>
        <div>
          <el-button
            type="info"
            @click="stepTo(false)"
            v-if="preBtn"
          >上一步</el-button>
          <el-button
            type="primary"
            @click="stepTo(true)"
            v-if="nextBtn"
          >下一步</el-button>
          <el-button
            type="success"
            @click="closeStep"
          >退出</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import header from './Header'
import aside from './Aside'
import footer from './Footer'

export default {
  components: {
    'v-header': header,
    'v-aside': aside,
    'v-footer': footer
  },
  data() {
      return {
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
      }
  }
}
</script>
