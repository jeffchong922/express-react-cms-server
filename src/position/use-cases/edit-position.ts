import makePosition from "..";
import makeBelong from "../../belong";
import logger from "../../helpers/logger";
import { EditPositionProps, MakeEditPositionProps } from "./types";

export function makeEditPosition ({ positionsDb, findExistId, findExistName }: MakeEditPositionProps) {
  return async function editPosition ({ id, belong, ...change }: EditPositionProps) {
    if (!id) {
      throw new Error('更新职位数据请携带 id 字段')
    }
    const validBelong = makeBelong(belong || {})

    const exist = await findExistId({
      dbInstance: positionsDb,
      id,
      belongId: validBelong.getId(),
      whenExistThrow: false,
      whenNotFoundThrow: true
    })

    const position = makePosition({ ...exist, ...change })

    // 避免与其他名称相冲突
    if (exist!.name !== position.getName()) {
      await findExistName({
        name: position.getName(),
        belongId: validBelong.getId(),
        departmentId: position.getDepartmentId(),
        whenExistThrow: true,
        whenNotFoundThrow: false,
        dbInstance: positionsDb
      })
    }

    const updated = await positionsDb.update({
      id: position.getId(),
      name: position.getName(),
      status: position.getStatus(),
      departmentId: position.getDepartmentId(),
      introduction: position.getIntroduction()
    })
    logger.debug(`职位更新结果: ${JSON.stringify(updated, null, 2)}`)

    return {
      updateCount: 1,
      message: `职位数据已更新`
    }
  }
}