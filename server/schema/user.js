const Sequelize = require('sequelize');
const db = require('../config/db.js')
const sequelize = db.Todolist

//定义User数据模型
var User = sequelize.define('user', {
    id: {
      autoIncrement: true,
      type: Sequelize.INTEGER(11), // 字段类型
      allowNull: false,
      primaryKey: true
    },
    user_name: {
      type: Sequelize.CHAR(50),
      allowNull: false
    },
    password: {
      type: Sequelize.CHAR(128),
      allowNull: false
    }
    }, 
    {
      timestamps: false
    });


module.exports = {
	User
}