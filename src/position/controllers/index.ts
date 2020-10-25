import positionServices from "../use-cases";
import makeGetPositions from "./get-positions";
import makePostPosition from "./post-position";

const postPosition = makePostPosition({ addPosition: positionServices.addPosition })
const getPositions = makeGetPositions({ fetchPositions: positionServices.fetchPositions })

const positionControllers = Object.freeze({
  postPosition,
  getPositions
})

export type PositionControllers = typeof positionControllers

export default positionControllers