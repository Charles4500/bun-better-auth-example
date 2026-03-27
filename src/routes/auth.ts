import { auth } from "@/lib/auth";
import { resolver, validator as zValidator } from "hono-openapi";
import { Hono } from "hono";
import {
  CreateUserSchema,
  SignInUserSchema,
  UserResponseSchema,
} from "@/schemas/user.schema";
import { describeRoute } from "hono-openapi";

export const userController = new Hono();

userController.post(
  "/sign-up",
  describeRoute({
    summary: "Create user",
    description: "Register a new user account",
    responses: {
      201: {
        description: "User created successfully",
        content: {
          "application/json": { schema: resolver(UserResponseSchema) },
        },
      },
      400: { description: "Invalid input data" },
    },
  }),
  zValidator("json", CreateUserSchema),
  async (c) => {
    const data = c.req.valid("json");

    const user = await auth.api.signUpEmail({
      body: {
        email: data.email,
        name: data.name,
        password: data.password,
      },
    });
    return c.json(user, 201);
  },
);

userController.post(
  "/sign-in",
  describeRoute({
    summary: "Sign in user",
    description: "Authenticate an existing user",
    responses: {
      201: {
        description: "User signed in successfully",
        content: {
          "application/json": { schema: resolver(UserResponseSchema) },
        },
      },
      400: { description: "Invalid input data" },
    },
  }),
  zValidator("json", SignInUserSchema),
  async (c) => {
    const data = c.req.valid("json");
    const user = await auth.api.signInEmail({
      body: {
        email: data.email,
        password: data.password,
      },
    });
    return c.json(user, 201);
  },
);
