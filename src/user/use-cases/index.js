const usersDb = require('../data-access')
const Token = require('../../helpers/token')
const Encrypt = require('../../helpers/encrypt')

const makeAddUser = require('./add-user')
const makeFetchUser = require('./fetch-user')

const addUser = makeAddUser({ usersDb })
const fetchUser = makeFetchUser({ usersDb, Encrypt, Token })

const userService = Object.freeze({
  addUser,
  fetchUser
})

module.exports = userService