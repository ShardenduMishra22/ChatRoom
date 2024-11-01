import mongoose from "mongoose";
import colors from "colors";

export const db = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected".underline.red);
    } catch (error) {
        console.log(`Error: ${error.message}`.underline.red);
    }
};