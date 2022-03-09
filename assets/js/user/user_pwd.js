var form = layui.form
var layer = layui.layer

$(function() {
    // 规定表单验证
    form.verify({
        // 注意正则表达式不用引号包裹,S必须大写
        psd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],
        samepwd: function(value) {
            if (value === $('[name="oldPwd"]').val()) {
                return '新旧密码不能相同'
            }
        },
        repwd: function(value) {
            if (value !== $('[name="newPwd"]').val()) {
                return '两次密码必须一致'
            }
        }
    })

    // 修改密码
    $('.layui-form').submit(function(e) {
        // 阻止默认行为
        e.preventDefault()


        $.ajax({
            url: '/my/updatepwd',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status === 1) {
                    return layer.msg(res.message)
                }

                layer.msg('密码修改成功!')

                // 重置密码框
                $('.layui-form')[0].reset()
            }
        })
    })

})