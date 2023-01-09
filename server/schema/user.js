const Sequelize = require('sequelize');
const db = require('../config/db.js');
const sequelize = db.Todolist;

//定义User数据模型
var User = sequelize.define(
  'user',
  {
    // 用户ID
    id: {
      autoIncrement: true,
      type: Sequelize.INTEGER(11), // 字段类型
      allowNull: false,
      primaryKey: true,
    },
    // // 用户角色ID
    // rid: {
    //   type: Sequelize.INTEGER(2),
    //   allowNull: false,
    // },
    // 用户名
    user_name: {
      type: Sequelize.CHAR(50),
      allowNull: false,
    },
    // 密码
    password: {
      type: Sequelize.CHAR(128),
      allowNull: false,
    },
    // // 手机号
    // mobile: {
    //   type: Sequelize.INTEGER(11), // 字段类型
    //   allowNull: false,
    // },
    // // 邮箱
    // email: {
    //   type: Sequelize.INTEGER(20), // 字段类型
    //   allowNull: false,
    // },
    // // 令牌
    // token: {
    //   type: Sequelize.STRING(100), // 字段类型
    //   allowNull: false,
    // },
  },
  {
    timestamps: false,
  }
);

module.exports = {
  User,
};
