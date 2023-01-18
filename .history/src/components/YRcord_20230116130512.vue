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
      <el-table-column type="index"> </el-table-column>
      <el-table-column prop="date" label="日期"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      eventData: [
        {
          date: '2016-05-02',
          system_name: '法规文件管理系统',
          date_range: '白班',
          request_time: '2022-12-15 08:40:00',
          finish_time: '2022-12-15 09:40:00',
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
