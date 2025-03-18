import { betterAuth } from "better-auth";
import { username } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import dotenv from "dotenv";
import prisma from "./prisma";
import { nextCookies } from "better-auth/next-js";

dotenv.config();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  plugins: [
    username({
      minUsernameLength: 4,
      maxUsernameLength: 8,
    }),
    nextCookies(),
  ],
  emailAndPassword: {
    enabled: true,
  },
});
