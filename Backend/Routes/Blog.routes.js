import express from "express";
const Routes = express.Router();
import {
  create,
  userPost,
  allPost,
  postById,
} from "../Controller/Blog.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

Routes.post("/newpost", create);
Routes.get("/userpost", userPost);
Routes.get("/allpost", allPost);
Routes.get("/:id", postById);
export const BlogRoutes = Routes;
