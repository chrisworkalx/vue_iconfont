'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')

// build/utils.js 国内免费cdn镜像源
exports.cdnBaseHttp = 'https://cdn.bootcss.com';


//  build/utils.js external配置
// name 模块名称，与package.json同名
// scope 模块作用域命名
// js js地址
// css css地址

// 这里特别注意scope，它是webpack配置的external参数下的信息，
// 比如vue的作用域命名是Vue，vue-router的作用域命名是VueRouter，
// element-ui的作用域命名是ELEMENT，同理，jq的作用域命名是JQuery，
// 具体做法是先引入该资源，然后在控制台依次输入近似的值，
// 一个个匹配(目前没找到更好的做法)。
// 链接：https://www.jianshu.com/p/9248db0349fb


exports.externalConfig = [
  { name: 'vue', scope: 'Vue', js: 'vue.min.js' },
  { name: 'vue-router', scope: 'VueRouter', js: 'vue-router.min.js' },
  { name: 'axios', scope: 'axios', js: 'axios.min.js' },
  { name: 'element-ui', scope: 'ELEMENT', js: 'index.js', css: 'theme-chalk/index.css' },
];

// build/utils.js 获取模块版本号
//npm_package_devDependencies_node_sass: '^4.12.0', 变为node-sass: "4.12.0"
exports.getModulesVersion = () => {
  let mvs = {};
  let regexp = /^npm_package_.{0,3}dependencies_/gi;
  for (let m in process.env) { // 从node内置参数中读取，也可直接import 项目文件进来
    // console.log(process.env, '=====process.env');
    if (regexp.test(m)) { // 匹配模块
       // 获取到模块版本号
      mvs[m.replace(regexp, '').replace(/_/g, '-')] = process.env[m].replace(/(~|\^)/g, '');
    }
  }
  return mvs;
};

//导出不需要被打包的cdn模块配置重点
exports.getExternalModules = config => {
  let externals = {}; // 结果
  let dependencieModules = this.getModulesVersion(); // 获取全部的模块和版本号
  // console.log(dependencieModules, '=======dependencieModules');
  config = config || this.externalConfig; // 默认使用utils下的配置
  config.forEach(item => { // 遍历配置
    if (item.name in dependencieModules) {
      let version = dependencieModules[item.name];
      // 拼接css 和 js 完整链接
      item.css = item.css && [this.cdnBaseHttp, item.name, version, item.css].join('/');
      item.js = item.js && [this.cdnBaseHttp, item.name, version, item.js].join('/');
      externals[item.name] = item.scope; // 为打包时准备
    } else {
      throw new Error('相关依赖未安装，请先执行npm install ' + item.name);
    }
  });
  return externals;
};

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}


// {
//   sourceMap: sourceMapEnabled,
//   extract: isProduction
// }
exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
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
