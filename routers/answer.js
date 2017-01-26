const exp = require('express'),
      fs = require('fs'),
      util = require('../untities');

const router = exp.Router();

router.get('/api/answer/:question',util.sign,function(req,res){
    res.render('answer',{
        title:'回答',
        isLogin:false,
        name:'answer',
        question:req.params.question
    })
})

router.post('/answer',util.sign,(req,res)=>{
    var petname = req.cookies.petname
     
     function send(code,message){
         res.status(200).json({code,message})
     }
     // if(!petname){
     //    send('signin error','请重新登录')
     //    return
     // }
     var filename = `questions/${req.body.question}.txt`
     console.log('fff' + req.body.question)
     console.log(filename)
     console.log(req.body.question)

      req.body.petname = petname
      req.body.ip = req.ip
      req.body.time = new Date()
      fs.readFile(filename,(err,data)=>{
          if(err){
              send('file error','抱歉系统错误')
          }
          else{
              var question = JSON.parse(data)
               if(!question.answers) question.answers  = []
               question.answers.push(req.body)
                //  writeFile写入文件 1 路径  2 数据 3回调函数
                fs.writeFile(filename,JSON.stringify(question),(err)=>{
                   if(err){
                       send('file error','抱歉.........写入错误')
                   }
                   else{
                       send('success','提交成功')
                   }
               })
               
          }
      })

})
module.exports = router