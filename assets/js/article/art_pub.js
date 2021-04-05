$(function() {
    var layer = layui.layer
    var form = layui.form
        // 获取文章的类别
    $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function(rel) {
                if (rel.status !== 0) {
                    return layer.msg('获取文章类别失败')
                }
                // 把数据渲染到指定的模板中
                var htmlStr = template('article-temp', rel)
                $("#article-cate").html(htmlStr)
                    // 调用layui，重新渲染页面
                form.render()
            }
        })
        // 初始化富文本编辑器
    initEditor()

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    // 模拟文件域被点击事件
    $('#cover').on('click', function() {
            $('#file').click()
        })
        // 讲文件域中被选中的图片放入裁剪区
    $('#file').on('change', function(e) {
            var files = e.target.files
            if (files.length == 0) {
                return
            }
            // 转化图片的url地址
            var imageUrl = URL.createObjectURL(files[0])
                // 先`销毁`旧的裁剪区域，再`重新设置图片路径`，之后再`创建新的裁剪区域`
            $image
                .cropper('destroy') // 销毁旧的裁剪区域
                .attr('src', imageUrl) // 重新设置图片路径
                .cropper(options) // 重新初始化裁剪区域
        })
        // 设置一个变量来判定发布文章的状态
    var car_state = '已发布'
        // 用一个事件来监听是否为发布草稿
    $('#btnSave2').on('click', function() {
            // 如果触发此事件，便是以草稿的状态发布
            car_state = '草稿'
        })
        // 监听form表单，拿到其中填好的值
    $('#uploadCate').on('submit', function(e) {
            e.preventDefault()
                // 基于form表单，快速创建一个FormData对象
            var f2 = new FormData($(this)[0])
            f2.append('state', car_state)

            //将裁剪后的图片，输出为文件
            $image
                .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                    width: 400,
                    height: 280
                })
                .toBlob(function(blob) {
                    // 将 Canvas 画布上的内容，转化为文件对象
                    // 得到文件对象后，进行后续的操作
                    f2.append('cover_img', blob)

                })

            publishArticle(f2)
        })
        // 发布文章内容
    function publishArticle(fd) {
        $.ajax({
            method: 'post',
            url: '/my/article/add',
            data: fd,
            //    如果提交的数据格式是FormData，必须设置一下两个属性
            contentType: false,
            processData: false,
            success: function(rel) {
                if (rel.status !== 0) {
                    return layer.msg('发布失败')
                }
                layer.msg('发布成功')
                    // location.href = '/article/art_list.html'
            }
        })
    }

})