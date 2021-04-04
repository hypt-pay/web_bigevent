$(function() {
    var form = layui.form
    form.verify({
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            samePwd: function(val) {
                if (val === $("[name='oldPwd']").val()) {
                    return '新旧密码不能一样'
                }

            },
            rePwd: function(val) {
                if (val !== $("[name='newPwd']").val()) {
                    return '两次密码输入不一致'
                }
            }
        })
        // 发起请求修改密码
        // 监听submit事件
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
            // 发起ajax请求
        $.ajax({
            url: '/my/updatepwd',
            method: 'post',
            data: $(this).serialize(),
            success: function(rel) {
                if (rel.status !== 0) {
                    return layui.layer.msg('密码更新失败')
                }
                layui.layer.msg('密码更新成功')
                location.href = '/login.html'
                localStorage.removeItem('token')
                    // 重置表单
                $('.layui-form')[0].reset()
            }
        })
    })
})