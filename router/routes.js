const Router = require('koa-router')
const User = require('../controllers/user')
const Tenant = require('../controllers/tenant')
const Sendmail = require('../controllers/sendmail')
const Captcha = require('../controllers/svgcaptcha')
const Product = require('../controllers/product')

module.exports = () => {
  let router = new Router({
    prefix: '/api'
  })
  router.get('/', async (ctx, next) => {
    // ctx.render('title', 'BRIDGE')
     await ctx.render('index', {
      title: 'bridege'
    })
    // ctx.body = 'home page'
  })

  /*
  *@用户
  */
  router.get('/user', User.userInfo)
  //新增
  router.post('/user/signup', User.signup)
  //修改
  router.put('/user/update', User.updateUserInfo)
  //发送邮件
  router.get('/sendmail', Sendmail.sendmail)
  
  router.get('/captcha', Captcha.createCaptcha)


  /*
  *@ product
  */
  router.post('/product', Product.newProduct)
  router.get('/product/:id', Product.queryProductById)
  router.post('/product/put', Product.updateProduct)
  router.get('/products/list', Product.queryProducts)

  /*
  *@机构注册
  */
  router.post('/tenant/signup', Tenant.tenantSignup)
  router.get('/tenants/list', Tenant.tenants)


  return router
}
