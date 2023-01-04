<template>
  <div class="container">
    <el-row type="flex" justify="end">
      <el-col :span="2">
        <el-button type="primary" size="small">添加用户</el-button>
      </el-col>
    </el-row>
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
          <el-table-column prop="id" label="用户ID" width="180">
          </el-table-column>
          <el-table-column prop="user_name" label="用户名" width="180">
          </el-table-column>
          <el-table-column prop="password" label="加入时间"> </el-table-column>
          <el-table-column prop="password" label="权限"> </el-table-column>
          <el-table-column fixed="right" label="操作" width="160">
            <template slot-scope="scope">
              <el-button type="primary" size="small">编辑</el-button>
              <el-button type="primary" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col>
        <div style="margin: 20px 0 20px 10px">
          <el-button type="primary" @click="toggleSelection()">全选</el-button>
          <el-button type="primary" @click="toggleSelection()"
            >批量删除</el-button
          >
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'ManageUser',
  data() {
    const userData = [];
    return {
      userData,
    };
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
  },
  // 请求用户数据
  mounted() {
    this.$axios
      .get('/user/getUser/vow')
      .then((res) => {
        //请求成功以后的回调函数
        this.userData = res.data;
      })
      .catch((error) => {
        //回调函数
        //请求失败或者then里面的代码出现bug的时候
        console.log('http请求失败');
        console.log(error); //期望从服务端返回错误信息
      });
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
</style>
