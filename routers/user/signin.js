const exp = require('express'),
      fs = require('fs'),
      util = require('../../untities');

const router = exp.Router();

router.get('/api/signin',function(req,res){
    // 渲染views文件夹下的singin.html 文件 然后返回给客户端
    res.render('signin',{
        title:'登录',
        isLogin:true,
        name:'signin'
    })
})

router.post('/user/signin',(req,res)=>{
    var fileName = `users/${req.body.petname}.txt`
    function send(code,message){
        res.status(200).json({code,message})
    }

    fs.exists(fileName,exists=>{
        if(exists){
            // readFile读取文件 两个参数第一个为文件的路径
            // 第二个参数为回调函数 包含两个参数 第一个为error 第二个为读取的数据
            fs.readFile(fileName,(err,data)=>{
                 if(err){
                     send('file error','抱歉系统错误')
                 }
                 else{
                     var user = JSON.parse(data)
                     if(user.password[0] == req.body.password){
                         res.cookie('petname',req.body.petname)
                        //  使用cookie记录用户名的值
                          send('success','登录成功')
                     }
                     else{
                         send('signin error','密码错误')
                     }
                 }
            })
        }
        else{
            send('register','用户名未注册')
        }
    })
})
module.exports = router