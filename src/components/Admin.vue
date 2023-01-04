<template>
  <div class="common-layout">
    <el-container>
      <!-- 左边栏aside -->
      <el-aside width="230px" style="background:#3b3a40;">
        <h3>法规系统运维平台</h3>
        <el-menu
          text-color="#fff"
          active-text-color="#207bca"
          background-color="#3b3a40"
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
        <el-header
          style="height:58px;background:#fafafb;text-align: right;font-size: 12px;border-bottom:1px solid #dbdcde"
        >
          <el-row type="flex" align="middle" style="height:100%">
            <el-col :span="6">
              <el-input
                placeholder="输入你要搜索的内容"
                suffix-icon="el-icon-search"
              />
            </el-col>
            <el-col :span="4" :offset="14" style="height:30px">
              <el-row
                type="flex"
                align="middle"
                justify="right"
                style="height:100%"
              >
                <el-col>
                  <el-image
                    style="width: 30px; height: 30px;margin-right:10px;border-radius:15px"
                    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                    fit="cover"
                  ></el-image>
                </el-col>
                <el-col style="text-align:left">
                  <span>您好，Vow!</span>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-header>
        <!-- 主页部分main -->
        <el-main style="background:#f1f1f2">
          <el-breadcrumb
            separator-class="el-icon-arrow-right"
            style="margin:20px 0 26px 0;border-bottom: 1px solid #dbdcde;padding-bottom: 8px;"
          >
            <el-breadcrumb-item :to="{ path: '/admin/home' }"
              >运维管理</el-breadcrumb-item
            >
            <el-breadcrumb-item><a href="/">运维台账</a></el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Admin',
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
