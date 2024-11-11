import express from "express";
const Routes = express.Router();
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { getallComment, newcomment } from "../Controller/Comment.controller.js";
Routes.post("/new/:postId", newcomment);
Routes.get("/allcomment/:id", getallComment);

export const CommentRoutes = Routes;
