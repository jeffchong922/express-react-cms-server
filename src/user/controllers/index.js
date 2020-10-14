const makeSignUp = require('./sign-up')
const makeSignIn = require('./sign-in')
const userService = require("../use-cases");

const signUp = makeSignUp({ addUser: userService.addUser })
const signIn = makeSignIn({ fetchUser: userService.fetchUser })

const userControllers = Object.freeze({
  signUp,
  signIn
})

module.exports = userControllers
