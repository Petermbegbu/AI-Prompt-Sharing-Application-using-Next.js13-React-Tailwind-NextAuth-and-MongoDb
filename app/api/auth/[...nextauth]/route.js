import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { connectToDb } from "@/utils/database";
import User from "@/models/User";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async session({ session }) {
      try {
        const sessionUser = await User.findOne({ email: session.user.email });
        session.user.id = sessionUser._id.toString();
        return session;
      } catch (error) {
        console.log("session error", error);
      }
    },

    async signIn({ profile }) {
      const { name, email, picture } = profile;

      try {
        await connectToDb();

        //check if a user already exist
        const userExist = await User.findOne({ email });

        //If not creat a new user
        if (!userExist) {
          await User.create({
            name: name.toLowerCase(),
            image: picture,
            email,
          });
        }

        return true;
      } catch (error) {
        console.log("signin error", error);
      }
    },
  },
});

export { handler as GET, handler as POST };
