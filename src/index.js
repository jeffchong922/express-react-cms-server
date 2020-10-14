const express = require('express')
const compression = require('compression')

const app = express()
app.disable('x-powered-by')

app.use(compression())

app.get('*', (res, req) => {
  req.send('Power by express')
})

const SERVER_PORT = 8090
app.listen(SERVER_PORT, () => {
  console.log(`服务器运行地址：http://localhost:${SERVER_PORT}`)
})