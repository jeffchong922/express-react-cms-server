import Id from "../helpers/id"
import buildMakeBelong from "./belong"

const makeBelong = buildMakeBelong({ Id })

export type MakeBelongType = typeof makeBelong

export default makeBelong