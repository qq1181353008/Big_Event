let layer = layui.layer
let form = layui.form

$(function() {

    initCate();

    // 初始化富文本编辑器
    initEditor();

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image');

    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 400 / 592,
        // 指定预览区域
        preview: '.img-preview'
    };

    // 1.3 创建裁剪区域
    $image.cropper(options);


    // 选择文件功能实现
    $('#btnChooseImage').click(function() {
        // 触发文件上传按钮
        $('#coverFile').click()
            // 绑定事件
            .change(function(e) {

                // 1. 获取文件
                let file = e.target.files[0];
                // 2.将文件转化为URL
                let imgURL = URL.createObjectURL(file);
                // 3.修改图片
                $image.cropper('destroy').attr('src', imgURL).cropper(options);
            })
    })



    // 提交数据
    let art_state = '已发布'

    $('#btnSave').on('click', function(e) {
            art_state = '草稿'
        })
        // 提交数据
    $('#form_pub').submit(function(e) {
        e.preventDefault();

        // 1.创建FormData对象
        let fd = new FormData($(this)[0]);
        // 2.添加文件数据
        fd.append('state', art_state);
        // 将裁剪图片输出为文件
        $image.cropper('getCroppedCanvas', {
            // 创建一个画布
            width: 400,
            height: 200
        }).toBlob(function(blob) { // 将裁剪图片变为文件blob后的回调函数
            fd.append('cover_img', blob);


            // 发布新文章
            $.ajax({
                url: '/my/article/add',
                method: 'POST',
                data: fd,
                // fordata格式数据必须的配置
                contentType: false,
                processData: false,
                success: function(res) {
                    if (res.status === 1) {
                        return layer.msg('发布失败！')
                    }

                    layer.msg('发布成功！');
                    // 跳转页面,注意路径一定要写对
                    location.href = '/article/article_list.html';
                }
            })
        })
    })
})

// 初始化文章类别选项
function initCate() {
    // 获取文章类别数据
    $.ajax({
        url: '/my/article/cates',
        method: 'GET',
        success: function(res) {
            if (res.status === 1) {
                return layer.msg('获取文章类别失败！')
            }

            // 渲染文章类别选项
            let strHTML = template("artCate", res)
            $('[name="cate_id"]').html(strHTML)
                // 注意一定要重新渲染一下
            form.render()
        }
    })

}