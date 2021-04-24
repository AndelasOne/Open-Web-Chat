//import "./server_login"

import express from "express";
import bodyParser from "body-parser";
import { Server } from "socket.io";
import cors from "cors";

import { createServer } from "http";
import {
  loginUser,
  registerUser,
  handleUserRequest,
  changeUser,
} from "./login";
import { connectToDatabase } from "./database";

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

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("message", ({ username, message, time }) => {
    io.emit("message", { username, message, time });

    //Speicherung in der Datenbank
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.post("/login", loginUser);
app.post("/register", registerUser);

app.get("/register", handleUserRequest);
app.put("/register", changeUser);

connectToDatabase().then(() => {
  //Server Started
  httpServer.listen(PORT, () =>
    console.log(
      `Server running on port ${PORT}\n\nFollow the link: http://localhost:${PORT}`
    )
  );
});
