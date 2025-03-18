import { username } from "better-auth/plugins";
import { z } from "zod";

export const formSchema = z.object({
    username: z
    .string()
    .min(4, { message: 'Username must be at least 4 characters long'})
    .max(8, { message: 'Username cannot exceed 8 characters'}),
    
    email: z
    .string()
    .email({ message: 'Please enter a valid email address'})
    .min(2)
    .max(50),

    password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long'})
    .max(16, { message: 'Password cannot exceed 16 characters'}),
})

export const signInFormSchema = formSchema.pick({
    email: true,
    password: true
})