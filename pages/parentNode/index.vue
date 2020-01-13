<template>
    <div class="wrapper">
        <h1>我是父组件</h1>
        <h2>{{name}}</h2>
        <childA @click="readTxt" @receive="getMsg">
                <ul slot='listA' class="ulTest">
                    <li>A</li>
                    <li>B</li>
                </ul>
                <h1 slot='ptxt' class="ptxt">我是slot文本h1标签</h1>
        </childA>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <childA @click.native="readTxt"/>
    </div>
</template>
<script>
//原生事件绑定.native是触发父类的绑定事件进行监听，类比于子组件通过事件发送触发父级事件的响应
import childA from '~page/childA'
export default {
    name: 'parentNode',
    data() {
        return {
            name: ''
        }
    },
    methods: {
        readTxt () {
            console.log('这么监听可以吗')
            return 'listener'
        },
        getMsg (res) {
            this.name = res
        }
    },
    components: {
        childA
    }
}
</script>
<style scoped>
 .wrapper >>> .txt {
     color: red;
 }
.ptxt {
    color: blue;
}
.ulTest {
    list-style: none;
}
.ulTest li {
    color: green;
}
</style>


