/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from "mongoose";
import {
  TAddress,
  TFullName,
  TOrders,
  TUser,
  userMethod,
  userModel,
} from "./user/user.interface";
import bcrypt from "bcrypt";
import config from "../config";

const fullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const addressSchema = new Schema<TAddress>({
  street: {
    type: String,
    required: [true, "street is Required"],
  },
  city: {
    type: String,
    required: [true, "city is Required"],
  },
  country: {
    type: String,
    required: [true, "country is Required"],
  },
});

const ordersSchema = new Schema<TOrders>({
  productName: {
    type: String,
    required: [true, "productName is Required"],
  },
  price: {
    type: Number,
    required: [true, "price is Required"],
  },
  quantity: {
    type: Number,
    required: [true, "quantity is Required"],
  },
});

const userSchema = new Schema<TUser, userModel, userMethod>(
  {
    userId: {
      type: Number,
      required: [true, "userId is Required"],
      unique: true,
    },
    username: {
      type: String,
      required: [true, "username is Required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is Required"],
    },
    fullName: {
      type: fullNameSchema,
      required: [true, "fullName is Required"],
    },
    age: {
      type: Number,
      required: [true, "age is Required"],
    },
    email: {
      type: String,
      required: [true, "email is Required"],
      unique: true,
    },
    isActive: {
      type: Boolean,
      required: [true, "isActive is Required"],
    },
    hobbies: {
      type: [String],
      required: [true, "hobbies is Required"],
    },
    address: {
      type: addressSchema,
      required: [true, "address is Required"],
    },
    orders: {
      type: [ordersSchema],
      default: [],
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  { id: false }
);

userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round)
  );
  next();
});

userSchema.post("save", async function (doc, next) {
  (doc.password = ""), next();
});

userSchema.methods.isUserExists = async function (id: number) {
  const userExists = User.findOne({ userId: id });
  return userExists;
};

export const User = model<TUser, userModel>("User", userSchema);
