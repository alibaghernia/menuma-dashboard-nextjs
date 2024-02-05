import { AxiosResponseType } from "@/lib/auth/types";
import { BusinessService } from "../business.service";
import { IGetItemsFilters, EventEntity } from "./types";

export class EventsService {
  static init(businessService: BusinessService) {
    return new EventsService(businessService);
  }

  constructor(private businessService: BusinessService) {}

  async getItems(filter: IGetItemsFilters = {}) {
    return this.businessService.axiosIns
      .get<
        AxiosResponseType<{
          total: number;
          events: EventEntity[];
        }>
      >("/events", {
        params: filter,
      })
      .then(({ data }) => data);
  }
  async getItem(uuid: string) {
    return this.businessService.axiosIns
      .get<AxiosResponseType<EventEntity>>(`/events/${uuid}`)
      .then(({ data }) => data);
  }
  async generateQrCode(uuid: string) {
    return this.businessService.axiosIns
      .post<AxiosResponseType<string>>(`/events/${uuid}/generate-qrcode`)
      .then(({ data }) => data);
  }
  async delete(id: string) {
    return this.businessService.axiosIns
      .delete<AxiosResponseType>(`/events/${id}`)
      .then(({ data }) => data);
  }
  async create(payload: unknown) {
    return this.businessService.axiosIns
      .post("/events", payload)
      .then(({ data }) => data);
  }
  async update(uuid: string, payload: unknown) {
    return this.businessService.axiosIns
      .put(`/events/${uuid}`, payload)
      .then(({ data }) => data);
  }
}
