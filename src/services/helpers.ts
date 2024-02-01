import axios from "@/lib/axios";
import axiosPkg, { AxiosInstance } from "axios";

export const recreateServiceAxiosIns = (base_url: string) => {
  return axiosPkg.create({
    ...axios.defaults,
    baseURL: `${axios.defaults.baseURL}${base_url}`,
    headers: {
      ...axios.defaults.headers.common,
    },
  });
};
