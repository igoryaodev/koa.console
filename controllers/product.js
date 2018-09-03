const Router = require('koa-router')
const Product = require('../models/product')
// const { dateTimeFormat } = require('../utils/utils')
const moment = require('moment')
/*
*@新建商品
*/
  // let {
  //   name,
  //   nameEn,
  //   sku,
  //   id,
  //   startTime,
  //   endTime,
  //   status, // 0：下线  1：线上  2：线下
  //   tags,
  //   coverImage,
  //   titleImage,
  //   skuList,
  //   subscribe, // true: 可预约 false: 不
  //   brief, // 简介
  //   briefEn, // 简介
  //   description,
  //   descriptionEn,
  //   prompt,
  //   promptEn,
  //   linkUrl //外链
  // } = body


/*
* @商品新增
*/
exports.newProduct = async (ctx, next) => {
  let { request } = ctx
  let { body, header } = request
  let now = moment(new Date(), 'YYYY-MM-DD HH:mm:ss')
  switch (body) {
    case !body.name:
      return ctx.body = {
        result: null,
        status: 500
      }
      break;
  }
  if(body._id) delete body._id
  body.createTime = now
  let _product = await new Product(body)
  try {
    await _product.save()
    ctx.body = {
      result: 'success',
      status: 200
    }
  } catch(e) {
      ctx.body = {
        result: e,
        status: 500
      }
  }
  
}

/*
*@商品修改 updateProduct
*/
exports.updateProduct = async (ctx, next) => {
  const { request } = ctx
  let { body } = request
  if(!body || (body && !body._id)) {
    ctx.status = 500
    ctx.body = {
      status: 500,
      result: '商品信息有误'
    }
  }
  const query = {
    _id: body._id
  }
  body.updateTime = new Date()
  console.log(JSON.stringify(body))
  console.log('\n\n')
  const products = await Product.updateOne(query, body)
  console.log(JSON.stringify(products))
  console.log('\n\n')

  try {
    ctx.body = {
      result: products,
      status: 200
    }
  }catch(e) {
    // ctx.status = 500  
    // ctx.body = {
    //   result: e.CastError,
    //   status: 500
    // }
  }
}

/*
* @商品查询  列表
*/
exports.queryProducts = async (ctx, next) => {
  let products, count, totalPage, skip;
  const { request } = ctx
  let { body, body: { page, name } } = request
  page = page || 1
  skip = (page - 1) * 30
  if(!name){
    products = await Product.find().sort({createTime: -1}).skip(skip).limit(30)
  }else{
    products = await Product.find({name: name}).sort({createTime: -1}).skip(skip).limit(30)
  }
  count = await Product.count()
  totalPage = count ? Math.ceil(count/30) : 1
  try {
    ctx.body = {
      list: products,
      pageSize: 30,
      page: page,
      totalPage: totalPage,
      status: 200,
    }
  }catch(e) {
    ctx.body = {
      result: e
    }
  }
}
/*
* @商品查询  单个
*/
exports.queryProductById = async (ctx, next) => {
  const { request } = ctx
  const { url } = request
  const _id = url.split('product/')[1]
  if(!url || !_id) {
      ctx.status = 500
    return ctx.body = {
      status: 500,
      result: '_id 不能为空'
    }
  }
  const products = await Product.findById(_id)
  try {
    ctx.body = {
      result: products,
      status: 200
    }
  }catch(e) {
    // ctx.status = 500  
    // ctx.body = {
    //   result: e.CastError,
    //   status: 500
    // }
  }
}