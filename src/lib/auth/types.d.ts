import type { User } from "next-auth";
import type { User as UserEntity } from "@/services/dashboard/users/types";

declare module "next-auth" {
  declare interface User extends UserEntity {
    access_token: string;
  }
}

declare type AxiosResponseType<T = unknown> = {
  ok: boolean;
  data: T;
};
