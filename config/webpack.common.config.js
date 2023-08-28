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
                // 图片
                test: /\.(jpe?g|png|gif|svg)$/i,
                type: 'asset'
                //转换为 "asset/resource"
            },

            {
                // 字体文件
                test: /\.(otf|eot|woff2?|ttf|svg)$/i,
                type: "asset", // 一般会转换为 "asset/inline"
            },

            {
                // 数据文件
                test: /\.(txt|xml)$/i,
                type: "asset", // 一般会转换成 "asset/source"
            },
            // 样式文件
            {

                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            // {
            //     test: /\.s[ac]ss$/i,
            //     use: [
            //       // Creates `style` nodes from JS strings
            //       "style-loader",
            //       // Translates CSS into CommonJS
            //       "css-loader",
            //       // Compiles Sass to CSS
            //       "sass-loader",
            //     ],
            //   },
            // 对es6的转换
            {
                test: /\.m?js$/,
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