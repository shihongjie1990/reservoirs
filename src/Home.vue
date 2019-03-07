<template>
    <div class="department-overview">
        <nav id="_header">
            <!-- 顶部导航 -->
            <v-header ref='header'></v-header>
        </nav>
        <!-- 主要内容Main -->
        <div id="_main">
            <department-overview ref='overview' />
        </div>
        <!-- <div id="_rightBar">

        </div> -->
        <!-- 页面底部 -->
        <!-- <v-footer id="_footer"></v-footer> -->
    </div>
</template>

<script>
import header from './HeaderP'
import overview from './components/engineerDepartment/overview'

export default {
  components: {
    'v-header': header,
    'department-overview': overview
  }
}
</script>
