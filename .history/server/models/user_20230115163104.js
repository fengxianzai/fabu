// models/user.js
const userModel = require('../schema/user.js');
const getDate = require('../utils/getDate.js');
const Sequelize = require('sequelize');
const User = userModel.User;
const Op = Sequelize.Op;

// 查询所有用户
const getAllUser = async function() {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    console.log('查询失败！ \n' + error);
  }
};

//通过用户ID进行查找
const getUserById = async function(id) {
  try {
    const users = await User.findAll({
      where: {
        id: id,
      },
    });
    // for (const u of users) {
    //   userdate = JSON.stringify(u);
    // }
    // console.log(userdate);
    return users;
  } catch (error) {
    console.log('查询失败！ \n' + error);
  }
};

//通过用户名进行模糊查找
const getUserByName = async function(name) {
  try {
    const users = await User.findAll({
      raw: true,
      where: {
        user_name: {
          [Op.like]: '%' + name + '%',
        },
      },
    });
    return users;
  } catch (error) {
    console.log('用户名查询失败！\n' + error);
  }
};

//通过用户名进行模糊查找
const getUserByNamequery = async function(name) {
  try {
    const users = await User.findAll({
      raw: true,
      where: {
        user_name: {
          [Op.like]: '%' + name + '%',
        },
      },
    });
    return users;
  } catch (error) {
    console.log('用户名查询失败！\n' + error);
  }
};

//通过用户名ID删除用户
const removeUser = async function(id) {
  try {
    await User.destroy({
      where: {
        id: id,
      },
    });
    // 删除ID，并重新添加列ID，并让ID自增
    const { DataTypes } = require('sequelize');
    const db = require('../config/db.js');
    const sequelize = db.Todolist;
    const queryInterface = sequelize.getQueryInterface();
    await queryInterface.removeColumn('users', 'id');
    await queryInterface.addColumn('users', 'id', {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
    });
  } catch (error) {
    console.log('删除失败！\n' + error);
  }
};

// 添加用户信息
const addUser = async function(userDate) {
  try {
    const users = await User.findAll();
    const idNum = users.length + 1;
    const dt = getDate.getLocalTime();
    let { username, password, mobile, email } = userDate;
    await User.create({
      id: idNum,
      user_name: username,
      password: password,
      rid: '普通用户',
      mobile: mobile,
      email: email,
      createdTime: dt,
      ms_state: 0,
    });
    console.log('添加用户成功！');
  } catch (error) {
    console.log('添加用户失败！\n' + error);
  }
};

// 编辑用户信息
const editUser = async function(newUserDate) {
  try {
    await User.update(
      {
        user_name: newUserDate.username,
        password: newUserDate.password,
        email: newUserDate.email,
        mobile: newUserDate.mobile,
        rid: newUserDate.rid,
      },
      {
        where: {
          id: newUserDate.id,
        },
      }
    );
  } catch (error) {
    console.log('编辑用户失败！\n' + error);
  }
};

// 编辑用户状态
const updateState = async function(id, ms_state) {
  try {
    console.log(id, ms_state);
    // const id = id;
    // const ms_state = ms_state;
    await User.update(
      {
        ms_state: ms_state,
      },
      {
        where: {
          id: id,
        },
      }
    );
  } catch (error) {
    console.log('编辑状态失败！\n' + error);
  }
};

//模块导出
module.exports = {
  getUserById,
  getUserByName,
  getUserByNamequery,
  getAllUser,
  removeUser,
  addUser,
  editUser,
  updateState,
};
