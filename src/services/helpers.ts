import axios from "@/lib/axios";
import axiosPkg, { AxiosInstance } from "axios";

export const recreateServiceAxiosIns = (base_url: string) => {
  console.log({
    headers: axios.defaults.headers.common,
  });
  return axiosPkg.create({
    ...axios.defaults,
    baseURL: base_url.startsWith("http")
      ? base_url
      : `${axios.defaults.baseURL}${base_url}`,
    headers: {
      ...axios.defaults.headers.common,
    },
  });
};
