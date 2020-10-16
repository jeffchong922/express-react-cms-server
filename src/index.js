const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')

const userControllers = require('./user/controllers')
const departmentControllers = require('./department/controllers')
const makeExpressCallback = require('./helpers/express-callback')
const Token = require('./helpers/token')

const app = express()
app.disable('x-powered-by')

app.use(cors())
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/sign-up', makeExpressCallback(userControllers.signUp))
app.post('/sign-in', makeExpressCallback(userControllers.signIn))

app.post('/departments', makeExpressCallback(departmentControllers.postDepartment, Token))

const SERVER_PORT = 8090
app.listen(SERVER_PORT, () => {
  console.log(`服务器运行地址：http://localhost:${SERVER_PORT}`)
})