import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { registerHotel } from "../controllers/hotelController.js";

const hotelRouter = express.Router();
hotelController.post("/", protect, registerHotel);

export default hotelRouter;
