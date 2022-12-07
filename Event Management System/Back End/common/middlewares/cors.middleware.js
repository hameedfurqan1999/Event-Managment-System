const clientEndpoint = require('./../config/env.config').clientEndpoint

module.exports = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', clientEndpoint)
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
    res.header('Access-Control-Expose-Headers', 'Content-Length')
    res.header(
        'Access-Control-Allow-Headers',
        'Accept, Authorization, Content-Type, X-Requested-With, Range'
    )
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200)
    } else {
        return next()
    }
}
