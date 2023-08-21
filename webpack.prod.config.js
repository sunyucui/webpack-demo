const { merge } = require('webpack-merge'); // 插件引入
const commonConfig = require('./webpack.common.config'); // 引入共用配置
const prodConfig = {
    mode: 'production',
    //出错时映射到业务代码出错的位置  source-map
    devtool: 'nosources-source-map',
}
module.exports = merge(commonConfig, prodConfig); // 共用配置与生产配置合并