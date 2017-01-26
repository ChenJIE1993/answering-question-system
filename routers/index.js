const exp = require('express'),
      fs = require('fs'),
      util = require('../untities')

//创建路由
var router = exp.Router();

router.get('/',function(req,res){
    // function send(code,message,data){
    //     res.status(200).json({code,message,data})
    // }

    function readFile(i,files,questions,complete){
        if(i < files.length){
          
            fs.readFile(`questions/${files[i]}`,(err,data)=>{
                if(!err){
                    questions.push(JSON.parse(data))
                }
                readFile(++i,files,questions,complete)
                
                // i++ 先比较在 自增      ++i 先自增 在比较
            })
        }
        else{
            complete()
        }
    }
//     path - 文件路径。
//    callback - 回调函数，回调函数带有两个参数err, files，
//     err 为错误信息，files 为 目录下的文件数组列表
    fs.readdir('questions',(err,files)=>{
      
        if(err){
            // send('file err','抱歉系统错误')
        }
        else{
            files = files.reverse()
            var questions = []
            readFile(0,files,questions,function(){
                console.log(questions)
                // send('success','读取数据成功',questions)
                res.render('index',{
                    code:'success',
                    message:'读取数据成功',
                    datas:questions,
                    title:'问答系统',
                    user:req.cookies.petname
                })

            })
        }
    }) 
})
module.exports = router;