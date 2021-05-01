"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectToDatabase = async () => {
    const uri = "mongodb+srv://AndiAdmin:6y1iO66CBm4T@cluster0.fyjsg.mongodb.net/Open-Web-Chat?retryWrites=true&w=majority";
    const db_connection = await mongoose_1.default.connect(uri, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Connecting!");
    return db_connection;
};
exports.connectToDatabase = connectToDatabase;
