import { FC, PropsWithChildren } from "react";

declare type IGeneralProviderContext = {
  loadings: string[];
  setLoadings: (loadings: string[]) => void;
};

declare type IGeneralProvider = FC<PropsWithChildren>;
