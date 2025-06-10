import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";

connectDB();
const app = express();
app.use(cors());

// Middleware
app.use(express.json());
app.use(clerkMiddleware());

// API for Clerk Webhook

app.use("/api/clerk", clerkWebhooks);
app.use("/api/user", userRouter);
app.use("/api/hotels", hotelRouter);

app.get("/", (req, res) => res.send("API is Working fine"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
