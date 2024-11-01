import { signin, logout, signup } from "../controllers/user.controllers.js";
import express from 'express';

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logout);

export default router; // Ensure to export the router
