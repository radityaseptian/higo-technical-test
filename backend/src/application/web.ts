import express from 'express'
import morgan from 'morgan'
import { errorMiddleware } from '../middleware/error-middleware'
import cors from 'cors'
import { publicRouter } from '../router/public-api'
import { connectDatabase } from './database'

export const web = express()

web.use(morgan('dev'))

connectDatabase()

web.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    optionsSuccessStatus: 200,
  })
)
web.use(express.json())
web.use(express.urlencoded({ extended: false }))
web.use(publicRouter)
web.use(errorMiddleware)
