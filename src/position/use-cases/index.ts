import departmentsDb from "../../department/data-access";
import positionsDb from "../data-access";
import makeAddPosition from "./add-position";
import { makeEditPosition } from "./edit-position";
import { makeFetchPositions } from "./fetch-positions";
import findExistId from "./find-exist-id";
import findExistName from "./find-exist-name";

const addPosition = makeAddPosition({ positionsDb, findExistName })
const fetchPositions = makeFetchPositions({ positionsDb, findExistId, departmentsDb })
const editPosition = makeEditPosition({ positionsDb, findExistId, findExistName })

const positionServices = Object.freeze({
  addPosition,
  fetchPositions,
  editPosition
})

export type PositionServices = typeof positionServices

export default positionServices