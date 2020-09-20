const router = require('koa-router')()
const { db } = require('../utils')

router.get('/', async (ctx, next) => {
    // db.addJson('test')
    // db.insert('test', general)
    // db.removeAll('test')
    const str = db.findJson('nloves')
    // console.log('str', str)
    await ctx.render('index', {
        // title: 'Hello Koa 2!',
        // content: str ? JSON.stringify(str) : ''
    })
})

module.exports = router
