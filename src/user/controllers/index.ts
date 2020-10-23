import userService from "../use-cases"
import makeSignIn from "./sign-in"
import makeSignUp from "./sign-up"

const signUp = makeSignUp({ addUser: userService.addUser })
const signIn = makeSignIn({ fetchUser: userService.fetchUser })

const userControllers = Object.freeze({
  signUp,
  signIn
})

export default userControllers
