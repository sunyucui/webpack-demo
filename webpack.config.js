const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');


module.exports = {
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
        port: 9000, // 自定义端口号
        hot: true, // 开启热更新
        // publicPath: '/' // 服务器访问静态资源的默认路径，优先级高于 output.publicPath
    },

    // 部署目标 默认：target:'web' 使用webpack-dev-server需要切换成web
    // target: 'node',
    target: 'web',
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
            template: "./src/index.html",
        }),
        new webpack.HotModuleReplacementPlugin()
    ],

}