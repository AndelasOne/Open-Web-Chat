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
  console.log("Deleted Room " + room_name);
};

// Handle RoomLoad
const roomLoad: RequestHandler = async (req, res) => {
  // Get Messages from specific room
  const rooms = await getRooms();
  console.log("Fetched " + rooms.length + " rooms.");
  res.status(200);
  res.send(rooms);
};

// Handle Add Room Request
const roomAdd: RequestHandler = async (req, res) => {
  if (!req.body || !req.body.room_name || req.body.room_id) {
    console.log("No room_name given!");
    res.status(404);
    res.send({ error: "No room_name given!" });
    return;
  }
  const room_name = req.body.room_name as String;
  const room_id = req.body.room_id as number;

  // Check if room name alread exists
  const countName = await roomModel.countDocuments(
    { room_name: room_name },
    async (err, count) => {
      return count;
    }
  );

  const constId = await roomModel.countDocuments(
    { room_id: room_id },
    async (err, count) => {
      return count;
    }
  );

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

const roomDelete: RequestHandler = async (req, res) => {
  if (!req.query.room_name) {
    console.log("Can't delete room, no room_name given!");
    res.set(404);
    res.send({ error: "Can't delete room, no room_name given!" });
    return;
  }

  // Find room to delete
  const roomToDelete = await roomModel.findOne({
    room_name: req.query.room_name as string,
  });

  if (!roomToDelete) {
    console.log("Can't delete room, room doesn't exists!");
    res.set(404);
    res.send({ error: "Can't delete room, room doesn't exists!" });
    return;
  }
  // delete messages in room
  const deleteCount = await deleteMessagesById(roomToDelete.room_id);
  console.log("Deleted " + deleteCount + " messages!");

  // delete room out of collection room
  deleteRoomById(roomToDelete.room_id);
  console.log("Deleted room: " + roomToDelete.room_name);
  res.set(200);
  res.send({ status: "Deleted Room" });
};

export { addRoom, deleteRoomByName, roomAdd, roomDelete, roomLoad };
