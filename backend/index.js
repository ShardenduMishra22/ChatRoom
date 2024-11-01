import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { db } from "./db/db.js";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import messageRoutes from "./routes/message.routes.js";
import Room from "./models/room.models.js"; // Import Room model

const app = express();

app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "*",
    methods: "GET,POST",
}));

app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

dotenv.config();
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    db();

    // Check if a room exists, and create one if it doesn't
    const existingRoom = await Room.findOne();
    if (!existingRoom) {
        const room = new Room();
        await room.save();
        console.log("Room created successfully.");
    } else {
        console.log("Room already exists.");
    }

    console.log(`Click To connect: http://localhost:${PORT}`);
    console.log(`Server is running on port ${PORT}`);
});
