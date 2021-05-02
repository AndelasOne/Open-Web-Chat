import mongoose, { model, Model } from "mongoose";
import { MONGODB_URI } from "../secrets";
import { IRoom } from "../types";
import { getRooms, addRoom, deleteRoomById, deleteRoomByName } from "../rooms";

const mockRoom: IRoom = {
  room_name: "AutomaticTestRoom",
  room_id: 2,
};

describe("Testing Room operations", () => {
  let connection: any;

  beforeAll(async () => {
    connection = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
    });
  });

  afterAll(async () => {
    await connection.close();
  });

  it("Get Existing Rooms", async () => {
    // Insert a Room
    await addRoom(mockRoom);

    const fetchedRooms = await getRooms();

    // There exist rooms
    if (fetchedRooms) {
      expect(fetchedRooms.length).toBeGreaterThan(0);
    }

    // Delete Room
    await deleteRoomById(mockRoom.room_id);
  });

  it("Delete Existing Room", async () => {
    // Insert a Room
    await addRoom(mockRoom);

    const fetchedRoomsBefore = await getRooms();
    const countBefore = fetchedRoomsBefore.length;

    // Delete Room
    await deleteRoomByName(mockRoom.room_name);

    const fetchedRoomsAfter = await getRooms();
    const countAfter = fetchedRoomsAfter.length;

    // There exist rooms
    expect(countBefore).toEqual(countAfter + 1);
  });
});
