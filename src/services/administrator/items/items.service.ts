import { AxiosResponseType } from "@/lib/auth/types";
import { BusinessService } from "../business.service";
import { IGetProductFilters, Product } from "./types";
import { AxiosInstance } from "axios";
import { recreateServiceAxiosIns } from "@/services/helpers";

export class ItemsService {
  static init() {
    return new ItemsService();
  }

  private axiosIns: AxiosInstance;

  constructor() {
    this.axiosIns = recreateServiceAxiosIns("/panel/product");
  }
  async getItems(filter: IGetProductFilters) {
    return this.axiosIns
      .get<
        AxiosResponseType<{
          total: number;
          items: Product[];
        }>
      >("/", {
        params: filter,
      })
      .then(({ data }) => data);
  }
  async getItem(uuid: string) {
    return this.axiosIns
      .get<AxiosResponseType<Product>>(`/${uuid}`)
      .then(({ data }) => data);
  }
  async delete(uuid: string) {
    return this.axiosIns
      .delete<AxiosResponseType>(`/${uuid}`)
      .then(({ data }) => data);
  }
  async create(payload: unknown) {
    return this.axiosIns.post("/", payload).then(({ data }) => data);
  }
  async update(uuid: string, payload: unknown) {
    return this.axiosIns.put(`/${uuid}`, payload).then(({ data }) => data);
  }
}
