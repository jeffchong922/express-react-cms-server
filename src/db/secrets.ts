import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import logger from '../helpers/logger'

const resolve = (file: string) => path.resolve(__dirname, file)

// 读取环境变量文件，注意路径
const DotEnv = '../../.env'
const DotEnvExample = '../../.env.example'
if (fs.existsSync(resolve(DotEnv))) {
  logger.info(`使用 .env 文件加载环境变量`)
  dotenv.config({ path: resolve(DotEnv) })
} else if (fs.existsSync(resolve(DotEnvExample))) {
  logger.info(`使用 .env.example 文件加载环境变量`)
  dotenv.config({ path: resolve(DotEnvExample) })
} else {
  logger.error('无环境变量配置文件，请在项目根目录建立 .env | .env.example 文件')
}

const DEFAULT_SERVER_PORT = 8848
const DEFAULT_DB_URL = 'mongodb://localhost:27017'
const DEFAULT_DB_NAME = 'react-cms'

const SERVER_PORT = process.env.SERVER_PORT || DEFAULT_SERVER_PORT

const USERS_DB_URL = process.env.USERS_DB_URL || DEFAULT_DB_URL
const USERS_DB_NAME = process.env.USERS_DB_NAME || DEFAULT_DB_NAME
const USERS_DB_COL_NAME = process.env.USERS_DB_COL_NAME || 'users'

const DEPARTMENTS_DB_URL = process.env.DEPARTMENTS_DB_URL || DEFAULT_DB_URL
const DEPARTMENTS_DB_NAME = process.env.DEPARTMENTS_DB_NAME || DEFAULT_DB_NAME
const DEPARTMENTS_DB_COL_NAME = process.env.DEPARTMENTS_DB_COL_NAME || 'departments'

logger.info(`
  SERVER_PORT: ${SERVER_PORT}
  USERS_DB_URL: ${USERS_DB_URL}
  USERS_DB_NAME: ${USERS_DB_NAME}
  USERS_DB_COL_NAME: ${USERS_DB_COL_NAME}
  DEPARTMENTS_DB_URL: ${DEPARTMENTS_DB_URL}
  DEPARTMENTS_DB_NAME: ${DEPARTMENTS_DB_NAME}
  DEPARTMENTS_DB_COL_NAME: ${DEPARTMENTS_DB_COL_NAME}
`)

export {
  SERVER_PORT,
  USERS_DB_URL,
  USERS_DB_NAME,
  USERS_DB_COL_NAME,
  DEPARTMENTS_DB_URL,
  DEPARTMENTS_DB_NAME,
  DEPARTMENTS_DB_COL_NAME,
}