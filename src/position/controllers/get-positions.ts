import logger from "../../helpers/logger"
import { MakeGetPositionsProps } from "./types"
import { HttpRequest, HttpResponse } from "../../helpers/express-callback"

export default function makeGetPositions ({ fetchPositions }: MakeGetPositionsProps) {
  return async function getPositions (httpRequest: HttpRequest): Promise<HttpResponse> {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const { id, searchName, ...searchIds } = httpRequest.query
      const payload = httpRequest.tokenPayload

      let idList: string[] = Object.keys(searchIds)
        .filter(key => /^depart\d$/.test(key))
        .map(key => searchIds[key])

      const fetched = await fetchPositions({
        belong: payload,
        searchDepartmentIds: idList,
        id,
        searchName
      })
      return {
        headers,
        statusCode: 200,
        body: {
          fetched
        }
      }
    } catch (e) {
      logger.error(`get-positions 错误: ${e.message}`)
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