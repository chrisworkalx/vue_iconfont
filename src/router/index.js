import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import EleTable from '~page/eleTable/eleTable'
import Home from '~page/home/home'
import parentNode from '~page/parentNode'
import modal from '~page/modal'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/b',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/a',
      name: 'eleTable',
      component: EleTable
    },
    {
      path: '/p',
      name: 'parentNode',
      component: parentNode
    },
    {
      path: '/modal',
      name: 'modal',
      component: modal
    }
    // {
    //   path: '*',
    //   redirect: '/HelloWorld'
    // }
  ]
})
