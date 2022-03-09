$(function() {
    let layer = layui.layer

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image');
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    };

    // 1.3 创建裁剪区域
    $image.cropper(options);


    $('#btnChooseImage').click(
        function() {
            $('#file').click().change(
                function(e) {
                    // 获取文件
                    let file = e.target.files[0]
                        // 将图片转换为URL
                    let imageURL = URL.createObjectURL(file)
                        // 修改图片
                    $image.cropper('destroy').attr('src', imageURL).cropper(options)

                }
            )

        }
    )

    // 上传头像
    $('#btnUpload').click(function() {
        // 将裁剪区域图片转化为URL
        let dataRUL = $image
            .cropper('getCroppedCanvas', { // 创建一个Canvas画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将Canvas画布上的内容，转化为base64格式的字符串


        $.ajax({
            url: '/my/update/avatar',
            method: 'POST',
            data: { avatar: dataRUL },
            success: function(res) {
                if (res.status === 1) {
                    return layer.msg('头像上传失败!')
                }
                layer.msg('头像上传成功!')
                    // 首页重新获取用户信息
                window.parent.getUserInfo()
            }
        })
    })
})