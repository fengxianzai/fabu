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

    <!-- 运维台账table -->
    <el-table
      :data="eventData"
      border
      highlight-current-row
      :cell-style="rowClass"
      :header-cell-style="headClass"
      :header-cell-class-name="cellClass"
      style="width: 100%;background:#fafafb"
    >
      <el-table-column fixed label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="primary" size="small"
            >编辑</el-button
          >
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column type="index" width="40"> </el-table-column>
      <el-table-column
        prop="system_name"
        label="系统名称"
        width="140"
      ></el-table-column>
      <el-table-column
        prop="request_time"
        label="接单时间"
        width="140"
      ></el-table-column>
      <el-table-column prop="finish_time" label="完成时间" width="140">
      </el-table-column>
      <el-table-column prop="request_name" label="发起人"> </el-table-column>
      <el-table-column prop="trouble_type" label="故障类型"> </el-table-column>
      <el-table-column prop="trouble_title" label="故障标题" width="180">
      </el-table-column>
      <el-table-column prop="trouble_content" label="故障现象" width="380">
      </el-table-column>
      <el-table-column prop="solve_name" label="对应人"> </el-table-column>
      <el-table-column prop="cause_analysis" label="原因分析" width="380">
      </el-table-column>
      <el-table-column prop="solve_method" label="解决方法" width="220">
      </el-table-column>
      <el-table-column prop="confirm_name" label="确认人"> </el-table-column>
      <el-table-column prop="event_state" label="事件状态"> </el-table-column>
      <el-table-column prop="use_hours" label="对应工时/h" width="100">
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
          system_name: '法规文件管理系统',
          date_range: '白班',
          request_time: '2022-12-15 08:40',
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
        {
          system_name: '法规文件管理系统',
          date_range: '白班',
          request_time: '2022-12-15 08:40',
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
        {
          system_name: '法规文件管理系统',
          date_range: '白班',
          request_time: '2022-12-15 08:40',
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
        {
          system_name: '法规文件管理系统',
          date_range: '白班',
          request_time: '2022-12-15 08:40',
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
    };
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
