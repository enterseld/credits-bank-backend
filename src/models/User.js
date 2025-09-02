import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    ownershipType: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    contactPerson:{
        type: String,
        required: true,
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;