"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoomById = exports.getRooms = exports.roomLoad = exports.deleteRoomByName = exports.addRoom = void 0;
const mongoose_1 = require("mongoose");
const types_1 = require("./types");
// Create Room Schema
const roomModel = mongoose_1.model("room", types_1.RoomSchema, "rooms");
// Get rooms
const getRooms = async () => {
    const rooms = await roomModel.find({});
    return rooms;
};
exports.getRooms = getRooms;
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
exports.deleteRoomById = deleteRoomById;
// Delete Room by Name
const deleteRoomByName = async (room_name) => {
    await roomModel.deleteOne({
        room_name: room_name,
    });
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
