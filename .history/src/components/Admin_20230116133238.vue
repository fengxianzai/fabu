<template>
  <div class="common-layout">
    <el-container v-model="isCollapse">
      <!-- 左边栏aside -->
      <!-- :width="isCollapse ? '64px' : '220px'" -->
      <el-aside
        :width="isCollapse ? '64px' : '220px'"
        class="aside-con"
        style="background:#3b3a40;"
      >
        <h3>法规系统运维平台</h3>
        <el-menu
          text-color="#fff"
          active-text-color="#207bca"
          background-color="#3b3a40"
          unique-opened
          router
          class="el-menu"
          :collapse="isCollapse"
          :collapse-transition="false"
        >
          <!-- 首页 -->
          <el-menu-item index="/admin/home">
            <i class="el-icon-s-home"></i>
            <span>首页</span>
          </el-menu-item>

          <!-- 用户管理 -->
          <el-menu-item index="/admin/user">
            <i class="iconfont icon-yonghu"></i>
            <span>用户管理</span>
          </el-menu-item>

          <!-- 运维管理 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="iconfont icon-xitongyunwei"></i>
              <span>运维管理</span>
            </template>
            <el-menu-item index="/admin/YRcord"
              ><span>运维台账</span>
            </el-menu-item>
            <el-menu-item index="/admin/KnowledgeBase">
              <span>知识库</span>
            </el-menu-item>
            <el-submenu index="3-2">
              <template slot="title">
                <span>服务器</span>
              </template>
              <el-menu-item index="3-2-1">
                <span>服务器点检</span>
              </el-menu-item>
            </el-submenu>
          </el-submenu>

          <!-- 设备管理 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="iconfont icon-shebei mr-3"></i>
              <span>设备管理</span>
            </template>
            <el-menu-item index="/equipment/printer">
              <span>打印机</span>
            </el-menu-item>
            <el-menu-item index="/equipment/sanner">
              <span>扫描枪</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>

        <!-- 侧边栏收缩 -->
        <div class="toggle-btn" @click="toggleCollapse()">
          <div>
            <i class="iconfont" :class="btnicon"></i>
          </div>
        </div>
      </el-aside>
      <!-- 右边栏 -->
      <el-container style="height: 100vh;">
        <!-- 顶部栏header -->
        <el-header
          style="height:58px;background:#fafafb;text-align: right;font-size: 12px;border-bottom:1px solid #dbdcde"
        >
          <el-row type="flex" align="middle" style="height:100%">
            <el-col :span="6" :offset="19" style="height:30px">
              <el-row
                type="flex"
                align="middle"
                justify="end"
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
                  <!-- <span>您好，Vow!</span> -->
                  <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                      您好，{{ username }} !<i
                        class="el-icon-arrow-down el-icon--right"
                      ></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>
                        <el-button @click="logout" type="text"
                          >退出登录</el-button
                        >
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-header>
        <!-- 主页部分main -->
        <el-main style="padding-top:10px;background:#f1f1f2;">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Admin',
  data() {
    return {
      username: window.sessionStorage.getItem('username'),
      isCollapse: false,
      btnicon: 'icon-cebianshouqi',
    };
  },
  methods: {
    // 退出登录方法
    logout() {
      // 清除状态保持
      window.sessionStorage.clear();
      this.$router.push('/login');
    },

    //点击按钮，切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
      if (this.isCollapse) {
        this.btnicon = 'icon-cebianshouqi1';
      } else {
        this.btnicon = 'icon-cebianshouqi';
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

/* admin的用户显示 start */
.el-dropdown-link {
  cursor: pointer;
  /* color: #fff; */
}
.el-icon-arrow-down {
  font-size: 12px;
}
/* admin的用户显示 end */

/* 侧边栏收缩按钮 start */
.aside-con {
  position: relative;
}
.toggle-btn {
  width: 16px;
  height: 16px;
  position: absolute;
  right: 6px;
  bottom: 5px;
}
.toggle-btn i {
  color: #fff;
}
/* 侧边栏收缩按钮 end */
</style>
