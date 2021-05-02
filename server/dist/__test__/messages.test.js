"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const secrets_1 = require("../secrets");
const types_1 = require("../types");
const messages_1 = require("../messages");
const mockMessage = {
    username: "TestUser",
    message: "Hi to You! :D ",
    room_id: 2,
    room_name: "AutomaticTestRoom",
    time: "13:05",
};
describe("Testing messages operation", () => {
    let connection;
    const messageModel = mongoose_1.model("message", types_1.MessageSchema, "messages");
    beforeAll(async () => {
        connection = await mongoose_1.default.connect(secrets_1.MONGODB_URI, {
            useNewUrlParser: true,
        });
    });
    afterAll(async () => {
        await connection.close();
    });
    it("Insert and Fetched correctly", async () => {
        // Insert mock Message
        const MESSAGE_COUNT = 10;
        for (let i = 0; i < MESSAGE_COUNT; i++) {
            await messages_1.insertMessage(mockMessage);
        }
        //Fetch mock message
        const fetchedMessages = await messages_1.getMessages(mockMessage.room_id);
        if (fetchedMessages) {
            expect(fetchedMessages.length).toEqual(MESSAGE_COUNT);
        }
        // Delete existing Messages in Room
        await messages_1.deleteMessagesById(mockMessage.room_id);
    });
    it("Delete Message By Name", async () => {
        // Insert mock Message
        const MESSAGE_COUNT = 10;
        for (let i = 0; i < MESSAGE_COUNT; i++) {
            const insertedMessage = new messageModel(mockMessage);
            await insertedMessage.save();
        }
        // Delete existing Messages in Room
        const count = await messages_1.deleteMessagesByName(mockMessage.room_name);
        expect(count).toEqual(MESSAGE_COUNT);
    });
});
