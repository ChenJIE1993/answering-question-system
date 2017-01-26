function send(res,code,message,data){
        res.status(200).json({code,message,data})
}
function sign(req,res,next){
    if(req.cookies.petname){
        //如果有密码 执行下一步
        next()
    }
    else{
        if(req.xhr){
            // req.xhr 是通过请求头中的x-requested判断是否是
            // Ajax请求 Ajax请求默认带有这个请求头
            send(res,'signin error','请重新登陆')
        }
        else{
            // 在服务端控制浏览器页面的跳转
            // redirect 重定向
            // direct指向
            // para:想去的新url
            res.redirect('/api/signin')
        }
    }
}
//导出多个函数

//1-> module.exports = {send:semd,sign:sign}
//2-> module.exports = {send,sign}    

exports.send = send;
exports.sign = sign;