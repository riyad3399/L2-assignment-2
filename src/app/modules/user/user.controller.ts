import { Request, Response } from "express";
import { userServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    const result = await userServices.createUserIntoDB(user);

    res.status(200).json({
      success: true,
      message: "User is create successful",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: err,
    });
  }
};

export const userControllers = {
  createUser,
};
