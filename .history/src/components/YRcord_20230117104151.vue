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

    <!-- 搜索和添加事件 -->
    <el-row type="flex" justify="start">
      <el-col :span="6" style="margin-right:10px">
        <el-input placeholder="输入你要搜索的内容" clearable>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="2" style="margin-right:20px">
        <el-button type="primary" size="middle" @click="addDialogVisible = true"
          >添加事件</el-button
        >
      </el-col>
      <el-col :span="2">
        <el-button type="primary" size="middle">导入事件</el-button>
      </el-col>
    </el-row>

    <!-- 运维台账table -->
    <el-row>
      <el-col>
        <el-table
          :data="eventData"
          border
          highlight-current-row
          :cell-style="rowClass"
          :header-cell-style="headClass"
          :header-cell-class-name="cellClass"
          style="width: 100%;margin-top:10px;background:#fafafb"
        >
          <el-table-column fixed label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                >编辑</el-button
              >
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
          <el-table-column type="index" width="80" label="序号">
          </el-table-column>
          <el-table-column
            prop="system_name"
            label="系统名称"
            width="140"
            column-key="date"
            :filters="[
              { text: '法规文件管理系统', value: '法规文件管理系统' },
              { text: 'IR运维系统', value: 'IR运维系统' },
            ]"
            :filter-method="filterHandler"
          >
          </el-table-column>
          <el-table-column
            prop="request_time"
            label="接单时间"
            sortable
            width="140"
          ></el-table-column>
          <el-table-column
            prop="finish_time"
            label="完成时间"
            sortable
            width="140"
          >
          </el-table-column>
          <el-table-column
            prop="request_name"
            label="发起人"
            column-key="date"
            :filters="[
              { text: '黄凯', value: '黄凯' },
              { text: '高东晓', value: '高东晓' },
              { text: '李阳', value: '李阳' },
            ]"
            :filter-method="filterHandler"
          >
          </el-table-column>
          <el-table-column prop="trouble_type" label="故障类型">
          </el-table-column>
          <el-table-column prop="trouble_title" label="故障标题" width="180">
          </el-table-column>
          <el-table-column prop="trouble_content" label="故障现象" width="380">
          </el-table-column>
          <el-table-column prop="solve_name" label="对应人"> </el-table-column>
          <el-table-column prop="cause_analysis" label="原因分析" width="380">
          </el-table-column>
          <el-table-column prop="solve_method" label="解决方法" width="220">
          </el-table-column>
          <el-table-column prop="confirm_name" label="确认人">
          </el-table-column>
          <el-table-column prop="event_state" label="事件状态">
          </el-table-column>
          <el-table-column prop="use_hours" label="对应工时/h" width="100">
          </el-table-column>
        </el-table>
      </el-col>

      <!-- 分页区域 -->
      <el-col class="pagediv" :offset="10">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[3, 5, 10]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-col>
    </el-row>
    <!-- 添加事件的对话框 -->
    <el-row>
      <el-col>
        <el-dialog
          title="添加事件"
          :visible.sync="addDialogVisible"
          width="50%"
          @close="addDialogClosed"
        >
          <!-- 主体区域 -->
          <el-form
            :model="addEventForm"
            ref="addUserFormRef"
            label-width="70px"
          >
            <el-row>
              <el-col :span="10">
                <el-form-item
                  label="系统名称: "
                  prop="system_name"
                  label-width="100px"
                >
                  <el-input v-model="addEventForm.system_name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" :offset="2">
                <div class="block">
                  <span class="demonstration">接单时间: </span>
                  <el-date-picker
                    v-model="addEventForm.request_time"
                    type="datetime"
                    placeholder="选择日期时间"
                  >
                  </el-date-picker>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="9" style="margin-left:27px">
                <el-form-item label="发起人:" prop="rid">
                  <el-select
                    v-model="addEventForm.request_name"
                    placeholder="选择发起人"
                  >
                    <el-option
                      v-for="item in request_names"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-left:52px">
                <div class="block">
                  <span class="demonstration">完成时间: </span>
                  <el-date-picker
                    v-model="addEventForm.finish_time"
                    type="datetime"
                    placeholder="选择日期时间"
                  >
                  </el-date-picker>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item
                  label="故障类型: "
                  prop="trouble_type"
                  label-width="100px"
                >
                  <el-input v-model="addEventForm.trouble_type"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-left:18px">
                <el-form-item
                  label="故障标题: "
                  prop="trouble_title"
                  label-width="100px"
                >
                  <el-input v-model="addEventForm.trouble_title"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item
                  label="故障现象: "
                  prop="trouble_content"
                  label-width="100px"
                >
                  <el-input
                    type="textarea"
                    autosize
                    placeholder="请输入内容"
                    v-model="addEventForm.trouble_content"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item
                  label="原因分析: "
                  prop="cause_analysis"
                  label-width="100px"
                >
                  <el-input
                    type="textarea"
                    autosize
                    placeholder="请输入内容"
                    v-model="addEventForm.cause_analysis"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item
                  label="解决方法: "
                  prop="solve_method"
                  label-width="100px"
                >
                  <el-input
                    type="textarea"
                    autosize
                    placeholder="请输入内容"
                    v-model="addEventForm.solve_method"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" style="margin-left:27px">
                <el-form-item label="对应人:" prop="solve_name">
                  <el-select
                    v-model="addEventForm.solve_name"
                    placeholder="选择对应人"
                  >
                    <el-option
                      v-for="item in solve_name"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-left:27px">
                <el-form-item label="确认人:" prop="request_names">
                  <el-select
                    v-model="addEventForm.request_name"
                    placeholder="选择确认人"
                  >
                    <el-option
                      v-for="item in request_names"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" style="margin-left:27px">
                <el-form-item
                  label="事件状态:"
                  prop="event_state"
                  label-width="50"
                >
                  <el-select
                    v-model="addEventForm.event_state"
                    placeholder="选择状态"
                  >
                    <el-option
                      v-for="item in event_state"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="对应工时: "
                  prop="use_hours"
                  label-width="100px"
                >
                  <el-input v-model="addEventForm.use_hours"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <!-- 底部区域 -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button type="primary">确 定</el-button>
          </span>
        </el-dialog>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      eventData: [
        {
          system_name: '法规文件管理系统',
          date_range: '白班',
          request_time: '2022-11-15 08:40',
          finish_time: '2022-12-15 09:40',
          request_name: '黄凯',
          trouble_type: '数据上传',
          trouble_title: '环保清单数据上传异常',
          trouble_content: '国家远程服务器连接失败，环保清单数据上传异常',
          solve_name: '陈亮',
          cause_analysis: '国家远程服务器连接失败，环保清单数据上传异常',
          solve_method: '运维组手动进行上传',
          confirm_name: '黄凯',
          event_state: '已完成',
          use_hours: '1',
        },
      ],
      //获取事件单列表的参数对象
      queryInfo: {
        query: '',
        pagenum: 1, //当前的页数
        pagesize: 5, //每页的数量
      },
      total: 10,
      addDialogVisible: false,
      //添加事件的表单数据
      addEventForm: {
        system_name: '',
        date_range: '',
        request_time: '',
        finish_time: '',
        request_name: '',
        trouble_type: '',
        trouble_title: '',
        trouble_content: '',
        solve_name: '',
        cause_analysis: '',
        solve_method: '',
        confirm_name: '',
        event_state: '',
        use_hours: '',
      },
      // 用户发起人
      request_names: [
        {
          value: '黄凯',
          label: '黄凯',
        },
        {
          value: '高东晓',
          label: '高东晓',
        },
        {
          value: '李阳',
          label: '李阳',
        },
      ],
      // 对应人
      solve_name: [
        {
          value: '陈亮',
          label: '陈亮',
        },
        {
          value: '陈亮/王境成',
          label: '陈亮/王境成',
        },
      ],
      // 事件状态
      event_state: [
        {
          value: 'close',
          label: 'close',
        },
        {
          value: 'open',
          label: 'open',
        },
        {
          value: '进行中',
          label: '进行中',
        },
      ],
    };
  },
  // 请求事件数据
  created() {
    this.getEventsList();
  },
  methods: {
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
    // 每个事件单的信息
    handleClick(rawDate) {
      console.log(rawDate);
    },
    //监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize; //重新指定每页数据量
      this.getUsersList(); //带着新的分页请求获取数据
    },
    //监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage; //重新指定当前页
      this.getUsersList(); //带着新的分页请求获取数据
    },
    // 删选系统名
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    //监听添加用户对话框的关闭状态
    addDialogClosed() {
      this.$refs.addUserFormRef.resetFields();
    },
    // 请求获取事件列表
    async getEventsList() {
      await this.$axios
        .get('/ywrd/events')
        .then((res) => {
          //请求成功以后的回调函数
          this.eventData = res.data;
          console.log(this.eventData);
        })
        .catch((error) => {
          //回调函数
          //请求失败或者then里面的代码出现bug的时候
          console.log('http请求失败');
          console.log(error); //期望从服务端返回错误信息
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 分页 start */
.pagediv {
  margin: 40px 0px 40px 0px;
  text-align: center;
}
el-pagination {
  width: 200px;
}
/* 分页 end */

.demonstration {
  margin-right: 4px;
}
</style>
