import { db } from "@/db/client";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { sendEmail } from "../email";

export const auth = betterAuth({
  trustedOrigins: ["http://localhost:3000", "https://guxi.vercel.app"],
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  account: {
    accountLinking: {
      enabled: true,
      allowDifferentEmails: true,
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      scopes: ["read:user", "user:email", "repo"],
    },
    twitter: {
      clientId: process.env.X_CLIENT_ID!,
      clientSecret: process.env.X_CLIENT_SECRET!,
      scopes: ["tweet.write", "users.read", "offline.access"],
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, token }) => {
      const verificationUrl = `${process.env.BETTER_AUTH_URL}/api/auth/verify-email?token=${token}&callbackURL=${process.env.EMAIL_VERIFICATION_CALLBACK_URL}`;
      await sendEmail({
        type: "verify-email",
        to: user.email,
        subject: "GUXI - Verify your email address",
        text: `Click the link to verify your email: ${verificationUrl}`,
      });
    },
  },
  user: {
    deleteUser: {
      enabled: true,
      afterDelete: async (u) => {
        await db.delete(user).where(eq(user.id, u.id));
      },
      sendDeleteAccountVerification: async ({ user, url, token }, request) => {
        await sendEmail({
          type: "delete-account",
          to: user.email,
          subject: "GUXI - Delete your account",
          text: `Click the link to delete your account: ${url}`,
        });
      },
    },
  },
});
