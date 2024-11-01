import jwt from "jsonwebtoken";

export const GenerateToken = (id, res) => {
    const token = jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: "4d" }
    );
    res.cookie("jwt", token, {
        maxAge: 4 * 24 * 60 * 60 * 1000, // Set the maxAge to match token expiration
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Secure only in production
        sameSite: "none"
    });
};
