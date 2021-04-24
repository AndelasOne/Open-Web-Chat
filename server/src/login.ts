import { RequestHandler } from "express";
import { IUser, UserSchema, IUserDocument, IUserUpdate } from "./types";
import { Collection, model, Model } from "mongoose";

// Create User Schema
const userModel: Model<IUserDocument> = model(
  "registereduser",
  UserSchema,
  "registeredusers"
);

// Get User
const getUserByName = async (username: String) => {
  const user = await userModel.findOne({ username });
  return user;
};

// Update User
const updateUser = async (username: String, status: String) => {
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
const changeUser: RequestHandler = async (req, res) => {
  if (!req.body || !req.body.username || !req.body.status) {
    console.log("StatusUpdate empty!");
    res.status(404);
    res.send("StatusUpdate empty!");
    return;
  }
  const { username, status } = req.body as IUserUpdate;
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

// Handle User Request
const handleUserRequest: RequestHandler = async (req, res) => {
  const usernameInput = req.query.username as IUser["username"];
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
  const { username, room_id, status } = userFromDB as IUser;
  console.log("Found user: " + userFromDB.username);
  res.status(200);
  res.send({ username: username, room_id: room_id, status: status });
};

// Handle User Register
const registerUser: RequestHandler = async (req, res) => {
  if (req.body && req.body.username && req.body.password) {
    const {
      username: usernameInput,
      password: passwordInput,
    } = req.body as IUser;

    const userFromDB = await getUserByName(usernameInput);

    // User already exists
    if (userFromDB) {
      console.log("Could not insert user!");
      res.status(404);
      res.send("The user is already registered!");
      return;
    }
    const newUser: IUserDocument = await userModel.create({
      username: usernameInput,
      password: passwordInput,
      room_id: 0, //Default Room
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

// login user
const loginUser: RequestHandler = async (req, res) => {
  const {
    username: usernameInput,
    password: passwordInput,
  } = req.body as IUser;

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

export { loginUser, registerUser, handleUserRequest, changeUser };