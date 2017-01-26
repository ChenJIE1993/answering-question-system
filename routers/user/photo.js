const exp = require('express'),
      fs = require('fs'),
      upLoads = require('../../multer')
      

const router = exp.Router();

router.get('/api/user',function(req,res){
    res.render('user',{
        title:'个人资料',
        isLogin:false,
        name:'user'
    })
})



router.post('/user/photo',upLoads.single('photo'),(req,res)=>{
   
   res.status(200).json({code:'success',message:'上传成功'})
})


module.exports = router