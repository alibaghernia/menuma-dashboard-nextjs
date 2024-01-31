import type { User } from "next-auth";
import type { User as UserEntity } from "@/services/types";

declare module "next-auth" {
  declare interface User extends UserEntity {}
}

declare type AxiosResponseType<T = unknown> = {
  ok: boolean;
  data: T;
};
