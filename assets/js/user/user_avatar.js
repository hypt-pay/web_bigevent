$(function() {
    var layer = layui.layer
        // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
            // 纵横比 aspectRatio: 1, 
            // 指定预览区域
            preview: '.img-preview',

        }
        // 1.3 创建裁剪区域
    $image.cropper(options)

    // 选择文件上传
    $('#selectImage').on('click', function() {
            // 让文件域被触发
            $('#file').click()
        })
        // 给文件域绑定一个change事件
    $('#file').on('change', function(e) {

            // 得到被选中的文件
            var fileList = e.target.files
                // 判断是否有被选中的文件
            if (fileList.length == 0) {
                return layer.msg('你没有选中图片')
            }
            //  拿到用户选中的文件
            var fileImage = e.target.files[0]
                // 将文件转换为路径
            var ImageUrl = URL.createObjectURL(fileImage)

            $image.cropper('destroy')
                // 销毁旧的裁剪区域
                .attr('src', ImageUrl)
                // 重新设置图片路径 
                .cropper(options)
                // 重新初始化裁剪区域

        })
        // 上传头像
    $('#Upload').on('click', function() {
        // 获取裁剪好的image
        var dataURL = $image.cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            }).toDataURL('image/png')
            // 将 Canvas 画布上的内容，转化为 base64 格式的字符 串
            // 发起ajax请求
        $.ajax({
            url: '/my/update/avatar',
            method: 'post',
            data: {
                avatar: dataURL
            },
            success: function(rel) {
                if (rel.status !== 0) {
                    return layer.msg('上传头像失败')
                }
                layer.msg('上传头像成功')
                window.parent.getUserInfo()

            }
        })
    })

})