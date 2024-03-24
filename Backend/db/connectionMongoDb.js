
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_DATABASE);
        console.log("Connection established on MongoDB");
    } catch (error) {
        console.log("Failed to connect to MongoDB Database");
        console.log(error);
    }
}

export default connectDB;