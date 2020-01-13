'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder') //获取当前可用的port. (vue-cli配置好了，一旦端口被占用，报错，再次运行时会打开：8080+1,依次类推...8080+n)

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

//测试node 之path模块与本次demo无关
function testNodePath() {
  // const path = require('path');  // 引入path模块
  // let linuxPath = '/Users/aicoder/abc.html';
  // let name = path.basename(linuxPath);
  // console.log(name);
  // console.log(path.posix.basename('/tmp/myfile.html'), '=====path.posix');
  // console.log(path.posix.basename('C:\\temp\\myfile.html'), '====path.win32');

  // let winPath = 'c:\\temp\\bcd.html';
  // let winName = path.basename(winPath);
  // console.log(winName);

  // console.log(path.basename(linuxPath, '.html')); // => abc,去掉后缀输出文件名

  console.log(path.resolve(__dirname, '../static'), '=====????') //     返回/Users/ex-yaomingfei001/Downloads/from___github/vue_iconfont-master/static
}

testNodePath();

// build/webpack.dev.conf.js 大概在15行
const externalConfig = JSON.parse(JSON.stringify(utils.externalConfig));  // 读取配置
utils.getExternalModules(externalConfig); // 获取到合适的路径（引用类型，自动改变）

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    //historyApiFallback 表示路由跳转错误就会自动跳回首页
    historyApiFallback: {
      // node提供了win32和posix兼容的api
    // 默认情况下，node会根据不同的系统做相关兼容处理，
    // 力保输出的结果在不同平台下是一致的，但是某些情况下还是不能完美的兼容所有的情况。
    // 所以，node提供了win32和posix各自对应path的所有的api。
    // 也就是说：path模块的api都可以通过path.win32 或者 path.posix调用。
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin. 不设置的话，默认是当前执行的目录，一般是项目根目录。会在项目根目录查找index.html文件。
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath, //开发环境dev打包到一个暂时的缓存中
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin //是否输出编译日志等 true表示隐藏
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    // new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      favicon: path.join(__dirname, '..', 'favicon.ico'),
      cdnConfig: externalConfig, // cdn配置
      onlyCss: true, //dev下只加载css
    }),
    // copy custom static assets
    // 使用：// 指将指定文件打包到目标文件

// 　　　　　new CopyWebpackPlugin([{

// 　　　　　　from: path.resolve(__dirname, '../static'), //定义要拷贝的源目录，必填项
// 　　　　　　to: config.build.assetsSubDirectory, //定义要拷贝到的目标目录，非必填，不填写则拷贝到打包的output输出地址中
// 　　　　　}])


    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      // devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
      //   compilationSuccessInfo: {
      //     messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
      //   },
      //   onErrors: config.dev.notifyOnErrors
      //   ? utils.createNotifierCallback()
      //   : undefined
      // }))

      resolve(devWebpackConfig)
    }
  })
})
