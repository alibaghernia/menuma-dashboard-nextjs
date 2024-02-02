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
}
