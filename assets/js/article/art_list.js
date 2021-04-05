$(function() {
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage
        //查询的参数对象
    var q = {
        pagenum: 1, //页码值，默认从第一开始
        pagesize: 2, //每页显示几条数据
        cate_id: '', //文章分类的id，
        state: '' //文章的发布状态
    }

    initList()
    initCate()
        // 发请求拿数据
    function initList() {
        $.ajax({
            method: 'get',
            url: '/my/article/list',
            data: q,
            success: function(rel) {
                if (rel.status !== 0) {
                    layer.msg('获取文章列表失败')
                }
                var listInfo = template('listInfo', rel)
                $('tbody').html(listInfo)
                renderPage(rel.total)
                console.log(rel);

            }

        })
    }
    // 时间补零函数
    function padZero(v) {
        return v > 10 ? v : '0' + v
    }
    // 定义时间过滤器
    template.defaults.imports.dataFormat = function(date) {
        const dt = new Date(date)
        var y = padZero(dt.getFullYear())
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())
        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())
        return y + '-' + m + '-' + d + '-' + ' ' + hh + ':' + mm + ':' + ss
    }

    // 定义分类下拉数据
    function initCate() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function(rel) {
                if (rel.status !== 0) {
                    layer.msg('获取类别信息失败')
                }
                var cateList = template('cateList', rel)
                $("[name='cate_id']").html(cateList)
                    //    重新渲染表单结构
                form.render()
            }
        })
    }
    // 筛选功能
    // 监听form
    $('#form-search').on('submit', function(e) {
            e.preventDefault()
            var cate_id = $("[name='cate_id']").val()
            var state = $("[name='state']").val()
            q.cate_id = cate_id
            q.state = state
                //    再次发起请求进行查询
            initList()
        })
        // 渲染分页的方法
    function renderPage(val) {
        // layui内置的分页函数
        laypage.render({
            elem: 'pageBox', //放分页的容器
            count: 10, //总记录数
            limit: q.pagesize, //每页显示的条数
            curr: q.pagenum, //默认当前页被选中
            layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip'],
            limits: [2, 4, 6, 8, 10],
            jump: function(obj, first) { //分页数据的回调函数
                q.pagesize = obj.curr
                q.pagenum = obj.limit
                    //是点击触发的时间，first为undfind，调用而触发的为true，防止死循环
                if (!first) {
                    initList()
                }

            }
        })
    }

    // 删除文章
    // 代理方式绑定事件
    $('tbody').on('click', '.cate-delete', function() {
        var id = $(this).attr('data-id')
            // 拿到页面上该元素的个数
        var len = $('.cate-delete').length
        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'get',
                url: '/my/article/delete/' + id,
                success: function(rel) {
                    if (rel.status !== 0) {
                        return layer.msg('删除文章失败')
                    }
                    layer.msg('删除文章成功')
                    if (len === 1) {
                        q.pagenum = q.pagenum == 1 ? 1 : q.pagenum - 1
                        initList()
                    }

                    layer.close(index);
                }
            })

        });
    })
})