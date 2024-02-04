import { AxiosResponseType } from "@/lib/auth/types";
import { BusinessService } from "../business.service";
import { HallEntity, IGetItemsFilters } from "./types";

export class HallsService {
  static init(businessService: BusinessService) {
    return new HallsService(businessService);
  }

  constructor(private businessService: BusinessService) {}

  async getItems(filter: IGetItemsFilters = {}) {
    return this.businessService.axiosIns
      .get<
        AxiosResponseType<{
          total: number;
          halls: HallEntity[];
        }>
      >("/halls", {
        params: filter,
      })
      .then(({ data }) => data);
  }
  async getItem(uuid: string) {
    return this.businessService.axiosIns
      .get<AxiosResponseType<HallEntity>>(`/halls/${uuid}`)
      .then(({ data }) => data);
  }
  async delete(id: string) {
    return this.businessService.axiosIns
      .delete<AxiosResponseType>(`/halls/${id}`)
      .then(({ data }) => data);
  }
  async create(payload: unknown) {
    return this.businessService.axiosIns
      .post("/halls", payload)
      .then(({ data }) => data);
  }
  async update(uuid: string, payload: unknown) {
    return this.businessService.axiosIns
      .put(`/halls/${uuid}`, payload)
      .then(({ data }) => data);
  }
}
