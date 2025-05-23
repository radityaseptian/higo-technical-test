import z from 'zod'

export const requestSummaryPaginationSchema = z.object({
  page: z.string().regex(/^\d+$/),
  limit: z
    .string()
    .regex(/^\d+$/)
    .refine((val) => ['10', '20', '50'].includes(val)),
  count: z.string().optional(),
})

export const requestSummaryByNameSchema = z.object({
  name: z.string().refine((val) => ['Date', 'Age', 'Gender', 'Brand Device', 'Digital Interest'].includes(val)),
})
