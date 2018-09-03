const mongoose = require('mongoose')

let ProductSchema = new mongoose.Schema({
  name: String,
  nameEn: String,
  sku: String,
  id: String,
  startTime: String,
  endTime: String,
  status: String, // 0：下线  1：线上  2：线下
  tags: String,
  coverImage: String,
  titleImage: String,
  skuList:String,
  book: Boolean, // true: 可预约 false: 不
  isDelete: Boolean, // false 逻辑删除
  brief: String, // 简介
  briefEn: String, // 简介
  description: String,
  descriptionEn: String,
  prompt: String, //温馨提示
  promptEn: String, //
  linkUrl: String, //外链
  createTime: String, 
  updateTime: String
})

module.exports = mongoose.model('Product', ProductSchema)
