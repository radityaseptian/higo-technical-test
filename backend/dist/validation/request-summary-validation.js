"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestSummaryByNameSchema = exports.requestSummaryPaginationSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.requestSummaryPaginationSchema = zod_1.default.object({
    page: zod_1.default.string().regex(/^\d+$/),
    limit: zod_1.default
        .string()
        .regex(/^\d+$/)
        .refine((val) => ['10', '20', '50'].includes(val)),
    count: zod_1.default.string().optional(),
});
exports.requestSummaryByNameSchema = zod_1.default.object({
    name: zod_1.default.string().refine((val) => ['Date', 'Age', 'Gender', 'Brand Device', 'Digital Interest'].includes(val)),
});
