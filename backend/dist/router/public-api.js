"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicRouter = void 0;
const express_1 = __importDefault(require("express"));
const summary_controller_1 = require("../controller/summary-controller");
exports.publicRouter = express_1.default.Router();
exports.publicRouter.get('/', (req, res) => {
    res.sendStatus(200).end();
});
exports.publicRouter.get('/api/summary', summary_controller_1.SummaryController.getSummaryPagination);
exports.publicRouter.get('/api/summary/count', summary_controller_1.SummaryController.getSummaryCount);
