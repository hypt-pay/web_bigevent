// 此函数会在每次发起ajax请求时自动拦截
$.ajaxPrefilter(function(options) {
    //    拿到发起ajax请求时的URL，然后拼接上根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url
        // 给需要权限的请求统一设置请求头
    if (options.url.indexOf('/my/' !== -1)) {
        options.headers = {
            //    设置请求头
            //    从浏览器中取出存入的token
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 最终都会执行的函数completa
    // 配置全局的权限管理
    options.complete = function(rel) {
        if (rel.responseJSON.status == 1) {
            // 清空token
            localStorage.removeItem('token')
                // 强制跳转到登录页面
            location.href = '/login.html'
        }
    }

})