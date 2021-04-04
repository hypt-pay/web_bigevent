$(function() {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function(val) {
            if (val.length > 7) {
                return '昵称名在1~6个字符之间'
            }
        }
    })
    initUserInfo()
        // 初始化用户信息
    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            method: 'get',
            success: function(rel) {
                if (rel.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                // 为form元素赋值
                form.val('assignment', rel.data)

            }
        })
    }
    // 表单重置

    $('#reset').on('click', function(e) {
        e.preventDefault()
        initUserInfo()
    })

    // 提交用户更新
    $('.layui-form').on('submit', function(e) {
        //  阻止默认行为
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: form.val('assignment'),
            success: function(rel) {
                if (rel.status !== 0) {
                    return layer.msg('更新信息失败')
                }
                //  得到父页面窗口,并更新用户信息
                layer.msg('更新成功')
                window.parent.getUserInfo()
            }
        })
    })



})