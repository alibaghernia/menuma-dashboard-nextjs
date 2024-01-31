import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import axios from "../axios";
import { AxiosResponseType } from "./types";

export const authConfig = {
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdministrator = auth?.user?.role == "admin";
      const isOnAuth = nextUrl.pathname.startsWith("/auth");
      if (isOnAuth) {
        if (isAdministrator)
          return Response.redirect(new URL("/administrator", nextUrl));
        else return Response.redirect(new URL("/", nextUrl));
        // Redirect unauthenticated users to login page
      } else {
        if (!isLoggedIn) {
          return Response.redirect(new URL("/auth/login", nextUrl));
        }
      }
      return true;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            mobile: z.string().regex(/^(09)\d{9}$/),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          try {
            const { data } = await axios
              .post<AxiosResponseType>("/auth/login")
              .then(({ data }) => data);
          } catch (error) {}
        }
        return {};
      },
    }),
  ],
} satisfies NextAuthConfig;
