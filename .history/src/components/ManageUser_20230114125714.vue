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
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 搜索和添加用户 -->
    <el-row type="flex" justify="start">
      <el-col :span="6" style="margin-right:10px">
        <el-input
          placeholder="输入你要搜索的内容"
          v-model="queryInfo.query"
          clearable
          @clear="getUsersList()"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="getUsersList()"
          ></el-button>
        </el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" size="middle" @click="addDialogVisible = true"
          >添加用户</el-button
        >
      </el-col>
    </el-row>

    <!-- 添加用户的对话框 -->
    <el-row>
      <el-col>
        <el-dialog
          title="添加用户"
          :visible.sync="addDialogVisible"
          width="36%"
          @close="addDialogClosed"
        >
          <!-- 主体区域 -->
          <el-form
            :model="addUserForm"
            :rules="addUserFormRules"
            ref="addUserFormRef"
            label-width="70px"
          >
            <el-form-item label="用户名" prop="username">
              <!-- prop是验证规则属性 -->
              <el-input v-model="addUserForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="addUserForm.password"
                type="password"
              ></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="addUserForm.email"></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="mobile">
              <el-input v-model="addUserForm.mobile"></el-input>
            </el-form-item>
          </el-form>
          <!-- 底部区域 -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addUser()">确 定</el-button>
          </span>
        </el-dialog>
      </el-col>
    </el-row>

    <!-- 编辑用户的对话框 -->
    <el-row>
      <el-col>
        <el-dialog
          title="编辑用户"
          :visible.sync="dialogFormVisible"
          width="34%"
        >
          <el-form
            label-width="76px"
            :model="editUserForm"
            :rules="addUserFormRules"
          >
            <el-form-item label="用户名:" prop="username">
              <!-- prop是验证规则属性 -->
              <el-input v-model="editUserForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="password">
              <el-input
                v-model="editUserForm.password"
                type="password"
              ></el-input>
            </el-form-item>
            <el-form-item label="邮箱:" prop="email">
              <el-input v-model="editUserForm.email"></el-input>
            </el-form-item>
            <el-form-item label="手机:" prop="mobile">
              <el-input v-model="editUserForm.mobile"></el-input>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="用户角色:" prop="rid">
                  <el-select v-model="selectvalue" placeholder="选择角色">
                    <el-option
                      v-for="item in ridoptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="1">
                <el-form-item label="用户状态:" prop="ms_state">
                  <!-- `checked` 为 true 或 false -->
                  <el-checkbox v-model="ms_stateChecked">开启</el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="editUser()">确 定</el-button>
          </div>
        </el-dialog>
      </el-col>
    </el-row>

    <!-- 用户表主体 -->
    <el-row style="margin-top:10px;background:#fafafb">
      <el-col>
        <el-table
          ref="multipleTable"
          :data="userData"
          highlight-current-row
          :cell-style="rowClass"
          :header-cell-style="headClass"
          :header-cell-class-name="cellClass"
          border
          style="width: 100%;background:#fafafb"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="user_name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="email" label="邮箱" width="180">
          </el-table-column>
          <el-table-column prop="mobile" label="电话"> </el-table-column>
          <el-table-column prop="rid" label="角色"> </el-table-column>
          <el-table-column prop="ms_state" label="状态">
            <template slot-scope="scope">
              <!-- {{ Boolean(scope.row.mg_state) }} -->
              <el-switch
                v-model="scope.row.mg_state"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="160">
            <template slot-scope="scope">
              <el-button
                @click="dialogFormVisible = true"
                type="primary"
                size="small"
                >编辑</el-button
              >
              <el-button
                @click="removeUserById(scope.row.id)"
                type="danger"
                size="small"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col>
        <div style="margin: 20px 0 20px 10px">
          <el-button type="primary" @click="toggleSelection()">全选</el-button>
          <el-button type="danger" @click="toggleSelection()"
            >批量删除</el-button
          >
        </div>
      </el-col>
      <el-col class="pagediv" :offset="10">
        <!-- 分页区域 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[1, 2, 3, 5, 10]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'ManageUser',
  data() {
    const userData = [];
    var checkEmail = (rule, value, callback) => {
      //验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (regEmail.test(value)) {
        return callback(); //合法邮箱
      }
      return callback(new Error('请输入合法的邮箱'));
    };
    var checkMobile = (rule, value, callback) => {
      //验证手机号的正则表达式
      const regMobile = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (regMobile.test(value)) {
        return callback(); //合法手机号
      }
      return callback(new Error('请输入合法的手机号'));
    };
    return {
      userData,
      //获取用户列表的参数对象
      queryInfo: {
        query: '',
        pagenum: 1, //当前的页数
        pagesize: 5, //每页的数量
      },
      total: 0,
      addDialogVisible: false,
      dialogFormVisible: false,
      //添加用户的表单数据
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: '',
      },
      //编辑用户的表单数据
      editUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: '',
        rid: '',
        ms_state: '',
      },
      // 用户角色选项
      ridoptions: [
        {
          value: '选项1',
          label: '超级管理员',
        },
        {
          value: '选项2',
          label: '普通用户',
        },
      ],
      // 用户角色选择值
      selectvalue: '',
      // 用户状态选项
      ms_stateChecked: false,
      //添加表单的验证规则对象
      addUserFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 2,
            max: 10,
            message: '用户名长度在3~10个字符',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 2, max: 15, message: '密码长度在6~15个字符', trigger: 'blur' },
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' },
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' },
        ],
      },
    };
  },
  // 请求用户数据
  created() {
    this.getUsersList();
  },
  methods: {
    // 用户全选
    toggleSelection() {
      if (this.userData) {
        this.userData.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 禁用表格头部多选按钮
    cellClass(row) {
      if (row.columnIndex === 0) {
        return 'disabledCheck';
      }
    },
    // 表头样式设置
    headClass() {
      return 'text-align: center;background:#4d4c50;color:#fff';
    },
    // 表格样式设置
    rowClass() {
      return 'text-align: center;background:#fafafb;';
    },
    //监听添加用户对话框的关闭状态
    addDialogClosed() {
      this.$refs.addUserFormRef.resetFields();
    },
    // 点击按钮，添加新用户
    addUser() {
      this.$refs.addUserFormRef.validate(async (valid) => {
        if (!valid) return; //校验没通过，返回
        // 发起添加用户的网络请求
        await this.$axios
          .post('/user/addUser', this.addUserForm)
          .then((res) => {
            //axios返回的数据都在res.data里
            if (res.data.success) {
              //如果成功
              this.$message({
                type: 'success',
                message: '添加成功！',
              });
              // 隐藏添加用户的对话框
              this.addDialogVisible = false;
              //重新获取用户列表数据
              this.getUsersList();
            } else {
              this.$message.error(res.data.info);
            }
          });
      });
    },
    // 点击按钮，编辑用户信息
    editUser() {},
    // 获取用户列表
    async getUsersList() {
      await this.$axios
        .get('/user/getUser/vow', {
          params: this.queryInfo,
        })
        .then((res) => {
          //请求成功以后的回调函数
          this.userData = res.data.users;
          this.total = res.data.totalpage;
        })
        .catch((error) => {
          //回调函数
          //请求失败或者then里面的代码出现bug的时候
          console.log('http请求失败');
          console.log(error); //期望从服务端返回错误信息
        });
    },
    // 根据ID删除对应用户信息
    removeUserById(id) {
      // 弹框询问用户是否删除用户
      this.$confirm('此操作将永久删除用户，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancleButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$axios.delete('/user/userMange/' + id).then((res) => {
            if (res.data.success) {
              this.$message({ type: 'success', message: '删除成功！' });
              this.getUsersList();
            } else {
              this.$message.error(res.data.info); //删除失败，显示提示语
            }
          });
        })
        .catch(() => {
          this.$message({ type: 'info', message: '已取消删除！' });
        });
    },
    //监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      console.log(newSize);
      this.queryInfo.pagesize = newSize; //重新指定每页数据量
      this.getUsersList(); //带着新的分页请求获取数据
    },
    //监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage);
      this.queryInfo.pagenum = newPage; //重新指定当前页
      this.getUsersList(); //带着新的分页请求获取数据
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 关闭表头全选按钮 */
.el-table /deep/.disabledCheck > .cell .el-checkbox__inner {
  display: none !important;
  position: relative;
}
.el-table /deep/.disabledCheck > .cell::before {
  display: block;
  content: '';
  position: absolute;
  text-align: center;
  width: 100%;
}

/* 分页 start */
.pagediv {
  margin: 0px 0px 20px 0px;
  text-align: center;
}
el-pagination {
  width: 200px;
}
/* 分页 end */

/* 编辑用户框 start */
/* 编辑用户框 end */
</style>
