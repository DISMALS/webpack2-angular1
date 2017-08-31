module.exports = {
    devServer:{
        port:9000,
        contentBase:'./app', // 本地服务器所加载的页面所在的目录
        inline:true, //开启热替换
        hot:true, //开启热更新对应plugins里的new webpack.HotModuleReplacementPlugin()，两者配合
        publicPath:'/', //开发环境下的外部引用根地址
        stats:{ //编译时的控制台的状态输出内容
            colors:true
        }
    },
    devtool:'cheap-eval-source-map' //开发工具
}