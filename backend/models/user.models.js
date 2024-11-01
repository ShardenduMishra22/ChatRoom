import mongoose from "mongoose";
import pkg from "bcryptjs";
const { hashSync } = pkg;

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
);

userSchema.pre("save", function(next) {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = hashSync(this.password, 10);
    this.password = salt;
    next();
});

const User = mongoose.model("User", userSchema);
export default User;