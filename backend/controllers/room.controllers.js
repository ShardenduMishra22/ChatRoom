import Room from "../models/room.models";

export const createRoom = async (req, res) => {
    const existingRoom = await Room.findOne();
    if (existingRoom) {
        return res.status(400).json({ message: "Room already exists." });
    }
    const room = new Room();
    await room.save();
    res.status(201).json({ message: "Room created successfully", room });
};
