import { AxiosResponseType } from "@/lib/auth/types";
import { BusinessService } from "../business.service";
import { IGetRequestFilters, Request } from "./types";
import { io } from "socket.io-client";

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
  async update(uuid: string, payload: Pick<Request, "status">) {
    return this.businessService.axiosIns
      .put(`/pager-requests/${uuid}`, payload)
      .then(({ data }) => data);
  }
  get socket() {
    return {
      connect: (business_uuid: string) => {
        const host = process.env.NEXT_PUBLIC_BACKEND_SOCKET_SERVER_HOST;
        // const port = +(
        //   process.env.NEXT_PUBLIC_BACKEND_SOCKET_SERVER_PORT || 3001
        // );
        // const portSSL = +(
        //   process.env.NEXT_PUBLIC_BACKEND_SOCKET_SERVER_PORT_SSL || 3001
        // );
        return io(
          `${
            !!process.env.NEXT_PUBLIC_BACKEND_SOCKET_SERVER_SECURE
              ? "wss"
              : "ws"
          }://${host}
          }/pager_requests`,
          {
            host,
            path: "/socket.io",
            query: {
              business_uuid,
            },
          }
        );
      },
    };
  }
}
