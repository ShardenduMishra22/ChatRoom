import messageRoutes from "./routes/message.routes.js";
import roomRoutes from "./routes/room.routes.js";
import userRoutes from "./routes/user.routes.js";
import express, { urlencoded } from "express";
import Room from "./models/room.models.js";
import cookieParser from "cookie-parser";
import { db } from "./db/db.js";
import dotenv from "dotenv";
import chalk from "chalk";
import cors from "cors";

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
app.use("/api/room", roomRoutes);

dotenv.config();
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    db();
    const existingRoom = await Room.findOne();
    if (!existingRoom) {
        const room = new Room();
        await room.save();
        console.log(chalk.green("Room created successfully."));
    } else {
        console.log(chalk.yellow("Room already exists."));
    }

    console.log(chalk.cyan(`Click To connect: http://localhost:${PORT}`));
    console.log(chalk.blue(`Server is running on port ${PORT}`));
});
