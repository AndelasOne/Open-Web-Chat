import { RequestHandler } from "express";
import { MessageSchema, IMessageDocument, IMessage } from "./types";
import { model, Model } from "mongoose";

// Create Message Model for one Room
const messageModel: Model<IMessageDocument> = model(
  "message",
  MessageSchema,
  "messages"
);

// Get messages
const getMessages = async (room_id: number) => {
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

// Delete Messages in Room
const deleteMessagesById = async (room_id: number) => {
  const res = await messageModel.deleteMany({
    room_id: room_id,
  });
  return res.deletedCount;
};

const deleteMessagesByName = async (room_name: String) => {
  const res = await messageModel.deleteMany({
    room_name: room_name,
  });
  return res.deletedCount;
};

// Insert Message
const insertMessage = async (message: IMessage) => {
  await messageModel.create(message);
  console.log("Inserted Message by: " + message.username);
};
// Handle Message Get Request
const messagesLoad: RequestHandler = async (req, res) => {
  if (!req.query.room_name || !req.query.room_id) {
    console.log("No room_name or room_id given!");
    res.status(404);
    res.send({ error: "No room_name or room_id given!" });
    return;
  }

  const room_name = req.query.room_name as IMessage["room_name"];
  const room_id = Number(req.query.room_id);

  // Get Messages from specific room
  const messages = await getMessages(room_id);
  console.log("Fetched Messages from room: " + room_name);
  res.status(200);
  res.send(messages);
};

export {
  messagesLoad,
  insertMessage,
  deleteMessagesById,
  deleteMessagesByName,
  getMessages,
};
