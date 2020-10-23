import logger from "../../helpers/logger"
import { MakePutDepartmentProps } from "./types"
import { HttpRequest, HttpResponse } from "../../helpers/express-callback"

export default function makePutDepartment ({ editDepartment }: MakePutDepartmentProps) {
  return async function putDepartment (httpRequest: HttpRequest): Promise<HttpResponse> {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const departmentInfo = httpRequest.body
      const payload = httpRequest.tokenPayload
      const mergeData = Object.assign({}, departmentInfo, { belong: payload })
      const updated = await editDepartment(mergeData)
      return {
        headers,
        statusCode: 200,
        body: {
          updated
        }
      }
    } catch (e) {
      logger.error(`put-department 错误: ${e.message}`)
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