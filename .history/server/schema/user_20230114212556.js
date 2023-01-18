const Sequelize = require('sequelize');
const db = require('../config/db.js');
const sequelize = db.Todolist;

//定义User数据模型
var User = sequelize.define(
  'user',
  {
    // 用户ID
    id: {
      // autoIncrement: true,
      type: Sequelize.INTEGER(11), // 字段类型
      allowNull: false,
      primaryKey: true,
      autoIncrement: true, // 是否自增
    },
    // 用户名
    user_name: {
      type: Sequelize.CHAR(50),
      allowNull: false,
      unique: false,
    },
    // 密码
    password: {
      type: Sequelize.CHAR(128),
      allowNull: false,
      unique: false,
    },
    // 用户角色
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
  User,
};
