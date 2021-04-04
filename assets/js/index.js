// 获取登录用户信息
$(function() {
    getUserInfo()
        // 获取layui中的layer对象
    var layer = layui.layer
        // 退出登录
    $('#logout').on('click', function() {
        layer.confirm('确定退出登录吗?', { icon: 3, title: '提示' },
            function(index) {
                // 删除掉浏览器中的token记录
                localStorage.removeItem('token')
                    // 返回到登录页面
                location.href = '/login.html'
                    // 关闭弹出框
                layer.close(index);
            });
    })
})

function getUserInfo() {
    var url = '/my/userinfo'
    $.ajax({
        method: 'get',
        url: url,

        success: function(rel) {
            if (rel.status != 0) {
                return layer.msg('获取用户信息失败')
            }
            rendUserInfo(rel.data)
        }
    })
}
// 渲染用户信息
function rendUserInfo(rel) {
    //  欢迎
    var name = rel.nickname || rel.username
        // var first = name[0].toUpperCase()
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        // 头像
    if (rel.user_pic == null) {
        var first = name[0].toUpperCase()
        $('.layui-nav-img').hide()
        $('.text-avatar').html(first).show()
    } else {
        $('.text-avatar').hide()
        $('.layui-nav-img').attr('src', rel.user_pic).show()
    }


}