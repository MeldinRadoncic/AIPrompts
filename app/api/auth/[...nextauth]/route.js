import NextAuth from "next-auth/next";
import  GoogleProvider from "next-auth/providers/google";


import { connectToDatabase } from "@/utils/database.js";
import  User  from "@/models/User.js";


const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        
        }),
       
       
    ],
    callbacks: {
        async session({ session }) {
          const sessionUser = await User.findOne({ email: session.user.email });
          session.user.id = sessionUser._id.toString();
          return session;
        },
        async signIn({ account, profile, user, credentials }) {
          try {
            await connectToDatabase();
    
            // Check if user exists in DB
            const userExists = await User.findOne({ email: profile.email });
    
            // If not, create new user
            if (!userExists) {
              await User.create({
                email: profile.email,
                username: profile.name.replace(" ", "").toLowerCase(),
                image: profile.picture,
              });
            }
    
            return true;
          } catch (error) {
            console.log(error);
            return false;
          }
        },
      },
    });
    
    export { handler as GET, handler as POST };
