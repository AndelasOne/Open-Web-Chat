import { Document, Schema } from "mongoose";

interface IUserDocument extends Document {
  username: String;
  password: String;
  room_id: number;
  room_name: String;
  status: String;
}

interface IUser {
  username: String;
  password: String;
  room_id: number;
  room_name: String;
  status: String;
}

interface IMessage {
  username: String;
  message: String;
  room_id: number;
  room_name: string;
  time: String;
}

interface IRoom {
  room_name: string;
  room_id: number;
}

interface IUserUpdate {
  username: String;
  status: String;
}

interface IMessageDocument extends Document {
  username: String;
  message: String;
  room_id: number;
  room_name: String;
  time: String;
}

interface IRoomDocument extends Document {
  room_name: String;
  room_id: number;
}

const UserSchema: Schema = new Schema({
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

const MessageSchema: Schema = new Schema(
  {
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
  },
  { timestamps: { createdAt: "created_at" } }
);

const RoomSchema: Schema = new Schema({
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

export {
  UserSchema,
  MessageSchema,
  RoomSchema,
  IUser,
  IUserDocument,
  IUserUpdate,
  IMessage,
  IMessageDocument,
  IRoomDocument,
  IRoom,
};
