import { env } from "@/config/env.mjs";
import { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth/next";
import DiscordProvider from "next-auth/providers/discord";

const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
  ],
  secret: env.NEXTAUTH_SECRET,
};

const auth = () => getServerSession(authOptions);

export { auth, authOptions };
