import z, { object } from "zod";
import { Role } from "./user.interface";

export const createUserZodSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    phone: z.string().optional(),
    role: z.enum(Object.values(Role)).optional(),
    picture: z.string().url().optional(),
    address: z.string().optional(),
})

export const updateUserZodSchema = z.object({
    name: z.string().min(1, "Name is required").optional(),
    password: z.string().min(6, "Password must be at least 6 characters").optional(),
    role: z.enum(Object.values(Role) as [string]).optional(),
    isDeleted: z.boolean({ message: 'isDeleted must be a boolean value' }).optional(),
    isVerified: z.boolean({ message: 'isDeleted must be a boolean value' }).optional(),
    phone: z.string().optional(),
    picture: z.string().url().optional(),
    address: z.string().optional(),
})