import mongoose from "mongoose";

const creditSchema = new mongoose.Schema({
    creditType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CreditType",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    startingAmount: {
        type: Number,
        required: true,
    },
    currentAmount: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

const Credit = mongoose.model("User", userSchema);
export default Credit;