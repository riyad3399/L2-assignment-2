import { z } from "zod";

// Define the Zod schema for fullName
const fullNameValidationSchema = z.object({
  firstName: z
    .string({
      required_error: "firstName is Required",
    })
    .trim()
    .nonempty({
      message: "firstName can not be empty",
    }),
  lastName: z
    .string({
      required_error: "lastName is Required",
    })
    .trim()
    .nonempty({
      message: "lastName can not be empty",
    }),
});

// Define the Zod schema for address
const addressValidationSchema = z.object({
  street: z
    .string({
      required_error: "street is Required",
    })
    .nonempty({
      message: "street can not be street",
    }),
  city: z
    .string({
      required_error: "city is Required",
    })
    .nonempty({
      message: "city can not be empty",
    }),
  country: z
    .string({
      required_error: "country is Required",
    })
    .nonempty({
      message: "country can not be empty",
    }),
});

// Define the Zod schema for orders
const ordersValidationSchema = z.object({
  productName: z
    .string({
      required_error: "productName is Required",
    })
    .nonempty({
      message: "productName can not be empty",
    }),
  price: z.number({
    required_error: "price is Required",
  }),
  quantity: z.number({
    required_error: "quantity is Required",
  }),
});

// Define the Zod schema for user
export const userValidationSchema = z.object({
  userId: z.number(),
  username: z
    .string()
    .max(20, { message: "userName more then 20 characters" })
    .trim(),
  password: z.string(),
  fullName: fullNameValidationSchema,
  age: z.number(),
  email: z.string().email({ message: "Invalid email address" }),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: addressValidationSchema,
  orders: z.array(ordersValidationSchema).default([]),
  isDelete: z.boolean().default(false)
});

export default userValidationSchema;
