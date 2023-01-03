/**
 * 子路由汇总，整合所有自路由
 */

const router = require('koa-router')();
const user = require('./auth');

router.use('/user', user.routes(), user.allowedMethods());

module.exports = router;
