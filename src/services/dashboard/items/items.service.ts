import { AxiosResponseType } from "@/lib/auth/types";
import { BusinessService } from "../business.service";
import { IGetProductFilters, Product } from "./types";

export class ItemsService {
  static init(businessService: BusinessService) {
    return new ItemsService(businessService);
  }

  constructor(private businessService: BusinessService) {}

  async getItems(filter: IGetProductFilters) {
    return this.businessService.axiosIns
      .get<
        AxiosResponseType<{
          total: number;
          products: Product[];
        }>
      >("/product", {
        params: filter,
      })
      .then(({ data }) => data);
  }
  async delete(id: string) {
    return this.businessService.axiosIns
      .delete<AxiosResponseType>(`/product/${id}`)
      .then(({ data }) => data);
  }
  async create(payload: unknown) {
    return this.businessService.axiosIns
      .post("/product", payload)
      .then(({ data }) => data);
  }
}
