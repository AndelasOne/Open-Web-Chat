"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
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
    status: {
        type: String,
        required: true,
    },
});
exports.UserSchema = UserSchema;
