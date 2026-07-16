import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';
export const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Get token from header
            token = req.headers.authorization.split(" ")[1];
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Get user from token
            const user = await User.findById(decoded.id).select("-password");
            if (!user) {
                res.status(401).json({ message: "Not authorized, token failed" });
                return;
            }
            req.user = user;
            next();
        }
        catch (error) {
            console.error("Auth Middleware error:", error);
            res.status(401).json({ message: "Not authorized, token failed" });
            return;
        }
    }
    if (!token) {
        res.status(401).json({ message: "Not authorized, no token" });
        return;
    }
};
export const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    }
    else {
        res.status(403).json({ message: "Not authorized, admin only" });
    }
};
export const ownerOnly = (req, res, next) => {
    if (req.user && (req.user.role === "owner" || req.user.role === "admin")) {
        next();
    }
    else {
        res.status(403).json({ message: "Not authorized, owner only" });
    }
};
