<template>
  <div class="container">
    <el-row type="flex" justify="end">
      <el-col :span="2" style="margin-right:4px">
        <el-button type="primary" size="small">删除用户</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" size="small">添加用户</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top:10px">
      <el-col>
        <el-table
          ref="multipleTable"
          :data="tableData"
          highlight-current-row
          @selection-change="handleSelectionChange""
          border
          style="width: 100%;"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="date" label="日期" width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column>
          <el-table-column fixed="right" label="操作" width="160">
            <template slot-scope="scope">
              <el-button type="primary" size="small">编辑</el-button>
              <el-button type="primary" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col>
        <div style="margin-top: 20px">
          <el-button @click="toggleSelection([tableData[1], tableData[2]])">全选</el-button>
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
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        },
      ],
    };
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
