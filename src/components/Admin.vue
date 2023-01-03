<template>
  <div class="common-layout">
    <el-container>
      <!-- 左边栏aside -->
      <el-aside width="230px" style="background:#092844;">
        <h3>法规系统运维平台</h3>
        <el-menu
          text-color="#fff"
          active-text-color="#207bca"
          background-color="#092844"
          unique-opened
          router
          class="el-menu"
        >
          <!-- 首页 -->
          <el-menu-item index="/admin/home"
            ><i class="el-icon-s-home"></i>首页</el-menu-item
          >

          <!-- 用户管理 -->
          <el-menu-item index="/admin/user">
            <i class="iconfont icon-yonghu"></i>
            用户管理</el-menu-item
          >

          <!-- 运维管理 -->
          <el-submenu index="3">
            <template slot="title"
              ><i class="iconfont icon-xitongyunwei"></i>运维管理</template
            >
            <el-menu-item index="/admin/KnowledgeBase">知识库</el-menu-item>
            <el-menu-item index="/admin/YRcord">运维台账</el-menu-item>
            <el-submenu index="3-2">
              <template slot="title">服务器</template>
              <el-menu-item index="3-2-1">服务器点检</el-menu-item>
            </el-submenu>
          </el-submenu>

          <!-- 设备管理 -->
          <el-submenu index="2">
            <template slot="title"
              ><i class="iconfont icon-shebei mr-3"></i>设备管理</template
            >
            <el-menu-item index="/equipment/printer">打印机</el-menu-item>
            <el-menu-item index="/equipment/sanner">扫描枪</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右边栏 -->
      <el-container>
        <!-- 顶部栏header -->
        <el-header style="background:#ecf5ff;text-align: right;font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>您好，Vow!</span>
        </el-header>
        <!-- 主页部分main -->
        <el-main>
          <!-- <el-table :data="tableData">
            <el-table-column prop="date" label="日期" width="140">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column>
          </el-table> -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
    };
    return {
      msg: '系统主界面',
      tableData: Array(5).fill(item),
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-aside {
  height: 100vh;
}
h3 {
  padding: 20px 0 20px 20px;
  letter-spacing: 4px;
  color: #79bbff;
}
i {
  margin-right: 5px;
}
el-menu-item {
  color: #fff;
}
.el-menu {
  border: none;
}
.el-submenu {
  border-bottom: 1px solid #3f4857;
}
.el-menu-item {
  border-bottom: 1px solid #3f4857;
  background-color: #207bca;
}

.el-menu .el-menu-item:hover {
  outline: 0 !important;
  color: #fff !important;
  background: #2e95fb !important;
}
.el-menu .el-menu-item.is-active {
  color: #fff !important;
  background: #207bca !important;
}
/* .el-submenu .el-submenu__title:hover {
  color: #2e95fb !important;
  background: linear-gradient(270deg, #f2f7fc 0%, #fefefe 100%) !important;
} */
</style>
