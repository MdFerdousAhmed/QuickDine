import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
// Helper to generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};
// Register a new user
// POST /api/auth/register
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone, role } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({ message: "Please provide all required fields" });
            return;
        }
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            role
        });
        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                token: generateToken(user._id.toString())
            });
        }
        else {
            res.status(400).json({ message: "Invalid user data" });
        }
    }
    catch (error) {
        console.error("Error registering user:", error);
        res.status(400).json({ message: "Error registering user" });
    }
};
// Authenticate a user & get token
// POST /api/auth/login
// @access Private
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Please provide email and password" });
            return;
        }
        // Check for user email
        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }
        // Check password
        const isMatch = await bcrypt.compare(password, user.password || "");
        if (!isMatch) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            token: generateToken(user._id.toString())
        });
    }
    catch (error) {
        console.error("Error logging in user:", error);
        res.status(400).json({ message: "Error logging in user" });
    }
};
// Get user profile
// GET /api/auth/me
// @access Private
export const getMe = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Not authorized" });
            return;
        }
        res.json(req.user);
    }
    catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Error fetching user profile" });
    }
};
