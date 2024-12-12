// src/config/database.js
import mongoose from 'mongoose';
export const connectFrontendDB = async () => {
    try {
        const frontendConnection = await mongoose.createConnection(process.env.MONGO_CLIENT_URI);
        console.log('Frontend database connected successfully');
        return frontendConnection;
    } catch (error) {
        console.error('Frontend database connection error:', error);
        process.exit(1);
    }
};
export const connectBackendDB = async () => {
    try {
        const backendConnection = await mongoose.createConnection(process.env.MONGO_SERVER_URI);
        console.log('Backend database connected successfully');
        return backendConnection;
    } catch (error) {
        console.error('Backend database connection error:', error);
        process.exit(1);
    }
};