module.exports = {
    css: {
        loaderOptions: { // 向 CSS 相关的 loader 传递选项
            less: {
                javascriptEnabled: true
            }
        }
    },

    devServer: {
        port: 7001,
        proxy: {
            '/api': {
                target: 'http://localhost:7700',
                pathRewrite: { '^/api': '/api' }
            }
        }
    },
    pwa: {
        // chainWebpack: config => {
        //     config.plugin('html').tap(args => {
        //         args[0].title = '三国志战略版'
        //         return args
        //     })
        // },
        iconPaths: {
            favicon32: 'favicon.ico',
            favicon16: 'favicon.ico',
            appleTouchIcon: 'favicon.ico',
            maskIcon: 'favicon.ico',
            msTileImage: 'favicon.ico'
        }
    }
}
