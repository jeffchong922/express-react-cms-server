import Id from "../helpers/id"
import makeBelong from "../belong"
import buildMakeDepartment from "./department"

const makeDepartment = buildMakeDepartment({ Id, makeBelong })

export default makeDepartment