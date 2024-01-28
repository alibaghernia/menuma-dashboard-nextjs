import { FC, PropsWithChildren } from "react";

declare interface IGeneralProviderProps {}

declare type IGeneralProviderContext = {
  loadings: string[];
  setLoadings: (loadings: string[]) => void;
} & IGeneralProviderProps;

declare type IGeneralProvider = FC<PropsWithChildren<IGeneralProviderProps>>;
