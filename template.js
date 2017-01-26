const template = require('art-template')

template.config('cache',false)

template.helper('formTime',function(t){
    t = new Date(t)
    return t.getTime()
})
template.helper('ms',function(t){
     t = new Date(t)
    var M = t.getMonth() + 1
        d = t.getDate()
        h = t.getHours()
        m = t.getMinutes()
        s = t.getSeconds()

        M = M < 10?'0' + M :M
        d = d < 10?'0' + d :d
        h = h < 10?'0' + h :h
        s = s < 10?'0' + s :s
        m = m < 10?'0' + m :m

    return t.getFullYear() + '-' + M +'-'+d + ' ' + h + ':' + m + ':' + s + ' '
})

module.exports = template;