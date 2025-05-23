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

const main = async () => {
  try {
    await connectDatabase()
    web.listen(port, async () => console.info(`Running on Port: ${port}`))
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

main()
