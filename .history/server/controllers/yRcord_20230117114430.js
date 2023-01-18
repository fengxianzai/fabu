// controllers yRcord.js
const eventRcord = require('../models/yRcord.js');
const moment = require('moment');

// 获取所有事件记录
const getAllEvents = async function(ctx) {
  try {
    const allEvents = await eventRcord.getAllEvents();
    // for (var i = 0; i < allEvents.length; i++) {
    //   //   console.log(moment(events[i].request_time).format('YYYY-MM-DD HH:mm:hh'));
    //   allEvents[i].request_time = moment(allEvents[i].request_time).format(
    //     'YYYY-MM-DD HH:mm:hh'
    //   );
    //   console.log(allEvents[i].request_time);
    // }
    ctx.response.body = allEvents;
  } catch (error) {
    console.log('获取所有事件记录数据是失败！\n' + error);
  }
};

module.exports = {
  getAllEvents,
};
