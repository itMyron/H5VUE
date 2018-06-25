const path = require('path')
const webpack = require('webpack')
const clientConfig = require('./webpack.dev.conf') // 引入开发环境下的 webpack 配置文件
 
module.exports = function setupDevServer(app, opts) {
  const clientCompiler = webpack(clientConfig)
  // 加载 webpack-dev-middleware 插件
  const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    stats: {
      colors: true,
      chunks: false
    }
  })
  app.use(devMiddleware)
  // 关键代码开始
  // 因为开发环境下, 所有的文件都在内存里, 包括由 html-webpack-plugin 生成的 .html 文件, 所以我们需要用 webpack-dev-middleware 提供的 api 从内存里读取
  clientCompiler.plugin('done', () => {
    const fs = devMiddleware.fileSystem // 访问内存
    const filePath = path.join(clientConfig.output.path, 'index.html') // 读取的文件, 文件名和 html-webpack-plugin 生成的文件名要求一致
    if (fs.existsSync(filePath)) { // 判断下文件是否存在
      const index = fs.readFileSync(filePath, 'utf-8') // 从内存里取出
      opts.indexUpdated(index) // 将取出的文件通过 indexUpdated 函数返回, 这个函数怎么来的, 后面会说明
    }
    const adminPath = path.join(clientConfig.output.path, 'backend.html') // 同上, 这是第二个入口生成的 .html 文件, 如果还有其他入口, 这个多复制几份
    if (fs.existsSync(adminPath)) {
      const admin = fs.readFileSync(adminPath, 'utf-8')
      opts.adminUpdated(admin)
    }
  })
 
  // 加载热重载模块
  app.use(require('webpack-hot-middleware')(clientCompiler))
  var hotMiddleware = require('webpack-hot-middleware')(clientCompiler)
  // 当修改 html-webpack-plugin 模版时, 自动刷新整个页面
  clientCompiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
      hotMiddleware.publish({
        action: 'reload'
      })
      cb()
    })
  })
}