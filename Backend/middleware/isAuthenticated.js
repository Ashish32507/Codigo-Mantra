import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "User is not authenticated",
        success: false,
      });
    }

    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }

    req.id = decoded.userId;
    next();
  } catch (err) {
    console.log("Middleware error:", err);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};
// exports = isAuthenticated;
