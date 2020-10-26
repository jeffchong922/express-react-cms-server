import positionServices from "../use-cases";
import makeGetPositions from "./get-positions";
import makePostPosition from "./post-position";
import makePutPosition from "./put-position";

const postPosition = makePostPosition({ addPosition: positionServices.addPosition })
const getPositions = makeGetPositions({ fetchPositions: positionServices.fetchPositions })
const putPosition = makePutPosition({ editPosition: positionServices.editPosition })

const positionControllers = Object.freeze({
  postPosition,
  getPositions,
  putPosition
})

export type PositionControllers = typeof positionControllers

export default positionControllers