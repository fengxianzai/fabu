/**
 * 用户管理页面子路由
 */

// routes/auth.js
const user = require('../controllers/user.js');
const router = require('koa-router')();
const routes = router
  .get('/login/:id', user.getUserInfo) //根据ID获取用户
  .get('/getUser/vow', user.getAllUsers) //获取所有用户信息
  .post('/login', user.postUserAuth) //用户登录发送
  .del('/userMange/:id', user.removeUserById) //根据用户ID删除用户
  .post('/addUser', user.addUser) //添加用户信息
  .post('/editUser', user.editUser) //编辑用户信息
  // .post('/changState', user.updateState); //更新用户状态
  .put('/changState/:id/state/:ms_state', user.updateState);

module.exports = routes;
