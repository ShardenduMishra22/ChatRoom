import Message from "../models/message.models.js";

export const getMessages = async (req, res) => {
    try {
        const roomId = req.params.id;
        const messages = await Message.find({ room: roomId }).populate('user', '-password'); // Exclude password for security
        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error in getting messages" });
    }
};

export const sendMessage = async (req, res) => {
    try {
        const { user, message } = req.body;
        const roomId = req.params.id;

        // Validate user and message presence
        if (!user) {
            return res.status(400).json({ message: "User ID is required" });
        }
        if (!message) {
            return res.status(400).json({ message: "Message content is required" });
        }

        const newMessage = new Message({
            user,
            room: roomId,
            message
        });

        await newMessage.save();
        res.status(201).json({
            message: "Message sent successfully",
            newMessage
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error in sending message" });
    }
};
