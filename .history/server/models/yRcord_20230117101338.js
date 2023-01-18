// models/yRcord.js
const yRcordModel = require('../schema/user.js');
const Sequelize = require('sequelize');

// 查询所有事件记录
const getAllEvents = async function() {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    console.log('查询失败！ \n' + error);
  }
};

//模块导出
module.exports = {
  getAllEvents,
};
