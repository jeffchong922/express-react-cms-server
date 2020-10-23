import makeDepartment from "..";
import logger from "../../helpers/logger";
import { AddDepartmentProps, MakeAddDepartmentProps } from "./types";

export default function makeAddDepartment ({ departmentsDb }: MakeAddDepartmentProps) {
  return async function addDepartment (departmentInfo: AddDepartmentProps) {
    const department = makeDepartment(departmentInfo)
    const belong = department.getBelong()

    const exist = await departmentsDb.findByName({ name: department.getName(), belongId: belong.getId() })
    console.log(exist, '----------------', belong.getId())
    if (exist) {
      const error: any = new Error('部门已注册')
      error.statusCode = 409
      throw error
    }

    const inserted = await departmentsDb.insert({
      id: department.getId(),
      belong: {
        id: belong.getId(),
        username: belong.getUsername()
      },
      name: department.getName(),
      status: department.getStatus(),
      memberCount: department.getMemberCount(),
      introduction: department.getIntroduction()
    })
    logger.debug(`添加部门结果: ${JSON.stringify(inserted, null, 2)}`)
    return inserted
  }
}