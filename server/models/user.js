// models/user.js
const userModel = require('../schema/user.js');
const User = userModel.User;

// 查询所有用户
// const getAllUser = async function() {
//   try {
//     return {};
//   } catch (error) {}
// };

//通过用户ID进行查找
const getUserById = async function(id) {
  try {
    const users = await User.findAll({
      where: {
        id: id,
      },
    });
    for (const u of users) {
      userdate = JSON.stringify(u);
    }
    console.log(userdate);
    return userdate;
  } catch (error) {
    console.log('查询失败！ \n' + error);
  }
};

//通过用户ID方法测试
// getUserById(1)

//通过用户名进行查找
const getUserByName = async function(name) {
  try {
    const users = await User.findAll({
      raw: true,
      where: {
        user_name: name,
      },
    });
    return users;
  } catch (error) {
    console.log('用户名查询失败！\n' + error);
  }
};

//通过用户名方法测试
// getUserByName('qiu')

//模块导出
module.exports = {
  getUserById,
  getUserByName,
  getAllUser,
};
