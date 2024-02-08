import { AxiosResponseType } from "@/lib/auth/types";
import { BusinessService } from "../business.service";
import { DiscountEntity, IGetFilters } from "./types";

export class DiscountsService {
  static init(businessService: BusinessService) {
    return new DiscountsService(businessService);
  }

  constructor(private businessService: BusinessService) {}

  async getItems(filter: IGetFilters) {
    return this.businessService.axiosIns
      .get<
        AxiosResponseType<{
          total: number;
          items: DiscountEntity[];
        }>
      >("/discounts", {
        params: filter,
      })
      .then(({ data }) => data);
  }
  async getItem(uuid: string) {
    return this.businessService.axiosIns
      .get<AxiosResponseType<DiscountEntity>>(`/discounts/${uuid}`)
      .then(({ data }) => data);
  }
  async delete(id: string) {
    return this.businessService.axiosIns
      .delete<AxiosResponseType>(`/discounts/${id}`)
      .then(({ data }) => data);
  }
  async create(payload: unknown) {
    return this.businessService.axiosIns
      .post("/discounts", payload)
      .then(({ data }) => data);
  }
  async update(uuid: string, payload: unknown) {
    return this.businessService.axiosIns
      .put(`/discounts/${uuid}`, payload)
      .then(({ data }) => data);
  }
}
