"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getUserByName = exports.handleUserRequest = exports.registerUser = exports.loginUser = void 0;
const types_1 = require("./types");
const mongoose_1 = require("mongoose");
// Create User Schema
const userModel = mongoose_1.model("registereduser", types_1.UserSchema, "registeredusers");
// Get User
const getUserByName = async (username) => {
    const user = await userModel.findOne({ username });
    return user;
};
exports.getUserByName = getUserByName;
// Update User
const updateUser = async (username, status) => {
    const userToUpdate = await getUserByName(username);
    //make sure user exist (should be catched already by UI)
    if (!userToUpdate) {
        console.log("Cant update user: User does not exist!");
        return;
    }
    await userModel.where({ username: username }).updateOne({ status: status });
    const updatedUser = await getUserByName(username);
    return updatedUser;
};
exports.updateUser = updateUser;
// Handle User Request
const handleUserRequest = async (req, res) => {
    const usernameInput = req.query.username;
    if (!usernameInput) {
        console.log("No username given!");
        res.status(404);
        res.send();
        return;
    }
    const userFromDB = await getUserByName(usernameInput);
    if (!userFromDB) {
        console.log("User not found!");
        res.status(404);
        res.send({ error: "User not found!" });
        return;
    }
    const { username, room_id, room_name, status } = userFromDB;
    console.log("Found user: " + userFromDB.username);
    res.status(200);
    res.send({
        username: username,
        room_id: room_id,
        room_name: room_name,
        status: status,
    });
};
exports.handleUserRequest = handleUserRequest;
// Handle User Register
const registerUser = async (req, res) => {
    if (req.body && req.body.username && req.body.password) {
        const { username: usernameInput, password: passwordInput, } = req.body;
        const userFromDB = await getUserByName(usernameInput);
        // User already exists
        if (userFromDB) {
            console.log("Could not insert user!");
            res.status(404);
            res.send("The user is already registered!");
            return;
        }
        const newUser = await userModel.create({
            username: usernameInput,
            password: passwordInput,
            room_id: 0,
            room_name: "datenbanken",
            status: "logged_out",
        });
        // Successfuly inserted user
        console.log("Insertet User into DB! Registered ", newUser.username);
        res.status(200);
        res.send({
            username: newUser.username,
            room_id: newUser.room_id,
            room_name: newUser.room_name,
            status: newUser.status,
        });
        return;
    }
    // Return Error Message
    console.log("Could not insert user!");
    res.status(404);
    res.send("Error: Could not register user duo to an internal problem!");
};
exports.registerUser = registerUser;
// login user
const loginUser = async (req, res) => {
    const { username: usernameInput, password: passwordInput, } = req.body;
    if (usernameInput.length > 0 && passwordInput.length > 0) {
        const userFromDB = await getUserByName(usernameInput);
        if (!userFromDB) {
            console.log("User not found!");
            res.status(404);
            res.send({ error: "User not registered!" });
            return;
        }
        // check if username and password are correct
        if (userFromDB.password == passwordInput) {
            console.log("Credentials are correct!");
            await updateUser(userFromDB.username, "logged_in");
            res.status(200);
            res.send({
                username: userFromDB.username,
                room_id: userFromDB.room_id,
                room_name: userFromDB.room_name,
                status: "logged_in",
            });
            return;
        }
    }
    // Return Error Message
    console.log("Wrong password!");
    res.status(404);
    res.send({ error: "Wrong password!" });
};
exports.loginUser = loginUser;
