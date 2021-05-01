"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomSchema = exports.MessageSchema = exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        index: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    room_id: {
        type: Number,
        required: true,
    },
    room_name: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
});
exports.UserSchema = UserSchema;
const MessageSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    room_id: {
        type: Number,
        required: true,
    },
    room_name: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
}, { timestamps: { createdAt: "created_at" } });
exports.MessageSchema = MessageSchema;
const RoomSchema = new mongoose_1.Schema({
    room_name: {
        type: String,
        required: true,
        unique: true,
    },
    room_id: {
        type: Number,
        required: true,
        unique: true,
    },
});
exports.RoomSchema = RoomSchema;
