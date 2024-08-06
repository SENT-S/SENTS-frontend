// main file
import NextAuth from "next-auth";

import { providers, pages, secret, callbacks } from "./options";

const handler = NextAuth({
  providers,
  pages,
  secret,
  callbacks,
});

export { handler as GET, handler as POST };
