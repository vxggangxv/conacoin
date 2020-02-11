// http
// var port = normalizePort(process.env.PORT || '3000');
const app = require('./app.js')
// import dotenv from 'dotenv'
var port = process.env.PORT || '3000'
app.set('port', port)

// var server = http.createServer(app)

let isDisableKeepAlive = false
app.use(function(req, res, next) {
    if (isDisableKeepAlive) {
        res.set('Connection', 'close')
    }
    next()
})

const server = app.listen(port, function() {
    process.send('ready')
    console.log(`Listening to requests on http://localhost:${port}`)
})

process.on('SIGINT', function() {
    isDisableKeepAlive = true
    server.close(function() {
        console.log('server closed')
        process.exit(0)
    })
})

// const listen = require("socket.io");
// const io = listen(server);
// io.use((socket, next) => {
//     sessionMiddleWare(socket.request, socket.request.res, next);
// });
// require("./helpers/socketConnection")(io);
