import { verify } from "jsonwebtoken";
import User from "../models/user.models";

export const checkAuth = async (req, res, next) => {
    try {
        console.log("Check Middleware - 1")
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized, unable to verify JWT" });
        }

        const verified = verify(token, process.env.JWT_SECRET);
        if (!verified) {
            return res.status(401).json({ message: "Unauthorized, unable to verify JWT" });
        }

        const user = await User.findById(verified.id).select("-password"); // Await here
        if (!user) {
            return res.status(401).json({ message: "No Such User" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error in Verifying JWT" }); // Send error response
    }
};
