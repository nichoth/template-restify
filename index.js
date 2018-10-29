var restify = require('restify')
var { plugins } = restify
var errs = require('restify-errors')
var Pino = require('restify-pino-logger')
var Cors = require('restify-cors-middleware')

var pino = Pino()
var cors = Cors({
    origins: ['*'],
    allowHeaders: ['X-Requested-With']
})

var server = restify.createServer()
server
    .pre(cors.preflight)
    .use(cors.actual)
    .use(pino)
    .use()
    .use(plugins.queryParser({ mapParams: false }))
    .use(plugins.bodyParser())

server.get('/hello/:name', function (req, res, next) {
    res.send('hello ' + req.params.name)
    req.log.info('hello route')
    next()
})

server.listen(8000, function () {
    pino.logger.info(server.name + ' listening at ' + server.url)
})

server.on('close', function () {
    pino.logger.info(`${server.name} at ${server.url} close`)
})

server.on('error', function (err) {
    pino.logger.fatal(err)
    throw err
})

module.exports = server

