<template>
  <el-container class="home">
    <el-header class="home_header">
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <img src="@/assets/logo.png" alt="黑马程序员">
          </div>
          </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <h1>电商后台管理系统</h1>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <p>
              <span>欢迎前端28期最强王者</span>
              <a @click.prevent="widthdraw" href="javascript:;">退出</a>
            </p>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container class="home_container">
      <el-aside width="200px" class="home_aside">
        <el-menu
          default-active=""
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :unique-opened="true"
          :router="true">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/user">
              <i class="el-icon-menu"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="2-1">
              <i class="el-icon-menu"></i>
              <span slot="title">角色列表</span>
            </el-menu-item>
            <el-menu-item index="2-2">
              <i class="el-icon-menu"></i>
              <span slot="title">权限列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="3-1">
              <i class="el-icon-menu"></i>
              <span slot="title">商品列表</span>
            </el-menu-item>
            <el-menu-item index="3-2">
              <i class="el-icon-menu"></i>
              <span slot="title">分类参数</span>
            </el-menu-item>
            <el-menu-item index="3-3">
              <i class="el-icon-menu"></i>
              <span slot="title">商品分类</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="4-1">
              <i class="el-icon-menu"></i>
              <span slot="title">订单列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="5-1">
              <i class="el-icon-menu"></i>
              <span slot="title">数据报表</span>
            </el-menu-item>
          </el-submenu>
          
        </el-menu>
      </el-aside>
      <el-main class="home_main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods:{
    widthdraw(){
      this.$confirm('您确定退出登录吗?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!'
        });
        this.$router.push('/login');
        localStorage.removeItem('token');
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        });          
      });
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    }
  }
}
</script>

<style>
  .home {
    height:100%;
  }
  .home_header {
    background-color: #B3C1CD;
    padding-left:0
  }
  .home_header h1 {
    color:#fff;
    line-height:60px;
    font-size: 30px;
    text-align:center;
  }
  .home_header p {
    font-size: 18px;
    font-weight:700;
    line-height:60px;
    text-align:right;
  }
  .home_header p a {
    text-decoration:none;
    color:#daa520;
  }
  .home_container {
    background-color: #EAEEF1;
  }
  .home_aside {
    background-color: #545C64;
  }

  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  
</style>
