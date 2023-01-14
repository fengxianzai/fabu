// controllers/user.js
const user = require('../models/user.js');
const jwt = require('../utils/jwt.js');

//通过id获取用户信息
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
  try {
    const vow_val = await user.getAllUser();
    // 处理用户状态
    // for (var n = 0; n < vow_val.length; n++) {
    //   if (vow_val[n].dataValues.ms_state) {
    //     vow_val[n].dataValues.ms_state = false;
    //   } else {
    //     vow_val[n].dataValues.ms_state = true;
    //   }
    // }
    const totalpage = vow_val.length; //用户总记录数
    const pagesize = parseInt(ctx.query.pagesize); //每页显示条数
    const pagenum = parseInt(ctx.query.pagenum) - 1; //总页数
    var newArr1 = [];
    for (var i = 0; i < vow_val.length; i += pagesize) {
      newArr1.push(vow_val.slice(i, i + pagesize));
      // if (vow_val[i].dataValues.ms_state) {
      //   vow_val[i].dataValues.ms_state = false;
      // } else {
      //   vow_val[i].dataValues.ms_state = true;
      // }
    }
    console.log(newArr1);
    const vow_data = {
      totalpage: totalpage,
      users: newArr1[pagenum],
    };
    ctx.response.body = vow_data;

    const queryName = ctx.query.query; //用户搜索的信息用户名
    if (queryName) {
      const result = await user.getUserByName(queryName);
      const vow_data = {
        totalpage: totalpage,
        users: result,
      };
      ctx.response.body = vow_data;
    }
  } catch (error) {
    console.log('获取所有用户数据失败！\n' + error);
  }
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
            username: JSON.parse(userdate).user_name,
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

// 添加用户信息
const addUser = async function(ctx) {
  try {
    const userDate = ctx.request.body;
    await user.addUser(userDate);
    // console.log(userDate);
    return (ctx.response.body = {
      success: true,
      info: '添加用户成功！',
    });
  } catch (error) {
    return (ctx.response.body = {
      success: false,
      info: '添加用户失败！',
    });
  }
};

// 编辑用户信息
const editUser = async function(ctx) {
  try {
    const newuserDate = ctx.request.body;
    await user.editUser(newuserDate);
    return (ctx.response.body = {
      success: true,
      info: '成功修改用户' + newuserDate.username + '信息！',
    });
  } catch (error) {
    return (ctx.response.body = {
      success: false,
      info: '编辑用户失败！',
    });
  }
};

module.exports = {
  getUserInfo,
  postUserAuth,
  getAllUsers,
  removeUserById,
  addUser,
  editUser,
};
