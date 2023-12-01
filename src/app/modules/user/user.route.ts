import express from "express";
import { userControllers } from "./user.controller";

const router = express.Router();

router.get("/", userControllers.getAllUsers)
router.get("/:userId", userControllers.getSingleUser)
router.post("/", userControllers.createUser);

export const userRoutes = router 