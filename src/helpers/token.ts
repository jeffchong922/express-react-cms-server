import jwt from 'jsonwebtoken'

const tokenSecret: string = 'jsonwebtoken'

export interface Payload {
  id: string
  username: string
}

function sign (payload: Payload): string {
  return jwt.sign(payload, tokenSecret)
}

function getPayload (token: string | undefined): Payload {
  if (!token) {
    throw new Error('请携带验证信息')
  }
  let payload: Payload
  try {
    payload = jwt.verify(token, tokenSecret) as Payload
  } catch (e) {
    throw new Error('请携带有效验证信息')
  }
  return payload
}

const Token = Object.freeze({
  sign,
  getPayload
})

export type TokenType = typeof Token

export default Token