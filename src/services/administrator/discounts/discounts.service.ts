import { AxiosResponseType } from "@/lib/auth/types";
import { BusinessService } from "../business.service";
import { DiscountEntity, IGetFilters } from "./types";
import { AxiosInstance } from "axios";
import { recreateServiceAxiosIns } from "@/services/helpers";

export class DiscountsService {
  static init() {
    return new DiscountsService();
  }

  private axiosIns: AxiosInstance;

  constructor() {
    this.axiosIns = recreateServiceAxiosIns("/panel/discounts");
  }
  async getItems(filter: IGetFilters) {
    return this.axiosIns
      .get<
        AxiosResponseType<{
          total: number;
          items: DiscountEntity[];
        }>
      >("/", {
        params: filter,
      })
      .then(({ data }) => data);
  }
  async getItem(uuid: string) {
    return this.axiosIns
      .get<AxiosResponseType<DiscountEntity>>(`/${uuid}`)
      .then(({ data }) => data);
  }
  async delete(id: string) {
    return this.axiosIns
      .delete<AxiosResponseType>(`/${id}`)
      .then(({ data }) => data);
  }
  async create(payload: unknown) {
    return this.axiosIns.post("", payload).then(({ data }) => data);
  }
  async update(uuid: string, payload: unknown) {
    return this.axiosIns.put(`/${uuid}`, payload).then(({ data }) => data);
  }
}
