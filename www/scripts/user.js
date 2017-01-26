$('#goBack').click(function(){
    history.go('-1')
})
$('form').submit(function(ev){
    ev.preventDefault()
    var data = new FormData(this)
    $.ajax({
        url:'/user/photo',
        data:data,

        contentType:false, //默认application/x-www-form-urlencoded 如果极个别情况下 需要使用multipart/form-data时需要修改这个值
        cache:false, //是否允许使用缓存数据
        processData:false,
        type:'POST',
        success:function(res){
            if(res.code == 'success'){
                
                location.href = '/'
            }
            else{
                 $('.modal-body').text(res.message)
                 $('.modal').modal('show')
            }
        }

    })
})