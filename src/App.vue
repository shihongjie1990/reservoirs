<template>
  <div id="app">
    <router-view />
    <transition name="el-fade-in-linear">
      <a class="view-full-pic"
         @click="closeImgShow"
         v-if="$store.state.SHOW_IMG.flag">
        <img :src="$store.state.SHOW_IMG.url"
             alt="">
      </a>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  methods: {
    closeImgShow() {
      this.$store.dispatch('setShowImg', { flag: false, url: '' })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Microsoft YaHei', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flow-root;
}
</style>
