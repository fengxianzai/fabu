<template>
  <div class="container">
    <!-- 面包屑导航栏 -->
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="margin:20px 0 26px 0;border-bottom: 1px solid #dbdcde;padding-bottom: 8px;"
    >
      <el-breadcrumb-item :to="{ path: '/admin/home' }"
        >主页</el-breadcrumb-item
      >
      <el-breadcrumb-item>运维管理</el-breadcrumb-item>
      <el-breadcrumb-item>运维台账</el-breadcrumb-item>
    </el-breadcrumb>
    <h1>运维台账</h1>
  </div>
</template>

<script>
export default {};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
