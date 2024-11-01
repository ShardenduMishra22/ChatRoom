import { verify } from "jsonwebtoken";
import User from "../models/user.models";

export const checkAuth = (req, res, next) => {
    try {
        const token = req.cookies.jwt
        if (!token) {
            return res.status(401).json({ message: "Unauthorized, unable to verify JWT"});
        }

        const verified = verify(token, process.env.JWT_SECRET);
        if(!verified){
            return res.status(401).json({ message: "Unauthorized, unable to verify JWT"});
        }

        const user = User.findById(verified.id).select("-password");
        if(!user){
            return res.status(401).json({ message: "No Such Users"});
        }

        req.user = user;
        next();
    }catch(error){
        console.log(error);
        console.log("Error in Verifying JWT");
    }
}