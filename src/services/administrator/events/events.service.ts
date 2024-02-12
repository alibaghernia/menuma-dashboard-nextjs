import { AxiosResponseType } from "@/lib/auth/types";
import { BusinessService } from "../business.service";
import { AxiosInstance } from "axios";
import { recreateServiceAxiosIns } from "@/services/helpers";
import { EventEntity, IGetFilters } from "./types";

export class EventsService {
  static init() {
    return new EventsService();
  }

  private axiosIns: AxiosInstance;

  constructor() {
    this.axiosIns = recreateServiceAxiosIns("/panel/event");
  }
  async getItems(filter: IGetFilters = {}) {
    return this.axiosIns
      .get<
        AxiosResponseType<{
          total: number;
          items: EventEntity[];
        }>
      >("/", {
        params: filter,
      })
      .then(({ data }) => data);
  }
  async getItem(uuid: string) {
    return this.axiosIns
      .get<AxiosResponseType<EventEntity>>(`/${uuid}`)
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
