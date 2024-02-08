import { BusinessService } from "../business.service";
import { recreateServiceAxiosIns } from "@/services/helpers";
import { AxiosInstance } from "axios";
import { CustomersService } from "./customers/customers.service";

export class CustomerClubService {
  static init(businessService: BusinessService) {
    return new CustomerClubService(businessService);
  }

  public axiosIns: AxiosInstance;

  constructor(businessService: BusinessService) {
    this.axiosIns = recreateServiceAxiosIns(
      `${businessService.axiosIns.defaults.baseURL}/customer_club`
    );
  }

  get customersService() {
    return CustomersService.init(this);
  }
}
