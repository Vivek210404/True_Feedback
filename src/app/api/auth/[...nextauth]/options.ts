import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials): Promise<any> {
        await dbConnect();

        try {
          const user = await UserModel.findOne({
            $or: [
              { email: credentials?.identifier },
              { username: credentials?.identifier },
            ],
          });

          if (!user) throw new Error("User not found");
          if (!user.isVerified)
            throw new Error("Please verify your account first");

          const isPasswordCorrect = await bcrypt.compare(
            credentials!.password,
            user.password
          );

          if (!isPasswordCorrect) throw new Error("Invalid password");

          return {
            _id: (user._id as any).toString(),
            username: user.username,
            email: user.email,
            isVerified: user.isVerified,
            isAcceptingMessages: user.isAcceptingMessages,
          };
        } catch (err: any) {
          throw new Error(err.message || "Login failed");
        }
      },
    }),
  ],

  callbacks: {
    // GOOGLE
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        await dbConnect();

        let existingUser = await UserModel.findOne({ email: user.email });

        if (!existingUser) {
          // Create username safely
          let baseUsername = user.email?.split("@")[0] || "user";
          let username = baseUsername;
          const exist = await UserModel.findOne({ username });
          if (exist) username = baseUsername + "_" + Date.now();

          const newUser = await UserModel.create({
            email: user.email,
            username: username,
            password: "",
            verifyCode: "",
            verifyCodeExpiry: new Date(),
            isVerified: true,
            isAcceptingMessages: true,
          });

          existingUser = newUser;
        }

        const mongoUser = existingUser as any;

        (user as any)._id = mongoUser._id.toString();
        (user as any).username = mongoUser.username;
        (user as any).isVerified = mongoUser.isVerified;
        (user as any).isAcceptingMessages = mongoUser.isAcceptingMessages;
      }

      return true;
    },

    // JWT Store Values
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.username = user.username;
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAcceptingMessages;
      }
      return token;
    },

    //Session Store Values
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          _id: token._id as string,
          username: token.username as string,
          isVerified: token.isVerified as boolean,
          isAcceptingMessages: token.isAcceptingMessages as boolean,
        };
      }
      return session;
    },
  },

  pages: {
    signIn: "/sign-in",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
