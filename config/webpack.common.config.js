const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');


module.exports = {
    
    // 入口文件
    entry: './src/index.js',
    // 
    output: {
        // __dirname， 当前运行的js文件所在的目录，绝对路径
        path: path.resolve(__dirname, 'dist'),
        // 输出：./dist/bundle.js
        filename: 'bundle.js',
        // 每次打包清除之前的目录文件
        clean: true
    },

    module: {
        rules: [
            // webpack5 type: asset替代了raw-loader、url-loader、file-loader
            {
                // 图片,文本
                test: /\.(jpe?g|png|gif|svg|txt|xml)$/i,
                type: 'asset'
                //转换为 "asset/resource"
            },
            // 样式文件
            {

                test: /\.(css|less)$/,
                use: ["style-loader", "css-loader","less-loader"],
            },
           
            // 对es6的转换 js ts
            {
                test: /\.(js|ts)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }

        ]
    },
    // 插件
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
        // new webpack.HotModuleReplacementPlugin()
    ],

}