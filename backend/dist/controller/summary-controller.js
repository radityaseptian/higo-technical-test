"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SummaryController = void 0;
const database_1 = require("../application/database");
const request_summary_validation_1 = require("../validation/request-summary-validation");
const formatDate_1 = require("../utils/formatDate");
class SummaryController {
    static getSummaryPagination(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paginationRequest = request_summary_validation_1.requestSummaryPaginationSchema.parse(req.query);
                const pageNum = parseInt(paginationRequest.page);
                const limitNum = parseInt(paginationRequest.limit);
                const skip = (pageNum - 1) * limitNum;
                const data = {
                    page: pageNum,
                    skip: skip,
                    limit: limitNum,
                    data: yield (0, database_1.getCollection)('summary').find().limit(limitNum).skip(skip).sort({ Number: 1 }).toArray(),
                };
                if (paginationRequest.count === 'true') {
                    data.count = yield (0, database_1.getCollection)('summary').countDocuments();
                }
                res.status(200).json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getSummaryCount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sumaryNameRequest = request_summary_validation_1.requestSummaryByNameSchema.parse(req.query);
                const isDate = sumaryNameRequest.name === 'Date';
                const labelKey = sumaryNameRequest.name === 'Gender' ? 'gender' : sumaryNameRequest.name;
                const pipeline = isDate
                    ? [{ $group: { _id: '$Date', count: { $sum: 1 } } }, { $sort: { _id: 1 } }]
                    : [
                        { $group: { _id: { date: '$Date', label: `$${labelKey}` }, count: { $sum: 1 } } },
                        { $sort: { '_id.date': 1 } },
                    ];
                let data = yield (0, database_1.getCollection)('summary').aggregate(pipeline).toArray();
                data = isDate
                    ? data.map((d) => ({ date: (0, formatDate_1.formatDate)(d._id), label: d._id, count: d.count }))
                    : data.map((d) => ({ date: (0, formatDate_1.formatDate)(d._id.date), label: d._id.label, count: d.count }));
                res.status(200).json({ data });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.SummaryController = SummaryController;
