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
          :default-active="$route.path.slice(1)"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :unique-opened="true"
          :router="true">
          <el-submenu
             v-for="item in menu"
            index="item.id"
            :key="item.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item.authName }}</span>
            </template>
              <el-menu-item
                :index="item2.path"
                v-for="item2 in item.children"
                :key="item2.id">
                <i class="el-icon-menu"></i>
                <span slot="title">{{ item2.authName }}</span>
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
  data () {
    return {
      // 左侧菜单栏数据
      menu: []
    }
  },
  methods: {
    widthdraw () {
      this.$confirm('您确定退出登录吗?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
        this.$router.push('/login')
        localStorage.removeItem('token')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    },
    handleOpen (key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath);
    },
    // 动态获取左侧菜单栏
    async getMenus () {
      const res = await this.$http.get('/menus')
      console.log('menus', res)
      this.menu = res.data.data
    }
  },
  created () {
    this.getMenus()
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
