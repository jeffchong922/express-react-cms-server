import logger from "../../helpers/logger"
import { MakeGetDepartmentsProps } from "./types"
import { HttpRequest, HttpResponse } from "../../helpers/express-callback"

export default function makeGetDepartments ({ fetchDepartments }: MakeGetDepartmentsProps) {
  return async function getDepartments (httpRequest: HttpRequest): Promise<HttpResponse> {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const { departId, pageNumber, pageSize, searchName } = httpRequest.query
      const payload = httpRequest.tokenPayload
      const mergeData = Object.assign({}, { id: departId, pageNumber, pageSize, searchName }, { belong: payload })
      const fetched = await fetchDepartments(mergeData)
      return {
        headers,
        statusCode: 200,
        body: {
          fetched
        }
      }
    } catch (e) {
      logger.error(`get-departments 错误: ${e.message}`)
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