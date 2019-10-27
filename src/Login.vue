<template>
  <div>
    <img src="static/images/wallpaper.jpg"
         alt="Login"
         class='logo-bg'>
    <div class='img-word'>
      <span>水利云·监管云</span>
      <span>Copyright GUIZHOU SMART WATER CONSERVANCY TECHNOLOGY CO., LTD. © 2018-2020</span>
    </div>
    <div class='login-block'>
      <div class='login-bg'></div>
      <div class='login-content'>
        <img src="static/images/logo-gai.png"
             alt="监管云Logo"
             class='login-logo'>
        <div class='login-div'>
          <div>
            <!-- <span>用户名：</span> -->
            <el-input v-model='user'
                      placeholder="请输入用户名">
              <i slot="prefix"
                 class="fa fa-user-o"
                 style="line-height: 40px; margin-left: 3px;font-size: 17px;"></i>
            </el-input>
          </div>
          <div>
            <!-- <span>密码：</span> -->
            <el-input v-model='password'
                      type='password'
                      placeholder="请输入密码"
                      @keyup.native.enter="loginTo">
              <i slot="prefix"
                 class="fa fa-lock"
                 style="line-height: 40px; margin-left: 3px;font-size: 17px;"></i>
            </el-input>
            <el-alert title="账号或密码错误"
                      type="error"
                      show-icon
                      v-show="logErr"
                      @close="closeAlert"></el-alert>
          </div>
          <div>
          </div>
        </div>
        <el-button type="primary"
                   size="small"
                   @click='loginTo'>登陆</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: '',
      password: '',
      logErr: false,
      Base64: require('js-base64').Base64
    }
  },
  methods: {
    loginTo() {
      let _this = this
      this.$http({
        // url: '/login',
        url: '/api/authentication/form',
        // url: 'http://192.168.100.205:80/authentication/form',
        method: 'post',
        data: {
          username: _this.user,
          password: _this.password,
          loginType: 'simpleLogin'
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        transformRequest: [
          data => {
            let ret = ''
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
          }
        ]
      }).then(res => {
        let dataStr = res.data
        let dataDecode = this.Base64.decode(dataStr)
        let data = this.buildData(dataDecode)
        let authorities = data.roles
        // let authorities = res.roles
        let roles = []
        if (authorities && authorities.length > 0) {
          // 把角色信息放入vuex和localStorage
          //   window.localStorage.USER = this.Base64.encode(JSON.stringify(res))
          window.localStorage.USER = this.Base64.encode(JSON.stringify(data))
          // 判断角色信息
          /* authorities.map(item => {
              let role = _this.Base64.decode(item)
              roles.push(role)
          }) */
          roles = authorities
          if (roles.indexOf('ROLE_PLP') > -1 || !roles || roles.length === 0 || !roles[0]) {
            let menuNode = this.$store.state.guestMenu.default
            this.$store.dispatch('setMenuList', menuNode)
            window.localStorage.MENU_NODE = this.Base64.encode(JSON.stringify(menuNode))
            // _this.getMyBaseInfo()
            this.$router.push({ path: '/overview' })
            this.$store.dispatch('setRole', 'guest')
            window.localStorage.RESERVOIR_ROLE = this.Base64.encode('guest')
          } else {
            let menuNode = this.$store.state.managerMenu.default
            this.$store.dispatch('setMenuList', menuNode)
            window.localStorage.MENU_NODE = this.Base64.encode(JSON.stringify(menuNode))
            _this.$router.push({ path: '/home' })
            this.$store.dispatch('setRole', 'manager')
            window.localStorage.RESERVOIR_ROLE = this.Base64.encode('manager')
          }
        }
      }, thisErr => {
        if (thisErr.status === 500) {
          if (thisErr.data.code === 10000) {
            this.logErr = true
          }
        }
      })
    },
    buildData(str) {
      let dataJson = str.substring(str.indexOf('{') + 1, str.indexOf('}'))
      let keyValues = dataJson.split(',')
      let data = {}
      keyValues.map(item => {
        let keyValue = item.split('=')
        if (keyValue[1].indexOf('[') > -1) {
          let valuesStr = keyValue[1].substring(keyValue[1].indexOf('[') + 1, keyValue[1].indexOf(']'))
          let values = valuesStr.split(',')
          data[keyValue[0].trim()] = values
        } else {
          let value = keyValue[1].trim()
          if (value.indexOf('\'') === 0) {
            value = value.substring(1, value.length - 1)
          }
          data[keyValue[0].trim()] = value
        }
      })
      return data
    },
    closeAlert() {
      this.logErr = false
    },
    getMyBaseInfo() {
      this.$http.get('/api/baseinfo/mybaseinfo').then(res => {
        if (res.code === 1002) {
          let reservoir = res.data
          this.$store.dispatch('setReservoir', reservoir)
          window.localStorage.RESERVOIR = this.Base64.encode(JSON.stringify(reservoir))
          this.$router.push({ path: '/overview' })
        }
      })
    }
  }
}
</script>

<style>
.logo-bg {
  width: 100vw;
  height: 100vh;
  /* background: url('../static/images/wallpaper.jpg') no-repeat; */
}
.login-block {
  position: absolute;
  top: 80px;
  right: 50px;
}
.login-block > .login-bg {
  width: 380px;
  height: 400px;
  background: #fff;
  opacity: 0.5;
}
.login-block > .login-bg {
  border-radius: 30px;
}
.login-block > .login-content {
  width: 380px;
  position: absolute;
  top: 0;
  margin: 20px 0;
}
.login-content > img {
  height: 50px;
  padding: 20px;
}
.login-div > div > .el-input {
  width: 300px;
  margin: 20px 0;
}
.login-div > div > div.el-alert {
  width: 300px;
  margin: -10px auto;
}
.login-content > .el-button {
  width: 130px;
  height: 38px;
  margin: 30px 0;
}
.img-word {
  position: absolute;
  bottom: 40px;
  left: 80px;
  color: #fff;
  text-align: left;
}
.img-word > span:first-child {
  font-size: 38px;
}
.img-word > span:last-child {
  display: block;
  font-size: 10px;
  padding: 10px 0;
}
</style>
