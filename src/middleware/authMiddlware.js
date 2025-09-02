import jwt from "jsonwebtoken"
import dotenv from "dotenv"

const JWT_SECRET = process.env.JWT_SECRET;

export const authMiddleware = async (res, req, next) => {
    const authHeader = req.headers.auth;
    if(!authHeader) return res.status(401).json({message: "Token not found"})
    
    const token = authHeader.split(" ")[1];
    if(!token) return res.status(401).json({message: "Token not found"})
    
    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch(err){
        return res.status(401).json({message: "Invalid token"})
    }
}