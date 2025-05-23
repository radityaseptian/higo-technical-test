import 'dotenv/config'

const port = process.env.PORT as string || '4500'

import http from 'http'
import { web } from './application/web'
import { connectDatabase } from './application/database'

const errorCallback = (error: any) => {
  console.error(error)
  process.exit(1)
}
process.on('uncaughtException', errorCallback)
process.on('unhandledRejection', errorCallback)

const main = async () => {
  try {
    // await connectDatabase()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}
const server = http.createServer(web)
server.listen(port, () => console.log(`Server running on port ${port}`))

// main()
