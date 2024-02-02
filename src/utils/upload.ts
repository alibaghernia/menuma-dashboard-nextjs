import { FilesService } from "@/services/file/file.service";
import { UploadProps } from "antd";

export const uploadCustomRequest = (options: any) => {
  const { onSuccess, onError, file, onProgress } = options;
  const filesService = FilesService.init();
  return filesService
    .uploadFile(file, (percent) => {
      onProgress!({ percent });
    })
    .then(({ data }) => {
      onSuccess!(data?.uuid);
      return data;
    });
};
