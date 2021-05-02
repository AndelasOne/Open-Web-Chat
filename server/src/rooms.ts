import { model, Model } from "mongoose";
import { IRoom, IRoomDocument, RoomSchema } from "./types";
import { deleteMessagesById } from "./messages";
import { RequestHandler } from "express";

// Create Room Schema
const roomModel: Model<IRoomDocument> = model("room", RoomSchema, "rooms");

// Get rooms

const getRooms = async () => {
  const rooms = await roomModel.find({});
  return rooms;
};

// Add Room
const addRoom = async (room: IRoom) => {
  await roomModel.create({ room_name: room.room_name, room_id: room.room_id });
  console.log("Created a new Room: " + room.room_name);
};

// Delete Room by ID
const deleteRoomById = async (room_id: number) => {
  await roomModel.deleteOne({
    room_id: room_id,
  });
};

// Delete Room by Name
const deleteRoomByName = async (room_name: String) => {
  await roomModel.deleteOne({
    room_name: room_name,
  });
};

// Handle RoomLoad
const roomLoad: RequestHandler = async (req, res) => {
  // Get Messages from specific room
  const rooms = await getRooms();
  console.log("Fetched " + rooms.length + " rooms.");
  res.status(200);
  res.send(rooms);
};

export { addRoom, deleteRoomByName, roomLoad, getRooms, deleteRoomById };
