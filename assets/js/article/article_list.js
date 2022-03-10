let layer = layui.layer
let form = layui.form
let laypage = layui.laypage;

// 定义查询参数，以方便请求时传参
let q = {
    pagenum: 1,
    pagesize: 2,
    cate_id: '',
    state: ''
}

$(function() {
    initAtrList();
    initSelect();

    // 给筛选按钮绑定submit事件
    $('#form_select').submit(function(e) {
        e.preventDefault();
        // 获取选择框数据
        q.cate_id = $('[name="cate_id"]').val();
        q.state = $('[name="state"]').val();
        // 重新渲染列表
        initAtrList();
    })

    // 为删除按钮绑定click事件
    $('tbody').on('click', '.layui-btn-danger', function() {
        // 获取列表删除按钮个数
        let length = $('tbody .layui-btn-danger').length;
        // 获取文章Id
        let id = $(this).attr('data-id');
        // 弹出询问层
        layer.confirm('是否删除？', { icon: 3, title: '提示' }, function(index) {
            // 发送删除请求
            $.ajax({
                url: '/my/article/delete/' + id,
                method: 'GET',
                success: function(res) {
                    if (res.status === 1) {
                        return layer.msg('删除文章失败！');
                    }
                    layer.msg('删除文章成功！');

                    // 判断页面的删除按钮数量，如果等于1则表示没有数据，页面码-1
                    // 并且页面码不能小于1
                    if (q.pagenum > 1 && length <= 1) {
                        q.pagenum -= 1;
                    }
                    initAtrList();
                }
            })
            layer.close(index);
        });

    })

    // 为编辑按钮绑定click事件
    $('tbody').on('click', '.layui-btn-normal', function() {
        location.href = '/article/article_edit.html?id=' + $(this).attr('data-id');
    })
})



// 渲染选择框
function initSelect() {
    // 发送请求
    $.ajax({
        url: '/my/article/cates',
        method: 'GET',
        success: function(res) {
            if (res.status === 1) {
                return layer.msg('渲染筛选选择框失败!')
            }

            let strHTML = template('tpl-selected', res);
            $('#select_cate').html(strHTML);
            // 注意：选择框动态添加未被监听，需要重新渲染一下
            form.render();
        }
    })
}

// 渲染文章列表
function initAtrList() {
    // 请求数据
    $.ajax({
        method: 'GET',
        url: '/my/article/list',
        data: q,
        success: function(res) {
            if (res.status === 1) {
                return layer.msg('获取文章列表失败！')
            }

            // 渲染列表
            template.defaults.imports.dateFormat = function(value) {
                return timeFilter(value);
            }
            let strHTML = template('tpl-artList', res);
            $('tbody').html(strHTML);

            // 渲染分頁
            renderPage(res.total);
        }
    })
}
// 时间格式优化
function timeFilter(data) {
    const time = new Date(data);

    let y = time.getFullYear();
    let m = time.getMonth() + 1;
    let d = time.getDate();
    d = addZero(d);

    let h = time.getHours();
    h = addZero(h);
    let mm = time.getMinutes();
    m = addZero(m);
    let ss = parseInt(time.getSeconds());
    s = addZero(ss);

    return y + '-' + m + '-' + d + ' ' + h + '-' + mm + '-' + ss;
}
// 补零
function addZero(date) {
    return date <= 9 ? '0' + date : date;
}

// 渲染分頁
function renderPage(total) {
    laypage.render({
        elem: "pageBox",
        count: total,
        curr: q.pagenum,
        limit: q.pagesize,
        limits: [2, 3, 5],
        layout: ['count', 'limit', 'prev', 'page', 'skip', 'next'],
        jump: function(obj, first) {
            if (!first) {
                q.pagenum = obj.curr;
                q.pagesize = obj.limit;
                initAtrList();
            }
        }
    })
}