const logger = require("./logger")

module.exports = function makeExpressCallback (controller) {
  return (req, res) => {
    const httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      method: req.method,
      path: req.path,
      headers: {
        'Content-Type': req.get('Content-Type'),
        Authorization: req.get('Authorization') || 'Bearer '
      }
    }
    controller(httpRequest)
      .then(httpResponse => {
        if (httpResponse.headers) {
          res.set(httpResponse.headers)
        }
        res.type('json')
        res.status(httpResponse.statusCode).send(httpResponse.body)
      })
      .catch(e => {
        logger.error(`express-callback 发生错误: ${e.stack}`)
        res.status(500).send({ error: '服务器发生未知错误' })
      })
  }
}