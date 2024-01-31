import type { User } from "next-auth";

declare module "next-auth" {
  declare interface User {
    role: string;
  }
}

declare type AxiosResponseType<T = unknown> = {
  ok: boolean;
  data: T;
};
