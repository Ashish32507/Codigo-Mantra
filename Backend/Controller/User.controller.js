import { User } from "../Modal/User.modal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const newUser = async (req, res) => {
  try {
    const { name, email, number, password } = req.body;
    console.log(name, email, number, password);
    if (!name || !email || !number || !password) {
      return res.status(400).json({
        success: false,
        message: "Something Is Missing",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    const numberRegex = /^[0-9]{10}$/;
    if (!numberRegex.test(number)) {
      return res.status(400).json({
        success: false,
        message: "Invalid number format. Number must be 10 digits",
      });
    }

    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(400).json({
        success: false,
        message: "User Is Already Register",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      number,
    });

    if (!newUser) {
      return res.status(400).json({
        success: false,
        message: "User Is Not Register",
      });
    }

    if (newUser) {
      return res.status(201).json({
        success: true,
        message: "User Is Registered SuccessFully",
      });
    }
  } catch (err) {
    console.error("Error occurred:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "Something Is Missing",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Please Registered",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Password Is Not Match",
      });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });

    const newUser = user.toObject();
    newUser.password = undefined;
    return res.status(201).json({
      success: true,
      message: "User Login Successfully",
      User: newUser,
    });
  } catch (err) {
    console.error("Error occurred:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
