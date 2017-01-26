const express = require('express'),
      bodyParse = require('body-parser'),//解析body
      cookieParse = require('cookie-parser'),//解析cookie
    //   multer 是一个node.js中间件 用来处理http提交Multipart/form-data,也就是文件上传
      multer = require('multer'),
      fs = require('fs'),
      // template = require('art-template'),
      util = require('./untities'),
      template = require('./template'),
      app = express()

app.engine('.html',template.__express)
app.set('view engine','html')

app.use(express.static('www'))
app.use(cookieParse())
app.use(bodyParse.urlencoded({extended:false}))

app.use(require('./routers/user/register'))
app.use(require('./routers/user/signin'))
app.use(require('./routers/user/photo'))
app.use(require('./routers/index'))
app.use(require('./routers/ask'))
app.use(require('./routers/answer'))
app.use(require('./routers/user/signinout'))




app.listen(3000,()=>{
    console.log('服务器运行了')
})



