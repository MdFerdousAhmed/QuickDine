import "dotenv/config";
import express, { NextFunction, Request, Response } from 'express';
import cors from "cors";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import { Error } from "mongoose";
import restaurantRouter from "./routes/restaurantRoutes.js";
<<<<<<< HEAD
import bookingRouter from "./routes/bookingRoutes.js";
import ownerRouter from "./routes/ownerRoutes.js";
=======
>>>>>>> e6682da8dee0abbdbf7aed4e5acfe8cd791186b7

const app = express();

// Connect to MongoDB
  await connectDB()

// Middleware
app.use(cors())
app.use(express.json());

const port = process.env.PORT || 5000;

app.get('/', (req: Request, res: Response) => {
    res.send('Server is Live!');
});

app.use('/api/auth', authRouter);
app.use('/api/restaurants', restaurantRouter);
<<<<<<< HEAD
app.use('/api/booking', bookingRouter);
app.use('/api/owner', ownerRouter);
=======
>>>>>>> e6682da8dee0abbdbf7aed4e5acfe8cd791186b7

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error("Unhandled error:", err);
    res.status(500).json({
      message: err.message || "Internal Server Error",
      stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
    })
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});