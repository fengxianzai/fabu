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

// 添加事件记录
const addEvent = async function(eventDate) {
  console.log(eventDate);
  const events = await Event.findAll();
  const idNum = events.length + 1;
};

//模块导出
module.exports = {
  getAllEvents,
  addEvent,
};
