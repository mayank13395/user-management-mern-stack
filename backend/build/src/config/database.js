"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("../logger"));
const { MONGO_URI } = process.env;
const connectDB = () => {
    // Connecting to the database
    logger_1.default.debug(`MONGO_URI:-${MONGO_URI}`);
    mongoose_1.default
        .connect(MONGO_URI)
        .then(() => {
        console.log("Successfully connected to database");
    })
        .catch((error) => {
        console.log("database connection failed. exiting now...");
        console.error(error);
        process.exit(1);
    });
};
exports.default = connectDB;
//# sourceMappingURL=database.js.map