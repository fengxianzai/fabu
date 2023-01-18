// models/yRcord.js
const yRcordModel = require('../schema/yRcord.js');

// 查询所有事件记录
const getAllEvents = async function() {
  try {
    const events = await yRcordModel.findAll();
    return events;
  } catch (error) {
    console.log('查询失败！ \n' + error);
  }
};

//模块导出
module.exports = {
  getAllEvents,
};
