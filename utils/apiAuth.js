const jwt = require('jsonwebtoken')
const res = require('./res')
const cert = 'ns'

module.exports = function() {
    const whiteUrl = ['/api/user/logon', '/api/user/login', '/api/library/generals']
    return async function (ctx, next) {
        if (ctx.url.startsWith('/api') && whiteUrl.indexOf(ctx.url) < 0) {
            try {
                const token = ctx.request.header.auth
                const rt = jwt.verify(token, cert)
                // console.log('apiAuth', ctx.request.body, ctx.url, ctx.request.header, token, rt)
                await next()
            } catch (error) {
                console.log('err', error, error.name, error.message)
                if (error.name === 'TokenExpiredError') {
                    ctx.body = res.error('登录信息已过期，请重新登录！', 401)
                } else if (error.name === 'JsonWebTokenError') {
                    ctx.body = res.error('鉴权失败！', 401)
                } else {
                    ctx.body = res.error('auth验证失败！', 401)
                }
            }
        } else {
            await next()
        }
    }
}
