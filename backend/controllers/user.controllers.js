import { GenerateToken } from "../utils/jwt.js";
import User from "../models/user.models.js";
import bcryptjs from "bcryptjs"; // Make sure to import bcryptjs

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExist = await User.findOne({ // Corrected to use 'name'
            name,
            email
        });

        if (userExist) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const user = await User.create({
            name,
            email,
            password
        });

        res.status(201).json({ // Changed status to 201 for resource creation
            user,
            message: "User created successfully"
        });

    } catch (error) {
        console.error(error); // Use console.error for error logging
        return res.status(500).json({ message: "Error in signup" }); // Send error response
    }
};

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ // Corrected method name
            email
        });

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        const isMatch = await bcryptjs.compare(password, user.password); // Corrected bcryptjs reference
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        GenerateToken(user._id, res);
        res.status(200).json({
            user,
            message: "User signed in successfully"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error in signin" }); // Send error response
    }
};

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({
            message: "Logged out successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error in logout" }); // Send error response
    }
};