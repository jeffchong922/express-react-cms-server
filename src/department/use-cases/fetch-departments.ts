import makeBelong from "../../belong"
import logger from "../../helpers/logger"
import { FetchDepartmentsProps, MakeFetchDepartmentsProps } from "./types"

export default function makeFetchDepartments ({ departmentsDb }: MakeFetchDepartmentsProps) {
  return async function fetchDepartments ({ belong, id, pageNumber, pageSize, searchName, nameOnly }: FetchDepartmentsProps) {
    const validBelong = makeBelong(belong || {})

    if (id) {
      const department = await departmentsDb.findById({ id })
      if (department) {
        logger.debug(`查询 ${id} 部门结果: ${JSON.stringify(department, null, 2)}`)
        return {
          list: [department],
          total: 1
        }
      } else {
        const error: any = new Error(`id : ${id} 的部门数据未找到`)
        error.statusCode = 404
        throw error
      }
    }

    if (nameOnly === 'true') {
      return getNameOnly(validBelong)
    }

    if (!pageNumber || !pageSize) {
      throw new Error('请携带 pageNumber 和 pageSize 查询条件')
    }
    const fetchPageNumber = parseInt(pageNumber) || 1
    const fetchPageSize  = parseInt(pageSize) || 10
    const searchNameReg = new RegExp(searchName ? searchName : '', 'ig')
    const departments = await departmentsDb.findAll({ belongId: validBelong.getId(), pageNumber: fetchPageNumber, pageSize: fetchPageSize, searchNameReg })
    logger.debug(`查询用户 ${validBelong.getUsername()} 部门结果: ${JSON.stringify(departments, null, 2)}`)

    return departments
  }

  async function getNameOnly (belong: ReturnType<typeof makeBelong>) {
    const departments = await departmentsDb.findAllWithoutPage({ belongId: belong.getId() })
    const nameList = departments.list.map(department => ({
      id: department.id,
      name: department.name
    }))
    return {
      list: nameList,
      total: departments.total
    }
  }
}