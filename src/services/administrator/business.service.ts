import { AxiosResponseType } from "@/lib/auth/types";
import type { AxiosInstance } from "axios";
import { recreateServiceAxiosIns } from "@/services/helpers";
import { Business, GetAllItemsFilter } from "./types";

export class BusinessService {
  static init() {
    return new BusinessService();
  }

  public axiosIns: AxiosInstance;

  constructor() {
    this.axiosIns = recreateServiceAxiosIns(`/panel/business`);
  }

  getAll(filters: GetAllItemsFilter = {}) {
    return this.axiosIns
      .get<
        AxiosResponseType<{
          total: number;
          businesses: Business[];
        }>
      >("/", { params: filters })
      .then(({ data }) => data);
  }
  get(uuid: string) {
    return this.axiosIns
      .get<AxiosResponseType<Business>>(`/${uuid}`)
      .then(({ data }) => data);
  }
  create(payload: unknown) {
    return this.axiosIns.post<AxiosResponseType>("", payload);
  }
  update(uuid: string, payload: unknown) {
    return this.axiosIns
      .put<AxiosResponseType>(`/${uuid}`, payload)
      .catch(({ response }) => Promise.reject(response));
  }
  delete(uuid: string) {
    return this.axiosIns.delete<AxiosResponseType>(`/${uuid}`);
  }
}
