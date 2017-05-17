const webpack = require('atool-build/lib/webpack')
const path = require('path')

module.exports = function (webpackConfig, env) {
  webpackConfig.babel.plugins.push('transform-runtime')
  webpackConfig.babel.plugins.push(['import', {
    libraryName: 'antd',
    style: true
  }])

  webpackConfig.devtool = '#eval' //#inline-source-map

  // Support hmr
  if (env === 'development') {
    webpackConfig.babel.plugins.push(['dva-hmr', {
      entries: [
        './src/index.js'
      ]
    }])
  } else {
    webpackConfig.babel.plugins.push('dev-expression')
    webpackConfig.entry = {
      index: './src/index.js',
      // common: [ 'react', 'react-dom', 'classnames', 'antd', 'dva', 'dva-loading', 'qs', 'js-cookie', 'moment', 'rc-queue-anim', 'rc-tween-one']
    }
  }
  //mock data config
  webpackConfig.plugins.push(new webpack.DefinePlugin({
    'linxins.app.admin.ISMOCK': true,
    'linxins.app.admin.IS_DYNAMIC_LOAD': true,
    'linxins.app.admin.API_HOST': JSON.stringify('http://192.168.2.202:8082/v2'),
    'linxins.app.admin.SOCKET_HOST': JSON.stringify('ws://127.0.0.1:3000'),
    'linxins.app.admin.CLIENT_ID': JSON.stringify('7_3couvjpeukmc4wc88ww00s8c0cc4wcswc8404oow8ogwksgcck'),
    'linxins.app.admin.CLIENT_SECRET': JSON.stringify('4kztndqf54sgowkcs8kw404c0kc04c0gsgwog8gogwwc8kk8kc'),
    'linxins.app.admin.GRANT_TYPE': JSON.stringify('client_credentials')
  }))

  // Don't extract common.js and common.css (please extract if use common.js)
  webpackConfig.plugins = webpackConfig.plugins.filter(function (plugin) {
    return !(plugin instanceof webpack.optimize.CommonsChunkPlugin)
  })

  // Support CSS Modules
  // Parse all less files as css module.
  webpackConfig.module.loaders.forEach(function (loader, index) {
    if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.less$') > -1) {
      loader.include = /node_modules/
      loader.test = /\.less$/
    }
    if (loader.test.toString() === '/\\.module\\.less$/') {
      loader.exclude = /node_modules/
      loader.test = /\.less$/
    }
    if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.css$') > -1) {
      loader.include = /node_modules/
      loader.test = /\.css$/
    }
    if (loader.test.toString() === '/\\.module\\.css$/') {
      loader.exclude = /node_modules/
      loader.test = /\.css$/
    }
  })

  return webpackConfig
}
