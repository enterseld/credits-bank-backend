import mongoose from "mongoose";

const creditTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    conditions: {
        type: String,
        required: true,
    },
    interestRate: {
        type: Number,
        required: true,
    },
    term: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const CreditType = mongoose.model("CreditType", creditTypeSchema);
export default CreditType;