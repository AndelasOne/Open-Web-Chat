import mongoose, { model, Model } from "mongoose";
import { MONGODB_URI } from "../secrets";
import { MessageSchema, IMessageDocument, IMessage } from "../types";
import {
  getMessages,
  deleteMessagesById,
  deleteMessagesByName,
  insertMessage,
} from "../messages";

const mockMessage: IMessage = {
  username: "TestUser",
  message: "Hi to You! :D ",
  room_id: 2,
  room_name: "AutomaticTestRoom",
  time: "13:05",
};

describe("Testing messages operation", () => {
  let connection: any;
  const messageModel: Model<IMessageDocument> = model(
    "message",
    MessageSchema,
    "messages"
  );

  beforeAll(async () => {
    connection = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
    });
  });

  afterAll(async () => {
    await connection.close();
  });

  it("Insert and Fetched correctly", async () => {
    // Insert mock Message
    const MESSAGE_COUNT = 10;
    for (let i = 0; i < MESSAGE_COUNT; i++) {
      await insertMessage(mockMessage);
    }

    //Fetch mock message
    const fetchedMessages = await getMessages(mockMessage.room_id);
    if (fetchedMessages) {
      expect(fetchedMessages.length).toEqual(MESSAGE_COUNT);
    }

    // Delete existing Messages in Room
    await deleteMessagesById(mockMessage.room_id);
  });

  it("Delete Message By Name", async () => {
    // Insert mock Message
    const MESSAGE_COUNT = 10;
    for (let i = 0; i < MESSAGE_COUNT; i++) {
      const insertedMessage = new messageModel(mockMessage);
      await insertedMessage.save();
    }

    // Delete existing Messages in Room
    const count = await deleteMessagesByName(mockMessage.room_name);

    expect(count).toEqual(MESSAGE_COUNT);
  });
});
