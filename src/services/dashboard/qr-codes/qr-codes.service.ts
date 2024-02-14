import { AxiosResponseType } from "@/lib/auth/types";
import { BusinessService } from "../business.service";
import { IGetItemsFilters, QrCodeEntity } from "./types";

export class QrCodeService {
  static init(businessService: BusinessService) {
    return new QrCodeService(businessService);
  }

  constructor(private businessService: BusinessService) {}

  async getItems(filter: IGetItemsFilters = {}) {
    return this.businessService.axiosIns
      .get<
        AxiosResponseType<{
          total: number;
          items: QrCodeEntity[];
        }>
      >("/qr-code", {
        params: filter,
      })
      .then(({ data }) => data);
  }
  async getItem(uuid: string) {
    return this.businessService.axiosIns
      .get<AxiosResponseType<QrCodeEntity>>(`/qr-code/${uuid}`)
      .then(({ data }) => data);
  }
  async getQrCodeData(uuid: string) {
    return this.businessService.axiosIns
      .get<AxiosResponseType<string>>(`/qr-code/${uuid}/data`)
      .then(({ data }) => data);
  }
  async delete(id: string) {
    return this.businessService.axiosIns
      .delete<AxiosResponseType>(`/qr-code/${id}`)
      .then(({ data }) => data);
  }
  async create(payload: unknown) {
    return this.businessService.axiosIns
      .post("/qr-code", payload)
      .then(({ data }) => data);
  }
  async update(uuid: string, payload: unknown) {
    return this.businessService.axiosIns
      .put(`/qr-code/${uuid}`, payload)
      .then(({ data }) => data);
  }
}
