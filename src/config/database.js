import mongoose from "mongoose";

export const conncectFrontendDB = async () => {
    try {
        const frontEndConnection = await mongoose.createConnection(process.env.MONGO_DEV_CLIENT_URI);
        console.log("Connected to Frontend MongoDB");
        return frontEndConnection;
    } catch (error) {
        console.error("Error connecting to Frontend MongoDB:", error);
        process.exit(1);
    }
};

export const connectBackendDB = async () => {
    try {
        const backendConnection = await mongoose.createConnection(process.env.MONGO_DEV_SERVER_URI);
        console.log("Connected to Backend MongoDB");
        return backendConnection;
    } catch (error) {
        console.error("Error connecting to Backend MongoDB:", error);
        process.exit(1);
    }
};