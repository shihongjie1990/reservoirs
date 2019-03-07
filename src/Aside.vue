<template>
  <!-- user image -->
  <div
    id="_leftMenu"
    :class='expandMenu?"":"narrow"'
  >
    <div
      class="nav-tool"
      @click='toggleExpand'
    >
      |||
    </div>
    <ul class="menu-content">
      <li v-if="ownerMenu">
        <el-tooltip
          effect="dark"
          content="配置向导"
          placement="right-start"
        >
          <a
            @click='handleStep(true)'
            name="配置向导"
          >
            <i class="fa fa-cog fa-fw"></i>
            <span>配置向导</span>
          </a>
        </el-tooltip>
      </li>
      <li
        v-for="(node, index) in menuData"
        :key="index"
      >
        <el-tooltip
          effect="dark"
          :content="node.name"
          placement="right-start"
        >
          <span
            @click="menuExpand(node)"
            v-if="node.children && node.children.length>0"
          >
            <i :class="'fa ' + node.icon"></i>
            <span>{{ node.name }}</span>
            <i :class="node.expand?'fa fa-chevron-down':'fa fa-chevron-left'"></i>
          </span>
          <a
            v-else
            @click='handleClick(node)'
            :name="node.name"
          >
            <i :class="'fa ' + node.icon"></i>
            <span>{{ node.name }}</span>
          </a>
        </el-tooltip>
        <ul
          v-if="node.children && node.children.length>0"
          :style="node.expand?'height:' + node.children.length*45 + 'px':''"
        >
          <li
            v-for="(childNode, i) in node.children"
            :key="i"
          >
            <el-tooltip
              effect="dark"
              :content="childNode.name"
              placement="right-start"
            >
              <a
                @click='handleClick(childNode)'
                :name="childNode.name"
              >
                <i :class="'fa ' + childNode.icon"></i>
                <span>{{ childNode.name }}</span>
              </a>
            </el-tooltip>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style>
  /* .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  } */
</style>

<script>
export default {
    data() {
        return {
            expandMenu: true,
            isCollapse: false,
            menuData: [],
            lastNode: '',
            ownerMenu: false,
            steps: ['first', 'second', 'third', 'forth', 'fifth', 'sixth'],
            stepParentNode: {
                first: '项目前期',
                second: '项目前期',
                third: '',
                forth: '',
                fifth: '项目月报',
                sixth: ''
            },
            step: 0
        }
    },
    watch: {
        expandMenu(curValue, oldValue) {
            this.$store.dispatch('setExpandMenu', this.expandMenu)
        }
    },
    mounted() {
        // 管理者菜单
        // let menuData = this.$store.state.managerMenu.default
        // 业主菜单
        // let menuData = this.$store.state.guestMenu.default
        // 菜单
        let Base64 = require('js-base64').Base64
        let menuList = this.$store.state.menuList
        let storageMenu = window.localStorage.MENU_NODE
        let menuData = (menuList && menuList.length > 0) ? menuList : JSON.parse(Base64.decode(storageMenu))
        let userString = window.localStorage.USER
        if (userString) {
            let user = JSON.parse(Base64.decode(userString))
            if (user.roles.indexOf('ROLE_PLP') > -1) {
                this.ownerMenu = true
            }
        }
        // 获取菜单节点
        let nodeSelected = this.$store.state.MenuNodes
        if (nodeSelected && nodeSelected.length > 0) {
            for (let i = 0; i < nodeSelected.length - 1; i++) {
                let node = ''
                let expandNode = (data) => {
                    for (let j = 0; j < data.length; j++) {
                        if (data[j].name === nodeSelected[i].name) {
                            node = data[j]
                            break
                        } else if (data[j].children && data[j].children.length > 0) {
                            expandNode(data[j].children)
                        }
                    }
                }
                expandNode(menuData)
                if (node) {
                    this.menuExpand(node)
                }
            }
        }
        this.menuData = menuData
        this.$nextTick(() => {
            if (nodeSelected && nodeSelected.length > 0) {
                let name = nodeSelected[nodeSelected.length - 1].name
                let dom = document.getElementsByName(name)[0]
                if (dom) {
                    dom.setAttribute('style', 'background:#3b8fe8')
                    this.lastNode = dom
                }
            }
        })
    },
    methods: {
        toggleExpand() {
            this.expandMenu = !this.expandMenu
        },
        menuExpand(name) {
            name.expand = !name.expand
        },
        /**
         *  判断是否有水库数据
         */
        getMyBaseInfo() {
            let flag = false
            let reservoir = window.localStorage.RESERVOIR
            if (reservoir) {
                flag = true
            }
            return flag
        },
        handleClick(nodeItem) {
            let node = arguments[0]
            if (node.path === '/projectprepare/add' || node.path === '/projectprepare/projectoverview') {
                let flag = this.getMyBaseInfo()
                if (flag && node.path === '/projectprepare/add') {
                    this.$alert('基本资料已填报，请勿重复填报！', '提示', {type: 'info'})
                    return false
                } else if (node.path === '/projectprepare/projectoverview' && !flag) {
                    this.$alert('请先填写基本资料！', '提示', {type: 'warning'})
                    this.$router.push({path: '/projectprepare/add'})
                    return false
                }
            }
            this.lastNode && this.lastNode.removeAttribute('style')
            let tag = event.target.tagName
            let dom = ''
            if (tag.toLowerCase() === 'a') {
                dom = event.target
            } else {
                dom = event.target.parentElement
            }
            this.lastNode = dom
            dom.setAttribute('style', 'background:#3b8fe8')
            this.$nextTick(() => {
                this.$router.push({path: node.path})
            })
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath)
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath)
        },
        handleStep(flag) {
            // 把收缩菜单展开
            this.expandMenu = true
            let step = this.step
            // 判断上一步下一步
            flag ? step++ : step--
            // 打开项目前期主菜单
            let menuData = this.menuData
            let stepStr = this.steps[step - 1]
            let itemName = this.stepParentNode[stepStr]
            menuData.map(item => {
                if (item.name === itemName) {
                    item.expand = true
                } else {
                    item.expand = false
                }
            })
            this.$store.dispatch('setStep', stepStr)
            this.step = step
            // 返回信息
            return step
        },
        closeStep() {
            this.step = 0
        }
    }
}
</script>
