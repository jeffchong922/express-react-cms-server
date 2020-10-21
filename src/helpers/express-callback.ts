import { Request, Response } from 'express'
import { TokenType, Payload } from './token'

import logger from './logger'

export interface HttpRequest {
  body: any
  query: any
  params: any
  method: any
  path: string
  tokenPayload: Payload | undefined
  headers: {
    'Content-Type': string | undefined
    Authorization: string
  }
}

export interface HttpResponse {
  statusCode: number
  headers: any
  body: any
}

type Controller = (request: HttpRequest) => Promise<HttpResponse>

export default function makeExpressCallback (controller: Controller, TokenValidator?: TokenType) {
  return (req: Request, res: Response) => {
    const token = req.get('Authorization') || 'Bearer '

    // 需要时 获取token保存的信息
    let tokenPayload: Payload | undefined = undefined
    try {
      tokenPayload = TokenValidator && TokenValidator.getPayload(token.split(' ').pop())
      logger.info(`当前 token 获取的信息 : ${JSON.stringify(tokenPayload, null, 2)}`)
    } catch (e) {
      return res.status(403).send({ error: e.message })
    }

    const httpRequest: HttpRequest = {
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