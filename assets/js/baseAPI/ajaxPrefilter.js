// 注意 JQ.Ajax发送请求之前会调用ajaxPrefilter函数，该函数会获取请求函数当中的对象

$.ajaxPrefilter(function(options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url
})