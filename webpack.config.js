var webpack = require('webpack'),
    path = require("path"),
    //assign  = require('object-assign'),
    //公用路径变量配置
    pathVar = require('./conf/pathVar.js').pathVarObj();

//var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin"); 

function resolve (dir) {
  return path.join(__dirname,  dir)
}

module.exports = {
    //devtool: "source-map",  //生成sourcemap,便于开发调试
    entry: {},
    output: {
        path: path.join(__dirname, "dist/"), //文件输出目录
        //publicPath: "test/js/",     //html引用路径，在这里是本地地
        filename: "[name].js",      //根据入口文件输出的对应多个文件名
    },
    module: {
        //各种加载器，即让各种文件格式可用require引用
        //loaders: [
          //{ test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
          //{ test: /vux.src.*?js$/,loader: 'babel'},
          //{ test: /\.vue$/, loader: 'vue'}
          // {test: /\.less$/, loader: 'style-loader!css-loader?minimize&-autoprefixer!postcss-loader!less-loader'}
        //]
    },
    resolve: {
        //配置别名，在项目中可缩减引用路径，
        //@callback和@deferred是webpack独有的，用于js中引用zepto的库，因此不写到pathVar.js中
        //需要在这里合并一下
        //alias: pathVar,
        extensions: ['.js'],
        alias: {
          'vue$': 'vue/dist/vue.esm.js',
          '@src': resolve('src'),
          '@common' : resolve('common'),
          '@include' : resolve('common/include'),
          '@conf' : resolve('conf'),
        }
    },
};

