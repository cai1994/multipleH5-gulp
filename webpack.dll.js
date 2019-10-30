// webpack.dll.js
const webpack = require('webpack')
const path = require('path')
const vendors = [
    'vue',
    'axios',
    'moment'
]

module.exports = {
    output: {
        //打出到common/vendor/dll文件夹
        path:  path.resolve(__dirname,'./common/vendor/dll'),
        filename:'[name].js',
        library: '[name]'
    },
    entry: {
        "lib": vendors
    },
    plugins: [
        new webpack.DllPlugin({
            path: 'manifest.json',
            name: '[name]',
            context: __dirname
        })
    ]
}