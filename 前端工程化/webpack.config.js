const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin') //提取css代码
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const { type } = require('os');

module.exports = {
    // 打包模式(development 开发模式-使用相关内置优化)
    mode: 'development',

    // 入口
    entry: path.resolve(__dirname, 'src/login/index.js'),
    //  出口 -> 所有filename 相对路径-> 相对于出口的path
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'login/index.js',
        clean : true
    },

    // 插件 -> webpack 更多功能
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'public/login.html'),
            filename: 'login/main.html',
        }),
        new MiniCssExtractPlugin()
    ],

    // 加载器 webpack 识别更多模块内容
    module: {
        rules: [
            {
                test: /\.css$/i,
                // use: ["style-loader" , "css-loader"] => 插入到dom中 不能和miniCssextract（单独抽成一个css文件） 同时使用
                use: [MiniCssExtractPlugin.loader , "css-loader"] //从后向前读取
            },

            //图片压缩配置
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: 'asset',
                generator : {
                    filename : 'assets/[hash][ext][query]'
                }
            },
        ],
    },

    //优化打包过程  
    optimization: {
        // 最小化   
        minimizer: [
            `...`, // 该语法扩展现有的minimizer，保证js代码还能压缩
            new CssMinimizerWebpackPlugin(),
        ]
    }
};