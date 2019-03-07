<template>
    <div></div>
</template>

<script>
export default {
    methods: {
        login(username, token) {
            let thisRequest = this.$http.post(`/api/simpleLogin?username=${username}&loginType=simpleLogin`, '', {
                headers: {
                    Authorization: token
                }
            })
            return thisRequest
        },
        releaseParam(str, base64) {
            let paramStr = Object.keys(str)[0]
            let urlParam = base64.decode(paramStr)
            let urlParamStr = urlParam.substring(urlParam.indexOf('{') + 1, urlParam.lastIndexOf('}'))
            let paramArr = urlParamStr.split(',')
            let param = {}
            if (paramArr.length > 0) {
                paramArr.map(item => {
                    let keyValue = item.trim().split('=')
                    if (keyValue.length === 2) {
                        if (keyValue[1].indexOf('[') === 0 && keyValue[1].lastIndexOf(']') === keyValue[1].length - 1) {
                            let value = keyValue[1].substr(1, keyValue[1].length - 2)
                            if (value) {
                                let valueArr = value.split(',')
                                param[keyValue[0]] = valueArr
                            }
                        } else {
                            param[keyValue[0]] = keyValue[1].replace(/'|"/g, '')
                        }
                    }
                })
            }
            return param
        },
        skipTo(roles, Base64) {
            if (roles.indexOf('ROLE_PLP') > -1) {
                let menuNode = this.$store.state.guestMenu.default
                this.$store.dispatch('setMenuList', menuNode)
                window.localStorage.MENU_NODE = Base64.encode(JSON.stringify(menuNode))
                this.getMyBaseInfo(Base64)
            } else {
                let menuNode = []
                if (roles.indexOf('ROLE_CITY') > -1 || roles.indexOf('ROLE_COUNTY') > -1) {
                    menuNode = this.$store.state.citymanagerMenu.default
                } else {
                    menuNode = this.$store.state.managerMenu.default
                }
                this.$store.dispatch('setMenuList', menuNode)
                window.localStorage.MENU_NODE = Base64.encode(JSON.stringify(menuNode))
                this.$router.push({path: '/home'})
            }
        },
        getMyBaseInfo(Base64) {
            this.$http.get('/api/baseinfo/mybaseinfo').then(res => {
                if (res.code === 1002) {
                    let reservoir = res.data
                    this.$store.dispatch('setReservoir', reservoir)
                    window.localStorage.RESERVOIR = Base64.encode(JSON.stringify(reservoir))
                    this.$router.push({path: '/overview'})
                }
            })
        }
    },
    mounted() {
        let Base64 = require('js-base64').Base64
        let user64 = window.localStorage.USER
        let str = this.$route.query
        let paramUser = {}
        if (str && Object.keys(str).length > 0) {
            paramUser = this.releaseParam(str, Base64)
        }
        let user = {}
        if (user64 || Object.keys(paramUser).length > 0) {
            if (Object.keys(paramUser).length > 0) {
                user = paramUser
            } else {
                let userString = Base64.decode(user64)
                user = JSON.parse(userString)
            }
        }
        // 测试代码
        window.localStorage.USER = Base64.encode(JSON.stringify(user))

        this.login(user.username || '', user.token || '').then(res => {
            if (res.code === 1002) {
                this.skipTo(user.roles, Base64)
                window.localStorage.USER = Base64.encode(JSON.stringify(user))
            }
        })
    }
}
</script>
