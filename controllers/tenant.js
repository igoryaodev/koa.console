const Router = require('koa-router')
const base64 = require('js-base64')
const passport = require('passport');
const Tenant = require('../models/tenant')
require('../passport')(passport);

const trim = (value) => {
  if(value && value instanceof Object){
    for (var item of Object.keys(value)){
      value[item] = value[item].replace(/\s/g,'')
    }
  }
  return value
}

/*
* @获取机构列表
*/
exports.tenants = async (ctx, next) => {
  let tenants = await Tenant.find()
  let totalPage = await Tenant.count()
  ctx.body = {
    result: {
      list: tenants,
      totalPage: totalPage,
    },
    success: true
  }
}

/*
* @机构注册账户
*/
exports.tenantSignup = async (ctx, next) => {
  let req = ctx.request.body
  let data = { phoneNumber, name, email, account, password } = req
  if(!account || !password) {
    ctx.body = {
      result: null,
      success: false,
      msg: '请输入您的账号密码',
      status: 10001
    }
  }else {
    let tenant = await new Tenant(trim(data))
    try {
      tenant.save((err, res) => {
        if(err) console.error('error: ' + err + '\n')
        console.log('success: ' + res + '\n')
      })
      ctx.body = {
        result: '成功创建新用户',
        success: true
      }
    } catch (e) {
      ctx.body = {
        result: '注册失败',
        success: false,
        status: 500
      }
    }
  }
}

/*
* @修改机构信息
*/
exports.updateTenatInfo = async (ctx, next) => {
  let req = ctx.request.body
  let { phoneNumber, name, email, account, password } = req
  if(!name) {
    ctx.body = {
      result: null,
      success: false,
      msg: '用户名不能为空',
      status: 200
    }
  }else {
    let result = await new Tenant.find({phoneNumber:phoneNumber})
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


/*
* @修改机构登录密码
*/
/*
* @找回机构登录密码
*/


/*
* @完善机构信息
*/

/*
* @机构登录
*/

exports.tenantLogin = async (ctx, next) => {
  let req = ctx.request.body
  let data = { account, password } = req
  if(!account || !password) {
    ctx.body = {
      result: null,
      success: false,
      msg: '请输入您的账号密码',
      status: 10001
    }
  }else {
    let tenant = await new Tenant.findOne({ account: account })
    try {
     const pass = await tenant.comparePassword()
      ctx.body = {
        result: tenant,
        success: true
      }
    } catch (e) {
      ctx.body = {
        result: '用户不存在',
        success: false,
        status: 500
      }
    }
  }
}



