import { AxiosResponseType } from "@/lib/auth/types";
import type { AxiosInstance } from "axios";
import { recreateServiceAxiosIns } from "../../helpers";
import { User } from "./types";

export class UsersService {
  static init() {
    return new UsersService();
  }

  private axiosIns: AxiosInstance;

  constructor() {
    this.axiosIns = recreateServiceAxiosIns("/users");
  }

  getMe() {
    return this.axiosIns
      .get<AxiosResponseType<User>>(`/me`)
      .then(({ data }) => data);
  }
  updateProfile(payload: unknown) {
    return this.axiosIns
      .put<AxiosResponseType>(`/`, payload)
      .then(({ data }) => data);
  }
}
