const mongodb = require('mongodb')
const mongoose = require('mongoose')
const db = 'mongodb://localhost:27017/console'
mongoose.Promise = require('bluebird')
mongoose.connect(db)

const Koa = require('koa')
const logger = require('koa-logger')
// const morgan = require('morgan'); // 命令行log显示
const bodyparser = require('koa-bodyparser')
const onerror = require('koa-onerror')
const views = require('koa-views')
const json = require('koa-json')
const session = require('koa-session')
// const passport = require('passport');// 用户认证模块passport
const Strategy = require('passport-http-bearer').Strategy;// token验证模块

const ejs = require('ejs')
const app = new Koa()

onerror(app)
app.keys = ['WEBSITE']
const CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};
app.use(session(CONFIG, app));
// app.use(passport.initialize());// 初始化passport模块
app.use(bodyparser())
app.use(json())
app.use(logger())
// app.use(morgan('dev'));// 命令行中显示程序运行日志,便于bug调试
// app.use(session(app))
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/dist', {
  map : {html:'ejs'}
}))



const routers = require('./router/routes')()
app.use(routers.routes())
   .use(routers.allowedMethods())

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

app.listen(8080, () => {
  console.log('------------------------------------------')
  console.log('app listen on port 8080-------------------')
  console.log('------------------------------------------')
})
