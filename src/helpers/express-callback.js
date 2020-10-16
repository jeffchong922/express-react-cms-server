const logger = require("./logger")

module.exports = function makeExpressCallback (controller, TokenValidator = null) {
  return (req, res) => {
    const token = req.get('Authorization') || 'Bearer '

    let tokenPayload = null
    try {
      tokenPayload = TokenValidator && TokenValidator.getPayload(token)
    } catch (e) {
      return res.status(403).send({ error: e.message })
    }

    const httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      method: req.method,
      path: req.path,
      tokenPayload,
      headers: {
        'Content-Type': req.get('Content-Type'),
        Authorization: token
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