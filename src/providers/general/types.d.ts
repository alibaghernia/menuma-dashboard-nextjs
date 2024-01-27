import { FC, PropsWithChildren } from "react";

declare interface IGeneralProviderProps {
  theme_fontFamily: string;
}

declare type IGeneralProviderContext = {
  loadings: string[];
  setLoadings: (loadings: string[]) => void;
} & IGeneralProviderProps;

declare type IGeneralProvider = FC<PropsWithChildren<IGeneralProviderProps>>;
