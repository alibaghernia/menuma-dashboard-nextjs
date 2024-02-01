import { AxiosResponseType } from "@/lib/auth/types";
import { IGetProductFilters, Product } from "./types";
import { RcFile } from "antd/lib/upload";
import axios from "@/lib/axios";

export class FilesService {
  static init() {
    return new FilesService();
  }

  constructor() {}

  uploadFile(
    file: string | RcFile | Blob,
    onUploadProgress?: (percent: number) => void
  ) {
    const formData = new FormData();
    formData.set("file", file);
    return axios
      .post<AxiosResponseType<{ uuid: string }>>(`/files`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (event: any) => {
          const percent = Math.floor((event.loaded / event.total!) * 100);
          onUploadProgress?.(percent);
        },
      })
      .then(({ data }) => {
        return data;
      });
  }
}
