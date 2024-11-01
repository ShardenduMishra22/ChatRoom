import jwt from "jsonwebtoken";

export const GenerateToken =  (id,res) => {
    const token = jwt.sign(
        {id},
        process.env.JWT_SECRET,
        {  expiresIn: "4d" }
    )
    res.cookie("jwt",token,{
        maxAge : Date.now() + 86400000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
        sameSite: "none"
    })
}