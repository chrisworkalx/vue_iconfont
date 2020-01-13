<template>
  <div class='childWrapper'>
    <h1>{{msg}}</h1>
    <p>{{name}}</p>
    <ul>
      <li v-for='(item, index) in list' :key='index' @click='test($event)'>{{item}}</li>
    </ul>
    <a :href='linkMsg.href' target="_blanket">{{linkMsg.value}}</a>
  </div>
</template>
<script>
export default {
  name: 'childComponent',
  data () {
    return {
      msg: '我是子组件child'
    }
  },
  props: {
    // ['list', 'name'],
    list: {},
    name: {},
    linkMsg: {
      type: Object,
      default: function () {
        return {
          href: 'http://www.baidu.com',
          value: '百度一下'
        }
      },
      required: true
    }
  },
  mounted () {
    console.log(this.$options.props, '======props')
  },
  methods: {
    test (event) {
      console.log(event.target.innerHTML, '=====event')
    }
  }
}
</script>
