import { User } from "../user.model";
import { TUser } from "./user.interface";

const createUserIntoDB = async (user: TUser) => {
    const result = await User.create(user)
    return result;
}

const getAllUsersIntoDB = async () => {
    const result = await User.find();
    return result;
}

const getSingleUserIntoDB = async (userId: number) => {
    const result = await User.findOne({ userId })
    return result;
}



export const userServices = {
    createUserIntoDB,
    getAllUsersIntoDB,
    getSingleUserIntoDB,
}