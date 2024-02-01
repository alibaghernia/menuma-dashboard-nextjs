import { AxiosResponseType } from "@/lib/auth/types";
import { BusinessService } from "../business.service";
import { IGetItemsFilters, Category } from "./types";

export class CategoriesService {
  static init(businessService: BusinessService) {
    return new CategoriesService(businessService);
  }

  constructor(private businessService: BusinessService) {}

  async getItems(filter: IGetItemsFilters = {}) {
    return this.businessService.axiosIns
      .get<
        AxiosResponseType<{
          total: number;
          categories: Category[];
        }>
      >("/category", {
        params: filter,
      })
      .then(({ data }) => data);
  }
  async getItem(uuid: string) {
    return this.businessService.axiosIns
      .get<AxiosResponseType<Category>>(`/category/${uuid}`)
      .then(({ data }) => data);
  }
  async delete(id: string) {
    return this.businessService.axiosIns
      .delete<AxiosResponseType>(`/category/${id}`)
      .then(({ data }) => data);
  }
  async create(payload: unknown) {
    return this.businessService.axiosIns
      .post("/category", payload)
      .then(({ data }) => data);
  }
  async update(uuid: string, payload: unknown) {
    return this.businessService.axiosIns
      .put(`/category/${uuid}`, payload)
      .then(({ data }) => data);
  }
}
