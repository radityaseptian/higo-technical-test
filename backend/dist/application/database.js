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
exports.connectDatabase = connectDatabase;
exports.getCollection = getCollection;
const mongodb_1 = require("mongodb");
const mongodbUrl = process.env.MONGODB_DATABASE_URL;
const dbName = process.env.MONGODB_DATABASE_NAME;
const client = new mongodb_1.MongoClient(mongodbUrl);
let db = null;
function connectDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        db = client.db(dbName);
        console.info('connect database success');
    });
}
function getCollection(name) {
    if (!db)
        throw new Error('Database not connected');
    return db.collection(name);
}
