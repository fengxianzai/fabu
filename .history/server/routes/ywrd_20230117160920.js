/**
 * 运维管理页面子路由
 */

// routes/ywrd.js
const events = require('../controllers/yRcord.js');
const router = require('koa-router')();
const routes = router
  .get('/events', events.getAllEvents) //获取所有事件列表
  .post('/addEvent', events.addEvent) //添加事件
  .delete('/removeEvent/:id', events.removeEventByID) //根据ID删除事件
  .put('/updateEvent', events.updateEventByID); //根据ID删除事件

module.exports = routes;
