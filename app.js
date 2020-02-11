const http = require('http')
const createError = require('http-errors')
const express = require('express')
const nunjucks = require('nunjucks')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const sassMiddleware = require('node-sass-middleware')
//controller
const controller = require('./controllers')
//flash  메시지 관련
const flash = require('connect-flash')
//passport 로그인 관련
const passport = require('passport')
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const db = require('./database/models')
// redis
// const client = require('./config/redis');
// const RedisStore = require('connect-redis')(session);

const env = process.env.NODE_ENV || 'development';
console.log(env);

function dbConnection() {
    db.sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.')
            // TODO 서버가 뜰 때, DB 테이블 자동으로 생성해줌
            if (env == 'development') {
                // return db.sequelize.drop()
                // return db.sequelize.sync()
                // return db.sequelize.sync({
                //     force: true,
                // })
            }
            if (env == 'test') {}
            if (env == 'production') {}
        })
        .then(() => {
            console.log('DB Sync complete.')
            // 더미 데이터가 필요하면 아래 설정
            if (env == 'development') {
                // require('./config/insertInquirysDummyData')()
                // require('./config/insertNewsDummyData')()
                // require('./config/insertUserDummyData')()
            }
            if (env == 'test') {}
            if (env == 'production') {}
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err)
        })
}
dbConnection()

var app = express()

// view engine setup
var noCaching = false
if (env == 'development') {
    noCaching = true
}
nunjucks.configure('template', {
    autoescape: true,
    express: app,
    noCache: noCaching,
})
app.set('view engine', 'html')
app.set('views', path.join(__dirname, 'template'))

app.use(logger('dev'))
app.use(express.json())
app.use(
    express.urlencoded({
        extended: false,
    }),
)
app.use(cookieParser())
if (env !== 'development') {
    app.use(
        '/stylesheets',
        sassMiddleware({
            src: path.join(__dirname, 'sass'),
            dest: path.join(__dirname, 'public/stylesheets'),
            indentedSyntax: false, // true = .sass and false = .scss
            sourceMap: true,
            outputStyle: 'compressed',
            // debug: false
        }),
    )
}
app.use(express.static(path.join(__dirname, 'public')))
app.use('/uploads', express.static('uploads'))
app.use('/static', express.static('static'))

//session 관련 셋팅
const sessionMiddleWare = session({
    secret: 'conacoin',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 2000 * 60 * 60, //지속시간 2시간
    },
    // store: new RedisStore({client}),
    store: new SequelizeStore({
        db: db.sequelize,
    }),
})
app.use(sessionMiddleWare)
//passport 적용
app.use(passport.initialize())
app.use(passport.session())
//플래시 메시지 관련
app.use(flash())

//로그인 정보 뷰에서만 변수로 셋팅, 전체 미들웨어는 router위에 두어야 에러가 안난다
app.use(function (req, res, next) {
    // app.locals.myname = "nodejs";
    app.locals.isLogin = req.isAuthenticated()
    app.locals.req_path = req.path
    app.locals.req_user = req.user
    app.locals.req_query = req.query
    //app.locals.urlparameter = req.url; //현재 url 정보를 보내고 싶으면 이와같이 셋팅
    //app.locals.userData = req.user; //사용 정보를 보내고 싶으면 이와같이 셋팅
    next()
})

app.use(controller)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404))
})
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    if (err.status == 404) {
        return res.render('common/404.html')
    }
    if (err.status == 500) {
        return res.render('common/500.html')
    }
    res.render('error')
})

// error handler
// app.use((req, res, _) => {
//     return res.status(404).render('common/404.html')
// })
// app.use((req, res, _) => {
//     res.status(500).render('common/500.html')
// })

// // http
// // var port = normalizePort(process.env.PORT || '3000');
// const app = require('./app.js')
// var port = process.env.PORT || '8000'
// app.set('port', port)

// // var server = http.createServer(app)

// const server = app.listen(port, function () {
//     console.log(`Listening to requests on http://localhost:${port}`)
// })

// // const listen = require("socket.io");
// // const io = listen(server);
// // io.use((socket, next) => {
// //     sessionMiddleWare(socket.request, socket.request.res, next);
// // });
// // require("./helpers/socketConnection")(io);

module.exports = app