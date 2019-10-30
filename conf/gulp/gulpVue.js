/**
 * 打包vue文件
 * @type {[type]}
 */

var gulp = require('gulp'),
    path = require('path'),
    through = require('through2'),
    projectConfig =  require('../project/config.js') , //获取当前项目配置的域名和环境
    plugins = require('gulp-load-plugins')(),
    WebpackDevServer = require("webpack-dev-server"),
    vueWebpack = require('webpack');


module.exports = function(options) {

    //调用projectConfig，给global.siteUrl的各项添加内容并转成字符串，用于添加到root.js文件中
    var siteUrl = projectConfig( options ),
        domainUrlStr = JSON.stringify( siteUrl.domainUrl ),
        apiUrlStr = JSON.stringify( siteUrl.apiUrl ),
        goUrlStr = JSON.stringify( siteUrl.goUrl );



    //root文件打包
    gulp.task( 'root', function() {

        return gulp.src(['conf/project/root.js'])

            //添加changeLocalHistory、eruda和CustomEventIeFile的文件内容
            .pipe(
                through.obj(function(file, enc, cb) {
                    var fileCon = file.contents.toString();

                    //替换gulpIp和gulpEnv
                    fileCon = fileCon.replace(/gulpEnv/g, options.env).replace(/gulpDomainUrl/g, domainUrlStr)
                        .replace(/gulpApiUrl/g, apiUrlStr).replace(/gulpGoUrl/g, goUrlStr);

                    file.contents = new Buffer(fileCon);
                    this.push(file);
                    cb()
                })
            )

            .pipe(gulp.dest(options.path+'commonResources/common/'))

            .pipe(plugins.rev())
            .pipe(plugins.rev.manifest())
            .pipe(gulp.dest(options.middle + 'rev/root'))
    })

    //用于webpack启动服务的有效代码
    function resolve (dir) {
      return path.join(__dirname,  '../../', dir)
    }

    gulp.task("vueWebpack", ['root'], function() {

        //临时require vue打包webpack配置文件，防止添加了入口文件，拿不到最新配置
        var compiler = vueWebpack(require('../../build/webpack.vue.conf.js'), function(err, status) {

            //打印日志
            //这句不加的话，webpack打包vue文件时，不会出现文件打包的过程日志
            process.stdout.write(status.toString({
              colors: true,
              modules: false,
              children: false, 
              chunks: false,
              chunkModules: false
            }) + '\n\n');

            

            //不同环境，vueWebpack任务后需要执行的其他任务
            if( options.env == 0  ){
                //本地开发环境\本地联调环境
                if (!isWatch) {
                    //初始打包时需要再执行这些任务，打包除vue文件之外的所有文件
                    plugins.sequence('images', 'less', 'vendor', 'connect', 'mock', function() {});

                    // plugins.sequence('images', 'less', 'vendor', 'mock',  function() {});

                    //启动webpack服务（有效代码）
                    // new WebpackDevServer(compiler, {
                    //     stats: false,
                    //     historyApiFallback: false,
                    //     contentBase: resolve('dist'),
                    //     //hot: true,
                    //     inline: true,
                    // }).listen(7000, 'localhost', function(err) {});
                } 
                else {
                    //监听文件过程中
                    // if (isConfig) {
                        //修改的是conf里的文件
                        plugins.sequence('reload', function() {});
                    // }
                }
            }
            else if( options.env == 5 ){
                if (!isWatch) {
                    //初始打包时需要再执行这些任务，打包除vue文件之外的所有文件
                    plugins.sequence('images', 'less', 'vendor', 'connect', function() {});

                    //启动webpack服务（有效代码）
                    /*new WebpackDevServer(compiler, {
                        stats: { colors: true },
                        historyApiFallback: false,
                        contentBase: resolve('dist'),
                        // hot: true,
                        inline: true,
                    }).listen(8899, 'http://172.16.191.254', function(err) {});*/
                } 
                else {
                    //监听文件过程中
                    //if (isConfig) {
                        //修改的是conf里的文件
                        plugins.sequence('reload', function() {});
                    //}
                }
            }
            //else if( options.env == 1){
                //联调环境
                //if (!isWatch) {
                    //初始打包时需要再执行这些任务，打包除vue文件之外的所有文件
                    //不执行mock任务
                    //plugins.sequence('images', 'less', 'vendor', function() {});
                //} 
                // else {
                //     //监听文件过程中
                //     if (isConfig) {
                //         //修改的是conf里的文件
                //         plugins.sequence('webpack', 'rev', function() {});
                //     }
                // }
            //}
            else{
                //develop、测试、预生产、生产环境
                plugins.sequence('images', 'less', 'vendor', 'zip',  function() {});
            }
            

            
        })

        
        

    });
}