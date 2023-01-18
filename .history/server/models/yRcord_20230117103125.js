// models/yRcord.js
const yRcordModel = require('../schema/yRcord.js');
const Event = yRcordModel.EventRd;

// 查询所有事件记录
const getAllEvents = async function() {
  try {
    const events = await Event.findAll();
    return events;
  } catch (error) {
    console.log('查询失败！ \n' + error);
  }
};

//模块导出
module.exports = {
  getAllEvents,
};
