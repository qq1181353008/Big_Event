$(function() {
    getUserInfo()

    // 点击退出按钮
    $('#bth_getout').click(function() {
        // 询问弹出层
        layer.confirm('是否退出？', { icon: 3, title: '提示' }, function(index) {
            // 1.清除本地存储
            localStorage.removeItem('token')
                // 2.跳转到登录页面
            location.replace('login.html')
            layer.close(index);
        });
    })
})



function getUserInfo() {
    // 1. 发送请求
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        success: function(res) {
            if (res.status === 1) {
                return layui.layer.msg('获取失败')
            }
            // 渲染头像
            renderAvatar(res)
        }
    })
}

function renderAvatar(res) {
    //修改用户名称
    var name = res.data.nickname || res.data.username
    $('.name').html(name)
    $()
        //按需渲染用户头像
    if (res.data.user_pic !== null) {
        //渲染图片头像
        $('.layui-nav-img').attr('src', res.data.user_pic)
        $('.text-avator').hide()
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide()
        $('.text-avator').html(name[0].toUpperCase())
    }
}