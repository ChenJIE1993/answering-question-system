$('form').submit(function(ev){
    ev.preventDefault()
    var formData = $(this).serialize()
    $.post('/ask',formData,function(res){
          $('.modal-body').text(res.message)
            //  on方法在被选元素及子元素上添加一个或多个事件处理程序
            //  hidden.bs.modal 当模态框对用户隐藏时触发
             $('.modal').modal('show').on('hidden.bs.modal',function(e){
                 if(res.code == 'success'){
                     location.href = "/"
                 }
      })
    },'json')
})