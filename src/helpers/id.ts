import cuid from 'cuid'

const Id = Object.freeze({
  makeId: cuid,
  isValidId: cuid.isCuid
})

export type IdType = typeof Id

export default Id