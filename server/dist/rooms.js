"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomLoad = exports.roomDelete = exports.roomAdd = exports.deleteRoomByName = exports.addRoom = void 0;
const mongoose_1 = require("mongoose");
const types_1 = require("./types");
const messages_1 = require("./messages");
// Create Room Schema
const roomModel = mongoose_1.model("room", types_1.RoomSchema, "rooms");
// Get rooms
const getRooms = async () => {
    const rooms = await roomModel.find({});
    return rooms;
};
// Add Room
const addRoom = async (room) => {
    await roomModel.create({ room_name: room.room_name, room_id: room.room_id });
    console.log("Created a new Room: " + room.room_name);
};
exports.addRoom = addRoom;
// Delete Room by ID
const deleteRoomById = async (room_id) => {
    await roomModel.deleteOne({
        room_id: room_id,
    });
};
// Delete Room by Name
const deleteRoomByName = async (room_name) => {
    await roomModel.deleteOne({
        room_name: room_name,
    });
    console.log("Deleted Room " + room_name);
};
exports.deleteRoomByName = deleteRoomByName;
// Handle RoomLoad
const roomLoad = async (req, res) => {
    // Get Messages from specific room
    const rooms = await getRooms();
    console.log("Fetched " + rooms.length + " rooms.");
    res.status(200);
    res.send(rooms);
};
exports.roomLoad = roomLoad;
// Handle Add Room Request
const roomAdd = async (req, res) => {
    if (!req.body || !req.body.room_name || req.body.room_id) {
        console.log("No room_name given!");
        res.status(404);
        res.send({ error: "No room_name given!" });
        return;
    }
    const room_name = req.body.room_name;
    const room_id = req.body.room_id;
    // Check if room name alread exists
    const countName = await roomModel.countDocuments({ room_name: room_name }, async (err, count) => {
        return count;
    });
    const constId = await roomModel.countDocuments({ room_id: room_id }, async (err, count) => {
        return count;
    });
    if (constId || countName) {
        console.log("Room or Id already existed! " + room_name);
        res.set(404);
        res.send({ error: "Room or Id already existed!" });
        return;
    }
    // Create Room
    await roomModel.create({ room_name: room_name, room_id: room_id });
    console.log("Created a new Room: " + room_name);
    res.status(200);
    res.send({ room_name: room_name, room_id: room_id });
};
exports.roomAdd = roomAdd;
const roomDelete = async (req, res) => {
    if (!req.query.room_name) {
        console.log("Can't delete room, no room_name given!");
        res.set(404);
        res.send({ error: "Can't delete room, no room_name given!" });
        return;
    }
    // Find room to delete
    const roomToDelete = await roomModel.findOne({
        room_name: req.query.room_name,
    });
    if (!roomToDelete) {
        console.log("Can't delete room, room doesn't exists!");
        res.set(404);
        res.send({ error: "Can't delete room, room doesn't exists!" });
        return;
    }
    // delete messages in room
    const deleteCount = await messages_1.deleteMessagesById(roomToDelete.room_id);
    console.log("Deleted " + deleteCount + " messages!");
    // delete room out of collection room
    deleteRoomById(roomToDelete.room_id);
    console.log("Deleted room: " + roomToDelete.room_name);
    res.set(200);
    res.send({ status: "Deleted Room" });
};
exports.roomDelete = roomDelete;
