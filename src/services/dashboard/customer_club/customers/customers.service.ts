import { AxiosResponseType } from "@/lib/auth/types";
import { BusinessService } from "../../business.service";
import { IGetItemsFilters, CustomerEntity } from "./types";
import { CustomerClubService } from "../customer_club.service";

export class CustomersService {
  static init(customerClubService: CustomerClubService) {
    return new CustomersService(customerClubService);
  }

  constructor(private customerClubService: CustomerClubService) {}

  async getItems(filter: IGetItemsFilters = {}) {
    return this.customerClubService.axiosIns
      .get<
        AxiosResponseType<{
          total: number;
          customers: CustomerEntity[];
        }>
      >("/customers", {
        params: filter,
      })
      .then(({ data }) => data);
  }
  async getItem(uuid: string) {
    return this.customerClubService.axiosIns
      .get<AxiosResponseType<CustomerEntity>>(`/customers/${uuid}`)
      .then(({ data }) => data);
  }
  async delete(id: string) {
    return this.customerClubService.axiosIns
      .delete<AxiosResponseType>(`/customers/${id}`)
      .then(({ data }) => data);
  }
  async create(payload: unknown) {
    return this.customerClubService.axiosIns
      .post("/customers", payload)
      .then(({ data }) => data)
      .catch(({ response }) => Promise.reject(response));
  }
  async update(uuid: string, payload: unknown) {
    return this.customerClubService.axiosIns
      .put(`/customers/${uuid}`, payload)
      .then(({ data }) => data)
      .catch(({ response }) => Promise.reject(response));
  }
}
