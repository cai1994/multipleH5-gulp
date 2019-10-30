var gulp = require('gulp'),
    proxy = require('http-proxy-middleware'),
    plugins = require('gulp-load-plugins')(); //引入gulp插件

module.exports = function(options) {

    //gulp本地服务
    gulp.task('connect', function() {
        plugins.connect.server({
            root: options.path,
            port: options.port.server,
            livereload: true,
            middleware: function(connect, opt) {
                return [
                    // proxy('/api',  {
					// 	target: options.env == 0 ? 'http://'+options.ip + ':' + options.port.mock :  'http://172.16.191.192:8030',
                    //     changeOrigin:true,

                    proxy('/api', {
                        // target: options.env == 0 ? 'http://' + options.ip + ':' + options.port.mock : 'http://192.168.50.67:8111',邵永昌
                        target: options.env == 0 ? 'http://' + options.ip + ':' + options.port.mock : 'http://192.168.10.47:8111',//测试环境地址
                        changeOrigin: true,
                        cookieDomainRewrite:{
                            "*":"loaclhost"//把相应的cookie域设置陈localhost
                        },
                        secure: false,
                    }),
                ]
            }
        });
    });

    //gulp-mock-server   mock模拟假数据
    gulp.task('mock', function() {
        gulp.src('.')
            .pipe(plugins.mockServer({
                //livereload: false,
                host: options.ip,
                // host: '172.16.191.124',
                directoryListing: true,
                port: options.port.mock,
                open: false,
                //https: true,
                allowCrossOrigin: true
            }));
    })

    gulp.task('reload', function() {
        return gulp.src('.')
            .pipe(plugins.connect.reload())
    })

}
