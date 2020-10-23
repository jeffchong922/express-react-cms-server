import Id from "../helpers/id"
import Encrypt from "../helpers/encrypt"
import buildMakeUser from "./user"

const makeUser = buildMakeUser({ Id, Encrypt })

export default makeUser