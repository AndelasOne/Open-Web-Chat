"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const secrets_1 = require("./secrets");
const connectToDatabase = async () => {
    const db_connection = await mongoose_1.default.connect(secrets_1.MONGODB_URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Connecting!");
    return db_connection;
};
exports.connectToDatabase = connectToDatabase;
