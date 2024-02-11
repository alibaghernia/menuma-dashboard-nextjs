import { AxiosResponseType } from "@/lib/auth/types";
import type { AxiosInstance } from "axios";
import { recreateServiceAxiosIns } from "../../helpers";
import { User } from "@/services/dashboard/users/types";
import { CatalogEntity } from "./types";

export class CatalogsService {
  static init() {
    return new CatalogsService();
  }

  private axiosIns: AxiosInstance;

  constructor() {
    this.axiosIns = recreateServiceAxiosIns("/panel/catalogs");
  }

  getAll(filters: GetItemsFilters = {}) {
    return this.axiosIns
      .get<AxiosResponseType<{ total: number; items: CatalogEntity[] }>>("/", {
        params: filters,
      })
      .then(({ data }) => data);
  }
  get(uuid: string) {
    return this.axiosIns
      .get<AxiosResponseType<CatalogEntity>>(`/${uuid}`)
      .then(({ data }) => data);
  }
  create(payload: CreateUserPayload) {
    return this.axiosIns
      .post<AxiosResponseType>("/", payload)
      .then(({ data }) => data);
  }
  delete(uuid: string) {
    return this.axiosIns.delete<AxiosResponseType>(`/${uuid}`);
  }
  update(uuid: string, payload: CreateUserPayload) {
    return this.axiosIns
      .put<AxiosResponseType>(`/${uuid}`, payload)
      .then(({ data }) => data);
  }
}
