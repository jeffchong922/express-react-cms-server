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
  process.exit()
}

const SERVER_PORT = process.env.SERVER_PORT || 8848

logger.info(`
  SERVER_PORT: ${SERVER_PORT}
`)

export {
  SERVER_PORT
}