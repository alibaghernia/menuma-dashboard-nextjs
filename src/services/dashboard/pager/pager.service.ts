import { AxiosResponseType } from "@/lib/auth/types";
import { BusinessService } from "../business.service";
import { IGetRequestFilters, Request } from "./types";

export class PagerService {
  static init(businessService: BusinessService) {
    return new PagerService(businessService);
  }

  constructor(private businessService: BusinessService) {}

  async getItems(filter: IGetRequestFilters) {
    return this.businessService.axiosIns
      .get<
        AxiosResponseType<{
          total: number;
          requests: Request[];
        }>
      >("/pager-requests", {
        params: filter,
      })
      .then(({ data }) => data);
  }
  async getItem(uuid: string) {
    return this.businessService.axiosIns
      .get<AxiosResponseType<Request>>(`/pager-requests/${uuid}`)
      .then(({ data }) => data);
  }
  async delete(uuid: string) {
    return this.businessService.axiosIns
      .delete<AxiosResponseType>(`/pager-requests/${uuid}`)
      .then(({ data }) => data);
  }
  async update(uuid: string, payload: { status: "TODO" | "DOING" | "DONE" }) {
    return this.businessService.axiosIns
      .put(`/pager-requests/${uuid}`, payload)
      .then(({ data }) => data);
  }
}
