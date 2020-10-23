import Id from "../helpers/id"
import buildMakeBelong from "./belong"

const makeBelong = buildMakeBelong({ Id })

export type MakeBelong= typeof makeBelong

export default makeBelong