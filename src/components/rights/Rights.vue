<template>
  <div class="box">
    <!-- 面包屑导航 -->
  <el-breadcrumb class="breadcrumbs" separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>权限列表</el-breadcrumb-item>
  </el-breadcrumb>
  <el-table
    :data="rightsData"
    stripe
    style="width: 100%">
    <el-table-column
      type="index"
      :index="indexMethod"
      width="50">
    </el-table-column>
    <el-table-column
      prop="authName"
      label="权限名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="path"
      label="路径"
      width="180">
    </el-table-column>
    <el-table-column
      prop="level"
      label="层级">
      <template slot-scope="scope">
        <span v-if="scope.row.level==0">一级</span>
        <span v-if="scope.row.level==1">二级</span>
        <span v-if="scope.row.level==2">三级</span>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rightsData: []
    }
  },
  methods: {
    async render () {
      const res = await this.$http.get(`rights/list`)
      this.rightsData = res.data.data
      // console.log(this.rightsData)
    },
    indexMethod (index) {
      return index
    }
  },
  created () {
    this.render()
  }
}
</script>

<style scoped>
  .breadcrumbs {
  height:50px;
  line-height:50px;
  font-size: 16px;
  padding-left:10px;
  background-color: #d4dae0;
}
</style>
