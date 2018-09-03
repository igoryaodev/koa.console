const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

let TenantSchema = new mongoose.Schema({
  logo: String,//机构logo
  name: {
    type: String,
    unique: true
  },//机构名
  address: String,//机构地址
  email: {
    type: String,
    unique: true
  },//联系邮箱
  contact: String, //联系人
  phoneNumber: String, //联系人手机号
  juridicalPerson: String,//法人姓名
  businessLicense: String,//营业执照 三证合一或多张
  bankOfDeposit: String,//开户行  //开通商城必须填写,验证
  corporateAccount: String,//对公账户
  brief: String,//机构简介
  description: String,//机构描述 图文

  token: {
    type: String
  },

  account: {
    type: String,
    unique: true
  },//账户
  password: {
    type: String
  }//密码
})

module.exports = mongoose.model('Tenant', TenantSchema)