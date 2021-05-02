//import "./server_login"

import express from "express";
import bodyParser from "body-parser";
import { Server } from "socket.io";
import cors from "cors";

import { createServer } from "http";
import { loginUser, registerUser, handleUserRequest } from "./login";

import { messagesLoad, insertMessage, deleteMessagesByName } from "./messages";

import { addRoom, deleteRoomByName, roomLoad } from "./rooms";

import { connectToDatabase } from "./database";
import { IMessage, IRoom } from "./types";

const app = express();
const PORT = 4000 || process.env.PORT;
const httpServer = createServer(app);
const API_URL = "http://localhost:3000";

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

const options: cors.CorsOptions = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
  ],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: API_URL,
  preflightContinue: false,
};

app.use(bodyParser.json());
app.use(cors());

// Socket IO Events
io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on(
    "message",
    ({ username, message, room_id, room_name, time }: IMessage) => {
      io.emit("message", { username, message, room_id, room_name, time });

      insertMessage({
        username: username,
        message: message,
        room_id: room_id,
        room_name: room_name,
        time: time,
      });
    }
  );

  socket.on("addRoom", ({ room_name, room_id }: IRoom) => {
    io.emit("addRoom", { room_name, room_id });
    addRoom({ room_name, room_id });
  });

  socket.on("deleteRoom", (room_name: String) => {
    io.emit("deleteRoom", room_name);
    deleteMessagesByName(room_name);
    deleteRoomByName(room_name);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// Login and Register
app.post("/login", loginUser);
app.post("/register", registerUser);

app.get("/register", handleUserRequest);
//app.put("/register", changeUser);

// Messaging
app.get("/message", messagesLoad);

// Room
app.get("/room", roomLoad);

connectToDatabase().then(() => {
  //Server Started
  httpServer.listen(PORT, () =>
    console.log(
      `Server running on port ${PORT}\n\nFollow the link: http://localhost:${PORT}`
    )
  );
});
