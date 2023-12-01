import { Schema, model } from "mongoose";
import {
  TAddress,
  TFullName,
  TOrders,
  TUser,
} from "./user/user.interface";

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

const userSchema = new Schema<TUser>({
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
});



export const User = model<TUser>("User", userSchema);
