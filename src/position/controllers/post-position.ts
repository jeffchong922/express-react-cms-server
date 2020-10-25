import logger from "../../helpers/logger"
import { MakePostPositionProps } from "./types"
import { HttpRequest, HttpResponse } from "../../helpers/express-callback"

export default function makePostPosition ({ addPosition }: MakePostPositionProps) {
  return async function postPosition (httpRequest: HttpRequest): Promise<HttpResponse> {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const positionInfo = httpRequest.body
      const payload = httpRequest.tokenPayload
      const mergeData = Object.assign({}, positionInfo, { belong: payload })
      const inserted = await addPosition(mergeData)
      return {
        headers,
        statusCode: 200,
        body: {
          inserted
        }
      }
    } catch (e) {
      logger.error(`post-position 错误: ${e.message}`)
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