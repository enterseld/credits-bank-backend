import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    
    if (!authHeader) return res.status(401).json({ message: "Token not found" })

    const headerParts = authHeader.split(" ");
    
    if (headerParts.length !== 2 || headerParts[0] !== "Bearer") {
        return res.status(401).json({ message: "Invalid authorization format" });
    }
    const token = headerParts[1];
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        
        next();
    } catch (err) {
        return res.status(401).json({ error: err })
    }
}