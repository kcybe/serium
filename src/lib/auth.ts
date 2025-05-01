import { betterAuth } from "better-auth";
import { username } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { nextCookies } from "better-auth/next-js";


export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "sqlite",
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
