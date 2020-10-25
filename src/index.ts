import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'
import { SERVER_PORT } from './data/secrets'

import userControllers from './user/controllers'
import makeExpressCallback from './helpers/express-callback'
import departmentControllers from './department/controllers'
import positionControllers from './position/controllers'
import Token from './helpers/token'

const app = express()
app.disable('x-powered-by')

app.use(cors())
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/sign-up', makeExpressCallback(userControllers.signUp))
app.post('/sign-in', makeExpressCallback(userControllers.signIn))

app.post('/departments', makeExpressCallback(departmentControllers.postDepartment, Token))
app.get('/departments', makeExpressCallback(departmentControllers.getDepartments, Token))
app.delete('/departments', makeExpressCallback(departmentControllers.deleteDepartment, Token))
app.put('/departments', makeExpressCallback(departmentControllers.putDepartment, Token))

app.post('/positions', makeExpressCallback(positionControllers.postPosition, Token))

app.listen(SERVER_PORT, () => {
  console.log(`服务器运行地址：http://localhost:${SERVER_PORT}`)
})