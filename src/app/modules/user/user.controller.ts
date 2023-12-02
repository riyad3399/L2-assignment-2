import { Request, Response } from "express";
import { userServices } from "./user.service";
import userValidationSchema from "./user.validation";


const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    const zodParseData = userValidationSchema.parse(userData);

    const result = await userServices.createUserIntoDB(zodParseData);

    res.status(200).json({
      success: true,
      message: "User created successfully!",
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong!",
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsersIntoDB();
    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: {
        code: 404,
        description: err.message || "user not found",
      },
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const result = await userServices.getSingleUserIntoDB(userId);
    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "error something went wrong!",
      error: {
        code: 404,
        description: err.message || "user not found",
      },
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userData = req.body;
    const result = await userServices.updateUserFromDB(
      Number(userId),
      userData
    );
    res.status(200).json({
      success: true,
      message: "user update successful",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "something went wrong!",
      error: {
        code: 404,
        description: err.message || "something went wrong!",
      },
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    await userServices.deleteUserFromDB(Number(id));
    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "something went wrong!",
      error: {
        code: 404,
        description: err.message || "something went wrong!",
      },
    });
  }
};

export const userControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
