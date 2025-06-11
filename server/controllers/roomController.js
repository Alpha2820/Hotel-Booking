// API to create new Room

import Hotel from "../models/Hotel.js";
import { v2 as cloudinary } from "cloudinary";
import Room from "../models/Room.js";

export const createRoom = async (req, res) => {
  try {
    const { roomtType, pricePerNight, amenities } = req.body;
    const hotel = await Hotel.findOne({ owner: req.auth.userId });
    if (!hotel) {
      return res.json({ success: false, message: "No Hotels Found" });
    }
    // upload imgaes to cloudinary

    const uploadImages = req.files.map(async (file) => {
      const response = await cloudinary.uploader.upload(file.path);
      return response.secure_url;
    });
    // Wait for all uploads to complete
    const images = await Promise.all(uploadImages);
    await Room.create({
      hotel: hotel._id,
      roomType,
      pricePerNight: +pricePerNight,
      amenities: JSON.parse(amenities),
      images,
    });
    res.json({ success: true, message: "Room Created successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to get all Rooms

export const getRoom = async (req, res) => {};

// API to get all Rooms for a specific hotel

export const getOwnerRoom = async (req, res) => {};

// API to toggle Availability of a room

export const toogleRoomAvailability = async (req, res) => {};
