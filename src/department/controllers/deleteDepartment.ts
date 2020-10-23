import logger from "../../helpers/logger"
import { MakeDeleteDepartmentsProps } from "./types"
import { HttpRequest, HttpResponse } from "../../helpers/express-callback"

export default function makeDeleteDepartments ({ removeDepartments }: MakeDeleteDepartmentsProps) {
  return async function deleteDepartments (httpRequest: HttpRequest): Promise<HttpResponse> {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const { total = 0, ...deleteObjList } = httpRequest.query

      // 获取待删除 id 列表
      let deleteArray: string[] = []
      if (+total > 0) {
        deleteArray = Object.keys(deleteObjList)
          .filter(key => /^depart\d$/.test(key))
          .map(key => deleteObjList[key])
      }

      const payload = httpRequest.tokenPayload
      const mergeData = Object.assign({}, { deleteArray }, { belong: payload })
      const deleted = await removeDepartments(mergeData)
      return {
        headers,
        statusCode: 200,
        body: {
          deleted
        }
      }
    } catch (e) {
      logger.error(`delete-department 错误: ${e.message}`)
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