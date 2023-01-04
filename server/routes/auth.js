/**
 * 登录页面子路由
 */

// routes/auth.js
const user = require('../controllers/user.js');
const router = require('koa-router')();
const routes = router
  .get('/login/:id', user.getUserInfo)
  .get('/getUser/vow', user.getAllUsers)
  .post('/login', user.postUserAuth);

module.exports = routes;
