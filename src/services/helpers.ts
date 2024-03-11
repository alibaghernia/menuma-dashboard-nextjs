import axios, { responseIntercepter } from "@/lib/axios";
import axiosPkg, { AxiosInstance } from "axios";

export const recreateServiceAxiosIns = (base_url: string) => {
  const axiosIns = axiosPkg.create({
    ...axios.defaults,
    baseURL: base_url.startsWith("http")
      ? base_url
      : `${axios.defaults.baseURL}${base_url}`,
    headers: {
      ...axios.defaults.headers.common,
    },
  });

  axiosIns.interceptors.response.use(...responseIntercepter);

  return axiosIns;
};
