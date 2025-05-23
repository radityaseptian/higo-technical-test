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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const port = process.env.PORT;
const http_1 = __importDefault(require("http"));
const web_1 = require("./application/web");
const database_1 = require("./application/database");
const errorCallback = (error) => {
    console.error(error);
    process.exit(1);
};
process.on('uncaughtException', errorCallback);
process.on('unhandledRejection', errorCallback);
web_1.web.set('port', port);
const server = http_1.default.createServer(web_1.web);
server.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.info(`Running on Port: ${port}`);
        yield (0, database_1.connectDatabase)();
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
}));
