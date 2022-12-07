const config = require('./common/config/env.config.js')

const express = require('express')
const app = express()

// Sockets
const http = require('http').createServer(app)
const io = require('socket.io')(http)
http.listen(config.socketPort)
const meetingService = require('./services/meeting')
meetingService.connectSocket(io)


const bodyParser = require('body-parser')
app.use(bodyParser.json())

// Cors
app.use(require('./common/middlewares/cors.middleware'))

// Routers
const mainRouter = require('./routes/main.js')
const AuthorizationRouter = require('./authorization/routes.config')
const UsersRouter = require('./users/routes.config')
AuthorizationRouter.routesConfig(app)
UsersRouter.routesConfig(app)
app.use('/api', mainRouter)


app.listen(config.port, function () {
    console.log('app listening at port %s', config.port)
})
