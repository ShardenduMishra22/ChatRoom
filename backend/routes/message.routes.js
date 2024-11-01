import { sendMessage, getMessages } from "../controllers/message.controllers.js";
import express from 'express';

const router = express.Router();

router.get("/:id", getMessages);
router.post("/:id", sendMessage);

export default router;
