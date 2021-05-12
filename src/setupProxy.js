const proxy = require('http-proxy-middleware')

module.exports = (app)=> {
    app.use(
        proxy('/api', {
            target: 'http://localhost:8888',
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
        })
    )
} 