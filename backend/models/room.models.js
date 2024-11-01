import mongoose from "mongoose";

const roomSchema = mongoose.Schema(
    {
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
    }
);

const Room = mongoose.model("Room", roomSchema);
export default Room;
