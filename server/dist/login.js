"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.userLogin = void 0;
const types_1 = require("./types");
const mongoose_1 = require("mongoose");
// Create User Schema
const userModel = mongoose_1.model("registereduser", types_1.UserSchema, "registeredusers");
// Get User
const getUserByName = async (username) => {
    const user = await userModel.findOne({ username });
    return user;
};
const registerUser = async (req, res) => {
    const { username: usernameInput, password: passwordInput, } = req.body;
    // Check if username & password are not empty
    if (usernameInput.length > 0 && passwordInput.length > 0) {
        const userFromDB = await getUserByName(usernameInput);
        // User already exists
        if (userFromDB) {
            console.log("Could not insert user!");
            res.status(404);
            res.send("The user is already registered!");
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
        res.send({ username: newUser.username });
        return;
    }
    // Return Error Message
    console.log("Could not insert user!");
    res.status(404);
    res.send("Error: Could not register user duo to an internal problem!");
};
exports.registerUser = registerUser;
// login user
const userLogin = async (req, res) => {
    const { username: usernameInput, password: passwordInput, } = req.body;
    //Abfrage mit der Datenbank
    if (usernameInput.length > 0 && passwordInput.length > 0) {
        const userFromDB = await getUserByName(usernameInput);
        if (!userFromDB) {
            console.log("User not found!");
            res.status(404);
            res.send("User not registered!");
            return;
        }
        // check if username and password are correct
        if (userFromDB.password == passwordInput) {
            res.send({ username: userFromDB.username });
            return;
        }
    }
    // Return Error Message
    res.status(404);
    res.send("Wrong password!");
};
exports.userLogin = userLogin;
