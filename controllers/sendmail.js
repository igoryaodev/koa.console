const nodemailer = require('nodemailer')
// var smtpTransport = require('nodemailer-smtp-transport')

const account = {
  host: 'smtp.qq.com',
  user: 'system@qinbridge.com',
  pass: 'Bridge2018'
}
smtpTransport = nodemailer.createTransport({
  // host: 'smtp.sina.com',
  host: 'smtpdm.aliyun.com',
  port:465,
  secureConnection: true,
  auth: {
    user: 'noreply@email.qinbridge.cn',
    pass: '201807NOrp'
  }
})

exports.sendmail = async (ctx, next) => {
    smtpTransport.sendMail({
      from: '"noreply" <noreply@email.qinbridge.cn>',
      to: '"VART" <1468215780@qq.com>, "igor" <system@qinbridge.com>',
      subject: 'test email',
      text: 'email',
      html: '<b>Hello </b>'
    }, (err, res) => {
      if(err) 
        console.log(err)
      else
      console.log('发送成功: ' + JSON.stringify(res))
    })
}
// exports.sendmail = async (ctx, next) => {
//   const account = {
//     user: 'system@qinbridge.com',
//     pass: 'Bridge2018'
//   }
//   const transporter = nodemailer.createTransport({
//     // service: '120.79.129.23:8080'
//     // host: '120.79.129.23',
//     // port: '8080',
//     service: 'qinbridge',
//     secure: false,
//     auth: {
//       user: account.user,
//       pass: account.pass
//     }
//   })

//   const mailOptions = {
//     from: account.user,
//     to: '1136499305@qq.com',
//     subject: 'test email',
//     text: 'email',
//     html: '<b>Hello </b>'
//   }

//   transporter.sendMail(mailOptions, (error, info) => {
//     if(error) {
//       console.log('error: ' + error)
//     }else{
//       console.log('Message sent: ' + info.response)
//     }
//   })
// }

