
<template>
<el-container style=" border: 1px solid #eee">
  <el-aside width="20%" style="background-color: rgb(47,63,86);height: 1000px;">
    <h1 align="center" style="color:white">宠物商城-后台管理</h1>
    <el-menu :default-openeds="['1', '3']" :router='true'>
      <el-submenu index="1" >
        <template slot="title"><i class="el-icon-setting"></i><h style="color:white;white-space:pre;">
          系统管理</h></template>
        <el-menu-item-group>
          <el-menu-item index="/people" align="center" style="color:white">会员管理</el-menu-item>
          <el-menu-item index="/video" align="center" style="color:white">视频管理</el-menu-item>
          <el-menu-item index="/shop" align="center" style="color:white">商店管理</el-menu-item>
         <!-- <el-menu-item index="/animal" align="center" style="color:white">宠物管理</el-menu-item>
          <el-menu-item index="/stuff" align="center" style="color:white">周边管理</el-menu-item>-->
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">   
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <span>{{$store.state.me}}</span>
    </el-header>
    <el-main>
        <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
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
 
  .el-submenu{
    background-color: rgb(47,63,86)
  }
  .el-menu-item-group{
    background-color: rgb(47,63,86)
  }
  .el-menu-item.is-active {
  background: rgb(31,44,60) !important;
  }
  .el-menu-item:hover {
  background: rgb(31,44,60) !important;
  }
  
</style>

<script>
  export default {
  };
</script>