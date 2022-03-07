(function() {
    // 点击注册
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    });
    // 点击登录
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 获取layui的form对象
    var form = layui.form
    var layer = layui.layer
        // 设置提示信息
    form.verify({
        repsd: function(value) {
            let psd_val = $('#regpsd').val()
            if (value !== psd_val) {
                return '密码不一致'
            }
        },
        psd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ]
    })

    // 点击登录发送请求
    $('#form_login').submit(function(e) {
        // 阻止默认行为
        e.preventDefault();
        // 发送请求
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $('#form_login').serialize(),
            success: function(res) {
                if (res.status !== 1) {
                    // 存储身份认证
                    localStorage.setItem('token', res.token)
                        // 跳转到首页
                    location.replace('index.html')
                    return layer.msg('登录成功')
                }
                layer.msg('登录失败')

            }
        })
    })

    // 点击注册发送请求
    $('#form_reg').submit(function(e) {
        // 阻止默认行为
        e.preventDefault();
        // 发送请求
        $.ajax({
            url: '/api/reguser',
            method: 'POST',
            data: $('#form_reg').serialize(),
            success: function(res) {
                if (res.status !== 1) {
                    // 点击一次登录链接
                    $('link_login').click()
                    return layer.msg('注册成功')
                }
                layer.msg(res.message)
            }
        })
    })

})()