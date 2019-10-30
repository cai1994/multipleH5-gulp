'use strict';

/**
 * vue打包webpack配置
 * 在vue-cli 生成的webpack.base.conf.js和webpack.prod.conf.js基础上修改
 * 增加多页面打包处理，增加title处理，增加预生产、生产环境的压缩处理
 * 增加引用路径别名配置，增加happypack打包配置
 * 去掉webpack-dev-tools等不需要的配置
 * @author yangjinlai 2018-07-20
 */

const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

//const vueLoaderConfig = require('./vue-loader.conf')
const HappyPack = require('happypack')
const os = require('os')
const titleList = require('../conf/project/apiUrl/title.js')
//引入html打包前处理
//const HtmlBeforeProcess = require('./htmlBeforeProcess.js')

console.log('env=' + global.options.env);

//js入口文件的获取
const jsFiles = utils.getFiles('js')
//vue入口文件的获取
const vueFiles = utils.getFiles('vue');


//console.log( 'js入口文件：' + JSON.stringify(jsFiles));
//console.log( 'vue入口文件：' + JSON.stringify(vueFiles));

//引入页面title配置，用来生成html时插入该页面的title
//const urlConf = require('../conf/apiUrl/url')



const finalPath = (function() { //web本地服务器配置
    //通过环境变量给host.path赋值
    if (global.options.env === '0' || global.options.env === '5') {
        //开发环境和联调环境的包进dist
        return 'dist/';
        //不需要打压缩包
    } else if (global.options.env === '1') {
        //测试环境的包进ht_test
        return 'ht_dev/';
    } else if (global.options.env === '2') {
        //测试环境的包进ht_test
        return 'ht_test/';
    } else if (global.options.env === '3') {
        //预生产的包进ht_pre_production
        return 'ht_pre_production/';
    } else if (global.options.env === '4') {
        //生产的包进ht_production
        return 'ht_production/';
    }
})();

console.log('filePath ' + filePath)


//判断当前环境是否为预生产/生产
const isPro = global.options.env == 3 || global.options.env == 4 ? true : false;

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

//获取所有js入口文件，修改为多入口打包
//var entryJS = utils.getFiles( path.resolve(__dirname, '../web/entry/**/*.js'));

//devPlugins的配置
var devPlugins = [

    new webpack.optimize.ModuleConcatenationPlugin({}),

    //new webpack.HotModuleReplacementPlugin(),

    //创建一个在编译时可以配置的全局常量
    // new webpack.DefinePlugin({
    //   'process.env': env
    // }),
    
    new ExtractTextPlugin({
        filename: utils.assetsPath('[name].css?v=[contenthash]'),
        allChunks: true,
    }),

    //提取公共js
    new webpack.optimize.CommonsChunkPlugin({
        name: 'commonResources/common',
    }),


    // new webpack.DllReferencePlugin({
    //   manifest: require('../manifest.json'),
    //   context: __dirname
    // }),


    //使用ProvidePlugin加载的模块在使用时将不再需要import和require进行引入
    // new webpack.ProvidePlugin({ 
    //    //$: "zepto",
    //    //Zepto: 'zepto',
    //    Vue: 'vue',
    // }) ,

    //打包除了echarts之外的代码
    // new webpack.optimize.CommonsChunkPlugin({
    //     name: 'commonResources/common',
    //     //filename: 'commonResources/common.js',
    //     minChunks: function(module) {
    //         return (
    //             module.resource &&
    //             ((/\.js$/.test(module.resource) &&
    //             module.resource.indexOf(
    //                 path.join(__dirname, '../node_modules')
    //             ) === 0 && module.resource.indexOf('echarts') == -1 )
    //             || /\.css$/.test(module.resource) )
    //         ) 
    //     }
    // }),

    //从common.js里把moment和axios相关代码抽取出来
    //webpack.js需在common.js之前引入
    new webpack.optimize.CommonsChunkPlugin({
        name: 'commonResources/webpack',
        //filename: 'commonResources/webpack.js',
        chunks: ['commonResources/common'],
        minChunks: function(module) {
            return (
                module.resource && (module.resource.indexOf('moment') != -1 || module.resource.indexOf('axios') != -1)
            )
        }
    }),


    //js的HappyPack
    new HappyPack({
        id: 'jsbabel',
        loaders: ['babel-loader?cacheDirectory=true'],
        threadPool: HappyPack.ThreadPool({ size: os.cpus().length }),
        cache: true,
        verbose: true
    }),

    //css的HappyPack
    // new HappyPack({
    //     id: 'cssbabel',
    //     loaders: ['css-loader?mportLoaders=1'],
    //     //threadPool: HappyPack.ThreadPool({ size: os.cpus().length }),
    //     cache: false,
    //     verbose: true
    //     //verbose: true
    //   }),


    // //less的HappyPack
    // new HappyPack({
    //     id: 'lessbabel',
    //     loaders: ['less-loader'],
    //     //threadPool: HappyPack.ThreadPool({ size: os.cpus().length }),
    //     cache: false,
    //     verbose: true
    //     //verbose: true
    //   }),


    //引入htmlBeforeProcess
    // new HtmlBeforeProcess({
    //     options: {
    //        titelReg : new RegExp("(\<title\>){1}[^(\<title)(\</title\>)]+(\</title\>){1}", "i")
    //     }
    // })
];


if (isPro) {

    //预生产或生产环境，增加文件压缩处理
    const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
    //const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

    //压缩js
    devPlugins.push(new UglifyJsPlugin({
        uglifyOptions: {
            mangle: false,
            compress: {
                warnings: true,
            },
        },
        parallel: true
    }))

    //压缩css
    // devPlugins.push(new OptimizeCSSPlugin({
    //     cssProcessorOptions: { safe: true, discardComments: { removeAll: true }}
    // }))
}


//module rules的配置
var moduleRules = utils.styleLoaders({
    extract: true,
    usePostCSS: true
});
moduleRules.unshift({
    test: /\.vue$/,
    loader: 'vue-loader',
    options: {
        loaders: utils.cssLoaders({
            //sourceMap: sourceMapEnabled,
            extract: true
        }),
        //cssSourceMap: sourceMapEnabled,
        //cacheBusting: config.dev.cacheBusting,
        transformToRequire: {
            video: ['src', 'poster'],
            source: 'src',
            img: 'src',
            image: 'xlink:href'
        }
    }
}, {
    test: /\.js$/,
    //loader: 'babel-loader',
    loader: 'happypack/loader?id=jsbabel',
    // options: {
    //     cacheDirectory: true
    // },
    include: [resolve('node_modules/webpack-dev-server/client')]
})


//获取项目里的所有html文件
//var pages = utils.getFiles( path.resolve(__dirname, '../web/views/**/*.vue')); 

//循环pages，对各页面进行处理
//这里使用webpack的HtmlWebpackPlugin插件
//conf为该插件的配置项
//将每个文件的conf循环插入plugins，可以实现多页面打包
for (var chunkname in vueFiles) {

    //filePath为文件路径
    var filePath = vueFiles[chunkname].substring(vueFiles[chunkname].indexOf('src/') + 4, vueFiles[chunkname].lastIndexOf('.'));

    var conf = {
        filename: path.resolve(__dirname, '../' + finalPath + '/' + filePath + '.html'),
        //文件模板
        template: 'build/template/template.html',
        //可以对head和body做修改
        inject: false,
        //设置该页面引用的js和css文件，生成html时，会在对应处循环jsChunks和cssChunks插入文件
        jsChunks: [ '/commonResources/webpack.js', '/commonResources/common.js', '/' + chunkname + '.js'],
        cssChunks: ['/commonResources/common.css', '/' + chunkname + '.css'],
        //压缩HTML的配置，这里仅去掉注释
        minify: {
            removeComments: true,
            collapseWhitespace: false,
            removeAttributeQuotes: false
        },
        //设置页面title，从titleList中获取
        title: (function(filePath) {
            return titleList[filePath] ? titleList[filePath] : '';
        })(filePath)
    }
    //把每个conf循环插入plugins
    devPlugins.push(new HtmlWebpackPlugin(conf));
}


const webpackConfig = {
    entry: jsFiles,
    output: {
        filename: utils.assetsPath('[name].js?v=[chunkhash]'),
        //输出文件的路径
        path: path.resolve(__dirname, '../' + finalPath + '/'),
        //资源的发布地址，当配置过该属性后，
        //打包文件中所有通过相对路径引用的资源都会被配置的路径所替换
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json', '.less', '.css'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@src': resolve('src'),
            '@common': resolve('common'),
            '@include': resolve('common/include'),
            '@conf': resolve('conf'),
        },
        modules: [resolve('node_modules')]
    },
    module: {
        rules: moduleRules
    },
    plugins: devPlugins,
    node: {
        setImmediate: false,
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
}



module.exports = webpackConfig
