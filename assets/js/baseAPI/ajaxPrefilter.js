// 注意 JQ.Ajax发送请求之前会调用ajaxPrefilter函数，该函数会获取请求函数当中的对象

$.ajaxPrefilter(function(options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url

    // 添加请求头
    if (options.url.indexOf('/my/') !== -1) {
        // 设置请求头属性
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 控制跳转权限
    // complete 无论请求成功或失败都会调用
    options.complete = function(res) {
        console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1.清空本地存储
            localStorage.removeItem('token')
                // 2.跳转到登录页面
            location.replace('login.html')
        }
    }
})