import { AxiosResponseType } from "@/lib/auth/types";
import type { AxiosInstance } from "axios";
import { recreateServiceAxiosIns } from "@/services/helpers";

export class BusinessService {
  static init(business_uuid: string) {
    return new BusinessService(business_uuid);
  }

  private axiosIns: AxiosInstance;

  constructor(business_uuid: string) {
    this.axiosIns = recreateServiceAxiosIns(`/panel/business/${business_uuid}`);
  }

  getMe() {
    return this.axiosIns.get<AxiosResponseType>(`/me`).then(({ data }) => data);
  }
}
