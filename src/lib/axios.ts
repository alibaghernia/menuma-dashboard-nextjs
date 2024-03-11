import { logOut } from "@/app/(dashboard)/[business]/components/user/actions";
import axiosPkg, {
  AxiosError,
  AxiosInterceptorManager,
  AxiosResponse,
} from "axios";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_BASEURL;

export const responseIntercepter: Parameters<
  AxiosInterceptorManager<any>["use"]
> = [
  (res: AxiosResponse) => res,
  (rej: AxiosError) => {
    if (
      !rej.config?.url?.startsWith("/auth") &&
      [401, 403].includes(rej.response?.status!)
    ) {
      logOut();
    }
    return Promise.reject(rej);
  },
];

if (!baseURL) {
  console.error("Check Backend Baseurl");
  process.exit(1);
}

const axios = axiosPkg.create({
  baseURL,
});

axios.interceptors.response.use(...responseIntercepter);

export default axios;
