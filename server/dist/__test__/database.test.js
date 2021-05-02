"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const login_1 = require("../login");
const secrets_1 = require("../secrets");
const types_1 = require("../types");
const mongoose_1 = __importStar(require("mongoose"));
describe("Find a registered User", () => {
    let connection;
    const userModel = mongoose_1.model("registereduser", types_1.UserSchema, "registeredusers");
    beforeAll(async () => {
        connection = await mongoose_1.default.connect(secrets_1.MONGODB_URI, {
            useNewUrlParser: true,
        });
    });
    afterAll(async () => {
        await connection.close();
    });
    it("Register user and insert user document into DB", async () => {
        // Delete existing User
        await userModel.deleteOne({ username: "AutomaticTestUser" });
        const mockUser = {
            _id: "608dc5c8286d9d4a2c0e3675",
            username: "AutomaticTestUser",
            password: "TestPassword",
            room_name: "Test",
            room_id: 1793,
            status: "logged_out",
            __v: 0,
        };
        // Insert mock user
        const insertedUser = new userModel(mockUser);
        await insertedUser.save();
        //Fetch mock user
        const fetchedUser = await login_1.getUserByName("AutomaticTestUser");
        if (fetchedUser) {
            expect(fetchedUser.username).toEqual(insertedUser.username);
            expect(fetchedUser).toEqual(insertedUser);
        }
    });
});
