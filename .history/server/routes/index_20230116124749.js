/**
 * 子路由汇总，整合所有自路由
 */

const router = require('koa-router')();
// 用户管理路由
const user = require('./auth');

// 运维管理路由
const ywrd = require('./ywrd');

router.use('/user', user.routes(), user.allowedMethods());
// router.use('/ywrd', ywrd.routes(), ywrd.allowedMethods());

module.exports = router;
