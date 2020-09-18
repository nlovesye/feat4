const router = require('koa-router')()
const { db, res } = require('../../utils')

router.prefix('/api/library')

router.get(`/generals`, async (ctx, next) => {
    // db.addJson('test')
    // db.insert('test', general)
    // db.clear('test')
    const rt = db.findJson('test')
    // console.log('str', str)
    ctx.body = res.success(rt)
})

module.exports = router
