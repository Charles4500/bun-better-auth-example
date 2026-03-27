import { betterAuth } from "better-auth";
import { db } from "@/db";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { account, session, user, verification } from "@/db/auth-schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: { user, session, account, verification },
  }),
  emailAndPassword: {
    enabled: true,
  },
});
