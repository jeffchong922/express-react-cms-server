import makeBelong from "../../belong";
import logger from "../../helpers/logger";
import { FetchPositionsProps, FetchPositionsResult, MakeFetchPositionsProps } from "./types";

export function makeFetchPositions ({ positionsDb,  findExistId, departmentsDb }: MakeFetchPositionsProps) {
  return async function fetchPositions ({ belong, id, searchDepartmentIds, searchName }: FetchPositionsProps): Promise<FetchPositionsResult> {
    const validBelong = makeBelong(belong || {})
    const { list: departments } = await departmentsDb.findAllWithoutPage({ belongId: validBelong.getId() })

    if (id) {
      const exist = await findExistId<ReturnType<typeof positionsDb.findById>>({
        id,
        belongId: validBelong.getId(),
        dbInstance: positionsDb,
        whenExistThrow: false,
        whenNotFoundThrow: true
      })
      
      const departmentName = findDepartmentNameById(departments, exist!.departmentId)
      return {
        list: [{
          id: exist!.id,
          status: exist!.status,
          name: exist!.name,
          introduction: exist!.introduction,
          departmentInfo: {
            id: exist!.departmentId,
            name: departmentName
          }
        }],
        total: 1
      }
    }

    const searchNameReg = new RegExp(searchName ? searchName : '', 'ig')
    const positions = await positionsDb.findByFilter({
      departmentIds: searchDepartmentIds ? searchDepartmentIds : [],
      belongId: validBelong.getId(),
      searchName: searchNameReg
    })
    logger.debug(`查询用户 ${validBelong.getUsername()} 职位结果: ${JSON.stringify(positions, null, 2)}`)

    return {
      total: positions.total,
      list: positions.list.map(({ id, status, name, introduction, departmentId}) => ({
        id,
        status,
        name,
        introduction,
        departmentInfo: {
          id: departmentId,
          name: findDepartmentNameById(departments, departmentId)
        }
      }))
    }
  }

  function findDepartmentNameById (departments: Array<{ id: string, name: string }>, id: string): string {
    const idx = departments.findIndex(_ => _.id === id)
    if (~idx) {
      return departments[idx].name
    }
    return '404'
  }
}