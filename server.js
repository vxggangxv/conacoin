// http
// var port = normalizePort(process.env.PORT || '3000');
const http = require('http');
const app = require('./app.js');
const reload = require('reload');
const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || '3000';
app.set('port', port);

let isDisableKeepAlive = false;
app.use(function (req, res, next) {
    if (isDisableKeepAlive) {
        res.set('Connection', 'close');
    }
    next();
});

const server = http.createServer(app);

if (env == 'development') {
    // Reload code here
    reload(app)
        .then(function (reloadReturned) {
            // reloadReturned is documented in the returns API in the README

            // Reload started, start web server
            server.listen(port, function () {
                console.log(
                    `Listening to reload on http://localhost:${port} in ${env} mode`
                );
            });
        })
        .catch(function (err) {
            console.error(
                'Reload could not start, could not start server/sample app',
                err
            );
        });
} else {
    server.listen(port, function () {
        process.send('ready');
        console.log(
            `Listening to requests on http://localhost:${port} in ${env} mode`
        );
    });
}

process.on('SIGINT', function () {
    isDisableKeepAlive = true;
    server.close(function () {
        console.log('server closed');
        process.exit(0);
    });
});

// const listen = require("socket.io");
// const io = listen(server);
// io.use((socket, next) => {
//     sessionMiddleWare(socket.request, socket.request.res, next);
// });
// require("./helpers/socketConnection")(io);