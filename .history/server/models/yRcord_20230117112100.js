// models/yRcord.js
const moment = require('moment');
const yRcordModel = require('../schema/yRcord.js');
const Event = yRcordModel.EventRd;

// 查询所有事件记录
const getAllEvents = async function() {
  try {
    const events = await Event.findAll();
    for (var i = 0; i < events.length; i++) {
      console.log(moment(events[i].request_time).format('YYYY-MM-DD HH:mm:hh'));
    }
    return events;
  } catch (error) {
    console.log('查询失败！ \n' + error);
  }
};

//模块导出
module.exports = {
  getAllEvents,
};
