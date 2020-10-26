import makeBelong from "../../belong"
import logger from "../../helpers/logger"
import { MakeRemovePositionsProps, RemovePositionsProps } from "./types"

export default function makeRemovePositions ({ positionsDb }: MakeRemovePositionsProps) {
  return async function removePositions ({ belong, deleteArray }: RemovePositionsProps) {
    const validBelong = makeBelong(belong || {})

    if ( !deleteArray || deleteArray.length <= 0) {
      throw new Error('缺少删除职位数据需要的 posit\\d 字段')
    }

    const { list: positionList } = await positionsDb.findByFilter({
      belongId: validBelong.getId(),
      departmentIds: [],
      searchName: new RegExp('', 'ig')
    })
    const positionIdList = getIdList(positionList)
    if (positionIdList.length <= 0) {
      return deleteNothing()
    }

    const belongList = getBelongList(positionIdList, deleteArray)
    if (belongList.length <= 0) {
      return deleteNothing()
    }

    return deleteMany(belongList)
  }

  function deleteNothing (message = '职位未找到') {
    return {
      deletedCount: 0,
      message
    }
  }

  function getIdList (list: Array<{id: string, [props: string]: any}>) {
    return list.map(item => item.id)
  }

  function getBelongList (positionIdList: string[], deleteArray: string[]) {
    return deleteArray.filter(id => positionIdList.includes(id))
  }

  async function deleteMany (idList: string[]) {
    const deleted = await positionsDb.removeMany({ idList })
    logger.debug(`职位删除结果: ${JSON.stringify(deleted, null, 2)}`)
    const { deletedCount: deleteCount } = deleted
    return {
      deleteCount,
      message: `成功删除数据数目 ${deleteCount}`
    }
  }
}