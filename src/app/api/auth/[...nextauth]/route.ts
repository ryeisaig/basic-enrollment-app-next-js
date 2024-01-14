import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: AuthOptions  = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID || "",
            clientSecret: process.env.GOOGLE_SECRET || "",
           })  
    ],
    session: {
        strategy: 'jwt',
    },
};

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }