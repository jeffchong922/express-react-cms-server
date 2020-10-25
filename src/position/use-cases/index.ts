import positionsDb from "../data-access";
import makeAddPosition from "./add-position";
import findExistName from "./find-exist-name";

const addPosition = makeAddPosition({ positionsDb, findExistName })

const positionServices = Object.freeze({
  addPosition
})

export type PositionServices = typeof positionServices

export default positionServices