import express from "express";
import { newUser, login } from "../Controller/User.controller.js";
const Routes = express.Router();

Routes.post("/newuser", newUser);
Routes.post("/login", login);

export const UserRoutes = Routes;
