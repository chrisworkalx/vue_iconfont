<template>
    <div class="home">
      <p>
        <button @click="changeTab('a')">显示1</button>
        <button @click="changeTab('b')">显示2</button>
      </p>
      <span>{{tabOk}}</span>
        <!-- <router-link to="/a">跳转到upload页面</router-link>
        <router-view></router-view> -->
        <el-container style="height: 100%; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1', '3']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>导航一</template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项4-1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>导航二</template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="2-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项4-1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>导航三</template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="3-1">选项1</el-menu-item>
          <el-menu-item index="3-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="3-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="3-4">
          <template slot="title">选项4</template>
          <el-menu-item index="3-4-1">选项4-1</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>王小虎</span>
    </el-header>
    
    <el-main>
      <el-table :data="tableData">
        <el-table-column prop="date" label="日期" width="140" v-if="isShow">
        </el-table-column>
       <div :class="'{tabOk ? listA : listB}'" v-if="isShow">
          <el-table-column prop="date" label="日期" width="140">
        </el-table-column>
       </div>
        <el-table-column prop="name" label="姓名" width="120" v-if="!isShow">
        </el-table-column>
        <div v-if="!isShow">
          <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        </div>
        <!-- <div> -->
          <el-table-column prop="address" label="地址">
        </el-table-column>
        <!-- </div> -->
      </el-table>
    </el-main>
  </el-container>
</el-container>
    </div>
</template>
<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

<script>
  export default {
    name: 'home',
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item),
        isShow: false
      }
    },
    methods: {
      changeTab(data) {
        console.log(data)
        if(data == 'a') {
          this.isShow = true
        }
        if(data == 'b') {
          this.isShow = false
        }
      }
    },
    computed: {
      tabOk() {
        return this.isShow ? true : false
      }
    },
    beforeUpdate() {
      console.log(this.isShow, '====this.isShow')
    },
    watch: {
      isShow: {
        handler(newV, oldV) {
          console.log(newV, oldV)
        },
        deep: true
      }
    }
  };
</script>
<style>

.listA {
  display: none;
  border-right: solid 2px #f40;
}
.listB{
  display: block;
}
</style>
