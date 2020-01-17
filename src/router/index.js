/*
 * @Description: 
 * @Version: 2.0
 * @Autor: yaomingfei
 * @Date: 2019-07-12 12:58:58
 * @LastEditors  : yaomingfei
 * @LastEditTime : 2020-01-15 17:49:01
 */
import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import EleTable from '~page/eleTable/eleTable';
import Home from '~page/home/home';
import parentNode from '~page/parentNode';
import modal from '~page/modal';
import move from '~page/move';
import move1 from '~page/move1';

Vue.use(Router)

export default new Router({
  mode: 'history',
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
    },
    {
      path: '/move',
      name: 'move',
      component: move
    },
    {
      path: '/move1',
      name: 'move1',
      component: move1
    }
    // {
    //   path: '*',
    //   redirect: '/HelloWorld'
    // }
  ]
})
