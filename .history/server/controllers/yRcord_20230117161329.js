// controllers yRcord.js
const eventRcord = require('../models/yRcord.js');

// 获取所有事件记录
const getAllEvents = async function(ctx) {
  try {
    const allEvents = await eventRcord.getAllEvents();
    const totalpage = allEvents.length; //用户总记录数
    const pagesize = parseInt(ctx.query.pagesize); //每页显示条数
    const pagenum = parseInt(ctx.query.pagenum) - 1; //总页数
    var newArr1 = [];
    for (var i = 0; i < allEvents.length; i += pagesize) {
      newArr1.push(allEvents.slice(i, i + pagesize));
    }

    const allEvents_data = {
      totalpage: totalpage,
      events: newArr1[pagenum],
    };
    ctx.response.body = allEvents_data;
  } catch (error) {
    console.log('获取所有事件记录数据是失败！\n' + error);
  }
};

// 添加事件记录
const addEvent = async function(ctx) {
  try {
    const eventDate = ctx.request.body;
    await eventRcord.addEvent(eventDate);
    ctx.response.body = {
      success: true,
      info: '添加事件成功！',
    };
  } catch (error) {
    ctx.response.body = {
      success: false,
      info: '添加事件失败！',
    };
    console.log('添加事件失败！\n' + error);
  }
};

// 根据ID删除事件
const removeEventByID = async function(ctx) {
  try {
    //获取url里传过来的参数的id
    const eventID = ctx.request.params.id;
    //通过模型中定义的方法通过id进行删除
    await eventRcord.removeEventByID(eventID);
    return (ctx.response.body = {
      success: true,
      info: '事件删除成功！',
    });
  } catch (error) {
    return (ctx.response.body = {
      success: false,
      info: '事件删除失败！',
    });
  }
};
// 根据ID修改事件
const updateEventByID = async function(ctx) {
  try {
    //获取url里传过来的参数的id
    const updateDate = ctx.request.body;
    //通过模型中定义的方法通过id进行删除
    await eventRcord.updateEventByID(updateDate);
    return (ctx.response.body = {
      success: true,
      info: '事件修改成功！',
    });
  } catch (error) {
    return (ctx.response.body = {
      success: false,
      info: '事件修改失败！',
    });
  }
};

module.exports = {
  getAllEvents,
  addEvent,
  removeEventByID,
  updateEventByID,
};
