import logger from "../../helpers/logger"
import { MakePostDepartmentProps } from "./types"
import { HttpRequest, HttpResponse } from "../../helpers/express-callback"

export default function makePostDepartment ({ addDepartment }: MakePostDepartmentProps) {
  return async function postDepartment (httpRequest: HttpRequest): Promise<HttpResponse> {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const departmentInfo = httpRequest.body
      const payload = httpRequest.tokenPayload
      const mergeData = Object.assign({}, departmentInfo, { belong: payload })
      const inserted = await addDepartment(mergeData)
      return {
        headers,
        statusCode: 200,
        body: {
          inserted
        }
      }
    } catch (e) {
      logger.error(`post-department 错误: ${e.message}`)
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