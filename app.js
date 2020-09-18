const Koa = require('koa')
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const koaBody = require('koa-body')
const logger = require('koa-logger')

const defaultRouter = require('./routes')
const allApi = require('./routes/api')
const { apiAuth } = require('./utils')

// console.log('all', allApi)

const app = new Koa()

// error handler
onerror(app)

app.use(koaBody({
    multipart: true
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(apiAuth())

app.use(views(__dirname + '/views', {
    extension: 'html'
}))

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
    console.log(`query: `, ctx.request.query)
    console.log(`reqbody: `, ctx.request.body)
})

// routes
app.use(defaultRouter.routes(), defaultRouter.allowedMethods())
for (const key in allApi) {
    if (allApi.hasOwnProperty(key)) {
        const api = allApi[key]
        app.use(api.routes(), api.allowedMethods())
    }
}

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app
