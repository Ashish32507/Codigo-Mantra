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

const allowedOrigins = ['http://localhost:5173', 'https://codigo-mantra.vercel.app'];
app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(cors(allowedOrigins));

app.use(express.json());
app.use(cookieParser());
app.use("/user", UserRoutes);
app.use("/blog", BlogRoutes);
app.use("/comment", CommentRoutes);

 dbConnection();
app.listen(PORT, () => {
  console.log(`Your Server Is Runing On Port ${PORT}`);
});
