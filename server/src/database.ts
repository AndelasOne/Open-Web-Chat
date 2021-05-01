import mongoose from "mongoose";
const connectToDatabase = async () => {
  const uri =
    "mongodb+srv://AndiAdmin:6y1iO66CBm4T@cluster0.fyjsg.mongodb.net/Open-Web-Chat?retryWrites=true&w=majority";

  const db_connection = await mongoose.connect(uri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connecting!");
  return db_connection;
};

export { connectToDatabase };
