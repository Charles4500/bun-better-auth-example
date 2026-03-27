import { Hono } from "hono";
import { openAPIRouteHandler } from "hono-openapi";
import { Scalar } from "@scalar/hono-api-reference";
import { cors } from "hono/cors";
import { auth } from "./lib/auth";
import { userController } from "./routes/auth";

const app = new Hono();

app.use(
  "/api/auth/*",
  cors({
    origin: "http://localhost:3001",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

app.on(["POST", "GET"], "/api/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

// Mount routes
app.route("/api", userController);

// OpenAPI documentation with Scalar (you can also use Swagger UI)
app.get(
  "/docs",
  Scalar({
    theme: "default",
    url: "/openapi",
  }),
);

app.get(
  "/openapi",
  openAPIRouteHandler(app, {
    documentation: {
      info: {
        title: "My API",
        version: "1.0.0",
        description: "Production-ready Hono API",
      },
      servers: [
        {
          url: "http://localhost:30003",
          description: "Local server",
        },
      ],
    },
  }),
);

export default {
  port: 3000,
  fetch: app.fetch,
};
