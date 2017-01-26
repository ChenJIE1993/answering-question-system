const exp = require('express'),
      fs = require('fs'),
      util = require('../../untities');

// expess 是通过npm安装的模块 不用写../../express node.js会自动向上级查找

//创建路由
const router = exp.Router();
//在路由中添加
router.get('/api/register',function(req,res){
    res.render('register',{
        title:'注册',
        isLogin:false,
        name:'register'
    })
})

router.post('/user/register',(req,res)=>{
    req.body.ip = req.ip //获取主机的ip地址
    req.body.time = new Date()
  
    console.log('fffff')

    function send(code,message){
        res.status(200).json({code,message})
    }

    console.log(req.body)
    function saveFile(){
        // ``js中新增字符串替换方法利用${}来进行替换
        var fileName = `users/${req.body.petname}.txt`
        // var fileName ='users/' + req.body.petname + '.txt'
            fs.exists(fileName,exists=>{
                if(exists){
                   util.send(res,'register','用户名已经注册过了')
                }
                else{
                    // appendFile异步追加文件，第一个参数 添加文件名
                    //                        第二个参数 添加数据
                    //                        第三个参数 回调函数 包含一个 参数 错误信息
                    //                         如果为true 则表示文件错误  如果为false 则表示成功
                    fs.appendFile(fileName,JSON.stringify(req.body),(err)=>{
                        if(err){
                            util.send(res,'file error','抱歉 系统错误')
                        }
                        else{
                            util.send(res,'success','恭喜,注册成功')
                        }
                    })
                }
                
            })
        }

    //  测试某个路径下的文件是否存在
     fs.exists('users',exists=>{
        //  回调函数包含一个参数exists true则文件存在 否则是false
        if(exists){
            saveFile()
        }
        else{
            // mkdir创建文件夹 第一个参数文件名 第二个参数 回调函数
            fs.mkdir('users',err=>{
                if(err){
                  util.send(res,'file error','抱歉，系统错误')
                }
                else{
                  util.saveFile()
                }
            })
        }
     })

})

module.exports = router