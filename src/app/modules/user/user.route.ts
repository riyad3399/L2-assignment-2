import express from "express";
import { userControllers } from "./user.controller";

const router = express.Router();

router.post("createUser", userControllers.createUser);

export const userRoutes = router 