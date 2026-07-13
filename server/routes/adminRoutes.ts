import { Router } from "express";
import { approveRestaurant, getAdminStats, getAllRestaurant } from "../controllers/adminController.js";
import { adminOnly, protect } from "../middlewares/auth.js";

const adminRouter = Router()

adminRouter.use(protect)
adminRouter.use(adminOnly)

adminRouter.get("/restaurants", getAllRestaurant)
adminRouter.put("/restaurants/:id/approve", approveRestaurant)
adminRouter.get("/stats", getAdminStats)

export default adminRouter