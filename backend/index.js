import express, { urlencoded } from "express";
import cookieParser from "cookie-parser"; 
import dotenv from "dotenv";
import { db } from "./db/db.js";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import messageRoutes from "./routes/message.routes.js";

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

app.listen(PORT, () => {
    db();
    console.log(`Click To connect: http://localhost:${PORT}`.underline.bold.cyan);
    console.log(`Server is running on port ${PORT}`.underline.bold.blue);
});
