$(function() {
    var layer = layui.layer
    var form = layui.form
        // 发起请求拿到文章类别管理信息
    initAtrCatelList()

    function initAtrCatelList() {
        $.ajax({
            url: '/my/article/cates',
            method: 'GET',
            success: function(rel) {
                if (rel.status !== 0) {
                    return layui.msg('获取文章类别失败')
                }

                var htmlStr = template('table-load', rel)
                $('tbody').html(htmlStr)
            }
        })
    }
    var addDiaLog = null
        // 弹出层
    $('#Category').on('click', function() {
            addDiaLog = layer.open({
                title: '添加类别',
                type: 1,
                area: ['500px', '250px'],
                content: $('#dia-log').html()
            })
        })
        // 发起ajax请求并关闭弹出层
        // 用代理的方式绑定事件
    $('body').on('submit', '#dia-log-add', function(e) {
            e.preventDefault()
            $.ajax({
                method: 'POST',
                url: '/my/article/addcates',
                data: $('#dia-log-add').serialize(),
                success: function(rel) {
                    if (rel.status !== 0) {
                        return layer.msg('新增类别失败')
                    }
                    layer.msg('新增类别成功')
                    initAtrCatelList()
                    layer.close(addDiaLog)
                }
            })
        })
        // 修改
    var editArticle = null
    $('tbody').on('click', '#edit', function() {
            editArticle = layer.open({
                title: '修改类别',
                type: 1,
                area: ['500px', '250px'],
                content: $('#dia-log-edit').html()
            })
            var id = $(this).attr('data-id')
            $.ajax({
                method: 'get',
                url: '/my/article/cates/' + id,
                success: function(rel) {
                    if (rel.status !== 0) {
                        return layer.msg('获取信息失败')
                    }
                    form.val('dia-log-edit', rel.data)
                }
            })
        })
        // 更新文章信息
        //  代理方式绑定事件
    $('body').on('submit', '#dia-log-edit', function(e) {
            e.preventDefault()
            $.ajax({
                method: 'post',
                url: '/my/article/updatecate',
                data: form.val('dia-log-edit'),
                success: function(rel) {
                    if (rel.status !== 0) {
                        return layer.msg('更新信息失败')
                    }
                    layer.msg('更新信息成功')
                    initAtrCatelList()
                    layer.close(editArticle)
                }
            })
        })
        // 删除
        // 代理
    $('body').on('click', '.btn-delete', function(e) {
        e.preventDefault()
        var id = $(this).attr('data-id')
        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'get',
                url: '/my/article/deletecate/' + id,
                success: function(rel) {
                    if (rel.status !== 0) {
                        return layer.msg('删除失败')
                    }
                    layer.msg('删除成功')
                    initAtrCatelList()
                    layer.close(index);
                }

            })
        })


    });



})