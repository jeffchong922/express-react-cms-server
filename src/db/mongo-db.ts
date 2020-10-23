import { MongoClient } from 'mongodb'
import logger from '../helpers/logger'

interface BuildMakeDbProps {
  dbUrl: string
  dbName: string
}

const clientStorage = new Map<string, MongoClient>()

function createClientToMap (dbUrl: string): MongoClient {
  logger.info(`创建新的mongo客户端, 数据库地址: ${dbUrl}`)
  let client = new MongoClient(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  clientStorage.set(dbUrl, client)
  return client
}

export default function buildMakeDb ({ dbUrl, dbName }: BuildMakeDbProps) {
  let client: MongoClient
  if (clientStorage.has(dbUrl)) {
    client = clientStorage.get(dbUrl) || createClientToMap(dbUrl)
  } else {
    client = createClientToMap(dbUrl)
  }

  return async function makeDb () {
    if (!client.isConnected()) {
      logger.info(`等待数据库连接，地址: ${dbUrl}`)
      await client.connect()
    }
    return client.db(dbName)
  }
}