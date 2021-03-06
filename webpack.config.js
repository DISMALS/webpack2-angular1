const path = require('path');
const webpack = require('webpack');
const uglifyJs = require('uglifyjs-webpack-plugin');
const fs = require('fs');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
// const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');


//获取所有的html文件
// let htmlTpl = require('./resolvehtml')('./app/view/', '/view/');

//从打包文件中抽离css文件
const extractTextPlugin = require('extract-text-webpack-plugin');
const cssTwo = new extractTextPlugin('css/[name]-common.css?[contenthash:6]');
const cssOne = new extractTextPlugin('css/[name]-main.css?[contenthash:6]');
// 生成html文件
const htmlWebpackPlugin = require('html-webpack-plugin');

//区分开发和生产环境的具体配置
const webpackDev = require('./webpack.dev');
const webpackProduc = require('./webpack.produc');

//判断是开发环境还是生产环境
let npmEvent = process.env.npm_lifecycle_event;

let config = (npmEvent == 'dev' ? webpackDev : webpackProduc);

config.entry = {
    vendor: path.join(__dirname, './app/vendor.js'),
    // plugin: path.join(__dirname, './app/plugins.js'),
    index: path.join(__dirname, './app/index.js')
};

config.output = {
    publicPath: (npmEvent == 'dev' ? 'http://localhost:9000/' : 'https://test.asthmachina.org/'), //外部引用的根地址(npmEvent == 'dev' ? '/' : 'http://test.yunpractice.com')
    path: path.resolve(__dirname, 'build'),
    filename: (npmEvent == 'dev' ? 'js/[name].js?[hash]' : 'js/[name].js?[chunkhash]'),
    chunkFilename: (npmEvent == 'dev' ? 'js/[name].js?[hash]' : 'js/[name].js?[chunkhash]'),
    libraryTarget: "umd",
    hashDigestLength: 12
}

config.module = {
    rules: [{ //编译解析js文件
            test: /\.js$/,
            exclude: /node-modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['latest']
                }
            }]
        },
        { //编译css文件
            test: /\.css$/,
            use: cssTwo.extract({
                fallback: 'style-loader',
                use: [{
                        loader: 'css-loader',
                        options: {
                            modules: false,
                            minimize: (npmEvent == 'dev' ? false : true)
                        }
                    },
                    'resolve-url-loader'
                ]
            })
        },
        { //编译解析less文件
            test: /\.less$/,
            use: cssOne.extract({
                fallback: 'style-loader',
                use: [{
                        loader: 'css-loader',
                        options: {
                            modules: false,
                            minimize: (npmEvent == 'dev' ? false : true)
                        }
                    },
                    'postcss-loader',
                    'resolve-url-loader',
                    'less-loader'
                ]
            })
        },
        { //编译图片
            test: /\.(png|jpg|jpeg|gif|woff|woff2|eot|ttf)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 1024,
                    name: 'images/[name].[ext]?[hash:6]'
                }
            }]
        },
        { //编译多媒体文件
            test: /\.(mp4|ogg|svg|ico)/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash:6]',
                    outputPath: '/images/'
                }
            }]
        },
        { //解析html文件中引用图片的路径
            test: /\.html$/,
            use: [{
                loader: 'html-loader',
                options: {
                    attrs: ['img:src', 'link:href', 'script:src'],
                    minimize: (npmEvent == 'dev' ? false : true),
                    removeComments: (npmEvent == 'dev' ? false : true),
                    collapseWhitespace: (npmEvent == 'dev' ? false : true)
                }
            }]
        },
        { //解析json文件
            test: /\.json$/,
            use: ['json-loader']
        }
    ]
};

config.plugins = [
    new htmlWebpackPlugin({
        title: '哮喘患者管理平台',
        filename: 'index.html?[hash:12]',
        template: './app/index-tpl.html',
        inject: 'body',
        // hash:true,
        cache:false,
        minify: {
            removeAttributeQuotes: (npmEvent == 'dev' ? false : true),
            collapseWhitespace: (npmEvent == 'dev' ? false : true),
            removeComments: (npmEvent == 'dev' ? false : true)
        }
    }),
    /*    new HtmlWebpackExternalsPlugin([{
        name: 'VODUpload',
        var: 'VODUpload',
        url: './config/vod-sdk-upload-1.1.0.min.js'
    }], {
        basedir: __dirname
    }),*/
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: 5,
        chunks: ['vendor', 'index'] //, 'index'
    }),
    new webpack.BannerPlugin({
        banner: "author:wangyong, hash:[hash], chunkhash:[chunkhash], name:[name], filebase:[filebase], query:[query], file:[file]"
    }),
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
            // _: 'underscore'
    }),

    require('autoprefixer'),
    cssOne,
    cssTwo
];

config.resolve = {
    extensions: ['.js', '.less', '.html', '.css', '.json'],
    modules: ['node_modules', path.join(__dirname, './app')]
};

if (npmEvent == 'dev') {
    config.plugins.push(new webpack.HotModuleReplacementPlugin(), new OpenBrowserPlugin({ url: 'http://localhost:9000/' }));
} else {
    let pluginArr = [
        new uglifyJs({
            ecma: 8,
            output: {
                comments: false,
                beautify: false
            },
            warnings: false
        }),
        new webpack.HashedModuleIdsPlugin({
            hashDigestLength: 12
        })
    ]
    config.plugins.concat(pluginArr);
}

module.exports = config;