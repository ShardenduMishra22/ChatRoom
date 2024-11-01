import express, { urlencoded } from "express";
import cookieParser from "cookie-parser"; 
import dotenv from "dotenv";
import { db } from "./db/db.js";
import cors from "cors";

const app = express();

app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "*",
    methods: "GET,POST",
}));

// Routes Go Here



// Routes End Here

dotenv.config();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    db();
    console.log(`Click To connect: http://localhost:${PORT}`.underline.bold.cyan);
    console.log(`Server is running on port ${PORT}`.underline.bold.blue);
});