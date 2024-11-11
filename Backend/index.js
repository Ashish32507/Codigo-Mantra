import express from "express";
import { UserRoutes } from "./Routes/User.routes.js";
import { BlogRoutes } from "./Routes/Blog.routes.js";
import { CommentRoutes } from "./Routes/Comment.routes.js";
const app = express();
import { dbConnection } from "./config/dbConnection.js";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
const PORT = process.env.PORT || 3000;

const corsOption = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOption));

app.use(express.json());
app.use(cookieParser());
app.use("/user", UserRoutes);
app.use("/blog", BlogRoutes);
app.use("/comment", CommentRoutes);

app.listen(PORT, () => {
  console.log(`Your Server Is Runing On Port ${PORT}`);
  dbConnection();
});
