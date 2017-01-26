$('#goBack').click(function(){
    history.go(-1)
})

$('form').submit(function(ev){
    // 阻止表单默认提交
    ev.preventDefault()

    var pass = $(':password').map(function(){
        return $(this).val()
    })
    console.log(pass)
    if(pass[0] == pass[1]){
        console.log('输入的密码相同,准备提交数据')
        var data = $(this).serialize()
        // serialize()将表单元素的name属性的值和表单内容 序列化为urlencode编码格式 用于ajax提交
        $.post('/user/register',data,function(res){
             $('.modal-body').text(res.message)
            //  on方法在被选元素及子元素上添加一个或多个事件处理程序
            //  hidden.bs.modal 当模态框对用户隐藏时触发

             $('.modal').modal('show').on('hidden.bs.modal',function(e){
                 if(res.code == 'success'){
                     location.href = "/api/signin"
                 }
             })
        })

    }
    else{
        $('.modal-body').text('两次输入的密码不一致')
        $('.modal').modal('show')
    }
})