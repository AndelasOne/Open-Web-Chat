import mongoose from "mongoose";
import { MONGODB_URI } from "./secrets";

const connectToDatabase = async () => {
  const db_connection = await mongoose.connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connecting!");
  return db_connection;
};

export { connectToDatabase };
