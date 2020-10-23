import makeBelong from "../../belong"
import logger from "../../helpers/logger"
import { MakeRemoveDepartmentsProps, RemoveDepartmentsProps } from "./types"

export default function makeRemoveDepartments ({ departmentsDb }: MakeRemoveDepartmentsProps) {
  return async function removeDepartments ({ belong, deleteArray }: RemoveDepartmentsProps) {
    const validBelong = makeBelong(belong || {})

    if ( !deleteArray || deleteArray.length <= 0) {
      throw new Error('缺少删除部门数据需要的 depart\\d 字段')
    }

    const { list: departmentList } = await departmentsDb.findAllWithoutPage({ belongId: validBelong.getId() })
    const departmentIdList = getIdList(departmentList)

    if (departmentIdList.length <= 0) {
      return deleteNothing()
    }

    const belongList = getBelongList(departmentIdList, deleteArray)
    if (belongList.length <= 0) {
      return deleteNothing()
    }

    return deleteMany(belongList)
  }

  function deleteNothing (message = '部门未找到') {
    return {
      deletedCount: 0,
      message
    }
  }

  function getIdList (list: Array<{id: string, [props: string]: any}>) {
    return list.map(item => item.id)
  }

  function getBelongList (departmentIdList: string[], deleteArray: string[]) {
    return deleteArray.filter(id => departmentIdList.includes(id))
  }

  async function deleteMany (idList: string[]) {
    const deleted = await departmentsDb.removeMany({ idList })
    logger.debug(`部门删除结果: ${JSON.stringify(deleted, null, 2)}`)
    const { deletedCount: deleteCount } = deleted
    return {
      deleteCount,
      message: `成功删除数据数目 ${deleteCount}`
    }
  }

  async function deleteOne (department: any) {
    const departmentName = department.name
    const deleted = await departmentsDb.remove(department)
    logger.debug(`部门删除结果: ${JSON.stringify(deleted, null, 2)}`)
    return {
      deleteCount: 1,
      message: `${departmentName} 已删除`
    }
  }
}