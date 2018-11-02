var restify = require('restify')
var { plugins } = restify
var errs = require('restify-errors')
var Pino = require('restify-pino-logger')
var cors = require('cors')
var helmet = require('helmet')

var pino = Pino()

var server = restify.createServer()
server
    .use(helmet())
    .use(cors())
    .use(pino)
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

