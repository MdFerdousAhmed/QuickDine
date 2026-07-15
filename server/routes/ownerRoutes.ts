import {Router} from "express";
import upload from "../config/multer.js";
import { createOwnerRestaurant, getOwnerBookings, getOwnerRestaurant, updateBookingsStatus, updateOwnerRestaurant } from "../controllers/ownerController.js";
import { ownerOnly, protect } from "../middlewares/auth.js";

const ownerRouter = Router();

ownerRouter.use(protect)
ownerRouter.use(ownerOnly)

ownerRouter.get("/restaurant", getOwnerRestaurant)
ownerRouter.post("/restaurant", upload.single("image"), createOwnerRestaurant)
ownerRouter.put("/restaurant", upload.single("image"), updateOwnerRestaurant)
ownerRouter.get("/bookings", getOwnerBookings)
ownerRouter.put("/bookings/:id/status", updateBookingsStatus)

export default ownerRouter;