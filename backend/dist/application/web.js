"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.web = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const error_middleware_1 = require("../middleware/error-middleware");
const cors_1 = __importDefault(require("cors"));
const public_api_1 = require("../router/public-api");
exports.web = (0, express_1.default)();
exports.web.use((0, morgan_1.default)('dev'));
exports.web.use((0, cors_1.default)({
    origin: (origin, callback) => callback(null, true),
    optionsSuccessStatus: 200,
}));
exports.web.use(express_1.default.json());
exports.web.use(express_1.default.urlencoded({ extended: false }));
exports.web.use(public_api_1.publicRouter);
exports.web.use(error_middleware_1.errorMiddleware);
