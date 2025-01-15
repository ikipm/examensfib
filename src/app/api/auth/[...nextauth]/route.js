import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";

// Define your NextAuth configuration
const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "john@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Connect to the database
        await connectToDatabase();

        // Destructure credentials
        const { email, password } = credentials;

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("No user found with the provided email");
        }

        // Verify the password
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          throw new Error("Incorrect password");
        }

        // Return user object on successful authentication
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          permissions: user.permissions,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.permissions = user.permissions;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.permissions = token.permissions;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

// Create a handler using NextAuth with the defined options
const handler = NextAuth(authOptions);

// Export named handlers for GET and POST requests
export { handler as GET, handler as POST };
