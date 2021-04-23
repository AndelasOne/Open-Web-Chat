"use strict";
//import "./server_login"
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const login_1 = require("./login");
const database_1 = require("./database");
const app = express_1.default();
const PORT = 4000 || process.env.PORT;
const httpServer = http_1.createServer(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*"
    }
});
app.use(body_parser_1.default.json());
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('message', ({ username, message, time }) => {
        io.emit('message', { username, message, time });
        //Speicherung in der Datenbank
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
app.post('/login', login_1.userLogin);
app.post('/register', login_1.registerUser);
database_1.connectToDatabase().then(() => {
    //Server Started
    httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}\n\nFollow the link: http://localhost:${PORT}`));
});
