'use strict'
const path = require('path')
//const config = require('./vueConfig')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')
const glob = require('glob')
const fs = require('fs')

//读取entry.js模板
const entryJs = fs.readFileSync( path.resolve(__dirname,  './template/entry.js') ,'utf-8')


const isPro = global.options.env == 3 || global.options.env == 4 ? true : false;


exports.assetsPath = function (_path) {

  //config.build.assetsSubDirectory---static文件夹
  const assetsSubDirectory = '';

  //path.posix提供path 的方法，不过总是以 posix 兼容的方式交互。
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: isPro ? true: false //预生产和生产环境，css压缩
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      minimize: isPro ? true: false //预生产和生产环境，css压缩
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        //loader: 'happypack/loader?id=' + loader + 'babel',
        options: Object.assign({}, loaderOptions, {
          //sourceMap: options.sourceMap
           minimize: isPro ? true: false //预生产和生产环境，css压缩
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      // if( loader == 'less'){
      //   return ExtractTextPlugin.extract({
      //     use: ['happypack/loader?id=lessbabel','happypack/loader?id=cssbabel'],
      //     fallback: 'vue-style-loader'
      //   })
      // }
      // else{
        return ExtractTextPlugin.extract({
          use: loaders,
          fallback: 'vue-style-loader'
        })
      //}
      
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(), 
    
    // css: ExtractTextPlugin.extract({
    //     use: [
    //       {
    //         loader: 'happypack/loader?id=cssbabel',
    //       },
    //     ],
    //     fallback: 'vue-style-loader'
    // }),

    // postcss: ExtractTextPlugin.extract({
    //     use: [
    //       {
    //         loader: 'happypack/loader?id=cssbabel',
    //       },
    //     ],
    //     fallback: 'vue-style-loader'
    // }),
    
    less: generateLoaders('less'),
    // less: ExtractTextPlugin.extract({
    //   use: 'happypack/loader?id=lessbabel',
    //   fallback: 'vue-style-loader'
    // }),

    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus'),
    //js: 'happypack/loader?id=jsbabel'
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}


//同步创建多级目录
function makeDir(dirpath) {
    if (!fs.existsSync(dirpath)) {
        var pathtmp;
        dirpath.split("/").forEach(function(dirname) {
            if (pathtmp) {
                pathtmp = path.join(pathtmp, dirname);
            }
            else {
　　　　　　　　　 //如果在linux系统中，第一个dirname的值为空，所以赋值为"/"
                if(dirname){
                    pathtmp = dirname;
                }else{
                    pathtmp = "/"; 
                }
            }
            if (!fs.existsSync(pathtmp)) {

                if (!fs.mkdirSync(pathtmp)) {
                    return false;
                }
            }
        });
    }
    //else{
        //去掉第一个/，继续判断
        //console.log( dirpath );
        //makeDir( dirpath.substring( dirpath.indexOf('/') + 1 ) )
    //}
    return true;
}


//获取文件
exports.getFiles = ( type ) =>{

    var allUrl = [],
        files = {};  //存放js入口文件
    

    //判断project有没有
    if( !!global.options.project ){
        //有，打包对应文件
        for( var i = 0; i< global.options.filesArr.length; i++){

            //console.log( '当前文件：' + '../'+ global.options.filesArr[i] +'**/*.' + type);

            allUrl.push( path.resolve(__dirname, '../'+ global.options.filesArr[i] +'**/*.' + type) );
        }
    }
    else {
        //没有，打包所有文件
        allUrl.push( path.resolve(__dirname, '../src/**/*.' + type) )  ;
    }

    for( var j = 0; j< allUrl.length; j++){

        //console.log( '当前文件：' + allUrl[j] );

        glob.sync(allUrl[j]).forEach(function (name) { 

            /*
              循环所有文件，对文件名做处理，并放入vueFiles数组中，返回vueFiles
             */

            if( name.indexOf('.vue') != -1 && name.indexOf('section/') == -1 && name.indexOf('common/') == -1 ){
              //vue文件，不打包section和common中的
              var n = name.substring((name.lastIndexOf('src/') + 4),name.lastIndexOf('.'));
              files[n] = name;
            }
            else if( name.indexOf('.js') != -1 && name.indexOf('section/') == -1 && name.indexOf('common/') == -1){
                  var filePath = name.substring( name.indexOf('src/') + 4 ),
                      fileName = name.substring( name.lastIndexOf('/') + 1, name.lastIndexOf('.') ),
                      fileUpperName = fileName.replace(fileName.charAt(0), fileName.charAt(0).toUpperCase());

                    var ex = fs.existsSync(path),
                        fp = 'middle/project/entry/' + filePath ;

                     makeDir( fp.substring( 0, fp.lastIndexOf('/')) );

                      //js文件
                      var fileContent = entryJs.replace(/gulpChanEntryName/g, fileUpperName).replace(/gulpChanEntryFile/g, filePath.replace(/\.js/g, ''));
                      //替换less引入
                      if( filePath.indexOf('commonResources/richModules') == -1 ){
                          fileContent = fileContent.replace(/gulpChanLess/g, "import \'\@common\/less\/reset\.less\'; ");
                      }
                      

                      //生成真正的入口文件，并向该文件写入开头部分
                      fs.writeFileSync( fp , fileContent);

                      //设置files[n]
                      var n = name.substring((name.lastIndexOf('src/') + 4), name.lastIndexOf('.'));
                      var jsName = 'middle/project/entry/'+ name.substring((name.lastIndexOf('src/') + 4), name.lastIndexOf('.'));
                      files[n.replace('src/', 'middle/project/')] = path.join(__dirname, '..', jsName) ;
              
            }
            
        }); 
    }
  
    return files

}
//获取文件
// exports.getFiles = ( url ) =>{

//   var files = {}; 
//   glob.sync(url).forEach(function (name) { 
      /*
      循环所有文件，对文件名做处理，并放入files数组中，返回files
       */
//       var n = name.substring((name.lastIndexOf('web/') + 4),name.lastIndexOf('.'));
//       files[n] = name;
//   }); 
//   return files;

// }