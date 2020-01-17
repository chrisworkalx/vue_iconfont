<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: yaomingfei
 * @Date: 2019-07-09 15:42:14
 * @LastEditors  : yaomingfei
 * @LastEditTime : 2020-01-15 17:55:40
 -->
<template>
  <div id="app">
    <!-- <img src="./assets/logo.png" v-if='isShow'> -->
    <ul class="menu">
      <li v-for="(items, i) in menu" :key="i">
        <!-- <router-link :to="{name: items.name, query: {id: i}}">{{items.component}}</router-link> -->
        <router-link :to="{name: items.name}">{{items.component}}</router-link>
      </li>
    </ul>
    <router-view/>
  </div>
</template>

<script>
// import xx from '@/router';
// console.log(xx, '=====xxxx');
export default {
  name: 'App',
  data () {
    return {
      isShow: true,
      menu: [
        {
          name: 'home',
          component: '首页'
        },
        {
          name: 'move',
          component: '跳转到拖拽页面'
        },
        {
          name: 'HelloWorld',
          component: 'helloWorld'
        },
        {
          name: 'eleTable',
          component: 'eleTable(使用)'
        },
        {
          name: 'modal',
          component: '弹框显示'
        },
        {
          name: 'parentNode',
          component: 'parentNode'
        },
        {
          name: 'move1',
          component: 'move拖拽新'
        },
      ]
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
.menu {
  text-decoration: none;
  display: flex;
  list-style: none;
}
.menu li {
  box-sizing: border-box;
  width: 150px;
  height: 40px;
  line-height: 40px;
  margin: 10px;
  /* color: #00f; */
}
.menu li:hover {
  padding: 2px;
  border-radius: 4px;
  background: #f40;
  color: #fff;
}
.menu li:hover a{
  /* text-decoration: none; */
  color: #fff;
  text-decoration: dashed #fff 1px;
}
</style>
