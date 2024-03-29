'use strict'
const utils = require('./utils')
//const config = require('./vueConfig')
//const isProduction = process.env.NODE_ENV === 'production'
// const sourceMapEnabled = isProduction
//   ? config.build.productionSourceMap
//   : config.dev.cssSourceMap

module.exports = {
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
