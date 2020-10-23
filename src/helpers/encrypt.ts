import bcryptjs from 'bcrypt'

interface NeedValidData {
  salt: string
  originData: any
  hashData: string
}

function isValidData ({ salt, originData, hashData }: NeedValidData) {
  const hash = bcryptjs.hashSync(originData, salt)
  return hash === hashData
}

const Encrypt = Object.freeze({
  genSaltSync: bcryptjs.genSaltSync,
  hashSync: bcryptjs.hashSync,
  isValidData
})

export type EncryptType = typeof Encrypt

export default Encrypt