import logger from "../../helpers/logger"
import { MakePutPositionProps } from "./types"
import { HttpRequest, HttpResponse } from "../../helpers/express-callback"

export default function makePutPosition ({ editPosition }: MakePutPositionProps) {
  return async function putPosition (httpRequest: HttpRequest): Promise<HttpResponse> {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const positionInfo = httpRequest.body
      const payload = httpRequest.tokenPayload
      const mergeData = Object.assign({}, positionInfo, { belong: payload })
      const updated = await editPosition(mergeData)
      return {
        headers,
        statusCode: 200,
        body: {
          updated
        }
      }
    } catch (e) {
      logger.error(`put-position 错误: ${e.message}`)
      return {
        headers,
        statusCode: e.statusCode || 400,
        body: {
          error: e.message
        }
      }
    }
  }
}