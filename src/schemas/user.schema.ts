import z from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const CreateUserSchema = z.object({
  email: z.email().openapi({ example: "user@example.com" }),
  name: z.string().openapi({ example: "John Doe" }).min(1).max(100),
  password: z.string().min(8).openapi({ example: "SecurePass123!" }),
});

export const SignInUserSchema = z.object({
  email: z.email().openapi({ example: "user@example.com" }),
  password: z.string().min(8).openapi({ example: "SecurePass123!" }),
});

export const UserResponseSchema = z
  .object({
    id: z.uuid().openapi({ example: "00000000-0000-0000-0000-000000000000" }),
    email: z.email().openapi({ example: "user@example.com" }),
    name: z.string().openapi({ example: "John Doe" }).min(1).max(100),
  })
  .openapi("User");

export type CreateUserInput = z.infer<typeof CreateUserSchema>;
export type UserResponse = z.infer<typeof UserResponseSchema>;
