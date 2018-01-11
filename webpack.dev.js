module.exports = {
    devServer:{
        port:9000,
        inline:true, //开启热替换
        historyApiFallback: true, //刷新时保持当前状态
        hot:true, //开启热更新对应plugins里的new webpack.HotModuleReplacementPlugin()，两者配合
        stats:{ //编译时的控制台的状态输出内容
            colors:true
        }
    },
    devtool:'cheap-eval-source-map' //开发工具
}