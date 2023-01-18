// models/yRcord.js

const yRcordModel = require('../schema/yRcord.js');
const Event = yRcordModel.EventRd;
const moment = require('moment');

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
  let {
    system_name,
    date_range,
    request_time,
    finish_time,
    request_name,
    trouble_type,
    trouble_title,
    trouble_content,
    solve_name,
    cause_analysis,
    solve_method,
    confirm_name,
    event_state,
    use_hours,
  } = eventDate;
  await Event.create({
    id: idNum,
    system_name: system_name,
    date_range: date_range,
    request_time: moment(request_time).format('YYYY-MM-DD HH:mm:hh'),
    finish_time: moment(finish_time).format('YYYY-MM-DD HH:mm:hh'),
    request_name: request_name,
    trouble_type: trouble_type,
    trouble_title: trouble_title,
    trouble_content: trouble_content,
    solve_name: solve_name,
    cause_analysis: cause_analysis,
    solve_method: solve_method,
    confirm_name: confirm_name,
    event_state: event_state,
    use_hours: use_hours,
  });
};

// 根据ID删除事件
const removeEventByID = async function(ctx) {
  try {
    //获取url里传过来的参数的id
    const eventID = ctx.request.params.id;
    //通过模型中定义的方法通过id进行删除
    await Event.removeEventByID(eventID);
    return (ctx.response.body = {
      success: true,
      info: '用户删除成功！',
    });
  } catch (error) {
    return (ctx.response.body = {
      success: false,
      info: '删除失败！',
    });
  }
};

//模块导出
module.exports = {
  getAllEvents,
  addEvent,
  removeEventByID,
};
