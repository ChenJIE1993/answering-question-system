const exp = require('express');
     

//创建路由
const router = exp.Router();

router.get('/user/signout',(req,res)=>{
    // 删除cookie
    res.clearCookie('petname')
    // 重定向,改变浏览器位置
    res.redirect('/')
    // res.status(200).json({code:'success'})
})
module.exports = router;