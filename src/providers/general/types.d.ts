import { FC, PropsWithChildren } from "react";

declare interface IGeneralProviderProps {}

declare type IGeneralProviderContext = {
  addLoading: (loading_id: string) => void;
  removeLoading: (loading_id: string) => void;
  loadings: string[];
  setLoadings: (loadings: string[]) => void;
} & IGeneralProviderProps;

declare type IGeneralProvider = FC<PropsWithChildren<IGeneralProviderProps>>;
