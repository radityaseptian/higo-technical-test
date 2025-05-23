import { MongoClient, Db } from 'mongodb'

const mongodbUrl = process.env.MONGODB_DATABASE_URL as string
const dbName = process.env.MONGODB_DATABASE_NAME as string

const client = new MongoClient(mongodbUrl)

let db: Db | null = null

export async function connectDatabase() {
  console.log(mongodbUrl)

  await client.connect()
  db = client.db(dbName)

  console.info('connect database success')
}

export function getCollection(name: string) {
  if (!db) throw new Error('Database not connected')
  return db.collection(name)
}
