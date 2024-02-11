import { AxiosResponseType } from "@/lib/auth/types";
import type { AxiosInstance } from "axios";
import { recreateServiceAxiosIns } from "../../helpers";
import { User } from "./types";
import axios from "@/lib/axios";

export class UsersService {
  static init() {
    return new UsersService();
  }

  private axiosIns: AxiosInstance;

  constructor() {
    this.axiosIns = recreateServiceAxiosIns("/panel/users");
  }

  getMe() {
    return axios
      .get<AxiosResponseType<User>>(`/users/me`)
      .then(({ data }) => data);
  }
  updateProfile(payload: unknown) {
    return this.axiosIns
      .put<AxiosResponseType>(`/`, payload)
      .then(({ data }) => data);
  }
}
