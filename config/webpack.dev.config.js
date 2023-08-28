const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge'); // 插件引入
const commonConfig = require('./webpack.common.config'); // 引入共用配置
const proxy = require('./proxy');

const devConfig = {
    // 模式开发/生产
    // mode:'production',
    //devtool: 'nosources-source-map', // production

    mode: 'development',
    // 开发环境添加配置，生产环境默认使用tree shaking进行打包优化 
    //package.json添加sideEffect:false所有文件都可以

    optimization: {
        usedExports: true,
    },

    //出错时映射到业务代码出错的位置  source-map

    devtool: 'eval-cheap-module-source-map', // development
    // 开发服务器
    
    devServer: {
        // contentBase: path.join(__dirname, 'dist'), // 指定被访问html页面所在目录的路径
        static: path.join(__dirname, 'dist'), // 注意：Webpack5 中已用 static 替代 contentBase
        open: true, // 开启服务器时，自动打开页面
        compress: true, // 开启 gzip 压缩
        host:'crm-local.qa.hsmob.com',
        port: 8080, // 自定义端口号
        hot: true, // 开启热更新
        // publicPath: '/' // 服务器访问静态资源的默认路径，优先级高于 output.publicPath
        proxy,
        
    },

    // 部署目标 默认：target:'web' 使用webpack-dev-server需要切换成web
    // target: 'node',
    target: 'web',
   
    // 插件
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],

}
module.exports = merge(commonConfig, devConfig); // 共用配置与开发配置合并