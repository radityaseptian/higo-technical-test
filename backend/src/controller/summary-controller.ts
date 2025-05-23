import { Request, Response, NextFunction } from 'express'
import { getCollection } from '../application/database'
import { requestSummaryPaginationSchema, requestSummaryByNameSchema } from '../validation/request-summary-validation'
import { formatDate } from '../utils/formatDate'

export class SummaryController {
  static async getSummaryPagination(req: Request, res: Response, next: NextFunction) {
    try {
      const paginationRequest = requestSummaryPaginationSchema.parse(req.query)

      const pageNum = parseInt(paginationRequest.page)
      const limitNum = parseInt(paginationRequest.limit)
      const skip = (pageNum - 1) * limitNum

      const data: any = {
        page: pageNum,
        skip: skip,
        limit: limitNum,
        data: await getCollection('summary').find().limit(limitNum).skip(skip).sort({ Number: 1 }).toArray(),
      }

      if (paginationRequest.count === 'true') {
        data.count = await getCollection('summary').countDocuments()
      }

      res.status(200).json(data)
    } catch (e) {
      next(e)
    }
  }

  static async getSummaryCount(req: Request, res: Response, next: NextFunction) {
    try {
      const sumaryNameRequest = requestSummaryByNameSchema.parse(req.query)

      const isDate = sumaryNameRequest.name === 'Date'
      const labelKey = sumaryNameRequest.name === 'Gender' ? 'gender' : sumaryNameRequest.name

      const pipeline = isDate
        ? [{ $group: { _id: '$Date', count: { $sum: 1 } } }, { $sort: { _id: 1 } }]
        : [
            { $group: { _id: { date: '$Date', label: `$${labelKey}` }, count: { $sum: 1 } } },
            { $sort: { '_id.date': 1 } },
          ]

      let data = await getCollection('summary').aggregate(pipeline).toArray()

      data = isDate
        ? data.map((d) => ({ date: formatDate(d._id), label: d._id, count: d.count }))
        : data.map((d) => ({ date: formatDate(d._id.date), label: d._id.label, count: d.count }))

      res.status(200).json({ data })
    } catch (e) {
      next(e)
    }
  }
}
