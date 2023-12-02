import { User } from "../user.model";
import { TUser } from "./user.interface";

const createUserIntoDB = async (userData: TUser) => {
  const user = new User(userData);
  if (await user.isUserExists(userData.userId)) {
    throw new Error("user already exists!");
  }
  const result = await user.save();
  return result;
};

const getAllUsersIntoDB = async () => {
  const result = await User.find();
  return result;
};

const getSingleUserIntoDB = async (userId: number) => {
  const result = await User.findOne({ userId });
  return result;
};

// const updateUser = async (userId: number, userData: TUser) => {
//     const user = new User();
//     if (await user.isUserExists(userId)) {
//         const result = await User.updateOne({ userId: userId }, { $set: userData })
//         return result;
//     } else {
//         throw new Error("user not found")
//     }
// }

export const userServices = {
  createUserIntoDB,
  getAllUsersIntoDB,
  getSingleUserIntoDB,
};
