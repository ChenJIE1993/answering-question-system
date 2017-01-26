const exp = require('express'),
      fs = require('fs'),
      util = require('../untities');

const router = exp.Router();

router.get('/api/ask',util.sign,function(req,res){
    // 把ask.html页面返回
    res.render('ask',{
        title:'提问',
        isLogin:false,
        name:'ask'
    })
})

router.post('/ask',util.sign,(req,res)=>{
    var petname = req.cookies.petname
    console.log('fffff' + petname)
   
    function send(code,message){
        res.status(200).json({code,message})
    }


    // if(!petname){
    //     send('signin error','请重新登录')
    //     return
    // }
   var time = new Date()
    req.body.petname = petname
    req.body.ip = req.ip
    req.body.time = time

   function saveFile(){
       var fileName = `questions/${time.getTime()}.txt`
       fs.appendFile(fileName,JSON.stringify(req.body),(err)=>{
           if(err){
               send('file error','抱歉系统错误......')
           }
           else{
               send('success','问题提交成功')
           }
       })
   }

    fs.exists('questions',exists=>{
        if(exists){
            saveFile()
        }else{
            fs.mkdir('questions',err=>{
                 if(err){
                     send('file error','抱歉系统错误')
                 }
                 else{
                     saveFile()
                 }
            })
        }
    })
})
module.exports = router;