/**
 * 运维台账表模型
 */

const Sequelize = require('sequelize');
const db = require('../config/db.js');
const sequelize = db.Todolist;

//定义运维台账EventRd数据模型
var EventRd = sequelize.define(
  'eventRds',
  {
    // 事件ID
    id: {
      type: Sequelize.INTEGER(11), // 字段类型
      allowNull: false,
      primaryKey: true,
      autoIncrement: true, // 是否自增
    },
    // 系统名称
    system_name: {
      type: Sequelize.CHAR(50),
      allowNull: false,
      unique: false,
    },
    // 班次
    date_range: {
      type: Sequelize.CHAR(10),
      allowNull: false,
      unique: false,
    },
    // 接单时间
    rid: {
      type: Sequelize.STRING(10),
      allowNull: true,
    },
    // 手机号
    mobile: {
      type: Sequelize.CHAR(20), // 字段类型
      allowNull: true,
    },
    // 邮箱
    email: {
      type: Sequelize.CHAR(20), // 字段类型
      allowNull: true,
    },
    // 创建时间
    createdTime: {
      type: Sequelize.CHAR(20), // 字段类型
      allowNull: true,
    },
    // 状态
    ms_state: {
      type: Sequelize.INTEGER(2), // 字段类型
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = {
  EventRd,
};
