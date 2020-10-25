import makePosition from "..";
import logger from "../../helpers/logger";
import { AddPositionProps, MakeAddPositionProps } from "./types";

export default function makeAddPosition ({ positionsDb, findExistName }: MakeAddPositionProps) {
  return async function addPosition (positionInfo: AddPositionProps) {
    const position = makePosition(positionInfo)
    const belong = position.getBelong()

    await findExistName<ReturnType<typeof positionsDb.findByName>>({
      name: position.getName(),
      belongId: belong.getId(),
      whenExistThrow: true,
      whenNotFoundThrow: false,
      dbInstance: positionsDb
    })

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
}