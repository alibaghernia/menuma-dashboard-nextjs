import { AxiosResponseType } from "@/lib/auth/types";
import type { AxiosInstance } from "axios";
import { recreateServiceAxiosIns } from "../../helpers";
import { User } from "@/services/dashboard/users/types";

export class UsersService {
  static init() {
    return new UsersService();
  }

  private axiosIns: AxiosInstance;

  constructor() {
    this.axiosIns = recreateServiceAxiosIns("/panel/users");
  }

  getAll(filters: GetItemsFilters = {}) {
    return this.axiosIns
      .get<AxiosResponseType<{ total: number; users: User[] }>>("/", {
        params: filters,
      })
      .then(({ data }) => data);
  }
  get(uuid: string) {
    return this.axiosIns
      .get<AxiosResponseType<User>>(`/${uuid}`)
      .then(({ data }) => data);
  }
  getManagers(filters: GetManagersFilters = {}) {
    return this.axiosIns
      .get<AxiosResponseType<User[]>>("/managers", {
        params: filters,
      })
      .then(({ data }) => data);
  }
  create(payload: CreateUserPayload) {
    return this.axiosIns
      .post<AxiosResponseType>("/", payload)
      .then(({ data }) => data);
  }
  update(uuid: string, payload: CreateUserPayload) {
    return this.axiosIns
      .put<AxiosResponseType>(`/${uuid}`, payload)
      .then(({ data }) => data);
  }
}
