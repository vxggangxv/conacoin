// http
// var port = normalizePort(process.env.PORT || '3000');
const app = require('./app.js')
var port = process.env.PORT || '8000'
app.set('port', port)

// var server = http.createServer(app)

const server = app.listen(port, function () {
    console.log(`Listening to requests on http://localhost:${port}`)
})

// const listen = require("socket.io");
// const io = listen(server);
// io.use((socket, next) => {
//     sessionMiddleWare(socket.request, socket.request.res, next);
// });
// require("./helpers/socketConnection")(io);