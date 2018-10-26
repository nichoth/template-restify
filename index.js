var restify = require('restify')
var { plugins } = require('restify')
var errs = requrie('restify-errors')

var server = restify.createServer()

server
    .use(plugins.queryParser({ mapParams: false }))
    .use(plugins.bodyParser())

server.get('/hello/:name', function (req, res, next) {
    res.send('hello ' + req.params.name)
    next()
})

server.listen(8000, function () {
    console.log(server.name + ' listening at ' + server.url)
})

module.exports = server

