import positionServices from "../use-cases";
import makePostPosition from "./post-position";

const postPosition = makePostPosition({ addPosition: positionServices.addPosition })

const positionControllers = Object.freeze({
  postPosition
})

export type PositionControllers = typeof positionControllers

export default positionControllers