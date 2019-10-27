<template>
  <div class="headers">
    <!-- logo -->
    <div class="header-logo">
      <img src="static/images/waterlogo.png"
           alt="用户头像">
      <span>中小型骨干水源工程监管云</span>
    </div>
    <!-- <div class="header-city">
            <span>贵阳市</span>
        </div>
        <div class="header-area">
            <span>花溪区</span>
        </div>
        <div class="header-reservoir">
            <span>乌当区柏枝田水库</span>
        </div> -->
    <div class="header-info">
      <!-- <img src="static/images/profile_small.jpg" alt="user"> -->
      <el-dropdown @command="handleCommand">
        <img src="static/images/profile_small.jpg"
             alt="user">
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout">注销登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="backlog-top"
         v-if="role === 'manager'">
      <el-badge :value="backlogNum"
                class="item"
                @click.native="pageTobacklog">
        <span class="fa fa-bell-o"></span>
      </el-badge>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      backlogNum: 0,
      role: '',
      Base64: require('js-base64').Base64
    }
  },
  methods: {
    handleCommand(value) {
      if (value === 'logout') {
        // this.$router.push('/login')
        location.href = location.origin + '/api/logout'
        window.localStorage.clear()
      }
    },
    getBacklogCount() {
      this.$http.get('/api/fund/unhandled').then(res => {
        if (res.code === 1002) {
          this.backlogNum = res.data
        }
      })
    },
    pageTobacklog() {
      this.$router.push('/backlog/manager')
    }
  },
  created() {
    let roleStr = window.localStorage.RESERVOIR_ROLE
    let role = ''
    if (roleStr) {
      role = this.Base64.decode(roleStr)
      if (role === 'manager') {
        this.getBacklogCount()
      }
      this.role = role
    }
  }
}
</script>

<style>
.headers {
  overflow: hidden;
}
.backlog-top {
  float: right !important;
  height: 50px;
  width: 50px;
}
.backlog-top:hover {
  cursor: pointer;
  background: #000;
}
.backlog-top > .item {
  padding: 3px;
  display: inline;
}
.backlog-top > .item > .fa {
  font-size: 18px;
}
</style>
