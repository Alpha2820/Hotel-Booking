import User from "../models/User.js";

// Middleware to check user

export const protect = async (req, res, next) => {
  const { userId } = req.auth;
  if (!userId) {
    res.json({ success: false, message: "Not Authenticated" });
  } else {
    const user = await User.findById(userId);
    req.user = user;
    next();
  }
};
