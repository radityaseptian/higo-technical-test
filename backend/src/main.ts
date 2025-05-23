import 'dotenv/config'

const port = process.env.PORT as string

import { web } from './application/web'
import { connectDatabase } from './application/database'

const errorCallback = (error: any) => {
  console.error(error)
  process.exit(1)
}
process.on('uncaughtException', errorCallback)
process.on('unhandledRejection', errorCallback)

web.listen(port, async () => {
  try {
    console.info(`Running on Port: ${port}`)
    await connectDatabase()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})
