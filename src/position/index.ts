import Id from "../helpers/id"
import makeBelong from "../belong"
import buildMakePosition from "./position"

const makePosition = buildMakePosition({ Id, makeBelong })

export type MakePosition = typeof makePosition

export default makePosition