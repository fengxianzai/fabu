<template>
  <div class="content">
    <el-card shadow="never" class="FormCard">
      <!-- 登录标题 -->
      <el-row>
        <el-col :span="24"><p class="title">法规系统运维平台</p></el-col>
      </el-row>
      <!-- 登录表单 -->
      <el-form
        ref="loginForm"
        label-position="top"
        :rules="rules"
        :model="formLogin"
        size="default"
      >
        <!-- 登录用户名 -->
        <el-form-item prop="username">
          <el-input
            type="text"
            v-model="formLogin.username"
            placeholder="用户名"
            clearable
          >
            <i slot="prepend" class="el-icon-user-solid"></i>
          </el-input>
        </el-form-item>

        <!-- 登录密码 -->
        <el-form-item prop="password">
          <el-input
            @keyup.enter.native="handleBindPhone"
            type="password"
            v-model="formLogin.password"
            placeholder="密码"
            show-password
            clearable
          >
            <i slot="prepend" class="el-icon-s-data"></i>
          </el-input>
        </el-form-item>

        <!-- 记住密码 -->
        <el-checkbox v-model="checked" class="remeberPwd">记住密码</el-checkbox>

        <!-- 登录按钮 -->
        <el-button
          size="medium"
          @click="handleBindPhone"
          type="primary"
          :loading="logining"
          class="button-login"
          >登录</el-button
        >
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      timeInterval: null,
      logining: false,

      // 表单校验
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
          },
        ],
      },
      // 表单
      formLogin: {
        username: '',
        password: '',
      },
      // 记住密码checked
      checked: false,
    };
  },
  methods: {
    handleBindPhone() {
      this.$refs.loginForm.validate(async (valid) => {
        if (!valid) return; //false 不执行登录
        await this.$axios
          .post('/user/login', this.formLogin) //将登录信息发送给后端
          .then((res) => {
            //axios返回的数据都在res.data里
            if (res.data.success) {
              //如果成功
              this.$message({
                type: 'success',
                message: '登录成功！',
              });
              // 将后端返回的token和username存储在本地LocalStorage中
              window.sessionStorage.setItem('jwtToken', res.data.token);
              window.sessionStorage.setItem('username', res.data.username);
              this.$router.push('/admin/home'); //进入Wlog页面，登录成功
              // this.$router.push({ path: 'admin' }); //进入Wlog页面，登录成功
            } else {
              this.$message.error(res.data.info); //登录失败，显示提示语
            }
          });
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
  width: 100%;
  height: 100%;
  background: url('../assets/login-bg.png');
}
p {
  text-align: center;
}
.el-col {
  padding-bottom: 20px;
}
.title {
  font-size: 22px;
  /* color: #707070;
  letter-spacing: 2px; */
  font-weight: 700;
  letter-spacing: 4px;
  color: #409eff;
}
.FormCard {
  width: 400px;
  height: 290px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 6px;
  background: #f2f6fc;
  width: 400px;
  /*padding: 25px 25px 30px 25px;*/
}
.remeberPwd {
  width: 80px;
  height: 20px;
  margin-bottom: 10px;
  float: right;
}
.button-login {
  display: block;
  width: 100%;
}
</style>
