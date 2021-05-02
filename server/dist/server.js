"use strict";
//import "./server_login"
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const login_1 = require("./login");
const messages_1 = require("./messages");
const rooms_1 = require("./rooms");
const database_1 = require("./database");
const app = express_1.default();
const PORT = 4000 || process.env.PORT;
const httpServer = http_1.createServer(app);
const API_URL = "http://localhost:3000";
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*",
    },
});
const options = {
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
app.use(body_parser_1.default.json());
app.use(cors_1.default());
// Socket IO Events
io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("message", ({ username, message, room_id, room_name, time }) => {
        io.emit("message", { username, message, room_id, room_name, time });
        messages_1.insertMessage({
            username: username,
            message: message,
            room_id: room_id,
            room_name: room_name,
            time: time,
        });
    });
    socket.on("addRoom", ({ room_name, room_id }) => {
        io.emit("addRoom", { room_name, room_id });
        rooms_1.addRoom({ room_name, room_id });
    });
    socket.on("deleteRoom", (room_name) => {
        io.emit("deleteRoom", room_name);
        messages_1.deleteMessagesByName(room_name);
        rooms_1.deleteRoomByName(room_name);
    });
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});
// Login and Register
app.post("/login", login_1.loginUser);
app.post("/register", login_1.registerUser);
app.get("/register", login_1.handleUserRequest);
//app.put("/register", changeUser);
// Messaging
app.get("/message", messages_1.messagesLoad);
// Room
app.get("/room", rooms_1.roomLoad);
database_1.connectToDatabase().then(() => {
    //Server Started
    httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}\n\nFollow the link: http://localhost:${PORT}`));
});
