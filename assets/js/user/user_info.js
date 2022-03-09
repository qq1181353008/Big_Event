var form = layui.form
var layer = layui.layer

$(function() {
    // 规定表单验证
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '用户昵称不能超过6个字符!'
            }
        }
    })

    initUserInfo()

    // 更新用户信息
    $('.layui-form').submit(function(e) {
        // 阻止默认行为
        e.preventDefault()

        $.ajax({
            url: '/my/userinfo',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status === 1) {
                    return layer.msg('用户信息更新失败!')
                }

                layer.msg('用户信息更新成功!')

                // 更新首页用户信息
                // 调用父页面的方法
                window.parent.getUserInfo()
            }
        })
    })

    // 重置表单
    $('#bth_Reset').click(function(e) {
        // 阻止默认行为
        e.preventDefault()

        initUserInfo()
    })
})





// 初始化用户信息
function initUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        success: function(res) {
            if (res.status === 1) {
                return layer.msg('用户信息获取失败!')
            }

            // 将数据传递给表单元素
            form.val('userInfo', res.data);
        }
    })
}