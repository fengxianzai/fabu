<template>
  <div class="content">
    <el-card shadow="never" class="FormCard">
      <el-row>
        <el-col :span="24"><p class="title">CodeVow系统</p></el-col>
      </el-row>
      <el-form
        ref="loginForm"
        label-position="top"
        :rules="rules"
        :model="formLogin"
        size="default"
      >
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
        <el-checkbox v-model="checked" class="remeberPwd">记住密码</el-checkbox>

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
      this.$refs.loginForm.validate(() => {
        this.$axios
          .post('/user/login', this.formLogin) //将登录信息发送给后端
          .then((res) => {
            //axios返回的数据都在res.data里
            if (res.data.success) {
              //如果成功
              this.$message({
                type: 'success',
                message: '登录成功！',
              });
              this.$router.push('/admin'); //进入Wlog页面，登录成功
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
  color: #707070;
  letter-spacing: 2px;
  font-weight: 700;
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
