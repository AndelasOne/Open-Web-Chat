"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessages = exports.deleteMessagesByName = exports.deleteMessagesById = exports.insertMessage = exports.messagesLoad = void 0;
const types_1 = require("./types");
const mongoose_1 = require("mongoose");
// Create Message Model for one Room
const messageModel = mongoose_1.model("message", types_1.MessageSchema, "messages");
// Get messages
const getMessages = async (room_id) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1); // get messages from yesterday
    yesterday.toDateString();
    const messages = await messageModel.find({
        room_id: room_id,
        created_at: { $gt: yesterday }, //(not older than a day!)
    });
    return messages;
};
exports.getMessages = getMessages;
// Delete Messages in Room
const deleteMessagesById = async (room_id) => {
    const res = await messageModel.deleteMany({
        room_id: room_id,
    });
    return res.deletedCount;
};
exports.deleteMessagesById = deleteMessagesById;
const deleteMessagesByName = async (room_name) => {
    const res = await messageModel.deleteMany({
        room_name: room_name,
    });
    return res.deletedCount;
};
exports.deleteMessagesByName = deleteMessagesByName;
// Insert Message
const insertMessage = async (message) => {
    await messageModel.create(message);
    console.log("Inserted Message by: " + message.username);
};
exports.insertMessage = insertMessage;
// Handle Message Get Request
const messagesLoad = async (req, res) => {
    if (!req.query.room_name || !req.query.room_id) {
        console.log("No room_name or room_id given!");
        res.status(404);
        res.send({ error: "No room_name or room_id given!" });
        return;
    }
    const room_name = req.query.room_name;
    const room_id = Number(req.query.room_id);
    // Get Messages from specific room
    const messages = await getMessages(room_id);
    console.log("Fetched Messages from room: " + room_name);
    res.status(200);
    res.send(messages);
};
exports.messagesLoad = messagesLoad;
