import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import { User } from "./models/User.js";
import { Restaurant } from "./models/Restaurant.js";
import { Booking } from "./models/Booking.js";

const MONGO_URI = process.env.MONGODB_URI || "";

const seedData = async ()=>{
  try {
    console.log("Connecting to database for seeding...");

    await mongoose.connect(MONGO_URI)
    console.log("Database connected. Clearing existing collections..");

    await User.deleteMany({})
    await Restaurant.deleteMany({})
    await Booking.deleteMany({})

    console.log("Creating default users...");

    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash("admin123", salt)
    const userPassword = await bcrypt.hash("user123", salt)
    const ownerPassword = await bcrypt.hash("owner123", salt)

    // Admin
    const adminUser = await User.create({
      name: "Ferdous Ahmed",
      email: "admin@example.com",
      password: adminPassword,
      phone: "+8801777906923",
      role: "admin"
    })

    //User
    const testUser = await User.create({
      name: "tonau Ahmed",
      email: "user@example.com",
      password: userPassword,
      phone: "+8801777906923",
      role: "user"
    })

    // Owner
    const ownerUser = await User.create({
      name: "Badhon Ahmed",
      email: "owner@example.com",
      password: ownerPassword,
      phone: "+8801777906923",
      role: "owner"
    })

    console.log("Creating restaurant...");

    

  } catch (error: any) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seedData();