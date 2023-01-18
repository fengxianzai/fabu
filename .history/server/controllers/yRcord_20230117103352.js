// controllers yRcord.js
const eventRcord = require('../models/yRcord.js');

// 获取所有事件记录
const getAllEvents = async function(ctx) {
  try {
    const allEvents = await eventRcord.getAllEvents();
    ctx.response.body = allEvents;
  } catch (error) {
    console.log('获取所有事件记录数据是失败！\n' + error);
  }
};

module.exports = {
  getAllEvents,
};
