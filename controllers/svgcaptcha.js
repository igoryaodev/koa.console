const svgcaptcha = require('svg-captcha')

exports.createCaptcha = async (ctx, next) => {
  const captcha = svgcaptcha.create()
  console.log(JSON.stringify(ctx))
  ctx.request.session = captcha.text
  ctx.session.captcha = captcha.text
  ctx.body = {
    result: captcha.data,
    txt: captcha.text,
    status: 200
  }
}