import mongoose from "mongoose";
import logger from "../logger";

const { MONGO_URI } = process.env;

const connectDB = () => {
    // Connecting to the database
    logger.debug(`MONGO_URI:-${MONGO_URI}`)
    mongoose
        .connect(MONGO_URI)
        .then(() => {
            console.log("Successfully connected to database");
        })
        .catch((error) => {
            console.log("database connection failed. exiting now...");
            console.error(error);
            process.exit(1);
        });
}

export default connectDB