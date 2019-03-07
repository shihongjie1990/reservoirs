<template>
  <div>
    <img
      src="static/images/wallpaper.jpg"
      alt="Login"
      class='logo-bg'
    >
    <div class='img-word'>
      <span>水利云·监管云</span>
      <span>Copyright GUIZHOU SMART WATER CONSERVANCY TECHNOLOGY CO., LTD. © 2018-2020</span>
    </div>
    <div class='login-block'>
      <div class='login-bg'></div>
      <div class="login-area">
        <div class='login-content'>
          <img
            src="static/images/waterlogo-login.png"
            alt="水利云Logo"
            class='login-logo'
          >
          <div class='login-div'>
            <el-tooltip
              class="item"
              effect="dark"
              :content="username || '（无）'"
              placement="bottom"
            >
              <div>
                <i
                  class="fa fa-user-o"
                  style="color:#fff;"
                  v-if="!imageUrl"
                ></i>
                <img
                  src="static/images/profile_small.jpg"
                  alt="头像"
                  v-if="imageUrl"
                >
                <div> {{ username }}</div>
              </div>
            </el-tooltip>
          </div>
        </div>
        <img
          src="static/images/arrow.png"
          alt="箭头"
        >
        <div class='login-content'>
          <img
            src="static/images/logo-gai.png"
            alt="监管云Logo"
            class='login-logo'
          >
          <div class='login-div'>
            <div>
              <!-- <span>用户名：</span> -->
              <el-input
                v-model='user'
                placeholder="请输入用户名"
              >
                <i
                  slot="prefix"
                  class="fa fa-user-o"
                  style="line-height: 40px; margin-left: 3px;font-size: 17px;"
                ></i>
              </el-input>
            </div>
            <div>
              <!-- <span>密码：</span> -->
              <el-input
                v-model='password'
                type='password'
                placeholder="请输入密码"
                @keyup.native.enter="loginTo"
              >
                <i
                  slot="prefix"
                  class="fa fa-lock"
                  style="line-height: 40px; margin-left: 3px;font-size: 17px;"
                ></i>
              </el-input>
              <el-alert
                title="账号或密码错误"
                type="error"
                show-icon
                v-show="logErr"
                @close="closeAlert"
                style="position:absolute;margin-left:20px;"
              ></el-alert>
            </div>
            <div>
            </div>
          </div>
        </div>
        <el-button
          type="primary"
          @click='loginTo'
        >绑定监管云账号</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            user: '',
            password: '',
            username: '',
            imgUrl: '',
            logErr: false,
            Base64: require('js-base64').Base64
        }
    },
    methods: {
        loginTo() {
            this.$http.post('/api/user/regist', {username: this.user, password: this.password}).then(res => {
                if (res.code === 1002) {
                    this.$alert('绑定成功！', '提示', {
                        confirmButtonText: '确定',
                        type: 'success',
                        callback: action => {
                            location.href = 'http://www.water-data.cn:8080/water/indexorg.html'
                            window.localStorage.clear()
                        }
                    })
                } else {
                    this.logErr = true
                }
            })
        },
        closeAlert() {
            this.logErr = false
        }
    },
    mounted() {
        this.$http.get('/api/user/social/user').then(res => {
            this.username = res.data.displayName
            this.imgUrl = res.data.imageUrl
        })
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
        top: calc((100vh - 500px) / 2);
        right: calc((100vw - 800px) / 2);
    }
    .login-block>.login-bg {
        width: 760px;
        height: 400px;
        background: #fff;
        opacity: 0.5;
    }
    .login-block>.login-bg {
        border-radius: 30px;
    }
    .login-block>.login-area {
        position: absolute;
        top: 0;
        width: 800px;
    }
    .login-block>.login-area>.login-content{
        width: 340px;
        margin: 20px 10px;
        display: inline-block;
        vertical-align: middle;
    }
    .login-block>.login-area>.login-content:first-child {
        width: 250px;
    }
    .login-block>.login-area>button {
        display: block;
        margin: 10px auto;
        margin-left: 290px;
    }
    .login-area>img {
        height: 28px;
        vertical-align: middle;
        margin: 0 16px;
        margin-top: 82px;
    }
    .login-content:first-child>img {
        height: 75px;
    }
    .login-content:first-child>.login-div {
        height: 160px;
    }
    .login-content:first-child>.login-div>div {
        padding: 35px 28px;
        border: 1px solid rgba(204, 204, 204, 0.7);
        border-radius: 20px;
        font-size: 40px;
        box-shadow: #c2d4e4 2px 2px 30px 8px inset;
    }
    .login-content:first-child>.login-div>div>img {
        float: left;
        border-radius: 20px;
        height: 50px;
        width: 50px;
    }
    .login-content:first-child>.login-div>div>div {
        display: inline-block;
        color: #eee;
        overflow: hidden;
        width: 70%;
        vertical-align: top;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .login-content>img {
        height: 50px;
        padding: 20px;
    }
    .login-div>div>.el-input {
        width: 300px;
        margin: 20px 0;
    }
    .login-div>div>div.el-alert {
        width: 300px;
        margin: -10px auto;
    }
    .login-content> .el-button {
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
    .img-word>span:first-child {
        font-size: 38px;
    }
    .img-word>span:last-child {
        display: block;
        font-size: 10px;
        padding: 10px 0;
    }
</style>
