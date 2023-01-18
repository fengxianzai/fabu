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

    <!-- 运维台账table -->
    <el-table :data="eventData" border>
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址" width="180">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      eventData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
      ],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
