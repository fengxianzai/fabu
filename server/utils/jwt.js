// server > utils > jwt.js
const jwt = require('jsonwebtoken');
const jwtKey = 'codevow';

// sign用于生成token，666作为加密的私钥可以自行定义
function sign(option) {
  return jwt.sign(option, jwtKey, {
    expiresIn: 60, // 当前设定过期时间在60秒之后
  });
}

module.exports = {
  sign,
};
