"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const secrets_1 = require("../secrets");
const rooms_1 = require("../rooms");
const mockRoom = {
    room_name: "AutomaticTestRoom",
    room_id: 2,
};
describe("Testing Room operations", () => {
    let connection;
    beforeAll(async () => {
        connection = await mongoose_1.default.connect(secrets_1.MONGODB_URI, {
            useNewUrlParser: true,
        });
    });
    afterAll(async () => {
        await connection.close();
    });
    it("Get Existing Rooms", async () => {
        // Insert a Room
        await rooms_1.addRoom(mockRoom);
        const fetchedRooms = await rooms_1.getRooms();
        // There exist rooms
        if (fetchedRooms) {
            expect(fetchedRooms.length).toBeGreaterThan(0);
        }
        // Delete Room
        await rooms_1.deleteRoomById(mockRoom.room_id);
    });
    it("Delete Existing Room", async () => {
        // Insert a Room
        await rooms_1.addRoom(mockRoom);
        const fetchedRoomsBefore = await rooms_1.getRooms();
        const countBefore = fetchedRoomsBefore.length;
        // Delete Room
        await rooms_1.deleteRoomByName(mockRoom.room_name);
        const fetchedRoomsAfter = await rooms_1.getRooms();
        const countAfter = fetchedRoomsAfter.length;
        // There exist rooms
        expect(countBefore).toEqual(countAfter + 1);
    });
});
