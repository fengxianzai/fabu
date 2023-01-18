/**
 * 运维管理页面子路由
 */

// routes/ywrd.js
const events = require('../controllers/yRcord.js');
const router = require('koa-router')();
const routes = router.get('/events', events.getAllEvents); //根据ID获取用户

module.exports = routes;
