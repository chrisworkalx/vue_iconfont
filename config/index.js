'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': {
        target: 'http://192.168.31.230:3000', //后端服务器域名ip
        changeOrigin: true, //允许跨域
        pathRewrite: {
          '^/api': '' //以这个开头的变为空
        }
      }
    }, //需要代理的接口，可以跨域

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: false,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'), //模板

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'), //打包后要存放的路径
    assetsSubDirectory: 'static', //除了 index.html 之外的静态资源要存放的路径
    assetsPublicPath: '/', //代表打包后，index.html里面引用资源的的相对地址


    //for-example
    //index: path.resolve(__dirname, '../dist/index.html'),// Paths
    // assetsRoot: path.resolve(__dirname, '../dist'),
    // assetsSubDirectory: './assets/',
    // assetsPublicPath: './hello/',

    // 打包后为
    // <script type="text/javascript" src="./hello/assets/js/manifest.js"></script>
    // <script type="text/javascript" src="./hello/assets/js/vendor.js"></script>
    // <script type="text/javascript" src="./hello/assets/js/app.js"></script>
        /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false, //是否开启cssSourceMap
    productionGzipExtensions: ['js', 'css'], //需要用gzip压缩的文件扩展名

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
