'use strict';

/**
 *  前端-理顾宝H5 vue多页面项目 gulp打包配置
    @author yangjinlai 2019-01-19

    src中
    1. commonResources文件夹，用来存放各个服务器上都有的文件
    如error、模板页等
    2. 其他文件夹存放各个项目的文件
	
	命令：gulp --env 0  --project fc

	env为当前的环境变量
	0--本地开发（ 请求使用mock模拟，域名为本地ip+7089
	1--联调环境（后台发布的开发环境，与后台接口在同一个服务器，接口前不配置域名，默认在当前域名下，打包出ht_dev目录下的zip包，用于运维发版）
	2--测试环境，逻辑同1，打包后目录为test
	3--预生产
	4--生产
	5--本地联调（ 打开本地nginx，与后台联调，服务依旧为前端本地服务，但接口需转发到后台，因此与1、2都不同，需注意）

	project为当前打包的文件目录
	如传fc，即打包fc下的文件和commonResources下的文件（commonResources目录为默认打包的，所有服务器上都会放，放公共的文件）

 */


//引入构建需要的插件
var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(), //引入gulp插件
    
    //node模块
    os = require('os'),
    minimist = require('minimist'); //命令行替换变量

//默认环境变量
//env----变量活动
var knownOptions = {
    string: 'env', 
    default: { 
        env: process.env.NODE_ENV || '0', //默认开发环境
        project: '' //默认打包所有项目
    }
}; 


//将命令行的参数和knownOptions合并
global.options = minimist(process.argv.slice(2), knownOptions);

//保存project变量
var project = options.project;

//获取当前电脑的ip
var localIp = (function(){
    var interfaces = require('os').networkInterfaces();
        for(var devName in interfaces){
            var iface = interfaces[devName];
            for(var i=0;i<iface.length;i++){
                var alias = iface[i];
                if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
                    return alias.address;
                }
            }
        }
})();

//给options增加其他属性
options.path = (function(){//web本地服务器配置
    //通过环境变量给host.path赋值
    if (options.env === '0' || options.env === '5') {
        //开发环境和联调环境的包进dist
        return 'dist/';
        //不需要打压缩包
    } else if (options.env === '1') {
        //测试环境的包进ht_test
        return 'ht_dev/';
    } else if (options.env === '2') {
        //测试环境的包进ht_test
        return 'ht_test/';
    } else if (options.env === '3') {
        //预生产的包进ht_pre_production
        return 'ht_pre_production/';
    } else if (options.env === '4') {
        //生产的包进ht_production
        return 'ht_production/';
    }
})();
options.zip_name = (function(){  //用于zip包的压缩文件名
    if (options.env === '1') {
        //测试环境的包进ht_test
        return 'ht_dev';
    } else if (options.env === '2') {
        //测试环境的包进ht_test
        return 'ht_test';
    } else if (options.env === '3') {
        //预生产的包进ht_pre_production
        return 'ht_pre_production';
    } else if (options.env === '4') {
        //生产的包进ht_production
        return 'ht_production'; 
    }
})();
options.port = {
        server: 7000, //作为当前项目的本地服务的端口号
        mock: 7079 //当前项目本地Mock服务的端口号
    };
options.ip =  localIp, //本地ip
options.middle =  'middle/' //打包中文件存放地址，供任务中直接使用

//判断文件路径，如果project是空，打包所有项目，其他情况下，打包project指定项目下的文件和commonResources文件夹下的
options.filesArr = [];
if ( !project ){
    options.filesArr.push('src/**/');
}
else{
    options.filesArr.push( 'src/' + project + '/' );
    options.filesArr.push( 'src/commonResources/' );
}

//给options添加一个changeFilePath，用于每次修改文件时设置修改的文件路径
//根据js数组复制的关联性，在后面修改了changeFilePath时，传递到各gulp打包文件中的options也会跟着改变
options.changeFilePath = [];


console.log( '当前项目配置options：' + JSON.stringify(options) );

//gulp任务直接require并执行
require('./conf/gulp/gulpServer.js')( options );
require('./conf/gulp/gulpZip.js')( options );
require('./conf/gulp/gulpClean.js')(options  );
require('./conf/gulp/gulpImage.js')(options);
require('./conf/gulp/gulpLess.js')(options);
require('./conf/gulp/gulpJs.js')(options);
require('./conf/gulp/gulpBf.js')(options);
require('./conf/gulp/gulpVendor.js')(options  );
//打包vue文件
require('./conf/gulp/gulpVue.js')(options  );


//所有环境，都默认执行clean和vueWebpack任务
//gulp.task('default', ['clean', 'images', 'less','webpack', 'bfRev','vendor', 'vueWebpack']);
gulp.task('default', ['clean', 'vueWebpack']);


//从640图转换为750图的px，需要用20乘以750/640
gulp.task('rem2px', function() {
    return gulp.src( ['less/*.less'] )
        .pipe( plugins.remToPx({
            fontSize:  (750/640)*20
        }))
        .pipe(gulp.dest(options.middle + '/less'));
});

gulp.task('px2rem', function() {
    return gulp.src( 'middle/less/**/*.less' )
        .pipe( plugins.pxToRem({
            rootPX: 40
        }))
        .pipe(gulp.dest(options.middle + '/css'));
});



//该变量用于标识是否是watch任务监听的打包
//因为替换html中的版本号时，如果不用这个变量控制，会导致gulp刚启动时的默认打包所有文件的任务
//中替换全部版本号，浏览器一直在不停刷新
//所以这里用此变量控制
//默认为false---不是watch的监听
//在watch任务中，如果进了该任务，会将此变量重置为true
//替换版本号时，如果此变量为true时，才会重启浏览器，达到控制的目的
global.isWatch = false;


/*********************一些默认变量设置  end******************************/




/***************************watch监听打包任务******************************/
//开发环境/联调环境监听打包
if (options.env === '5' || options.env === '0' ) { 

    gulp.watch( ['src/**/*' , 'common/**/*'], function(event) {

        //监听到的修改的文件         
        var filePath = event.path,
            fileExt = filePath.substring( filePath.indexOf('.') + 1 );

        //将此变量设置为true，表示进入watch监听状态
        global.isWatch = true;

        filePath = filePath.substring( filePath.indexOf('src'));
        
        console.log('当前修改文件：' + filePath);

        //判断文件类别
        if( fileExt == 'js'){
            //js文件
            if( filePath.indexOf('common\\') != -1 && filePath.indexOf('src\\') == -1) {
                //common文件夹下，或src中section文件夹下的文件,打包所有js文件
                plugins.sequence('webpack',  function() {});
            }
            else {
                //其他情况，打包当前修改的文件
                plugins.sequence('vueWebpack',function() {});
            }
        }
        else{
            //vue文件
            plugins.sequence('vueWebpack', function() {});
        }
    })


}
