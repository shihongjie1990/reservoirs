<template>
    <div class="headers">
        <!-- logo -->
        <div class="header-logo">
            <img src="static/images/waterlogo.png" alt="用户头像">
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
                <img src="static/images/profile_small.jpg" alt="user">
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="logout">注销登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        handleCommand(value) {
            if (value === 'logout') {
                // this.$router.push('/login')
                location.href = location.origin + '/api/logout'
                window.localStorage.clear()
            }
        }
    }
}
</script>
