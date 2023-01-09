// controllers/user.js
const user = require('../models/user.js');
const jwt = require('../utils/jwt.js');

//获取用户信息
const getUserInfo = async function(ctx) {
  //获取url里传过来的参数的id
  const id = ctx.query.id;
  //通过模型中定义的方法通过id在数据库中查找
  const result = await user.getUserById(id);
  //将查询到的结果放在response的body中
  ctx.response.body = JSON.parse(result);
};

// 获取所有用户信息
const getAllUsers = async function(ctx) {
  const vow_val = await user.getAllUser();
  ctx.response.body = vow_val;
};

//通过post请求过来的登录数据进行验证
const postUserAuth = async function(ctx) {
  //获取post过来的登录数据
  const postData = ctx.request.body;
  console.log(postData);
  //通过模型中定义的方法按照post过来的用户名进行查找
  const userInfo = await user.getUserByName(postData.username);

  //登录验证
  if (userInfo != '') {
    for (const u of userInfo) {
      const userdate = JSON.stringify(u);
      if (JSON.parse(userdate) != null) {
        if (JSON.parse(userdate).password != postData.password) {
          return (ctx.response.body = {
            success: false,
            info: '密码错误！',
          });
        } else {
          let jwtToken = jwt.sign({ username: userInfo.username });
          console.log(jwtToken);
          return (ctx.response.body = {
            success: true,
            info: '密码正确！',
            token: jwtToken,
          });
        }
      }
    }
  } else {
    return (ctx.response.body = {
      success: false,
      info: '用户不存在！',
    });
  }
};

// 根据用户ID删除用户信息
const removeUserById = async function(ctx) {
  //将查询到的结果放在response的body中
  // ctx.response.body =
  try {
    //获取url里传过来的参数的id
    const id = ctx.request.params.id;
    //通过模型中定义的方法通过id进行删除
    await user.removeUser(id);
    return (ctx.response.body = {
      success: true,
      info: '用户删除成功！',
    });
  } catch (error) {
    return (ctx.response.body = {
      success: false,
      info: '删除失败！',
    });
  }
};

module.exports = {
  getUserInfo,
  postUserAuth,
  getAllUsers,
  removeUserById,
};
