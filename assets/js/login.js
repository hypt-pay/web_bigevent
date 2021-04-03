$(function() {
    // 注册
    $('#link-reg').on('click', function() {
            $('.go-login').hide()
            $('.go-reg').show()
        })
        // 登录
    $('#link-log').on('click', function() {
            $('.go-reg').hide()
            $('.go-login').show()
        })
        // 得到layui对象
    var form = layui.form
        // 得到layer对象，进行弹框提示
    var layer = layui.layer
        // 自定义验证规则
    form.verify({
            pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
            repwd: function(value) {
                var pwd = $(".go-reg [name='password']").val().trim()
                if (value != pwd) {
                    return "两次密码输入不一致"
                }

            }
        })
        // 监听form submit事件
    $('#form-reg').on('submit', function(e) {
        e.preventDefault()
            //   发起ajax请求到服务器
        var params = {
            username: $("#form-reg [name='username']").val(),
            password: $("#form-reg [name='password']").val()
        }
        var url = '/api/reguser'
        $.ajax({
            method: 'post',
            url: url,
            data: params,
            success: function(rel) {
                console.log(rel);
                if (rel.status != 0) {
                    return layer.msg(rel.message);
                }
                layer.msg('注册成功，请登录');
                $('#link-log').click()
            }
        })
    })

    //  登录
    $('#login-form').on('submit', function(e) {
        e.preventDefault()
        var data = $(this).serialize()
        var url = '/api/login'
        $.ajax({
            method: 'post',
            url: url,
            data: data,
            success: function(rel) {
                if (rel.status != 0) {
                    return layer.msg(rel.message)
                }
                layer.msg('登录成功')
                location.href = '/index.html'
                    // 吧服务器返回的token存入浏览器中，需要的时候在取出来使用
                localStorage.setItem('token', rel.token)
            }
        })
    })

})