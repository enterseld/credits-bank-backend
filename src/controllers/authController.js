import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req, res) => {
    const { name, password, ownershipType, address, phoneNumber, contactPerson } = req.body;

    try {
        const existingUser = await User.findOne({ phoneNumber: phoneNumber });
        if (existingUser) return res.status(400).json({ message: "User already exists" });
        const user = User.create({ name, password, ownershipType, address, phoneNumber, contactPerson });
        res.status(201).json({ message: "User created", userId: user._id })
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const login = async (req, res) => {
    const { phoneNumber, password } = req.body;

    try {
        const user = await User.findOne({ phoneNumber: phoneNumber });
        if (!user) return res.status(400).json({ message: "User not found" });

        const match = await bcrypt.compare(password, user.password)
        if (!match) return res.status(400).json({ message: "Wrong password" });

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "2h" });
        res.json({
            message: "Logged in",
            token,
            user: { id: user._id, name: user.name, phoneNumber: user.phoneNumber }
        });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }

}