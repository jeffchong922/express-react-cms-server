import usersDb from "../data-access"
import Token from "../../helpers/token"
import Encrypt from "../../helpers/encrypt"
import makeAddUser from "./add-user"
import makeFetchUser from "./fetch-user"

const addUser = makeAddUser({ usersDb })
const fetchUser = makeFetchUser({ usersDb, Encrypt, Token })

const userService = Object.freeze({
  addUser,
  fetchUser
})

export type AddUserType = typeof addUser
export type FetchUserType = typeof fetchUser

export default userService