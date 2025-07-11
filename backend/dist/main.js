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
require("dotenv/config");
const port = process.env.PORT;
const web_1 = require("./application/web");
const database_1 = require("./application/database");
const errorCallback = (error) => {
    console.error(error);
    process.exit(1);
};
process.on('uncaughtException', errorCallback);
process.on('unhandledRejection', errorCallback);
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_1.connectDatabase)();
        web_1.web.listen(port, () => __awaiter(void 0, void 0, void 0, function* () { return console.info(`Running on Port: ${port}`); }));
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
});
main();
