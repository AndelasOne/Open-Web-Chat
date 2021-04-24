import { Document, Schema } from "mongoose";

interface IUserDocument extends Document {
  username: String;
  password: String;
  room_id: number;
  status: String;
}

interface IUser {
  username: String;
  password: String;
  room_id: number;
  status: String;
}

interface IUserUpdate {
  username: String;
  status: String;
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
  status: {
    type: String,
    required: true,
  },
});

export { UserSchema, IUser, IUserDocument, IUserUpdate };
