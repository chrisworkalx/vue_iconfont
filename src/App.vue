<template>
  <div id="app">
    <!-- <img src="./assets/logo.png" v-if='isShow'> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      isShow: true
    }
  },
  created () {
    // console.log(this.$route, '=====this.$route')
    // console.log(this.isShow, '=====this.isShow')
    // this.isShow = false
    if (this.$route.path === '/a') {
      this.isShow = false
    }
  },
  watch: {
    $route (to, from) {
      console.log(to, from)
      // if (to.path === '/a') {
      //   this.isShow = false
      // }
      this.checkRoutes(to.path)
    }
  },
  methods: {
    checkRoutes (path) {
      console.log(path, '====path')
      if (path === '/a') {
        this.isShow = false
      } else {
        this.isShow = true
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
