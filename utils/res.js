class Res {
    constructor() {
        this.codes = [200, 500, 401]
    }

    success(data = null, code = 200) {
        if (this.codes.indexOf(code) < 0) return
        return {
            code,
            msg: 'success',
            data
        }
    }

    error(data = null, code = 500) {
        if (this.codes.indexOf(code) < 0) return
        return {
            code,
            msg: 'error',
            data
        }
    }
}
Res.getInstance = function() {
    if (!Res.instance) {
        Res.instance = new Res()
    }
    return Res.instance
}

module.exports = Res.getInstance()
