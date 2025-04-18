import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
const MONGODB_URI = process.env.DATABASE_URL || "";

if (!MONGODB_URI) {
  throw new Error("MongoDB connection URI is missing in environment variables.");
}



export async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) {
    console.log("⚡ Already connected to MongoDB.");
    return;
  }
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("🚀 Connected to MongoDB.");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
}