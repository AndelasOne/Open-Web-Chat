"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeUser = exports.handleUserRequest = exports.registerUser = exports.loginUser = void 0;
const types_1 = require("./types");
const mongoose_1 = require("mongoose");
// Create User Schema
const userModel = mongoose_1.model("registereduser", types_1.UserSchema, "registeredusers");
// Get User
const getUserByName = async (username) => {
    const user = await userModel.findOne({ username });
    return user;
};
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
// Handle User Change
const changeUser = async (req, res) => {
    if (!req.body || !req.body.username || !req.body.status) {
        console.log("StatusUpdate empty!");
        res.status(404);
        res.send("StatusUpdate empty!");
        return;
    }
    const { username, status } = req.body;
    if (status !== "logged_in" && status !== "logged_out") {
        console.log("Status Error!");
        res.status(404);
        res.send("Status Error!");
        return;
    }
    const possibleUser = await updateUser(username, status);
    if (!possibleUser) {
        res.status(404);
        res.end();
        return;
    }
    console.log("Changed user!");
    res.status(200);
    res.send({
        username: possibleUser.username,
        room_id: possibleUser.room_id,
        status: possibleUser.status,
    });
    return;
};
exports.changeUser = changeUser;
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
    //console.log(userFromDB);
    if (!userFromDB) {
        console.log("User not found!");
        res.status(404);
        res.send({ error: "User not found!" });
        return;
    }
    const { username, room_id, status } = userFromDB;
    console.log("Found user: " + userFromDB.username);
    res.status(200);
    res.send({ username: username, room_id: room_id, status: status });
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
            status: "logged_out",
        });
        // Successfuly inserted user
        console.log("Insertet User into DB! Registered ", newUser.username);
        res.status(200);
        res.send({
            username: newUser.username,
            room_id: newUser.room_id,
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
