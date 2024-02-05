import type { NextAuthConfig, Session } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import axios from "../axios";
import { AxiosResponseType } from "./types";
import { UsersService } from "@/services/dashboard/users/users.service";
import { User } from "@/services/dashboard/users/types";

export const authConfig = {
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdministrator = auth?.user?.role == "admin";
      const isOnAuth = nextUrl.pathname.startsWith("/auth");
      if (
        /(^(\/api|\/_next|\/static|\/_next|.*\.(jpg|png|jpeg)$))/.test(
          nextUrl.pathname
        )
      )
        return true;
      if (isLoggedIn) {
        axios.defaults.headers.common.Authorization = `Bearer ${auth.user?.access_token}`;
        if (isOnAuth) {
          if (isAdministrator)
            return Response.redirect(new URL("/administrator", nextUrl));
          else return Response.redirect(new URL("/", nextUrl));
        }
      } else {
        if (!isOnAuth)
          return Response.redirect(new URL("/auth/login", nextUrl));
      }

      return true;
    },
    jwt({ token, user }) {
      return { ...token, ...user };
    },
    session({ session, token }: any): Session {
      session.user = token;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      async authorize(credentials): Promise<User | null> {
        const parsedCredentials = z
          .object({
            mobile: z.string().regex(/^(09)\d{9}$/),
            password: z.string(),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          try {
            const {
              data: { access_token },
            } = await axios
              .post<AxiosResponseType<{ access_token: string }>>(
                "/auth/login",
                {
                  mobile: credentials.mobile,
                  password: credentials.password,
                }
              )
              .then(({ data }) => data);
            axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
            const usersService = UsersService.init();
            const { data } = await usersService.getMe();
            return { ...data, access_token };
          } catch (error) {
            return null;
          }
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
