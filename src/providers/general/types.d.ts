import { MessageInstance } from "antd/lib/message/interface";
import { NotificationInstance } from "antd/lib/notification/interface";
import { FC, PropsWithChildren } from "react";

declare interface IGeneralProviderProps {}

declare type IGeneralProviderContext = {
  addLoading: (loading_id: string) => void;
  removeLoading: (loading_id: string) => void;
  loadings: string[];
  messageApi: MessageInstance;
  notificationApi: NotificationInstance;
  setLoadings: (loadings: string[]) => void;
} & IGeneralProviderProps;

declare type IGeneralProvider = FC<PropsWithChildren<IGeneralProviderProps>>;
