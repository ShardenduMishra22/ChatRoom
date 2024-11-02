import mongoose from "mongoose";
import pkg from "bcryptjs";
const { hashSync } = pkg;

// Function to generate a random avatar URL
const generateAvatarUrl = (seed) => {
    return `https://api.dicebear.com/9.x/lorelei/svg?seed=${seed}`;
};

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true // Ensure email uniqueness
        },
        password: {
            type: String,
            required: true
        },
        avatar: {
            type: String,
            default: function() {
                return generateAvatarUrl(this.email);
            }
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
