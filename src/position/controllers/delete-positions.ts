import logger from "../../helpers/logger"
import { MakeDeletePositionsProps } from "./types"
import { HttpRequest, HttpResponse } from "../../helpers/express-callback"

export default function makeDeletePositions ({ removePositions }: MakeDeletePositionsProps) {
  return async function deletePositions (httpRequest: HttpRequest): Promise<HttpResponse> {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const { ...deleteObjList } = httpRequest.query

      // 获取待删除 id 列表
      let deleteArray: string[] = Object.keys(deleteObjList)
        .filter(key => /^posit\d$/.test(key))
        .map(key => deleteObjList[key])

      const payload = httpRequest.tokenPayload
      const mergeData = Object.assign({}, { deleteArray }, { belong: payload })
      const deleted = await removePositions(mergeData)
      return {
        headers,
        statusCode: 200,
        body: {
          deleted
        }
      }
    } catch (e) {
      logger.error(`delete-position 错误: ${e.message}`)
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