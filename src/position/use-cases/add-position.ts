import makePosition from "..";
import logger from "../../helpers/logger";
import { AddPositionProps, MakeAddPositionProps } from "./types";

export default function makeAddPosition ({ positionsDb, findExistName, departmentsDb }: MakeAddPositionProps) {
  return async function addPosition (positionInfo: AddPositionProps) {
    const position = makePosition(positionInfo)
    const belong = position.getBelong()

    await findExistName<ReturnType<typeof positionsDb.findByName>>({
      name: position.getName(),
      belongId: belong.getId(),
      departmentId: position.getDepartmentId(),
      whenExistThrow: true,
      whenNotFoundThrow: false,
      dbInstance: positionsDb
    })

    await checkTheRemainderOfDepartment(position.getDepartmentId(), belong.getId())

    const inserted = await positionsDb.insert({
      id: position.getId(),
      belong: {
        id: belong.getId(),
        username: belong.getUsername()
      },
      name: position.getName(),
      status: position.getStatus(),
      departmentId: position.getDepartmentId(),
      introduction: position.getIntroduction()
    })
    logger.debug(`添加职位结果: ${JSON.stringify(inserted, null, 2)}`)

    return inserted
  }

  async function checkTheRemainderOfDepartment (id: string, belongId: string) {
    const department = await departmentsDb.findById({ id })
    if (!department) {
      const error: any = new Error('当前部门已删除')
      error.statusCode = 404
      throw error
    }
    const positions = await positionsDb.findByFilter({ departmentIds: [department.id], searchName: new RegExp('', 'ig'), belongId })
    if (positions.total >= department.memberCount) {
      const error: any = new Error('当前部门职位已填满')
      error.statusCode = 403
      throw error
    }
  }
}