import Message from "../models/message.models.js";

export const getMessages = async (req, res) => {
    try {
        const roomId = req.params.id;
        const messages = await Message.find({ room: roomId });
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
