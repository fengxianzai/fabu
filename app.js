var koa2 = require('koa2'); //引入koa2
const bodyParser = require('koa-bodyparser'); //引入bodyparser，用于解析post发送的请求
const cors = require('koa2-cors'); //处理跨域
const routers = require('./server/routes/index'); //引入汇总路由
// const static = require('koa-static');
// const path = require('path');
// const { historyApiFallback } = require('koa2-connect-history-api-fallback');
var app = new koa2(); //创建实例
app.use(bodyParser());

//处理跨域请求
app.use(
  cors({
    origin: function(ctx) {
      return ctx.header.origin;
    }, // 允许发来请求的域名
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 设置所允许的 HTTP请求方法
    credentials: true, // 标示该响应是合法的
  })
);

//创建一个user的路由接口，让所有走user的请求都加上前缀/auth
// router.use('/auth', auth.routes());

//进行路由加载
app.use(routers.routes());

//创建server的监听端口
app.listen(3000, function() {
  console.log('Server is created! port is listening 3000');
});
