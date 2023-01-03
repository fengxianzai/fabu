const Sequelize = require('sequelize'); // 引入sequelize

//使用sequelize连接数据库
var config = {
  database: 'todolist', // 使用哪个数据库
  username: 'root', // 用户名
  password: '123456', // 口令
  host: 'localhost', // 主机名
  port: 3306, // 端口号，MySQL默认3306
};

var Todolist = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 30000,
    },
  }
);

//数据库连接测试
async function testConnect() {
  try {
    await Todolist.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
testConnect();

module.exports = {
  Todolist, // 将Todolist暴露出接口方便Model调用
};
