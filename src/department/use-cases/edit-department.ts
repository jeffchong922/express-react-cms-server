import makeDepartment from ".."
import logger from "../../helpers/logger"
import { EditDepartmentProps, MakeEditDepartmentProps } from "./types"

export default function makeEditDepartment ({ departmentsDb }: MakeEditDepartmentProps) {
  return async function editDepartment ({ id, ...change }: EditDepartmentProps) {
    if (!id) {
      throw new Error('更新部门数据需要提供 id 字段')
    }
    
    const exist = await findById(id)

    const department = makeDepartment({ ...exist, ...change })
    const belong = department.getBelong()

    // 避免部门名冲突
    if (exist.name !== department.getName()) {
      await throwWhenExist({ name: department.getName(), belongId: belong.getId() })
    }
    
    return updateOne(department)
  }


  async function findById (id: string) {
    const exist = await departmentsDb.findById({ id })
    if (!exist) {
      const error: any = new Error('更新的部门数据未找到')
      error.statusCode = 404
      throw error
    }
    return exist
  }

  interface ThrowWhenExitProps {
    name: string
    belongId: string
  }
  async function throwWhenExist ({ name, belongId }: ThrowWhenExitProps) {
    const exist = await departmentsDb.findByName({ name, belongId })
    if (exist) {
      const error: any = new Error('所要更新的部门名称已存在')
      error.statusCode = 409
      throw error
    }
    return exist
  }

  async function updateOne (department: ReturnType<typeof makeDepartment>) {
    const updated = await departmentsDb.update({
      id: department.getId(),
      name: department.getName(),
      status: department.getStatus(),
      memberCount: department.getMemberCount(),
      introduction: department.getIntroduction()
    })
    logger.debug(`部门更新结果: ${JSON.stringify(updated, null, 2)}`)
    return {
      updateCount: 1,
      message: `部门数据已更新`
    }
  }
}