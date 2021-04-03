// 此函数会在每次发起ajax请求时自动拦截
$.ajaxPrefilter(function(options) {
    //    拿到发起ajax请求时的URL，然后拼接上根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url
})