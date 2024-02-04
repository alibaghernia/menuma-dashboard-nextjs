import { AxiosResponseType } from "@/lib/auth/types";
import { BusinessService } from "../business.service";
import { IGetItemsFilters, TableEntity } from "./types";

export class TablesService {
  static init(businessService: BusinessService) {
    return new TablesService(businessService);
  }

  constructor(private businessService: BusinessService) {}

  async getItems(filter: IGetItemsFilters = {}) {
    return this.businessService.axiosIns
      .get<
        AxiosResponseType<{
          total: number;
          tables: TableEntity[];
        }>
      >("/tables", {
        params: filter,
      })
      .then(({ data }) => data);
  }
  async getItem(uuid: string) {
    return this.businessService.axiosIns
      .get<AxiosResponseType<TableEntity>>(`/tables/${uuid}`)
      .then(({ data }) => data);
  }
  async delete(id: string) {
    return this.businessService.axiosIns
      .delete<AxiosResponseType>(`/tables/${id}`)
      .then(({ data }) => data);
  }
  async create(payload: unknown) {
    return this.businessService.axiosIns
      .post("/tables", payload)
      .then(({ data }) => data);
  }
  async update(uuid: string, payload: unknown) {
    return this.businessService.axiosIns
      .put(`/tables/${uuid}`, payload)
      .then(({ data }) => data);
  }
}
