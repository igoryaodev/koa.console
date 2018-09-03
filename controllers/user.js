const Router = require('koa-router')
const User = require('../models/user')

/*
* @获取用户列表
*/
exports.userInfo = async (ctx, next) => {
  let users = await User.find()
  let totalPage = await User.count()
  ctx.body = {
    result: {
      users: users,
      totalPage: totalPage,
    },
    success: true
  }
}

/*
* @用户注册
*/
exports.signup = async (ctx, next) => {
  let req = ctx.request.body
  let { phoneNumber, name, age } = req
  if(!name) {
    ctx.body = {
      result: null,
      success: false,
      msg: '用户名不能为空',
      status: 200
    }
  }else {
    let users = await new User(req)
    try {
      users.save((err, res) => {
        if(err) console.error('error: ' + err + '\n')
        console.log('success: ' + res + '\n')
      })
      ctx.body = {
        result: users,
        success: true
      }
    } catch (e) {
      ctx.body = {
        result: e,
        success: true,
        status: 500
      }
    }
  }
}

/*
* @修改用户信息
*/
exports.updateUserInfo = async (ctx, next) => {
  let req = ctx.request.body
  let { phoneNumber, name, age } = req
  if(!name) {
    ctx.body = {
      result: null,
      success: false,
      msg: '用户名不能为空',
      status: 200
    }
  }else {
    let result = await new User.find({phoneNumber:phoneNumber})
    if(!result || result.length < 1){

    }
    // let users = await new User(req)
    // users.set((err, res) => {
    //   if(err) console.error('error: ' + err + '\n')
    //   console.log('success: ' + res + '\n')
    // })
    ctx.body = {
      result: users,
      success: true
    }
  }
}