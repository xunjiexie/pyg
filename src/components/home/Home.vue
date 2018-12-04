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
            <a href="javascript:;">退出</a>
          </p>
        </div>
      </el-col>
    </el-row>
  </el-header>
  <el-container class="home_container">
    <el-aside width="200px" class="home_aside">Aside</el-aside>
    <el-main class="home_main">Main</el-main>
  </el-container>
</el-container>
</template>

<script>
export default {

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
  .home_header img {
    /* width:200px;
    height:60px; */
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
</style>
