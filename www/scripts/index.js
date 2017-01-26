var petname = $.cookie('petname')

if(petname){
    $('#user').find('span').last().text(petname)  
}else{
    $('#user').find('span').last().text('登录').end().end().removeAttr('data-toggle').click(function(){
        location.href = '/api/signin'
    })
}
$('#ask').click(function(){
    if(petname){
        location.href = '/api/ask'
    }
    else{
        location.href = '/api/signin'
    }
})
$('.navbar .dropdown-menu li').last().click(function(){
    $.get('/user/signout',null,function(res){
        if(res.code == "success"){
            location.href = "/"
        }
    })
})

/*$('.questions').delegate('[question]','click',function(){
   if(petname){
       $.cookie('question',$(this).attr('question'))
       location.href = '/api/answer'
   }
   else{
       location.href = "/api/signin"
   }
})*/

$('#questions').on('click',function(){
   if(petname){
       $.cookie('question',$(this).attr('question'))
       location.href = '/api/answer'
   }
   else{
       location.href = "/api/signin"
   }
})

// $.getJSON('/questions',null,function(res){
//     console.log(res)
//     var html = template('question-template',res)
//     $('.questions').html(html)
// })


