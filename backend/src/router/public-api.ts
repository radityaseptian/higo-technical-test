import express from 'express'
import { SummaryController } from '../controller/summary-controller'

export const publicRouter = express.Router()

publicRouter.get('/', (req, res) => {
  res.sendStatus(200).end()
})

publicRouter.get('/api/summary', SummaryController.getSummaryPagination)

publicRouter.get('/api/summary/count', SummaryController.getSummaryCount)
