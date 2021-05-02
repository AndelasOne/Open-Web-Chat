import { getUserByName, updateUser } from "../login";
import { MONGODB_URI } from "../secrets";
import { UserSchema, IUserDocument, IUser } from "../types";
import mongoose, { model, Model } from "mongoose";

const mockUser: IUser = {
  username: "AutomaticTestUser",
  password: "TestPassword",
  room_name: "Test",
  room_id: 1793,
  status: "logged_out",
};

describe("Testing login and register Operation", () => {
  let connection: any;
  const userModel: Model<IUserDocument> = model(
    "registereduser",
    UserSchema,
    "registeredusers"
  );

  beforeAll(async () => {
    connection = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
    });
  });

  afterAll(async () => {
    await connection.close();
  });

  it("User got inserted and fetched correctly", async () => {
    // Delete existing User
    await userModel.deleteOne({ username: mockUser.username });

    // Insert mock user
    const insertedUser = new userModel(mockUser);
    await insertedUser.save();

    //Fetch mock user
    const fetchedUser = await getUserByName(mockUser.username);
    if (fetchedUser) {
      expect(fetchedUser.username).toEqual(insertedUser.username);
    }
  });

  it("Update inserted User", async () => {
    // Delete existing User
    await userModel.deleteOne({ username: mockUser.username });

    // Insert mock user
    const insertedUser = new userModel(mockUser);
    await insertedUser.save();

    // Update User
    const fetchedUser = await updateUser("ChangedUsername", "logged_in");
    if (fetchedUser) {
      expect(fetchedUser.username).not.toEqual(insertedUser.username);
      expect(fetchedUser.username).toEqual("ChangedUsername");
    }
  });
});
