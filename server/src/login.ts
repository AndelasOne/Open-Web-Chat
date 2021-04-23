import { RequestHandler } from "express";
import { IUser, UserSchema, IUserDocument } from "./types";
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

const registerUser: RequestHandler = async (req, res) => {
  const {
    username: usernameInput,
    password: passwordInput,
  } = req.body as IUser;

  // Check if username & password are not empty
  if (usernameInput.length > 0 && passwordInput.length > 0) {
    const userFromDB = await getUserByName(usernameInput);

    // User already exists
    if (userFromDB) {
      console.log("Could not insert user!");
      res.status(404);
      res.send("The user is already registered!");
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
    res.send({ username: newUser.username });
    return;
  }

  // Return Error Message
  console.log("Could not insert user!");
  res.status(404);
  res.send("Error: Could not register user duo to an internal problem!");
};

// login user
const userLogin: RequestHandler = async (req, res) => {
  const {
    username: usernameInput,
    password: passwordInput,
  } = req.body as IUser;

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

export { userLogin, registerUser };
