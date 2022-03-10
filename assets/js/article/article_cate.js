let layer = layui.layer
let form = layui.form

$(function() {
    getArtCateList()

    // 给类别添加按钮绑定事件
    let index = null;
    $('#btn_addArtCate').click(function() {

        // 渲染弹出层
        index = layer.open({
            type: 1,
            title: '添加类别',
            area: ['400px', '250px'],
            content: $('#addArticle').html()
        })
    })


    // 使用代理为添加按钮绑定事件
    // 注意要代理给Body，弹出层也是属于body的子元素
    $('body').on('submit', '#addFrom', function(e) {
        e.preventDefault()
        $.ajax({
            url: '/my/article/addcates',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status === 1) {
                    return layer.msg('添加文章类别失败！')
                }

                layer.msg('添加文章类别成功！')
                getArtCateList()

                // 关闭弹出层
                layer.close(index)
            }
        })

    })

    // 修改文章类别
    // 使用代理为编辑按钮绑定事件
    let edit_index = null
    $('#artList').on('click', '#btn_edit', function(e) {
        // 弹出层
        // 渲染弹出层
        edit_index = layer.open({
            type: 1,
            title: '添加类别',
            area: ['400px', '250px'],
            content: $('#editArticle').html()
        })

        let id = $(e.target).attr('data-id')
            // 发送请求获取对应列表信息
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                if (res.status === 1) {
                    return layer.msg('获取文章分类失败!')
                }
                form.val('editForm', res.data)
            }
        })
    })

    // // 提交修改
    $('body').on('submit', '#editForm', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status === 1) {
                    return layer.msg('更新数据失败！')
                }

                layer.close(edit_index)
                getArtCateList()
                layer.msg('更新数据成功！')
            }
        })
    })

    // 删除文章
    $('#artList').on('click', '#btn_del', function() {
        let id = $(this).attr('data-id')
        layer.confirm('是否删除？', { icon: 3, title: '提示' }, function(index) {

            // 发送请求
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status === 1) {
                        return layer.msg('删除数据失败！')
                    }

                    layer.msg('删除数据成功！')
                    layer.close(index);
                    getArtCateList()

                }
            })


        });
    })
})


// 初始化文章类别列表
function getArtCateList() {
    $.ajax({
        url: '/my/article/cates',
        method: 'GET',
        success: function(res) {
            if (res.status === 1) {
                return layer.msg('文章类别获取失败!')
            }

            let strHTML = template('tpl-article', res)
            $('#artList').html(strHTML)

        }
    })
}